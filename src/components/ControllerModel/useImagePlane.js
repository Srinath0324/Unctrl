import useVideoPlane from "./useVideoPlane";

// Backward-compatible alias so we can rename without touching logic all over
export default function useImagePlane(args) {
  return useVideoPlane(args);
}


