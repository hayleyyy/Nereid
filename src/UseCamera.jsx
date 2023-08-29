// useCamera.js
import { useThree } from "@react-three/fiber";

export const useCamera = () => {
  const { camera } = useThree();
  return camera;
};
