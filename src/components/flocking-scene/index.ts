// src/app/FlockingSimulation.ts
import p5 from 'p5';
import { Boid } from '../boids/Boid';

export class FlockingSimulation {
  private p: p5; // Reference to the p5.js instance
  private boids: Boid[]; // Array to store the boids
  private alignmentWeight: number;
  private cohesionWeight: number;
  private separationWeight: number;

  /**
   * Constructs a new FlockingSimulation instance.
   * @param p - The p5.js instance to be used for the simulation.
   * @param numBoids - The initial number of boids to create.
   * @param alignmentWeight - Weight for the alignment behavior.
   * @param cohesionWeight - Weight for the cohesion behavior.
   * @param separationWeight - Weight for the separation behavior.
   */
  constructor(p: p5, numBoids: number, alignmentWeight: number = 1, cohesionWeight: number = 1, separationWeight: number = 2) {
    this.p = p;
    this.boids = [];
    this.alignmentWeight = alignmentWeight;
    this.cohesionWeight = cohesionWeight;
    this.separationWeight = separationWeight;
    this.initializeBoids(numBoids);
  }

  /**
   * Initializes the boids for the simulation.
   * @param numBoids - The number of boids to create.
   */
  private initializeBoids(numBoids: number) {
    // Create and add the boids to the boids array
    for (let i = 0; i < numBoids; i++) {
      let x = i < numBoids / 2 ? this.p.width / 2 : this.p.random(this.p.width);
      let y = i < numBoids / 2 ? this.p.height / 2 : this.p.random(this.p.height);
      this.boids.push(new Boid(this.p, x, y, this.alignmentWeight, this.cohesionWeight, this.separationWeight));
    }
  }

  /**
   * Updates the flocking simulation.
   * This method is called in the p.draw loop to update the boids and render the simulation.
   */
  update() {
    // Clear the background
    this.p.background(255);
    // Update and render each boid
    for (let boid of this.boids) {
      boid.flock(this.boids);
      boid.update();
      boid.show();
    }
  }

  /**
   * Adds a new boid to the simulation at the specified position.
   * @param x - The x-coordinate of the new boid's position.
   * @param y - The y-coordinate of the new boid's position.
   */
  addBoid(x: number, y: number) {
    if (this.boids.length <= 250) {
      this.boids.push(new Boid(this.p, x, y, this.alignmentWeight, this.cohesionWeight, this.separationWeight));
    }
  }
}
