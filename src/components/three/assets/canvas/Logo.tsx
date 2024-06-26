import { FC, useState, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useCursor, Line } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface LogoProps {
    route?: string;
    [key: string]: any;
}

export const Logo: FC<LogoProps> = ({ route = '/blob', ...props }) => {
    const mesh = useRef(null);
    const router = useRouter();
    const [hovered, hover] = useState(false);
    const points = useMemo(() => new THREE.EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(100), []);

    useCursor(hovered);
    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime();
        mesh.current.rotation.y = Math.sin(t) * (Math.PI / 8);
        mesh.current.rotation.x = Math.cos(t) * (Math.PI / 8);
        mesh.current.rotation.z -= delta / 4;
    });

    return (
        <group ref={mesh} {...props}>
            <Line worldUnits points={points} color="#1fb2f5" lineWidth={0.15} />
            <Line worldUnits points={points} color="#1fb2f5" lineWidth={0.15} rotation={[0, 0, 1]} />
            <Line worldUnits points={points} color="#1fb2f5" lineWidth={0.15} rotation={[0, 0, -1]} />
            <mesh
                onClick={() => router.push(route)}
                onPointerOver={() => hover(true)}
                onPointerOut={() => hover(false)}
            >
                <sphereGeometry args={[0.55, 64, 64]} />
                <meshPhysicalMaterial roughness={0.5} color={hovered ? 'hotpink' : '#1fb2f5'} />
            </mesh>
        </group>
    );
};