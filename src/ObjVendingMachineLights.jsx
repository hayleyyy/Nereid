// ObjVendingMachineLights.jsx
import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useSceneContext } from "./SceneProvider";
import { MeshStandardMaterial } from "three";

export default function VendingMachineLights() {
  const VendingMachineLights = useGLTF("./vendingmachinelights.glb");
  const { registerObject } = useSceneContext();
  const ref = useRef();

  const emissiveMaterial = new MeshStandardMaterial({
    color: "yellow",
    emissive: "yellow",
    emissiveIntensity: 5,
    toneMapped: false,
  });

  VendingMachineLights.scene.traverse((node) => {
    if (node.isMesh) {
      node.material = emissiveMaterial;
    }
  });

  useEffect(() => {
    if (ref.current) {
      registerObject("VendingMachineLights", ref.current);
    }
  }, [registerObject, ref]);

  return (
    <primitive
      object={VendingMachineLights.scene}
      position={[1.9, 0, 0]}
      ref={ref}
    />
  );
}
