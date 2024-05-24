// app/test/ClientComponent.tsx
"use client";

import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import { Vector, Flock, Boid } from './script';

export default function ClientComponent() {
  const containerRef = useRef<HTMLDivElement>(null);
  let flock: Flock;

  useEffect(() => {
    if (containerRef.current) {
      const sketch = (p5: p5) => {
        p5.setup = () => {
          const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
          canvas.position(0, 0);
          canvas.style('z-index', '-1');
          p5.background('#fff');

          flock = new Flock(p5);
          // Add an initial set of boids into the system
          for (let i = 0; i < 70; i++) {
            let b: Boid | null = null;
            if (i < 35) {
              b = new Boid(p5.width / 2, p5.height / 2, p5);
            } else {
              b = new Boid(p5.random(p5.width), p5.random(p5.height), p5);
            }
            if (b) {
              flock.addBoid(b);
            }
          }
        };

        p5.draw = () => {
          p5.background('#fff');
          flock.run(p5);
        };

        p5.windowResized = () => {
          p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
          p5.background('#fff');
        };

        p5.mouseDragged = () => {
          if (flock.boids.length <= 250) {
            flock.addBoid(new Boid(p5.mouseX, p5.mouseY, p5));
          }
        };
      };

      const p5Instance = new p5(sketch, containerRef.current);

      // Return a cleanup function to dispose of the P5.js instance
      return () => p5Instance.remove();
    }
  }, []);

  return (
    <div ref={containerRef} className="w-screen h-screen" />
  );
}