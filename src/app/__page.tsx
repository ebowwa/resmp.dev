// app/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { BufferGeometry, BufferAttribute, Mesh } from 'three';

interface Boid {
  position: { x: number; y: number; z: number };
  velocity: { x: number; y: number; z: number };
}

const BoidMesh: React.FC<{ boid: Boid }> = ({ boid }) => {
  const mesh = useRef<Mesh>(null);
  const { scene } = useThree();

  useEffect(() => {
    if (!mesh.current) return;
    scene.add(mesh.current);

    return () => {
      scene.remove(mesh.current);
    };
  }, [mesh, scene]);

  useFrame(() => {
    if (!mesh.current) return;
    mesh.current.position.copy(boid.position);
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[5, 16, 16]} />
      <meshBasicMaterial color="white" />
    </mesh>
  );
};

const Boid: React.FC = () => {
  const [boids, setBoids] = useState<Boid[]>([]);

  useEffect(() => {
    // Initialize boids
    const initialBoids: Boid[] = [];
    for (let i = 0; i < 50; i++) {
      initialBoids.push({
        position: {
          x: Math.random() * 200 - 100,
          y: Math.random() * 200 - 100,
          z: Math.random() * 200 - 100,
        },
        velocity: {
          x: Math.random() * 2 - 1,
          y: Math.random() * 2 - 1,
          z: Math.random() * 2 - 1,
        },
      });
    }
    setBoids(initialBoids);
  }, []);

  return (
    <Canvas camera={{ position: [0, 0, 200] }}>
      <ambientLight />
      <BoidScene boids={boids} setBoids={setBoids} />
    </Canvas>
  );
};

const BoidScene: React.FC<{ boids: Boid[]; setBoids: React.Dispatch<React.SetStateAction<Boid[]>> }> = ({
  boids,
  setBoids,
}) => {
  useFrame((state) => {
    const newBoids = boids.map((boid) => {
      // Apply boid rules
      const newVelocity = {
        x: boid.velocity.x,
        y: boid.velocity.y,
        z: boid.velocity.z,
      };

      // Update position
      const newPosition = {
        x: boid.position.x + newVelocity.x,
        y: boid.position.y + newVelocity.y,
        z: boid.position.z + newVelocity.z,
      };

      // Wrap around the screen
      if (newPosition.x < -100) newPosition.x = 100;
      if (newPosition.x > 100) newPosition.x = -100;
      if (newPosition.y < -100) newPosition.y = 100;
      if (newPosition.y > 100) newPosition.y = -100;
      if (newPosition.z < -100) newPosition.z = 100;
      if (newPosition.z > 100) newPosition.z = -100;

      return {
        position: newPosition,
        velocity: newVelocity,
      };
    });

    setBoids(newBoids);
  });

  return (
    <>
      {boids.map((boid, index) => (
        <BoidMesh key={index} boid={boid} />
      ))}
    </>
  );
};

export default function Home() {
  return (
    <div>
      <h1>My Next.js 14 App</h1>
      <Boid />
    </div>
  );
}