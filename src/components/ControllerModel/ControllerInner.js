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

  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const glowMaterialRef = useRef();
  const videoRef = useRef(null);
  const planeRef = useRef(null);
  const [videoIndex, setVideoIndex] = useState(1);

  // ----------------------------
  // Setup plane & video
  // ----------------------------
  useEffect(() => {
    if (!nodes.Object_55 || !scene) return;

    const video = document.createElement("video");
    video.crossOrigin = "Anonymous";
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.src = `/assets/videos/${videoIndex}.mp4`;
    video.play().catch(() => {});
    videoRef.current = video;

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.flipY = true;
    videoTexture.encoding = THREE.LinearSRGBColorSpace; // ✅ Updated
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.generateMipmaps = false;

    const mesh = nodes.Object_55;
    const box = new THREE.Box3().setFromObject(mesh);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    const aspect = 16 / 9;
    let planeWidth = size.x * 0.9;
    let planeHeight = planeWidth / aspect;
    if (planeHeight > size.y * 0.9) {
      planeHeight = size.y * 0.9;
      planeWidth = planeHeight * aspect;
    }

    const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
    const material = new THREE.MeshBasicMaterial({
      map: videoTexture,
      side: THREE.DoubleSide,
      toneMapped: false,
    });

    const plane = new THREE.Mesh(geometry, material);
    plane.position.copy(center);
    plane.position.y -= size.y * 0.72;
    plane.position.z -= size.z * 1.1;
    plane.rotation.set(-Math.PI / 2, 0, 0);

    planeRef.current = plane;
    mesh.parent.add(plane);

    return () => {
      plane.removeFromParent();
      geometry.dispose();
      material.dispose();
      video.pause();
      video.src = "";
    };
  }, [nodes.Object_55, scene]);

  // ----------------------------
  // Switch video
  // ----------------------------
  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    video.pause();
    video.src = `/assets/videos/${videoIndex}.mp4`;
    video.load();
    video.onloadedmetadata = () => video.play().catch(() => {});
  }, [videoIndex]);

  // ----------------------------
  // Model Transform
  // ----------------------------
  useEffect(() => {
    if (!scene) return;
    scene.scale.setScalar(finalScale);
    scene.position.set(0, 0, 0);
    scene.rotation.set(0, 0, 0);
  }, [scene]);

  // ----------------------------
  // Glow Button
  // ----------------------------
  useEffect(() => {
    if (!button) return;
    const glowMat = button.material.clone();
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
      const t = Math.min((timestamp - start) / duration, 1);
      glowMaterialRef.current.emissiveIntensity = Math.sin(t * Math.PI) * maxIntensity;
      if (t < 1) requestAnimationFrame(animate);
      else glowMaterialRef.current.emissiveIntensity = 0;
    };
    requestAnimationFrame(animate);
  };

  // ----------------------------
  // Change video
  // ----------------------------
  const changeVideo = () => setVideoIndex((prev) => (prev === 8 ? 1 : prev + 1));

  // ----------------------------
  // Click + Hover
  // ----------------------------
useEffect(() => {
  if (!button || !camera) return;

  const handleClick = (e) => {
    const bounds = gl.domElement.getBoundingClientRect();
    mouse.current.x = ((e.clientX - bounds.left) / bounds.width) * 2 - 1;
    mouse.current.y = -((e.clientY - bounds.top) / bounds.height) * 2 + 1;

    raycaster.current.setFromCamera(mouse.current, camera);
    if (raycaster.current.intersectObject(button, true).length > 0) {
      flashButton();
      changeVideo();
    }
  };

  const handlePointerMove = (e) => {
    const bounds = gl.domElement.getBoundingClientRect();
    mouse.current.x = ((e.clientX - bounds.left) / bounds.width) * 2 - 1;
    mouse.current.y = -((e.clientY - bounds.top) / bounds.height) * 2 + 1;

    raycaster.current.setFromCamera(mouse.current, camera);
    const hovering = raycaster.current.intersectObject(button, true).length > 0;

    if (hovering) {
      gl.domElement.classList.add("fuck-button"); // ✅ add custom class
    } else {
      gl.domElement.classList.remove("fuck-button"); // ✅ remove it when not hovering
    }
  };

  gl.domElement.addEventListener("click", handleClick);
  gl.domElement.addEventListener("pointermove", handlePointerMove);

  return () => {
    gl.domElement.removeEventListener("click", handleClick);
    gl.domElement.removeEventListener("pointermove", handlePointerMove);
    gl.domElement.classList.remove("fuck-button"); // cleanup
  };
}, [button, camera, gl]);


  return <primitive object={scene} />;
}
