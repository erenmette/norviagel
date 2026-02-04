'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 500 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.02;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.03;

    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3 + 1] += Math.sin(state.clock.elapsedTime + positions[i3]) * 0.001;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh} geometry={geometry}>
      <pointsMaterial
        size={0.03}
        color="#00A3FF"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function FloatingOrb() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.2;
    mesh.current.rotation.z = state.clock.elapsedTime * 0.15;
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.5, 1]} />
      <meshBasicMaterial
        color="#00A3FF"
        wireframe
        transparent
        opacity={0.15}
      />
    </mesh>
  );
}

export default function ParticleField() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
      >
        <Particles count={400} />
        <FloatingOrb />
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  );
}
