/* Hafez Fortune Wheel JavaScript */

class FortuneWheel {
    constructor(canvasId, spellText = false) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.segments = poems.length;
        this.currentRotation = 0;
        this.isSpinning = false;
        this.spinButton = document.getElementById('spinButton');
        
        this.setupCanvas();
        this.drawWheel();
        this.attachEventListeners();
    }

    setupCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();
        
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.ctx.scale(dpr, dpr);
        
        this.centerX = rect.width / 2;
        this.centerY = rect.height / 2;
        this.radius = Math.min(rect.width, rect.height) / 2 - 10;
    }

    drawWheel() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const segmentAngle = (Math.PI * 2) / this.segments;
        const colors = this.generateColors();

        for (let i = 0; i < this.segments; i++) {
            const startAngle = i * segmentAngle + this.currentRotation;
            const endAngle = startAngle + segmentAngle;

            // Draw segment
            this.ctx.beginPath();
            this.ctx.moveTo(this.centerX, this.centerY);
            this.ctx.arc(this.centerX, this.centerY, this.radius, startAngle, endAngle);
            this.ctx.closePath();
            this.ctx.fillStyle = colors[i % colors.length];
            this.ctx.fill();

            // Draw border
            this.ctx.strokeStyle = '#d4af37';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            // Draw text
            this.drawSegmentText(i, startAngle, endAngle, segmentAngle);
        }

        // Draw center circle
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, 30, 0, Math.PI * 2);
        this.ctx.fillStyle = '#d4af37';
        this.ctx.fill();
        this.ctx.strokeStyle = '#5d3a84';
        this.ctx.lineWidth = 3;
        this.ctx.stroke();

        // Draw center text
        this.ctx.fillStyle = '#5d3a84';
        this.ctx.font = 'bold 14px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('SPIN', this.centerX, this.centerY);
    }

    generateColors() {
        return [
            '#8b3f7a',
            '#6b4c8a',
            '#c41e3a',
            '#a85e5e',
            '#7d4e6f',
            '#5d3a84',
            '#9e4562',
            '#6d5a7a',
        ];
    }

    drawSegmentText(segmentIndex, startAngle, endAngle, segmentAngle) {
        const textAngle = startAngle + segmentAngle / 2;
        const textRadius = this.radius * 0.65;

        this.ctx.save();
        this.ctx.translate(this.centerX, this.centerY);
        this.ctx.rotate(textAngle);
        this.ctx.translate(textRadius, 0);

        this.ctx.fillStyle = '#d4af37';
        this.ctx.font = 'bold 16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        
        const text = `${segmentIndex + 1}`;
        this.ctx.fillText(text, 0, 0);

        this.ctx.restore();
    }

    spin() {
        if (this.isSpinning) return;

        this.isSpinning = true;
        this.spinButton.disabled = true;

        const randomSegment = Math.floor(Math.random() * this.segments);
        const segmentAngle = (Math.PI * 2) / this.segments;
        const targetRotation = Math.PI * 2 * 5 + (randomSegment * segmentAngle);

        this.animateSpin(targetRotation, randomSegment);
    }

    animateSpin(targetRotation, selectedSegment) {
        const duration = 3000; // 3 seconds
        const startRotation = this.currentRotation;
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out cubic)
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            this.currentRotation = startRotation + (targetRotation - startRotation) * easeProgress;
            this.drawWheel();

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.isSpinning = false;
                this.spinButton.disabled = false;
                this.displayFortune(selectedSegment);
                this.playSound();
            }
        };

        animate();
    }

    displayFortune(segmentIndex) {
        const fortune = poems[segmentIndex];
        const fortuneNumber = document.getElementById('fortuneNumber');
        const fortuneText = document.getElementById('fortuneText');
        const fortuneTranslation = document.getElementById('fortuneTranslation');

        fortuneNumber.textContent = `#${segmentIndex + 1}`;
        fortuneText.textContent = fortune.farsi;
        fortuneTranslation.textContent = `English: ${fortune.english}`;

        // Add animation
        const card = document.getElementById('fortuneCard');
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = 'fadeIn 0.5s ease-in-out';
        }, 10);
    }

    playSound() {
        // Create a simple beep sound
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    }

    attachEventListeners() {
        this.spinButton.addEventListener('click', () => this.spin());
        window.addEventListener('resize', () => this.handleResize());
    }

    handleResize() {
        this.setupCanvas();
        this.drawWheel();
    }
}

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// Initialize wheel when page loads
document.addEventListener('DOMContentLoaded', () => {
    const wheel = new FortuneWheel('wheelCanvas');
});
