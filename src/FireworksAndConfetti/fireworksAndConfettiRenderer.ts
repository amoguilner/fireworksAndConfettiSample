import {Firework} from "./fireworks/firework";
import {Confetti} from "./confetti/confetti";

export class FireworksAndConfettiRenderer {
    fireworks: Array<Firework>;
    confetti: Array<Confetti>;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    
    constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
        this.fireworks = [];
        this.confetti = [];
        this.canvas = canvas;
        this.context = context;
    }

    private animateFireworks () {
        this.fireworks.forEach((firework: Firework, index: number) => {
            firework.update();
            firework.draw();

            if(firework.lifespan <= 0 && firework.particles.every(p => p.alpha <= 0)) {
                this.fireworks.splice(index, 1);
            }
        });

        if (Math.random() < 0.075) {
            const x = Math.random() * this.canvas.width;
            const color = `hsl(${Math.random() * 360}, 100%, 50%)`;

            this.fireworks.push(new Firework(x, this.canvas.height, color, this.context));
        }
    }
    
    private animateConfetti() {
        this.confetti.forEach((particle: Confetti, index: number) => {
            particle.update();
            particle.draw();

            if(particle.y > this.canvas.height) {
                this.confetti.splice(index, 1);
            }
        });

        if (Math.random() < 0.075) {
            const x = Math.random() * this.canvas.width;
            const color = `hsl(${Math.random() * 360}, 100%, 50%)`;

            this.confetti.push(new Confetti(x, 0, color, this.canvas, this.context));
        }
    }
    
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.context.fillStyle = 'rgba(255, 255, 255, 1)';
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.animateFireworks();
        this.animateConfetti();
    }
}