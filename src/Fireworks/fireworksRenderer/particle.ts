export class Particle {
    context: CanvasRenderingContext2D;
    x: number;
    y: number;
    color: string;
    velocity: { x: number; y: number };
    alpha: number;
    friction: number;
    
    constructor (x:number, y:number, color: string, context: CanvasRenderingContext2D) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = {
            x:(Math.random()-0.5)*8, 
            y:(Math.random()-0.5)*8
        };
        this.alpha = 1;
        this.friction = 0.99;
    }
    
    draw() {
        this.context.globalAlpha = this.alpha;
        this.context.beginPath();
        this.context.arc(this.x, this.y, 2, 0, Math.PI*2, false);
        this.context.fillStyle = this.color;
        this.context.fill();
    }
    
    update() {
        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.01;
    }
}