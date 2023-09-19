// SceneProvider.jsx
import React, { createContext, useContext, useState } from "react";
import { useCameraContext } from "./CameraProvider";

const SceneContext = createContext();

export const SceneProvider = ({ children }) => {
  const [objects, setObjects] = useState({});
  const {
    setControlsTarget,
    setFocusOnObject,
    isFocusingOnObject,
    enableLayer,
    disableLayer,
    moveCamera,
    resetOrbitTarget,
    focusedObjectName,
  } = useCameraContext();

  const registerObject = (name, object) => {
    setObjects((prevObjects) => ({
      ...prevObjects,
      [name]: object,
    }));
  };

  const getObject = (name) => objects[name];

  const mainLayer = 0;
  const isolatedLayer = 1;
  const introLayer = 2;

  const [currentLayer, setCurrentLayer] = useState("introLayer");

  const viewIsolatedLayer = () => {
    // console.log("-------VIEWISOLATEDLAYER---------");
    enableLayer(isolatedLayer);
    disableLayer(mainLayer);
  };

  const viewMainLayer = () => {
    //  console.log("-------VIEWMAINLAYER---------");
    enableLayer(mainLayer);
    disableLayer(isolatedLayer);
  };

  // Get coordinates of object to focus on
  const getObjectCoords = (objectName) => {
    const object = getObject(objectName);
    if (object) {
      const focusCoords = [
        object.position.x,
        object.position.y,
        object.position.z,
      ];
      if (focusCoords.every(Number.isFinite)) {
        return focusCoords;
      } else {
        console.error("Invalid orbit target coordinates:", focusCoords);
      }
    }
  };

  // Focus on object
  const focusObject = (objectName) => {
    // console.log("-------FOCUSOBJECT---------");
    const object = getObject(objectName);
    //console.log(object);

    // move object to isolated layer
    object.traverse((child) => {
      if (child.isMesh) {
        child.layers.set(isolatedLayer);
      }
    });
    //  console.log("Calling SETFOCUSONOBJECT" + objectName);
    setFocusOnObject(true, objectName);
  };

  // Remove Object from focus
  const unfocusObject = () => {
    // console.log("-------UNFOCUSOBJECT---------");
    const object = getObject(focusedObjectName);
    //  console.log("removing obj from focus " + focusedObjectName);

    // move object back to main layer
    object.traverse((child) => {
      if (child.isMesh) {
        child.layers.set(mainLayer);
      }
    });
    // console.log("Calling SETFOCUSONOBJECT to empty");
    setFocusOnObject(false, null);
  };

  // When an object is clicked, set it as the new orbit target
  const handleObjectClick = (objectName) => {
    // console.log("-------HANDLEOBJECTCLICK--------- " + objectName);
    // check to see if we're already focusing on an object
    // if we are, reset focus and move object back to main layer.
    //  console.log("is focusing on object?" + isFocusingOnObject);
    if (isFocusingOnObject) {
      unfocusObject();
    }
    const object = getObject(objectName);
    if (object) {
      setControlsTarget(getObjectCoords(objectName));
      focusObject(objectName);
      // set camera to isolated layer
      viewIsolatedLayer();
      moveCamera(object.position);
    } else {
      console.error(`Object with name ${objectName} not found.`);
    }
  };

  // Go to the default location in the scene to view the entire scene
  const resetView = () => {
    // console.log("-------RESETVIEW---------");
    // get currently focused object if applicable
    //  console.log("reset view");
    //  console.log("is focusing on object?" + isFocusingOnObject);

    if (isFocusingOnObject) {
      unfocusObject();
    }

    // set camera to main layer
    viewMainLayer();
    resetOrbitTarget();
  };

  return (
    <SceneContext.Provider
      value={{ registerObject, getObject, handleObjectClick, resetView }}
    >
      {children}
    </SceneContext.Provider>
  );
};

export const useSceneContext = () => useContext(SceneContext);
