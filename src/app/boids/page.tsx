'use client'

import { useEffect, useRef } from 'react'
import p5 from 'p5'

class Boid {
  p: p5;
  position: p5.Vector;
  velocity: p5.Vector;
  acceleration: p5.Vector;
  maxSpeed: number;
  maxForce: number;

  constructor(p: p5, x: number, y: number) {
    this.p = p;
    this.position = p.createVector(x, y);
    this.velocity = p.createVector(p.random(-1, 1), p.random(-1, 1));
    this.acceleration = p.createVector(0, 0);
    this.maxSpeed = 3;
    this.maxForce = 0.1;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(force: p5.Vector) {
    this.acceleration.add(force);
  }

  align(boids) {
    let perceptionRadius = 50
    let steering = this.p.createVector(0, 0)
    let total = 0

    for (let other of boids) {
      let d = this.position.dist(other.position)
      if (d > 0 && d < perceptionRadius) {
        steering.add(other.velocity)
        total++
      }
    }

    if (total > 0) {
      steering.div(total)
      steering.normalize()
      steering.mult(this.maxSpeed)
      steering.sub(this.velocity)
      steering.limit(this.maxForce)
    }

    return steering
  }

  cohesion(boids) {
    let perceptionRadius = 50
    let steering = this.p.createVector(0, 0)
    let total = 0

    for (let other of boids) {
      let d = this.position.dist(other.position)
      if (d > 0 && d < perceptionRadius) {
        steering.add(other.position)
        total++
      }
    }

    if (total > 0) {
      steering.div(total)
      steering.sub(this.position)
      steering.normalize()
      steering.mult(this.maxSpeed)
      steering.sub(this.velocity)
      steering.limit(this.maxForce)
    }

    return steering
  }

  separation(boids) {
    let perceptionRadius = 50
    let steering = this.p.createVector(0, 0)
    let total = 0

    for (let other of boids) {
      let d = this.position.dist(other.position)
      if (d > 0 && d < perceptionRadius) {
        let diff = this.position.copy()
        diff.sub(other.position)
        diff.normalize()
        diff.div(d)
        steering.add(diff)
        total++
      }
    }

    if (total > 0) {
      steering.div(total)
      steering.normalize()
      steering.mult(this.maxSpeed)
      steering.sub(this.velocity)
      steering.limit(this.maxForce)
    }

    return steering
  }

  flock(boids) {
    let alignment = this.align(boids)
    let cohesion = this.cohesion(boids)
    let separation = this.separation(boids)

    alignment.mult(1)
    cohesion.mult(1)
    separation.mult(2)

    this.applyForce(alignment)
    this.applyForce(cohesion)
    this.applyForce(separation)
  }

  show() {
    this.p.push()
    this.p.translate(this.position.x, this.position.y)
    this.p.rotate(this.velocity.heading())
    this.p.triangle(-10, -10, 10, 0, -10, 10)
    this.p.pop()
  }
}

export default function BoidsPage() {
  const ref = useRef()

  useEffect(() => {
    const sketch = (p) => {
      let boids = []

      p.setup = () => {
        p.createCanvas(400, 400)
        for (let i = 0; i < 100; i++) {
          boids.push(new Boid(p, p.random(p.width), p.random(p.height)))
        }
      }

      p.draw = () => {
        p.background(220)
        for (let boid of boids) {
          boid.flock(boids)
          boid.update()
          boid.show()
        }
      }
    }

    new p5(sketch, ref.current)
  }, [])

  return <div ref={ref} />
}