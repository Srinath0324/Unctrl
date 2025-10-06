import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function useButtonInteraction({ button, gl, camera, changeVideo }) {
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const glowMaterialRef = useRef();

  // glow material setup
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

    const handlePointerMove = (e) => {
      const bounds = gl.domElement.getBoundingClientRect();
      mouse.current.x = ((e.clientX - bounds.left) / bounds.width) * 2 - 1;
      mouse.current.y = -((e.clientY - bounds.top) / bounds.height) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, camera);
      const hovering = raycaster.current.intersectObject(button, true).length > 0;
      if (hovering) gl.domElement.classList.add("fuck-button");
      else gl.domElement.classList.remove("fuck-button");
    };

    gl.domElement.addEventListener("click", handleClick);
    gl.domElement.addEventListener("pointermove", handlePointerMove);

    return () => {
      gl.domElement.removeEventListener("click", handleClick);
      gl.domElement.removeEventListener("pointermove", handlePointerMove);
      gl.domElement.classList.remove("fuck-button");
    };
  }, [button, camera, gl]);
}
