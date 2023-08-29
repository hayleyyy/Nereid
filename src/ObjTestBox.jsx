import { useRef, useState, useEffect } from "react";
import { Select } from "@react-three/postprocessing";

export default function TestBox() {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  const handlePointerOver = () => setHovered(true);
  const handlePointerOut = () => setHovered(false);
  useEffect(() => {
    if (ref.current) {
      ref.current.traverse((child) => {
        if (child.isMesh) {
          child.layers.set(1);
        }
      });
    }
  }, [ref]);

  return (
    <group ref={ref} position={[0, 0, 6]}>
      <Select enabled={hovered}>
        <mesh onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
          <boxGeometry args={[5, 5, 5]} position={[0, 0, 0]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </Select>
    </group>
  );
}
