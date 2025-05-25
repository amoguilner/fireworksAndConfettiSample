import {Confetti} from "./confetti";

export class DebugConfettiRenderer {
    confetti: Array<Confetti>;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    
    constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
        this.confetti = [];
        this.canvas = canvas;
        this.context = context;
    }
    
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.context.fillStyle = 'rgba(255, 255, 255, 1)';
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

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
}