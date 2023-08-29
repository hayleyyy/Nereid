// ObjMoon.jsx
import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useSceneContext } from "./SceneProvider";
import { MeshStandardMaterial } from "three";

export default function Moon() {
  const { nodes } = useGLTF("./moon.glb");
  const moon = nodes["neon_sign_moon"];
  const { registerObject } = useSceneContext();
  const ref = useRef();

  const emissiveMaterial = new MeshStandardMaterial({
    color: "lemonchiffon",
    emissive: "orange",
    emissiveIntensity: 3,
    toneMapped: false,
  });

  moon.traverse((node) => {
    if (node.isMesh) {
      node.material = emissiveMaterial;
    }
  });

  useEffect(() => {
    if (ref.current) {
      registerObject("moon", ref.current);
    }
  }, [registerObject, ref]);

  return (
    <primitive object={moon} ref={ref} position={[4.55, 0.6, 3]} scale={0.15} />
  );
}
