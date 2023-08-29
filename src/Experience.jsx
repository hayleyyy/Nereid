// Experience.jsx
import React, { useState, useEffect, Suspense } from "react";
import { CameraControls, Environment } from "@react-three/drei";
import CameraController from "./CameraController";
import { useThree } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { useCameraContext } from "./CameraProvider";
import MailboxContact from "./ObjMailbox.jsx";
import ChalkboardMenu from "./ObjMenu.jsx";
import House from "./ObjHouse.jsx";
import Moon from "./ObjMoon.jsx";
import Lanterns from "./ObjLanterns.jsx";
import VendingMachine from "./ObjVendingMachine.jsx";
import PatioDoors from "./ObjPatioDoors.jsx";
import Windchime from "./ObjWindchime.jsx";
import PlantPots from "./ObjPlantPots.jsx";
import FlowerBeds from "./FlowerBeds.jsx";
import WateringCan from "./ObjWateringCan.jsx";
import Intro from "./Intro.jsx";
import Navigation from "./Navigation.jsx";
import TopFloor from "./TopFloor.jsx";

const Experience = () => {
  const { setCamera } = useCameraContext();
  const { camera } = useThree();
  const [introLayer, setIntroLayer] = useState(true);

  useEffect(() => {
    setCamera(camera); // Set the camera in the context
  }, [camera, setCamera]);

  const switchToMainLayer = () => {
    setIntroLayer(false);
  };

  return (
    <>
      <CameraControls enabled={false} />
      <Environment preset="city" />
      <ambientLight intensity={0.2} />

      <Suspense>
        <Physics>
          {introLayer ? (
            <Intro onFinish={switchToMainLayer} />
          ) : (
            <>
              <House />
              <PatioDoors />
              <MailboxContact />
              <ChalkboardMenu />
              <Moon />
              <Windchime />
              <Lanterns />
              <PlantPots />
              <FlowerBeds />
              <WateringCan />
              <VendingMachine />
              <TopFloor />
              <Navigation />
            </>
          )}
        </Physics>
      </Suspense>
      <CameraController />
    </>
  );
};

export default Experience;
