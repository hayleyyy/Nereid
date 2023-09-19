import { useGLTF } from "@react-three/drei";
import { a } from "@react-spring/three";
import { RigidBody, CylinderCollider } from "@react-three/rapier";
import { useDrag } from "@use-gesture/react";
import { useThree } from "@react-three/fiber";
import { useState } from "react";
import { useCameraContext } from "./CameraProvider";
import { Vector3 } from "three";

// TODO: HEAVILY under construction and very wonky. Leaving this aside for now.

export default function WateringCan() {
  const { camera, viewport } = useThree();
  const { disableControls, enableControls } = useCameraContext();
  const { nodes } = useGLTF("./wateringcan.glb");
  const canModel = nodes["wateringcan"];
  const [position, setPosition] = useState([-0.4, -0.9, 5.2]);
  const [initialPosition, setInitialPosition] = useState([-0.4, -0.9, 5.2]);

  const bind = useDrag(({ offset: [x, y], first, last }) => {
    if (first) {
      console.log("first");
      console.log(initialPosition);
      disableControls();
    }

    // Convert the X and Y mouse movement to a factor relative to viewport size
    const xFactor = (x / viewport.width) * 0.3 - 1;
    const yFactor = -(y / viewport.height) * 0.3 - 1;

    // Get the right and up directions of the camera
    const right = new Vector3(1, 0, 0).applyEuler(camera.rotation);
    const up = new Vector3(0, 1, 0).applyEuler(camera.rotation);

    // Calculate the new position based on those directions and the mouse movement
    const newPosition = new Vector3(...initialPosition)
      .add(right.multiplyScalar(xFactor))
      .add(up.multiplyScalar(yFactor));
    setPosition([newPosition.x, newPosition.y, newPosition.z]);

    if (last) {
      enableControls();
      setTimeout(() => {
        console.log("last");
        console.log(initialPosition);
        console.log(newPosition.x, newPosition.y, newPosition.z);
        setInitialPosition([newPosition.x, newPosition.y, newPosition.z]); // Update initial position after a delay
      }, 2000); // Determine the appropriate delay value
      // TODO: We can test this and figure it out later.. Still not doing what I want.
    }
  });
  return (
    <RigidBody
      position={position}
      mass={8}
      linearDamping={2}
      colliders={false}
      {...bind()}
    >
      <CylinderCollider
        args={[0.32, 0.25, 0.3]}
        position={[0, 0.07, 0]}
      ></CylinderCollider>
      <a.primitive object={canModel} scale={0.7} />
    </RigidBody>
  );
}
