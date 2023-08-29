// SceneController.jsx
import { Vector3 } from "three";
import React from "react";
import { Html } from "@react-three/drei";
import { useCameraContext } from "./CameraProvider";
import { useSceneContext } from "./SceneProvider";

const SceneController = () => {
  const { setOrbitTarget, enableLayer, disableLayer } = useCameraContext();
  const { resetView, handleObjectClick } = useSceneContext();

  // Set a manual position in the scene without focusing on a specific object
  // TODO: finish this later if its actually needed anymore
  const handleManualClick = (manualPosition) => {
    if (manualPosition.every(Number.isFinite)) {
      console.log("Manual position: ", manualPosition);
      const position = new Vector3(...manualPosition);
      setOrbitTarget(position);
    } else {
      console.error("Coords aren't numbers " + manualPosition);
    }
  };

  return (
    <>
      <Html wrapperClass="testmenu">
        <button onClick={() => handleObjectClick("mailbox")}>Mailbox</button>
        <br />
        <button onClick={() => handleObjectClick("sign")}>Chalkboard</button>
        <br />
        <button onClick={() => handleManualClick([5, 1, -2])}>
          Random Spot
        </button>
        <br />
        <button onClick={resetView}>View All</button>
        <br />
        <button onClick={() => disableLayer(0)}>Disable Layer 0</button>
        <br />
        <button onClick={() => enableLayer(0)}>Enable Layer 0</button>
        <br />
        <button onClick={() => disableLayer(1)}>Disable Layer 1</button>
        <br />
        <button onClick={() => enableLayer(1)}>Enable Layer 1</button>
        <br />
        <button onClick={resetView}>Go back</button>
        <br />
      </Html>
    </>
  );
};

export default SceneController;
