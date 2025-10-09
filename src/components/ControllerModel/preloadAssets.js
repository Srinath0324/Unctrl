// Lightweight preloader to warm critical 3D assets without blocking render
// - Preloads the GLB via drei's useGLTF.preload
// - Warms the ControllerScene chunk
// - Preloads first USPS images to speed up first swaps

export async function preloadControllerAssets() {
  try {
    const [{ useGLTF }, _scene] = await Promise.all([
      import("@react-three/drei"),
      // warm the ControllerScene module chunk
      import("./ControllerScene").catch(() => null),
    ]);

    // Preload the GLB
    try {
      useGLTF.preload("/models/c3.glb");
    } catch {}

    // Preload first couple of USPS images
    const paths = [
      "/assets/usps/1.webp",
      "/assets/usps/2.webp",
      "/assets/usps/3.webp",
    ];
    paths.forEach((src) => {
      const img = new Image();
      img.decoding = "async";
      img.loading = "eager";
      img.src = src;
    });
  } catch {}
}


