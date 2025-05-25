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
    coordinates: Array<{x: number; y: number}>;
    numberOfRenderedElements = 20;
    
    constructor(x:number, y:number, color: string, context: CanvasRenderingContext2D) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.coordinates = [{x: this.x, y: this.y}];
        this.color = color;
        this.velocity = {x: 0, y: Math.random()* -2.5 - 0.5};
        this.particles = new Array<Particle>();
        this.lifespan = 180;
        this.hasExploded = false;
    }
    
    draw() {
        this.coordinates.forEach((coordinate, index) => {
            this.context.beginPath();
            this.context.globalAlpha = index / this.numberOfRenderedElements;
            this.context.arc(coordinate.x, coordinate.y, 3, 0, Math.PI*2, false);
            this.context.fillStyle = this.color;
            this.context.fill();
        });
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
            this.coordinates.push({x: this.x, y: this.y});
        }

        if(this.coordinates.length > this.numberOfRenderedElements || this.hasExploded) {
            this.coordinates.shift();
        }
        
        for (let i = 0; i < this.particles.length; ++i) {
            this.particles[i].update();
            this.particles[i].draw();
        }
    }
}