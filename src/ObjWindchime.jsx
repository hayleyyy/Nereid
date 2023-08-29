import { useEffect, useRef, useState, useCallback } from "react";
import { useGLTF } from "@react-three/drei";
import { useSceneContext } from "./SceneProvider";
import { useSpring, a } from "@react-spring/three";

export default function Windchime() {
  const { nodes } = useGLTF("./windchime.glb");
  const windchime = nodes["windchime"];
  const { registerObject } = useSceneContext();
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const [canReset, setCanReset] = useState(true);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  useEffect(() => {
    if (ref.current) {
      registerObject("windchime", ref.current);
    }
  }, [registerObject, ref]);

  const handlePointerOver = useCallback(() => {
    // Prevent wonky animation on hover
    if (canReset) {
      // Clear any previous timeout to prevent interference
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
      setHovered(true);
      setCanReset(false);

      // Set the new timeout and store its ID
      const timeoutId = setTimeout(() => {
        setCanReset(true);
        setHovered(false); // End the hover effect after the timeout
      }, 1500);

      setHoverTimeout(timeoutId);
      console.log("setting hover timeout");
    }
  }, [canReset, hoverTimeout]);

  const handlePointerOut = useCallback(() => {
    setHovered(false);

    // Clear the timeout if the mouse moves out of the mesh
    if (hoverTimeout) {
      console.log("clearing timeout");
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
      setCanReset(true);
    }
  }, [hoverTimeout]);

  // TODO: This animation is not exactly how I'd like, but let's come back to it later.
  // It's been 2 days. Do something else. Anything else. I'm begging you. -_-
  const { rotation } = useSpring({
    from: { rotation: [0, 0, 1] }, // seems like this is only the opening sequence and is never used again
    to: hovered
      ? { rotation: [0, 0, 0.3] } // hover
      : { rotation: [0, 0, 0] }, // sitting position
    config: { mass: 2, tension: 200, friction: 2 },
    reset: hovered && canReset, // Reset animation based on hovered and canReset
  });

  return (
    <a.group>
      <a.primitive
        object={windchime}
        ref={ref}
        rotation={rotation}
        scale={1.5}
        position={[3.4, 4.5, 2.4]}
      />
      <mesh
        position={[3.2, 3.3, 2.4]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <boxGeometry attach="geometry" args={[1.5, 2.2, 0.5]} />
        <meshBasicMaterial attach="material" visible={false} />
      </mesh>
    </a.group>
  );
}
