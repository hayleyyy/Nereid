// ObjLanterns.jsx

import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useSceneContext } from "./SceneProvider";
import { MeshStandardMaterial } from "three";

export default function Lanterns() {
  const { nodes } = useGLTF("./lanterns.glb");
  const lanterns = nodes["LANTERNS"];
  const { registerObject } = useSceneContext();
  const ref = useRef();

  const emissiveMaterial = new MeshStandardMaterial({
    color: "lemonchiffon",
    emissive: "orange",
    emissiveIntensity: 3,
    toneMapped: false,
  });

  lanterns.traverse((node) => {
    if (node.isMesh) {
      node.material = emissiveMaterial;
    }
  });

  useEffect(() => {
    if (ref.current) {
      registerObject("lanterns", ref.current);
    }
  }, [registerObject, ref]);

  return (
    <>
      <primitive
        object={lanterns}
        position={[-5.8, 1.8, -0.65]}
        scale={1}
        rotation-y={-Math.PI * 0.5}
      />
    </>
  );
}
