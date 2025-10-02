"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stage } from "@react-three/drei";
import { useState, useEffect } from "react";
import * as THREE from "three";

function Controller() {
  const { scene, nodes } = useGLTF("/models/c3.glb");

  // --- Video Texture ---
  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = "/assets/videos/video1.mp4"; // your video path
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    vid.play().catch(() => {}); // avoid autoplay errors
    return vid;
  });

  const videoTexture = new THREE.VideoTexture(video);
  videoTexture.flipY = false;

  // --- Map video to screen mesh ---
  // Replace 'Object_33' with the actual mesh name of your screen
  const screenMesh = nodes.Object_33;
  if (screenMesh) {
    screenMesh.material = new THREE.MeshBasicMaterial({ map: videoTexture });
  }

  return <primitive object={scene} scale={2} />;
}

export default function ControllerModel() {
  return (
    <Canvas camera={{ position: [0, 1, 3], fov: 45 }} className="w-full h-full">
      {/* Stage gives perfect centering and lighting */}
      <Stage environment="city" intensity={0.8} adjustCamera={true}>
        <Controller />
      </Stage>

      {/* Orbit controls for rotation */}
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
