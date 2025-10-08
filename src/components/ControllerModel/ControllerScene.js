"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment, OrbitControls } from "@react-three/drei";
import ControllerInner from "./ControllerInner";

export default function ControllerScene({ animateIn }) {
  return (
    <Canvas camera={{ position: [0, 15, 45], fov: 15 }}>
      <Suspense fallback={null}>
        {/* Lights */}
        <hemisphereLight skyColor={0xffffff} groundColor={0x444444} intensity={2.8} />
        <directionalLight position={[10, 20, 10]} intensity={4.5} />
        <directionalLight position={[-10, 10, -10]} intensity={2.5} color={0xb0d0ff} />
        <ambientLight intensity={50.5} />

        {/* Environment reflections */}
        <Environment preset="city" />

        {/* Optional front fill light */}
        <rectAreaLight
          width={15}
          height={10}
          intensity={6}
          color={0xffffff}
          position={[0, 10, 30]}
          lookAt={[0, 0, 0]}
        />

        {/* Controller model */}
        <group position={[2, -5, 0]} scale={[0.4, 0.4, 0.4]}>
          <ControllerInner animateIn={animateIn} />
        </group>
      </Suspense>

      <OrbitControls enableZoom={false} enablePan enableRotate />
    </Canvas>
  );
}
