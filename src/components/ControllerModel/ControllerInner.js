"use client";

import { useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import useVideoPlane from "./useVideoPlane";
import useButtonInteraction from "./useButtonInteraction";

useGLTF.preload("/models/c3.glb");

export default function ControllerInner() {
  const { scene, nodes } = useGLTF("/models/c3.glb");
  const { gl, camera } = useThree();
  const [videoIndex, setVideoIndex] = useState(1);
  const videoRef = useRef(null);
  const planeRef = useRef(null);

  const changeVideo = () => {
    setVideoIndex((prev) => (prev === 8 ? 1 : prev + 1));
  };

  // setup model scale/pos once
  useEffect(() => {
    if (!scene) return;
    scene.scale.setScalar(0.2);
    scene.position.set(0, 0, 0);
    scene.rotation.set(0, 0, 0);
  }, [scene]);

  // plane & video
  useVideoPlane({ nodes, scene, videoIndex, videoRef, planeRef });

  // button glow + click logic
  useButtonInteraction({
    button: nodes.left_buttons,
    gl,
    camera,
    changeVideo,
  });

  return <primitive object={scene} />;
}
