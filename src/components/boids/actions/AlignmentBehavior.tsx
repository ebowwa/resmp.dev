import p5 from 'p5';
import { Boid } from '../Boid';

export class AlignmentBehavior {
  private boid: Boid; // The boid for which the alignment behavior is calculated
  private boids: Boid[]; // The array of all boids in the simulation

  constructor(boid: Boid, boids: Boid[]) {
    this.boid = boid;
    this.boids = boids;
  }

  calculate(): p5.Vector {
    let perceptionRadius = 50; // The radius within which the boid can perceive other boids
    let steering = this.boid.p.createVector(0, 0); // The steering force to be calculated
    let total = 0; // The number of boids within the perception radius

    // Iterate through all the boids
    for (let other of this.boids) {
      let d = this.boid.position.dist(other.position); // Calculate the distance between the boid and the other boid
      if (d > 0 && d < perceptionRadius) { // Check if the other boid is within the perception radius
        steering.add(other.velocity); // Add the other boid's velocity to the steering force
        total++; // Increment the total number of boids within the perception radius
      }
    }

    if (total > 0) {
      // Calculate the average velocity of the boids within the perception radius
      steering.div(total);
      steering.normalize(); // Normalize the steering force
      steering.mult(this.boid.maxSpeed); // Scale the steering force to the boid's maximum speed
      steering.sub(this.boid.velocity); // Subtract the boid's current velocity from the steering force
      steering.limit(this.boid.maxForce); // Limit the steering force to the boid's maximum force
    }

    return steering; // Return the calculated steering force
  }
}