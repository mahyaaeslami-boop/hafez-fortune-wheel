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
        this.ctx.strokeStyle = '#5d3a84';
        this.ctx.lineWidth = 4;
        this.ctx.stroke();

        // Draw center decoration
        this.ctx.fillStyle = '#5d3a84';
        this.ctx.font = 'bold 14px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('HAFEZ', this.centerX, this.centerY);
    }

    generateColors() {
        return [
            '#ff6b9d',
            '#c77dff',
            '#5ee7df',
            '#ffd60a',
            '#ff9f1c',
            '#ff6b6b',
            '#a29bfe',
            '#74b9ff',
            '#81ecec',
            '#fab1a0',
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
        this.ctx.font = 'bold 14px Arial';
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
                this.createConfetti();
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
            
            // First note - higher pitch
            const osc1 = audioContext.createOscillator();
            const gain1 = audioContext.createGain();
            osc1.connect(gain1);
            gain1.connect(audioContext.destination);
            
            osc1.frequency.value = 880;
            osc1.type = 'sine';
            gain1.gain.setValueAtTime(0.2, audioContext.currentTime);
            gain1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
            
            osc1.start(audioContext.currentTime);
            osc1.stop(audioContext.currentTime + 0.4);
            
            // Second note - even higher
            const osc2 = audioContext.createOscillator();
            const gain2 = audioContext.createGain();
            osc2.connect(gain2);
            gain2.connect(audioContext.destination);
            
            osc2.frequency.value = 1200;
            osc2.type = 'sine';
            gain2.gain.setValueAtTime(0.15, audioContext.currentTime + 0.2);
            gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
            
            osc2.start(audioContext.currentTime + 0.2);
            osc2.stop(audioContext.currentTime + 0.6);
        } catch (e) {
            // Sound not supported, silently fail
        }
    }

    createConfetti() {
        const confettiPieces = 30;
        for (let i = 0; i < confettiPieces; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.top = '-10px';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.borderRadius = '50%';
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '1000';
                
                const colors = ['#ff6b9d', '#c77dff', '#5ee7df', '#ffd60a', '#ff9f1c'];
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.boxShadow = `0 0 10px ${confetti.style.background}`;
                
                document.body.appendChild(confetti);
                
                let top = -10;
                let left = parseFloat(confetti.style.left);
                const speed = Math.random() * 3 + 2;
                const sway = Math.random() * 2 - 1;
                
                const animate = () => {
                    top += speed;
                    left += sway;
                    confetti.style.top = top + 'px';
                    confetti.style.left = left + '%';
                    
                    if (top < window.innerHeight) {
                        requestAnimationFrame(animate);
                    } else {
                        confetti.remove();
                    }
                };
                
                animate();
            }, i * 30);
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
            transform: scale(0.9) rotateY(20deg);
        }
        to {
            opacity: 1;
            transform: scale(1) rotateY(0deg);
        }
    }

    @keyframes wobble {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(2deg); }
        75% { transform: rotate(-2deg); }
    }

    .wobble {
        animation: wobble 0.3s ease-in-out;
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

    // Add fun wobble effect on hover for feature cards
    document.querySelectorAll('.feature').forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.classList.add('wobble');
        });
        feature.addEventListener('mouseleave', function() {
            this.classList.remove('wobble');
        });
    });
});
