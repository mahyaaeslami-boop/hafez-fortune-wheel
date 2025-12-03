/* Hafez Fortune Wheel JavaScript - Enhanced */

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

            // Draw border with gradient effect
            this.ctx.strokeStyle = '#d4af37';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            // Draw text
            this.drawSegmentText(i, startAngle, endAngle, segmentAngle);
        }

        // Draw center circle
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, 35, 0, Math.PI * 2);
        this.ctx.fillStyle = '#d4af37';
        this.ctx.fill();
        this.ctx.strokeStyle = '#8b0000';
        this.ctx.lineWidth = 4;
        this.ctx.stroke();

        // Draw center decoration
        this.ctx.fillStyle = '#8b0000';
        this.ctx.font = 'bold 14px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('HAFEZ', this.centerX, this.centerY);
    }

    generateColors() {
        return [
            '#c41e3a',
            '#8b0000',
            '#dc143c',
            '#8b1a1a',
            '#b22222',
            '#900000',
            '#d41159',
            '#a01535',
            '#c41e3a',
            '#7a0a0a',
        ];
    }

    drawSegmentText(segmentIndex, startAngle, endAngle, segmentAngle) {
        // Numbers removed - wheel segments now display no text
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
        const duration = 3500; // 3.5 seconds
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
        const fortuneTheme = document.getElementById('fortuneTheme');

        fortuneNumber.textContent = `#${fortune.number}`;
        fortuneText.textContent = fortune.farsi;
        fortuneTheme.textContent = `Theme: ${fortune.theme}`;
        fortuneTranslation.textContent = fortune.english;

        // Add animation
        const card = document.getElementById('fortuneCard');
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = 'fadeIn 0.6s ease-in-out';
        }, 10);
    }

    playSound() {
        // Create a pleasant chime sound
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // First note
            const osc1 = audioContext.createOscillator();
            const gain1 = audioContext.createGain();
            osc1.connect(gain1);
            gain1.connect(audioContext.destination);
            
            osc1.frequency.value = 800;
            osc1.type = 'sine';
            gain1.gain.setValueAtTime(0.2, audioContext.currentTime);
            gain1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            osc1.start(audioContext.currentTime);
            osc1.stop(audioContext.currentTime + 0.3);
            
            // Second note
            const osc2 = audioContext.createOscillator();
            const gain2 = audioContext.createGain();
            osc2.connect(gain2);
            gain2.connect(audioContext.destination);
            
            osc2.frequency.value = 1000;
            osc2.type = 'sine';
            gain2.gain.setValueAtTime(0.15, audioContext.currentTime + 0.15);
            gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.45);
            
            osc2.start(audioContext.currentTime + 0.15);
            osc2.stop(audioContext.currentTime + 0.45);
        } catch (e) {
            // Sound not supported, silently fail
        }
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
            transform: scale(0.95) rotateY(20deg);
        }
        to {
            opacity: 1;
            transform: scale(1) rotateY(0deg);
        }
    }
`;
document.head.appendChild(style);

// Initialize wheel when page loads
document.addEventListener('DOMContentLoaded', () => {
    const wheel = new FortuneWheel('wheelCanvas');
    
    // Smooth scroll navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
