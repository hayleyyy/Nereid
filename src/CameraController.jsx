// CameraController.jsx
import { Vector3 } from "three";
import React, { useRef, useState, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useSpring } from "@react-spring/three";
import { useCameraContext } from "./CameraProvider";

let logFrameCount = 0; // TODO: remove this when done testing.
const CameraController = () => {
  const {
    controlsEnabled,
    controlsTarget,
    cameraPosition,
    isFocusingOnObject,
    setDefaultCameraPosition,
    defaultCameraPosition,
  } = useCameraContext();

  // CAMERA DEFAULTS
  //TODO: Add distance multiplier for screen size so that default position can be adjusted
  const { camera, size } = useThree();
  useEffect(() => {
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
  }, [size.width, size.height, camera]);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  useEffect(() => {
    let newDefaultPosition;
    if (viewportWidth < 576) {
      // Extra Small Devices
      newDefaultPosition = new Vector3(0, 1, 12);
      camera.fov = 100;
      // console.log("xs window");
    } else if (viewportWidth >= 576 && viewportWidth < 768) {
      // Small Devices
      newDefaultPosition = new Vector3(0, 1, 12);
      camera.fov = 90;
      // console.log("sm window");
    } else if (viewportWidth >= 768 && viewportWidth < 992) {
      // Medium Devices
      newDefaultPosition = new Vector3(0, 1, 12);
      camera.fov = 80;
      // console.log("med window");
    } else if (viewportWidth >= 992 && viewportWidth < 1200) {
      // Large Devices
      newDefaultPosition = new Vector3(0, 1, 12);
      camera.fov = 70;
      // console.log("lg window");
    } else {
      // Extra Large Devices
      newDefaultPosition = new Vector3(0, 1, 12);
      camera.fov = 70;
      // console.log("xl window");
    }
    setDefaultCameraPosition(newDefaultPosition);
    if (!isFocusingOnObject) {
      camera.position.set(...newDefaultPosition.toArray());
      // console.log("not focused");
    }
    camera.updateProjectionMatrix();
  }, [viewportWidth, camera]);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const springProps = useSpring({
    to: { springPos: new Vector3(...cameraPosition) },
    config: { mass: 100, tension: 1, friction: 100 },
  });

  const controlsRef = useRef();
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    if (controlsRef.current) {
      setIsMoving(true); // Start moving when controlsTarget changes
      const newTarget = new Vector3(...controlsTarget);
      controlsRef.current.target.copy(newTarget);
      // Enable or disable OrbitControls based on isFocusingOnObject
      //  controlsRef.current.enabled = !isFocusingOnObject;
    }
  }, [controlsTarget, isFocusingOnObject]);

  useFrame(() => {
    if (springProps.springPos && isMoving) {
      if (logFrameCount % 100 === 0) {
        // testing log but not on every freakin frame
        // console.log("useFrame called");
        // console.log(springProps.springPos.get());
        // console.log(camera.position);
      }
      logFrameCount++;
      camera.position.lerp(springProps.springPos.get(), 0.025);
      const newTarget = new Vector3(...controlsTarget);
      camera.lookAt(newTarget);

      // Check if the camera has reached its destination
      if (camera.position.distanceTo(springProps.springPos.get()) < 0.1) {
        setIsMoving(false);
        // console.log("stopped moving");
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enabled={controlsEnabled}
      target={controlsRef.current ? controlsRef.current.target : undefined}
      enableDamping={true}
      dampingFactor={0.05}
      enablePan={true}
      minDistance={2}
      maxDistance={15}
      maxPolarAngle={Math.PI / 2}
      args={[camera]}
    />
  );
};

export default CameraController;
