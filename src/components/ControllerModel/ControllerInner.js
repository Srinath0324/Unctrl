"use client";

import { useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import useImagePlane from "./useImagePlane";
import useButtonInteraction from "./useButtonInteraction";

useGLTF.preload("/models/c3.glb");
// Preload a couple of USPS textures during idle time to reduce first swap delay
if (typeof window !== "undefined") {
  requestIdleCallback?.(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = "/assets/usps/1.webp";
    document.head.appendChild(link);
    const link2 = document.createElement("link");
    link2.rel = "preload";
    link2.as = "image";
    link2.href = "/assets/usps/2.webp";
    document.head.appendChild(link2);
  });
}

export default function ControllerInner() {
  const { scene, nodes } = useGLTF("/models/c3.glb");
  const { gl, camera, invalidate } = useThree();
  const [videoIndex, setVideoIndex] = useState(1);
  const videoRef = useRef(null);
  const planeRef = useRef(null);

  const changeVideo = () => {
    setVideoIndex((prev) => (prev >= 5 ? 1 : prev + 1));
  };

  // setup model scale/pos once
  useEffect(() => {
    if (!scene) return;
    scene.scale.setScalar(0.2);
    scene.position.set(0, 0, 0);
    scene.rotation.set(0, 0, 0);
  }, [scene]);

  // plane & video
  useImagePlane({ nodes, scene, videoIndex, videoRef, planeRef, invalidate });

  // button glow + click logic
  useButtonInteraction({
    button: nodes.left_buttons,
    gl,
    camera,
    changeVideo,
  });

  return <primitive object={scene} />;
}
