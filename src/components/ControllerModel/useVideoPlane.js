import { useEffect } from "react";
import * as THREE from "three";

export default function useVideoPlane({ nodes, scene, videoIndex, videoRef, planeRef }) {
  useEffect(() => {
    if (!nodes?.Object_55 || !scene) return;

    // create video element
    const video = document.createElement("video");
    video.crossOrigin = "Anonymous";
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.src = `/assets/videos/${videoIndex}.mp4`;
    video.play().catch(() => {});
    videoRef.current = video;

    // video texture
    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.flipY = true;
    videoTexture.encoding = THREE.LinearSRGBColorSpace;
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
  }, [nodes?.Object_55, scene]);

  // video change (without re-creating plane)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.src = `/assets/videos/${videoIndex}.mp4`;
    video.load();
    video.onloadedmetadata = () => video.play().catch(() => {});
  }, [videoIndex]);
}
