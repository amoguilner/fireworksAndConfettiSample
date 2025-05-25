import {Particle} from "./particle.ts";

export class Firework {
    x: number;
    y: number;
    color: string;
    velocity: { x: number; y: number };
    particles: Particle[];
    lifespan: number;
    hasExploded: boolean;
    context: CanvasRenderingContext2D;
    
    constructor(x:number, y:number, color: string, context: CanvasRenderingContext2D) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = {x: 0, y: Math.random()* -2.5 - 0.5};
        this.particles = new Array<Particle>();
        this.lifespan = 180;
        this.hasExploded = false;
    }
    
    draw() {
        this.context.beginPath();
        this.context.arc(this.x, this.y, 3, 0, Math.PI*2, false);
        this.context.fillStyle = this.color;
        this.context.fill();
    }
    
    explode() {
        for(let i = 0; i < 50; ++i) {
            this.particles.push(new Particle(this.x, this.y, this.color, this.context));
        }
    }
    
    update() {
        --this.lifespan;
        
        if (this.lifespan <= 0 && !this.hasExploded) {
            this.explode();
            this.velocity = {x: 0, y: 0};
            this.hasExploded = true;
        } else if (this.lifespan > 0) {
            this.y += this.velocity.y;
        }
        
        for (let i = 0; i < this.particles.length; ++i) {
            this.particles[i].update();
            this.particles[i].draw();
        }
    }
}