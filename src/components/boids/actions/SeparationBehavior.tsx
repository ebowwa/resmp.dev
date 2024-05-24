import p5 from 'p5';
import { Boid } from '../Boid';

export class SeparationBehavior {
  private boid: Boid; // The boid for which the separation behavior is calculated
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
        let diff = this.boid.position.copy(); // Create a copy of the boid's position
        diff.sub(other.position); // Subtract the other boid's position from the copy
        diff.normalize(); // Normalize the difference vector
        diff.div(d); // Divide the normalized difference vector by the distance
        steering.add(diff); // Add the normalized and scaled difference vector to the steering force
        total++; // Increment the total number of boids within the perception radius
      }
    }

    if (total > 0) {
      // Calculate the average of the normalized and scaled difference vectors
      steering.div(total);
      steering.normalize(); // Normalize the steering force
      steering.mult(this.boid.maxSpeed); // Scale the steering force to the boid's maximum speed
      steering.sub(this.boid.velocity); // Subtract the boid's current velocity from the steering force
      steering.limit(this.boid.maxForce); // Limit the steering force to the boid's maximum force
    }

    return steering; // Return the calculated steering force
  }
}