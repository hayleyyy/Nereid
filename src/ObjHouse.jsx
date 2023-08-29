// ObjHouse.jsx

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function House() {
  const house = useGLTF("./house-basic.glb");
  const houseRef = useRef();

  return (
    <>
      <RigidBody type="fixed" colliders="trimesh">
        <primitive
          object={house.scene}
          position={[-0.17, -3.59, 3.88]} // x+z centered using centering calc to determine, input manually.
          rotation-y={-Math.PI * 0.5}
          scale={1}
          ref={houseRef}
        />
      </RigidBody>
    </>
  );
}
