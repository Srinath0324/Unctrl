import { useEffect } from "react";
import * as THREE from "three";

export default function useVideoPlane({ nodes, scene, videoIndex, videoRef, planeRef }) {
  useEffect(() => {
    if (!nodes?.Object_55 || !scene) return;

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

    // initial image texture load
    const loader = new THREE.TextureLoader();
    const tryLoadInOrder = (paths, onSuccess, onFail) => {
      let index = 0;
      const attempt = () => {
        if (index >= paths.length) {
          onFail && onFail();
          return;
        }
        const path = paths[index++];
        loader.load(
          path,
          (tex) => onSuccess(tex),
          undefined,
          () => attempt()
        );
      };
      attempt();
    };

    const buildPaths = (idx) => [
      `/assets/usps/${idx}.png`,
      `/assets/usps/${idx}.jpg`,
      `/assets/usps/${idx}.jpeg`,
      `/assets/usps/${idx}.webp`,
    ];

    tryLoadInOrder(buildPaths(videoIndex), (texture) => {
      texture.flipY = true;
      texture.encoding = THREE.LinearSRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
      material.map = texture;
      material.needsUpdate = true;
    });

    return () => {
      if (material.map) {
        material.map.dispose();
      }
      plane.removeFromParent();
      geometry.dispose();
      material.dispose();
    };
  }, [nodes?.Object_55, scene]);

  // image change (without re-creating plane)
  useEffect(() => {
    if (!planeRef.current) return;
    const material = planeRef.current.material;
    const loader = new THREE.TextureLoader();

    const tryLoadInOrder = (paths, onSuccess, onFail) => {
      let index = 0;
      const attempt = () => {
        if (index >= paths.length) {
          onFail && onFail();
          return;
        }
        const path = paths[index++];
        loader.load(
          path,
          (tex) => onSuccess(tex),
          undefined,
          () => attempt()
        );
      };
      attempt();
    };

    const buildPaths = (idx) => [
      `/assets/usps/${idx}.png`,
      `/assets/usps/${idx}.jpg`,
      `/assets/usps/${idx}.jpeg`,
      `/assets/usps/${idx}.webp`,
    ];

    const oldMap = material.map;
    tryLoadInOrder(buildPaths(videoIndex), (texture) => {
      texture.flipY = true;
      texture.encoding = THREE.LinearSRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
      material.map = texture;
      material.needsUpdate = true;
      if (oldMap) oldMap.dispose();
    });
  }, [videoIndex]);
}
