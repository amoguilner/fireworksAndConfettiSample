import {Firework} from "./firework";

export class FireworksRenderer {
    fireworks: Array<Firework>;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    
    constructor (canvas: HTMLCanvasElement) {
        this.fireworks = [];
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d')!;
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.context.fillStyle = 'rgba(255, 255, 255, 1)';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.fireworks.forEach((firework: Firework, index: number) => {
            firework.update();
            firework.draw();

            if(firework.lifespan <= 0 && firework.particles.every(p => p.alpha <= 0)) {
                this.fireworks.splice(index, 1);
            }
        });

        if (Math.random() < 0.075) {
            const x = Math.random() * this.canvas.width;
            const color = `hsl(${Math.random() * 360}, 50%, 50%)`;

            this.fireworks.push(new Firework(x, this.canvas.height, color, this.context));
        }
    }
}