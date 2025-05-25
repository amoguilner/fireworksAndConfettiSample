export class Confetti {
    x: number;
    y: number;
    radius: number;
    tilt: number;
    speed: {x:number, y:number}
    color: string;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    velocity: {x:number, y:number};
    delta: number;
    amplitude: {x:number, y:number};
    phaseOffset: number;
    shift: number;

    constructor(
        x: number, 
        y: number,
        color: string, 
        canvas: HTMLCanvasElement,
        context: CanvasRenderingContext2D
    ) {
        this.canvas = canvas;
        this.context = context;
        
        this.velocity = {
            x: Math.floor(Math.random() * 5),
            y: Math.floor(Math.random() * 9) + 1,
        };
        this.amplitude = {
            x: Math.random(), 
            y: Math.random()
        };
        this.phaseOffset = Math.floor(Math.random() * 100);
        this.delta = 0.05;
        this.shift = 0;
        
        this.x = x;
        this.y = y;
        this.radius = Math.floor(Math.random() * 50) - 10;
        this.tilt = Math.floor(Math.random() * 10) - 10;
        this.speed = {
            x: Math.random() * this.velocity.x - this.velocity.y / 2,
            y: Math.random() * this.velocity.y
        };
        this.color = color;
    }
    
    draw() {
        this.context.beginPath();
        this.context.globalAlpha = 1;
        this.context.lineWidth = this.radius / 2;
        this.context.strokeStyle = this.color;
        this.context.moveTo(this.x + this.tilt + this.radius / 4, this.y);
        this.context.lineTo(this.x + this.tilt, this.y + this.tilt + this.radius / 4);
        this.context.stroke();
    }
    
    update() {
        this.x += Math.sin(this.phaseOffset + this.shift) * this.amplitude.x + this.speed.x;
        this.y += (Math.cos(this.phaseOffset + this.shift) + 1) * this.amplitude.y + this.speed.y;
                
        if (this.x < 0) {
            this.x = this.canvas.width;
        }
        
        if (this.x > this.canvas.width) {
            this.x = 0;
        }
        
        this.shift += this.delta;
    }
}