// src/components/boids/Boid.ts
import p5 from 'p5';
import { AlignmentBehavior } from './actions/AlignmentBehavior';
import { CohesionBehavior } from './actions/CohesionBehavior';
import { SeparationBehavior } from './actions/SeparationBehavior';

export class Boid {
  p: p5;
  position: p5.Vector; // The current position of the boid
  velocity: p5.Vector; // The current velocity of the boid
  acceleration: p5.Vector; // The current acceleration of the boid
  maxSpeed: number; // The maximum speed the boid can move at
  maxForce: number; // The maximum force the boid can apply
  trailLength: number; // The length of the boid's trail
  trail: p5.Vector[]; // The array of positions that make up the boid's trail
  alignmentWeight: number;
  cohesionWeight: number;
  separationWeight: number;

  /**
   * Constructs a new Boid instance.
   * @param p - The p5.js instance.
   * @param x - The initial x-coordinate of the boid.
   * @param y - The initial y-coordinate of the boid.
   * @param alignmentWeight - Weight for the alignment behavior.
   * @param cohesionWeight - Weight for the cohesion behavior.
   * @param separationWeight - Weight for the separation behavior.
   */
  constructor(p: p5, x: number, y: number, alignmentWeight: number, cohesionWeight: number, separationWeight: number) {
    this.p = p;
    this.position = p.createVector(x, y); // Initialize the boid's position
    this.velocity = p.createVector(p.random(-1, 1), p.random(-1, 1)); // Initialize the boid's velocity with random values
    this.acceleration = p.createVector(0, 0); // Initialize the boid's acceleration to zero
    this.maxSpeed = 2; // Set the maximum speed of the boid
    this.maxForce = 0.05; // Set the maximum force the boid can apply
    this.trailLength = 30; // Set the length of the boid's trail
    this.trail = []; // Initialize the boid's trail as an empty array
    this.alignmentWeight = alignmentWeight;
    this.cohesionWeight = cohesionWeight;
    this.separationWeight = separationWeight;
  }

  /**
   * Updates the boid's position, velocity, and trail.
   * This method is called in each frame to update the boid's state.
   */
  update() {
    this.velocity.add(this.acceleration); // Update the boid's velocity by adding the acceleration
    this.velocity.limit(this.maxSpeed); // Limit the boid's velocity to the maximum speed
    this.position.add(this.velocity); // Update the boid's position by adding the velocity
    // Constrain the boid's position to the canvas boundaries
    this.position.x = this.p.constrain(this.position.x, 0, this.p.width);
    this.position.y = this.p.constrain(this.position.y, 0, this.p.height);
    this.acceleration.mult(0); // Reset the boid's acceleration to zero

    // Add the current position to the boid's trail
    this.trail.push(this.position.copy());
    if (this.trail.length > this.trailLength) {
      // Remove the oldest position from the trail if it exceeds the trail length
      this.trail.shift();
    }
  }

  /**
   * Applies the given force to the boid's acceleration.
   * @param force - The force vector to be applied.
   */
  applyForce(force: p5.Vector) {
    this.acceleration.add(force);
  }

  /**
   * Applies the flocking behaviors (alignment, cohesion, separation) to the boid.
   * @param boids - The array of all boids in the simulation.
   */
  flock(boids: Boid[]) {
    // Calculate the alignment, cohesion, and separation forces
    const alignment = new AlignmentBehavior(this, boids).calculate();
    const cohesion = new CohesionBehavior(this, boids).calculate();
    const separation = new SeparationBehavior(this, boids).calculate();
    
    // Apply the calculated forces to the boid's acceleration with configured weights
    alignment.mult(this.alignmentWeight);
    cohesion.mult(this.cohesionWeight);
    separation.mult(this.separationWeight);

    this.applyForce(alignment);
    this.applyForce(cohesion);
    this.applyForce(separation);
  }

  /**
   * Renders the boid and its trail on the canvas.
   * This method is called in each frame to draw the boid.
   */
  show() {
    this.p.push();
    this.p.translate(this.position.x, this.position.y); // Translate the drawing to the boid's position
    this.p.rotate(this.velocity.heading()); // Rotate the drawing to match the boid's velocity
    // Set the color of the boid
    this.p.fill(0x62, 0x31, 0xf0); // Purple color
    this.p.noStroke();
    this.p.triangle(-5, -5, 5, 0, -5, 5); // Draw the boid as a triangle

    // Draw the boid's trail
    this.p.beginShape();
    for (let i = 0; i < this.trail.length; i++) {
      // Set the color of the trail based on its position in the array
      this.p.stroke(0x63, 0xbb, 0x00, (i / this.trail.length) * 255); // Fade the trail
      this.p.vertex(this.trail[i].x, this.trail[i].y);
    }
    this.p.endShape();
    this.p.pop(); // Restore the drawing to its original state
  }
}
