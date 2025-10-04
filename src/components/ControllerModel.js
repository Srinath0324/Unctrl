"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF } from "@react-three/drei";
import { useRef, useEffect, useState, Suspense } from "react";
import { Color, MeshStandardMaterial, Raycaster, Vector2, VideoTexture } from "three";

function ControllerInner({ animateIn }) {
  const { scene, nodes } = useGLTF("/models/c3.glb");
  const { gl, camera } = useThree();
  const raycaster = useRef(new Raycaster());
  const mouse = useRef(new Vector2());

  const finalScale = 0.2;
  const button = nodes["left_buttons"];

  // Video texture
  useEffect(() => {
    if (!nodes.Object_55) return;

    const video = document.createElement("video");
    video.src = "/assets/videos/intro.mp4";
    video.crossOrigin = "Anonymous";
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.play().catch(() => {});

    const videoTexture = new VideoTexture(video);
    videoTexture.flipY = false;
    videoTexture.encoding = 3001;

    nodes.Object_55.material = new MeshStandardMaterial({ map: videoTexture });
  }, [nodes.Object_55]);

  // Scale & rotation
  useEffect(() => {
    if (!scene) return;
    scene.scale.setScalar(finalScale);
    scene.position.set(0, 0, 0);
    scene.rotation.set(0, 0, 0);
  }, [scene]);

  // Prepare glow material for the button
  const glowMaterialRef = useRef();
  useEffect(() => {
    if (!button) return;

    const originalMat = button.material;
    const glowMat = originalMat.clone();
    glowMat.emissive = new Color(0xffffff); // white glow
    glowMat.emissiveIntensity = 0; // start off
    button.material = glowMat;
    glowMaterialRef.current = glowMat;
  }, [button]);

  // Function to flash the button
  const flashButton = () => {
    if (!glowMaterialRef.current) return;

    let start = null;
    const duration = 500; // 0.5s
    const maxIntensity = 0.5;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;

      // fade in and fade out using sine wave for smoothness
      const t = Math.min(elapsed / duration, 1);
      glowMaterialRef.current.emissiveIntensity = Math.sin(t * Math.PI) * maxIntensity;

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        glowMaterialRef.current.emissiveIntensity = 0; // ensure reset
      }
    };
    requestAnimationFrame(animate);
  };

  // Click handler → triggers flash
  useEffect(() => {
    if (!button) return;

    const handleClick = (event) => {
      const bounds = gl.domElement.getBoundingClientRect();
      mouse.current.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      mouse.current.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, camera);
      const intersects = raycaster.current.intersectObject(button, true);
      if (intersects.length > 0) {
        flashButton();
      }
    };

    gl.domElement.addEventListener("click", handleClick);
    return () => gl.domElement.removeEventListener("click", handleClick);
  }, [gl, camera, button]);

  // Pointer hover → cursor change
  useEffect(() => {
    if (!button) return;

    const handlePointerMove = (event) => {
      const bounds = gl.domElement.getBoundingClientRect();
      mouse.current.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      mouse.current.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, camera);
      const intersects = raycaster.current.intersectObject(button, true);
      gl.domElement.style.cursor = intersects.length > 0 ? "pointer" : "default";
    };

    gl.domElement.addEventListener("pointermove", handlePointerMove);
    return () => gl.domElement.removeEventListener("pointermove", handlePointerMove);
  }, [gl, camera, button]);

  return <primitive object={scene} />;
}

export default function ControllerModel({ animateIn }) {
  const controlsRef = useRef();

  return (
    <Canvas camera={{ position: [0, 3, 35], fov: 55 }} className="w-full h-full">
      <Suspense fallback={null}>
        <Stage
          environment="city"
          intensity={1}
          adjustCamera={false}
          shadows={false}
        >
          <ControllerInner animateIn={animateIn} />
        </Stage>
      </Suspense>
      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={true}
        enableRotate={true}
      />
    </Canvas>
  );
}
