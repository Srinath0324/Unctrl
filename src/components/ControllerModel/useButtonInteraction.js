import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function useButtonInteraction({ button, gl, camera, changeVideo }) {
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const glowMaterialRef = useRef();
  const isHoveringRef = useRef(false);
  const isFlashingRef = useRef(false);
  const idleAnimIdRef = useRef(null);

  // glow material setup
  useEffect(() => {
    if (!button) return;
    const glowMat = button.material.clone();
    glowMat.emissive = new THREE.Color(0xffffff);
    glowMat.emissiveIntensity = 0;
    button.material = glowMat;
    glowMaterialRef.current = glowMat;

    // Start idle pulsing glow to hint interactivity
    let start = null;
    const idleDuration = 2000; // ms
    const animateIdle = (timestamp) => {
      if (!glowMaterialRef.current) return;
      if (start === null) start = timestamp;
      const t = (timestamp - start) / idleDuration;
      // Only pulse when not hovering and not flashing
      if (!isHoveringRef.current && !isFlashingRef.current) {
        const base = 0.12; // baseline subtle glow
        const amp = 0.10; // pulse amplitude
        glowMaterialRef.current.emissiveIntensity = base + Math.abs(Math.sin(t * Math.PI)) * amp;
      }
      idleAnimIdRef.current = requestAnimationFrame(animateIdle);
    };
    idleAnimIdRef.current = requestAnimationFrame(animateIdle);

    return () => {
      if (idleAnimIdRef.current) cancelAnimationFrame(idleAnimIdRef.current);
    };
  }, [button]);

  const flashButton = () => {
    if (!glowMaterialRef.current) return;
    let start = null;
    const duration = 500;
    const maxIntensity = 0.5;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const t = Math.min((timestamp - start) / duration, 1);
      isFlashingRef.current = true;
      glowMaterialRef.current.emissiveIntensity = Math.sin(t * Math.PI) * maxIntensity;
      if (t < 1) requestAnimationFrame(animate);
      else {
        glowMaterialRef.current.emissiveIntensity = 0;
        isFlashingRef.current = false;
      }
    };
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (!button || !camera || !gl) return;

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

    let rafId = null;
    const handlePointerMove = (e) => {
      if (rafId) return; // throttle to one rAF
      rafId = requestAnimationFrame(() => {
        rafId = null;
      const bounds = gl.domElement.getBoundingClientRect();
      mouse.current.x = ((e.clientX - bounds.left) / bounds.width) * 2 - 1;
      mouse.current.y = -((e.clientY - bounds.top) / bounds.height) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, camera);
      const hovering = raycaster.current.intersectObject(button, true).length > 0;
      isHoveringRef.current = hovering;
      if (hovering) {
        if (glowMaterialRef.current) glowMaterialRef.current.emissiveIntensity = 0.35;
        gl.domElement.style.cursor = "pointer";
      } else {
        gl.domElement.style.cursor = "default";
      }
      });
    };

    gl.domElement.addEventListener("click", handleClick);
    gl.domElement.addEventListener("pointermove", handlePointerMove);

    return () => {
      gl.domElement.removeEventListener("click", handleClick);
      gl.domElement.removeEventListener("pointermove", handlePointerMove);
      gl.domElement.style.cursor = "default";
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [button, camera, gl]);
}
