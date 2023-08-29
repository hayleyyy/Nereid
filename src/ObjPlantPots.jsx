import { useEffect, useRef, useState, useCallback } from "react";
import { useGLTF } from "@react-three/drei";
import { useSceneContext } from "./SceneProvider";
import { useSpring, a } from "@react-spring/three";
import { BoxGeometry, MeshBasicMaterial } from "three";

export default function PlantPots() {
  const { nodes } = useGLTF("./pottedplant.glb");
  const plantPotsModel = nodes["pottedplant"];

  const { registerObject } = useSceneContext();
  const plantPotTop = useRef();
  const plantPotMiddle = useRef();
  const plantPotBottom = useRef();

  const bboxGeometry = new BoxGeometry(0.4, 0.35, 0.3);
  const bboxMaterial = new MeshBasicMaterial({ visible: false });

  const [topScale, setTopScale] = useSpring(() => ({ scale: 1 }));
  const [middleScale, setMiddleScale] = useSpring(() => ({ scale: 1 }));
  const [bottomScale, setBottomScale] = useSpring(() => ({ scale: 1 }));

  useEffect(() => {
    if (
      plantPotTop.current &&
      plantPotMiddle.current &&
      plantPotBottom.current
    ) {
      registerObject("plantPotTop", plantPotTop.current);
      registerObject("plantPotMiddle", plantPotMiddle.current);
      registerObject("plantPotBottom", plantPotBottom.current);
    }
  }, [registerObject]);
  const handlePointerOver = useCallback(
    (id) => {
      console.log("hover " + id);
      if (id === "top") {
        setTopScale({ scale: 1.2 });
      } else if (id === "middle") {
        setMiddleScale({ scale: 1.2 });
      } else if (id === "bottom") {
        setBottomScale({ scale: 1.2 });
      }
    },
    [setTopScale, setMiddleScale, setBottomScale]
  );

  const handlePointerOut = useCallback(() => {
    setTopScale({ scale: 1 });
    setMiddleScale({ scale: 1 });
    setBottomScale({ scale: 1 });
  }, [setTopScale, setMiddleScale, setBottomScale]);

  return (
    <a.group position={[-5.2, -0.76, 1.32]} scale={1.35}>
      <a.group ref={plantPotTop} scale={topScale.scale}>
        <a.primitive object={plantPotsModel.clone()} />
        <a.mesh
          geometry={bboxGeometry}
          material={bboxMaterial}
          position={[0, 0.2, 0]}
          onPointerOver={() => handlePointerOver("top")}
          onPointerOut={handlePointerOut}
        />
      </a.group>

      <a.group
        position={[0, -0.35, 0.49]}
        ref={plantPotMiddle}
        scale={middleScale.scale}
      >
        <a.mesh
          geometry={bboxGeometry}
          material={bboxMaterial}
          position={[0, 0.15, 0]}
          onPointerOver={() => handlePointerOver("middle")}
          onPointerOut={handlePointerOut}
        />
        <a.primitive
          object={plantPotsModel.clone()}
          rotation-y={Math.PI * 0.5}
        />
      </a.group>

      <a.group
        position={[0, -0.7, 0.97]}
        ref={plantPotBottom}
        scale={bottomScale.scale}
      >
        <a.mesh
          geometry={bboxGeometry}
          material={bboxMaterial}
          position={[0, 0.15, 0]}
          onPointerOver={() => handlePointerOver("bottom")}
          onPointerOut={handlePointerOut}
        />

        <a.primitive
          object={plantPotsModel.clone()}
          rotation-y={Math.PI * 1.5}
        />
      </a.group>
    </a.group>
  );
}
