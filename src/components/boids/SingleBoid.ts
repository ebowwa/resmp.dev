// src/components/boids/SingleBoid.ts
import p5 from 'p5';
import { Boid } from './Boid';

/**
 * SingleBoid class extends the Boid class
 * It represents a single boid in the flocking simulation
 */
export class SingleBoid extends Boid {
  private r: number;

  constructor(p: p5, x: number, y: number, speed: number, alignmentWeight: number, cohesionWeight: number) {
    // Call the constructor of the parent Boid class
    super(p, x, y, speed, alignmentWeight, cohesionWeight);
    this.r = 8; // Set the radius of the boid
  }

  // Override the show method to draw the boid
  show() {
    this.p.push();
    this.p.translate(this.position.x, this.position.y);
    this.p.rotate(this.velocity.heading());
    this.p.noStroke();
    this.p.fill(127);
    this.p.beginShape();
    this.p.vertex(0, -this.r * 2);
    this.p.vertex(-this.r, this.r * 2);
    this.p.vertex(this.r, this.r * 2);
    this.p.endShape(this.p.CLOSE);
    this.p.pop();
  }
}