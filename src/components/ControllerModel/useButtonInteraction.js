import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function useButtonInteraction({ button, gl, camera, changeVideo }) {
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const glowMaterialRef = useRef();
  const isHoveringRef = useRef(false);
  const isFlashingRef = useRef(false);
  const idleAnimIdRef = useRef(null);
  const BASE_INTENSITY = 0.12;
  const HOVER_INTENSITY = 0.35;
  const FLASH_MAX_INTENSITY = 0.6;

  // glow material setup
  useEffect(() => {
    if (!button) return;
    const glowMat = button.material.clone();
    glowMat.emissive = new THREE.Color(0xffffff);
    glowMat.emissiveIntensity = BASE_INTENSITY;
    // Ensure emissive shows clearly regardless of renderer tone mapping
    if (typeof glowMat.toneMapped === "boolean") glowMat.toneMapped = false;
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
        const amp = 0.10; // pulse amplitude
        glowMaterialRef.current.emissiveIntensity = BASE_INTENSITY + Math.abs(Math.sin(t * Math.PI)) * amp;
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
    isFlashingRef.current = true;

    const mat = glowMaterialRef.current;
    // Ensure emissive remains white only
    if (!mat.emissive) mat.emissive = new THREE.Color(0xffffff);
    mat.emissive.set(0xffffff);

    const startTime = performance.now();
    const riseMs = 110; // quick rise to peak
    const decayMs = 420; // smoother decay with a slight pulse
    const peak = FLASH_MAX_INTENSITY; // very bright white peak

    const animate = (now) => {
      const elapsed = now - startTime;
      if (elapsed <= riseMs) {
        // ease-out rise to peak white intensity
        const t = elapsed / riseMs;
        const e = 1 - Math.pow(1 - t, 3); // cubic easeOut
        mat.emissiveIntensity = BASE_INTENSITY + e * (peak - BASE_INTENSITY);
        requestAnimationFrame(animate);
        return;
      }

      const d = elapsed - riseMs;
      if (d <= decayMs) {
        const t = d / decayMs;
        // damped oscillation around target intensity (white only)
        const damp = Math.exp(-4 * t);
        const osc = Math.sin(2 * Math.PI * (1.2 * t));
        const target = isHoveringRef.current ? HOVER_INTENSITY : BASE_INTENSITY;
        const value = target + (peak - target) * damp * (0.6 * osc);
        mat.emissiveIntensity = Math.max(target, value);
        requestAnimationFrame(animate);
        return;
      }

      // settle at the correct state intensity
      mat.emissiveIntensity = isHoveringRef.current ? HOVER_INTENSITY : BASE_INTENSITY;
      isFlashingRef.current = false;
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (!button || !camera || !gl) return;

    const handleDown = (e) => {
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
        if (glowMaterialRef.current && !isFlashingRef.current) glowMaterialRef.current.emissiveIntensity = HOVER_INTENSITY;
        gl.domElement.style.cursor = "pointer";
      } else {
        if (glowMaterialRef.current && !isFlashingRef.current) glowMaterialRef.current.emissiveIntensity = BASE_INTENSITY;
        gl.domElement.style.cursor = "default";
      }
      });
    };

    gl.domElement.addEventListener("pointerdown", handleDown, { passive: true });
    gl.domElement.addEventListener("pointermove", handlePointerMove);

    return () => {
      gl.domElement.removeEventListener("pointerdown", handleDown);
      gl.domElement.removeEventListener("pointermove", handlePointerMove);
      gl.domElement.style.cursor = "default";
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [button, camera, gl]);
}
