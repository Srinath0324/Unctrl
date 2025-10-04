"use client";

import { Canvas, useThree } from "@react-three/fiber"; // ✅ useThree added
import { OrbitControls, Stage, useGLTF } from "@react-three/drei";
import { useRef, useEffect, useState, useMemo, Suspense } from "react";
import * as THREE from "three";

function ControllerInner({ animateIn }) {
  const { scene, nodes } = useGLTF("/models/c3.glb");
  const { gl, camera } = useThree(); // safe inside Canvas
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());

  const [isGlowing, setIsGlowing] = useState(false);
  const finalScale = 20;

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

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.flipY = false;
    videoTexture.encoding = THREE.sRGBEncoding;

    nodes.Object_55.material = new THREE.MeshBasicMaterial({ map: videoTexture });
  }, [nodes.Object_55]);

  // Scale & rotation
  useEffect(() => {
    if (!scene) return;
    scene.scale.setScalar(finalScale);
    scene.position.set(0, 0, 0);
    scene.rotation.set(0, 0, 0);
  }, [scene]);

  const button = nodes["left_buttons"];
  const glowMaterial = useMemo(() => {
    if (!button) return null;
    return new THREE.MeshStandardMaterial({
      color: button.material?.color || new THREE.Color(0xffffff),
      emissive: new THREE.Color(0xff0000),
      emissiveIntensity: 0,
      roughness: 0.5,
      metalness: 0.5,
    });
  }, [button]);

  useEffect(() => {
    if (!button || !glowMaterial) return;

    const handleClick = (event) => {
      const bounds = gl.domElement.getBoundingClientRect();
      mouse.current.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      mouse.current.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, camera);
      const intersects = raycaster.current.intersectObject(button, true);
      if (intersects.length > 0) {
        setIsGlowing((prev) => !prev);
        glowMaterial.emissiveIntensity = !isGlowing ? 2 : 0;
        button.material = glowMaterial;
      }
    };

    gl.domElement.addEventListener("click", handleClick);
    return () => gl.domElement.removeEventListener("click", handleClick);
  }, [gl, camera, button, glowMaterial, isGlowing]);

  return <primitive object={scene} />;
}

export default function ControllerModel({ animateIn }) {
  const controlsRef = useRef();

  return (
    <Canvas camera={{ position: [0, 2, 10], fov: 55 }} className="w-full h-full">
      <Suspense fallback={null}>
        <Stage environment="city" intensity={1} adjustCamera shadows={false}>
          <ControllerInner animateIn={animateIn} />
        </Stage>
      </Suspense>
      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
      />
    </Canvas>
  );
}
