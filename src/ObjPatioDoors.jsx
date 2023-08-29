// ObjPatioDoors.jsx

import { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useSceneContext } from "./SceneProvider";
import { useSpring, a } from "@react-spring/three";
import { Select } from "@react-three/postprocessing";

export default function PatioDoors() {
  const { registerObject, handleObjectClick } = useSceneContext();
  const patioDoorModel = useGLTF("./patiodoor.glb");
  const leftDoorRef = useRef();
  const rightDoorRef = useRef();
  const [hovered, setHovered] = useState(false);

  const [springProps, set] = useSpring(() => ({
    leftPosition: 0,
    rightPosition: -2.1,
    config: { mass: 1, tension: 170, friction: 26 },
  }));

  const handlePointerOver = () => {
    set({ leftPosition: 0.5, rightPosition: -2.6 });
    setHovered(true);
  };

  const handlePointerOut = () => {
    set({ leftPosition: 0, rightPosition: -2.1 });
    setHovered(false);
  };

  useEffect(() => {
    if (leftDoorRef.current && rightDoorRef.current) {
      registerObject("patioDoorLeft", leftDoorRef.current);
      registerObject("patioDoorRight", rightDoorRef.current);
    }
  }, [registerObject]);

  return (
    <group
      scale={1}
      position={[-0.4, 2.5, 2.1]}
      rotation-y={-0.5 * Math.PI}
      onPointerDown={() => handleObjectClick("TopFloor")}
    >
      <Select enabled={hovered}>
        <a.primitive
          ref={leftDoorRef}
          object={patioDoorModel.scene.clone()}
          position-z={springProps.leftPosition}
        />
        <a.primitive
          ref={rightDoorRef}
          object={patioDoorModel.scene.clone()}
          position-z={springProps.rightPosition}
        />
        {/* Invisible bounding box */}
        <mesh
          position={[0, 0, -1.05]}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <boxGeometry attach="geometry" args={[1, 3, 3.9]} />
          <meshBasicMaterial attach="material" visible={false} />
        </mesh>
      </Select>
    </group>
  );
}
