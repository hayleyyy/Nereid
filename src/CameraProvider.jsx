// CameraProvider.jsx
import React, { createContext, useCallback, useState, useContext } from "react";
import { Vector3 } from "three";

const CameraContext = createContext();

export const useCameraContext = () => useContext(CameraContext);

export const CameraProvider = ({ children, camera }) => {
  const defaultCameraPosition = new Vector3(0, 1, 12);
  const zeroPosition = new Vector3(0, 1, 0);
  const [controlsEnabled, setControlsEnabled] = useState(true);
  const [controlsTarget, setControlsTarget] = useState(zeroPosition);
  const [cameraPosition, setCameraPosition] = useState(defaultCameraPosition);
  const [isFocusingOnObject, setIsFocusingOnObject] = useState(false);
  const [focusedObjectName, setFocusedObjectName] = useState(null);
  const [cameraState, setCameraState] = useState(camera);

  // CAMERA CONTROLS

  // Move the camera to an Object, with slight offset
  const moveCamera = useCallback((objectPosition) => {
    // console.log("object position : " + objectPosition);
    // console.log(objectPosition);
    const cameraCoords = [
      objectPosition.x,
      objectPosition.y,
      objectPosition.z + 3,
    ];
    if (cameraCoords.every(Number.isFinite)) {
      setCameraPosition(cameraCoords);
      // console.log("moveCamera :" + cameraCoords);
    } else {
      console.error("Invalid camera coordinates:", cameraCoords);
    }
  }, []);

  // useEffect(() => {
  //   console.log("focusedObjectName has changed:", focusedObjectName);
  // }, [focusedObjectName]);

  // useEffect(() => {
  //   console.log("isFocusingonObject has changed:", isFocusingOnObject);
  // }, [isFocusingOnObject]);

  const setOrbitTarget = useCallback(
    (objectPosition) => {
      const focusCoords = [
        objectPosition.x,
        objectPosition.y,
        objectPosition.z,
      ];
      if (focusCoords.every(Number.isFinite)) {
        //set the area the controls orbits around
        //  console.log("setControlsTarget : " + focusCoords);
        setControlsTarget(focusCoords);
      } else {
        console.error("Invalid orbit target coordinates:", focusCoords);
      }
    },
    [moveCamera]
  );

  const resetOrbitTarget = useCallback(() => {
    setControlsTarget(zeroPosition); // reset controls target
    setFocusedObjectName(null);
    setCameraPosition(defaultCameraPosition); // reset camera position
    moveCamera(defaultCameraPosition); // explicitly move the camera to the default position
    // console.log("resetting");
  }, [moveCamera]);

  // OBJECT FOCUS
  const setFocusOnObject = useCallback((focus, objectName) => {
    // let the app know if we're focusing on an object
    //  console.log("SETFOCUSOBJECT: setIsFocusingOnObject " + focus);
    setIsFocusingOnObject(focus);
    // tell the app the name of the object we're focusing on, or null
    setFocusedObjectName(objectName);
    //    console.log("SETFOCUSOBJECT: object focus name " + focusedObjectName);
  });

  // VIEWER CONTROLS
  const enableControls = () => {
    setControlsEnabled(true);
  };

  const disableControls = () => {
    setControlsEnabled(false);
  };

  // LAYER CONTROL
  const enableLayer = useCallback(
    (layerNumber) => {
      if (cameraState?.layers) {
        cameraState.layers.enable(layerNumber);
        console.log("enable layer : " + layerNumber);
      } else {
        console.warn("cameraState or cameraState.layers is undefined");
      }
    },
    [cameraState]
  );

  const disableLayer = useCallback(
    (layerNumber) => {
      if (cameraState?.layers) {
        cameraState.layers.disable(layerNumber);
        console.log("disable layer : " + layerNumber);
      } else {
        console.warn("cameraState or cameraState.layers is undefined");
      }
    },
    [cameraState]
  );

  return (
    <CameraContext.Provider
      value={{
        controlsEnabled,
        enableControls,
        disableControls,
        controlsTarget,
        setOrbitTarget,
        setControlsTarget,
        cameraPosition,
        isFocusingOnObject,
        setFocusOnObject,
        resetOrbitTarget,
        focusedObjectName,
        setFocusedObjectName,
        enableLayer,
        disableLayer,
        moveCamera,
        camera: cameraState,
        setCamera: setCameraState,
      }}
    >
      {children}
    </CameraContext.Provider>
  );
};
