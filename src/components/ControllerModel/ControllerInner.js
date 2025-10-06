"use client";

import { useRef, useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/models/c3.glb");

export default function ControllerInner({ animateIn }) {
  const { scene, nodes } = useGLTF("/models/c3.glb");
  const { gl, camera } = useThree();

  const finalScale = 0.2;
  const button = nodes.left_buttons;

  // ----------------------------
  // 🧩 Refs & State
  // ----------------------------
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const glowMaterialRef = useRef();
  const videoRef = useRef(null);
  const planeRef = useRef(null);
  const [videoIndex, setVideoIndex] = useState(1);

  // ----------------------------
  // 🎥 Setup plane & video texture (once)
  // ----------------------------
  useEffect(() => {
    const mesh = nodes.Object_55;
    if (!mesh || !scene) return;

    // ✅ Create <video> element (only once)
    const video = document.createElement("video");
    video.crossOrigin = "Anonymous";
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.src = `/assets/videos/${videoIndex}.mp4`;
    video.play().catch(() => {});
    videoRef.current = video;

    // ✅ Create a video texture
    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.flipY = true;
    videoTexture.encoding = THREE.LinearEncoding;

    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.generateMipmaps = false;

    // ✅ Compute bounding box of mesh
    const box = new THREE.Box3().setFromObject(mesh);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    // ✅ Plane size with aspect ratio
    const aspect = 16 / 9;
    const maxWidth = size.x * 0.9;
    const maxHeight = size.y * 0.9;

    let planeWidth = maxWidth;
    let planeHeight = planeWidth / aspect;
    if (planeHeight > maxHeight) {
      planeHeight = maxHeight;
      planeWidth = planeHeight * aspect;
    }

    // ✅ Create plane material (unaffected by lights)
    const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
    const material = new THREE.MeshBasicMaterial({
      map: videoTexture,
      side: THREE.DoubleSide,
      toneMapped: false,
    });

    const plane = new THREE.Mesh(geometry, material);
    planeRef.current = plane;

    // ✅ Position plane
    plane.position.copy(center);
    plane.position.y -= size.y * 0.72;
    plane.position.z -= size.z * 1.1;
    plane.rotation.set(-Math.PI / 2, 0, 0);

    mesh.parent.add(plane);

    // ✅ Cleanup
    return () => {
      plane.removeFromParent();
      geometry.dispose();
      material.dispose();
      video.pause();
      video.src = "";
    };
  }, [nodes.Object_55, scene]);

  // ----------------------------
  // 🔄 Switch video when index changes
  // ----------------------------
  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    video.pause();
    video.src = `/assets/videos/${videoIndex}.mp4`;
    video.load();

    video.onloadedmetadata = () => {
      video.play().catch(() => {});
    };
  }, [videoIndex]);

  // ----------------------------
  // 🌐 Model Transform
  // ----------------------------
  useEffect(() => {
    if (!scene) return;
    scene.scale.setScalar(finalScale);
    scene.position.set(0, 0, 0);
    scene.rotation.set(0, 0, 0);
  }, [scene]);

  // ----------------------------
  // ✨ Glow Effect for Button
  // ----------------------------
  useEffect(() => {
    if (!button) return;
    const originalMat = button.material;
    const glowMat = originalMat.clone();
    glowMat.emissive = new THREE.Color(0xffffff);
    glowMat.emissiveIntensity = 0;
    button.material = glowMat;
    glowMaterialRef.current = glowMat;
  }, [button]);

  const flashButton = () => {
    if (!glowMaterialRef.current) return;

    let start = null;
    const duration = 500;
    const maxIntensity = 0.5;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const t = Math.min(elapsed / duration, 1);
      glowMaterialRef.current.emissiveIntensity =
        Math.sin(t * Math.PI) * maxIntensity;

      if (t < 1) requestAnimationFrame(animate);
      else glowMaterialRef.current.emissiveIntensity = 0;
    };

    requestAnimationFrame(animate);
  };

  // ----------------------------
  // 🔘 Change video on click
  // ----------------------------
  const changeVideo = () => {
    setVideoIndex((prev) => {
      const next = prev === 8 ? 1 : prev + 1;
      console.log(`Switched to video ${next}`);
      return next;
    });
  };

  // ----------------------------
  // 🖱️ Click + Hover Interactions
  // ----------------------------
  useEffect(() => {
    if (!button || !camera) return;

    const handleClick = (event) => {
      const bounds = gl.domElement.getBoundingClientRect();
      mouse.current.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      mouse.current.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, camera);
      const intersects = raycaster.current.intersectObject(button, true);
      if (intersects.length > 0) {
        flashButton();
        changeVideo(); // ✅ switch video on click
      }
    };

    gl.domElement.addEventListener("click", handleClick);
    return () => gl.domElement.removeEventListener("click", handleClick);
  }, [button, camera, gl]);

  useEffect(() => {
    if (!button || !camera) return;

    const handlePointerMove = (event) => {
      const bounds = gl.domElement.getBoundingClientRect();
      mouse.current.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      mouse.current.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, camera);
      const intersects = raycaster.current.intersectObject(button, true);
      gl.domElement.style.cursor =
        intersects.length > 0 ? "pointer" : "default";
    };

    gl.domElement.addEventListener("pointermove", handlePointerMove);
    return () =>
      gl.domElement.removeEventListener("pointermove", handlePointerMove);
  }, [button, camera, gl]);

  // ----------------------------
  // 🧩 Render
  // ----------------------------
  return <primitive object={scene} />;
}
