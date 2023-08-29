import { useEffect, useCallback } from "react";
import { useGLTF } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import { BoxGeometry, MeshBasicMaterial, Mesh } from "three";
import { useMemo } from "react";

export default function FlowerBeds() {
  const TulipModelOne = useGLTF("./tulip1.glb");
  const TulipModelTwo = useGLTF("./tulip2.glb"); // possibly use later
  const numberOfFlowers = 30;

  const bboxGeometry = new BoxGeometry(0.8, 0.3, 0.15);
  const bboxMaterial = new MeshBasicMaterial({ visible: false });

  // TODO: Let's build some plant watering functionality later
  useEffect(() => {}, []);
  const handlePointerOver = useCallback(() => {}, []);
  const handlePointerOut = useCallback(() => {}, []);

  function generateFlowers(numberOfFlowers, xRange, yRange, zRange) {
    const flowers = [];

    for (let i = 0; i < numberOfFlowers; i++) {
      const x = Math.random() * xRange - xRange / 2;
      const y = Math.random() * yRange;
      const z = Math.random() * zRange - zRange / 2;
      const scale = 1 + Math.random() * 0.3;
      const rotation = Math.random() * Math.PI * 2;

      flowers.push(
        <a.primitive
          key={i}
          object={TulipModelOne.scene.clone()}
          position={[x, y, z]}
          scale={scale}
          rotation-y={rotation}
        />
      );
    }

    return flowers;
  }

  const flowersBed1 = useMemo(
    () => generateFlowers(numberOfFlowers, 1.1, 0.15, 0.15),
    []
  );
  const flowersBed2 = useMemo(
    () => generateFlowers(numberOfFlowers, 0.9, 0.15, 0.15),
    []
  );
  const flowersBed3 = useMemo(
    () => generateFlowers(numberOfFlowers, 0.9, 0.15, 0.15),
    []
  );

  return (
    <a.group position={[1.24, -1.95, 4.5]}>
      {/* // flower bed 1 */}
      <a.group>
        {flowersBed1}
        <a.mesh
          geometry={bboxGeometry}
          material={bboxMaterial}
          position={[0, 0.2, 0]}
        />
      </a.group>

      {/* // flower bed 2 */}
      <a.group position={[1.3, -0.05, -0.47]} rotation-y={0.79}>
        <a.mesh
          geometry={bboxGeometry}
          material={bboxMaterial}
          position={[0, 0.2, 0]}
        />
        {flowersBed2}
      </a.group>

      {/* // flower bed 3 */}
      <a.group position={[-1.32, -0.05, -0.47]} rotation-y={-0.79}>
        <a.mesh
          geometry={bboxGeometry}
          material={bboxMaterial}
          position={[0, 0.2, 0]}
        />
        {flowersBed3}
      </a.group>
    </a.group>
  );
}
