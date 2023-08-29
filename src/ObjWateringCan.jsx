// ObjWateringCan.jsx

// TODO: Let's make this baby functional! (see ObjWateringCanDraggable.jsx)

import { useGLTF } from "@react-three/drei";
import { a } from "@react-spring/three";

export default function WateringCan() {
  const { nodes } = useGLTF("./wateringcan.glb");
  const canModel = nodes["wateringcan"];

  return (
    <a.primitive
      object={canModel}
      position={[3.3, -2.15, 4.2]}
      rotation-y={Math.PI * -0.3}
      scale={0.7}
    />
  );
}
