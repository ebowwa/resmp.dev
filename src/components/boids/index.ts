import p5 from 'p5';
import { Boid } from './Boid';

const sketch = (p: p5) => {
  let boids: Boid[] = [];

  p.setup = () => {
    p.createCanvas(800, 600);

    // Create and initialize the boids
    for (let i = 0; i < 100; i++) {
      boids.push(new Boid(
        p,
        p.random(p.width),
        p.random(p.height),
        1, // alignmentWeight
        1, // cohesionWeight
        1  // separationWeight
      ));
    }
  };

  p.draw = () => {
    p.background(0);

    // Update and render the boids
    boids.forEach((boid) => {
      boid.flock(boids);
      boid.update();
      boid.show();
    });
  };
};

new p5(sketch);