// Navigation.jsx
import React from "react";
import { Html } from "@react-three/drei";
import { useSceneContext } from "./SceneProvider";
import { useCameraContext } from "./CameraProvider";
import { useEffect } from "react";

export default Navigation = () => {
  const { resetView } = useSceneContext();
  const { isFocusingOnObject } = useCameraContext();
  //   console.log("is focus on obj");
  //   console.log(isFocusingOnObject);

  useEffect(() => {
    console.log("isFocusingonObject has changed:", isFocusingOnObject);
  }, [isFocusingOnObject]);

  // TODO: Build more navigation for mobile users who don't have mouseover prompting.

  return (
    <>
      {isFocusingOnObject && (
        <Html wrapperClass="nav-close">
          <button onClick={resetView}>
            <span>x</span>
          </button>
          <br />
        </Html>
      )}
    </>
  );
};
