import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { Text3D, Float, useTexture, Center } from "@react-three/drei";
import { Html } from "@react-three/drei";

export default function Intro({ onFinish }) {
  const { camera } = useThree();
  const texture = useTexture("./textures/9.png");
  const textProps = {
    size: 3,
    height: 0.2,
    curveSegments: 20,
    bevelEnabled: true,
    bevelThickness: 0.2,
    bevelSize: 0.05,
    bevelOffset: 0,
    bevelSegments: 5,
    font: "./fonts/Rubik Bubbles_Regular.json",
  };

  const floatProps = {
    speed: 1.5, // Animation speed, defaults to 1
    rotationIntensity: 0.5, // XYZ rotation intensity, defaults to 1
    floatIntensity: 1, // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
  };

  const groupRef = useRef();

  useEffect(() => {
    camera.layers.enable(2); // Enable layer 2

    groupRef.current.traverse((child) => {
      child.layers.set(2);
    });
  }, []);
  return (
    <>
      <Center disableY>
        <group ref={groupRef} position-y={3}>
          <Float {...floatProps}>
            <Text3D {...textProps}>
              N<meshBasicMaterial map={texture}></meshBasicMaterial>
            </Text3D>
          </Float>
          <Float {...floatProps}>
            <Text3D {...textProps} position-x={3.3}>
              E<meshBasicMaterial map={texture}></meshBasicMaterial>
            </Text3D>
          </Float>
          <Float {...floatProps}>
            <Text3D {...textProps} position-x={6}>
              R<meshBasicMaterial map={texture}></meshBasicMaterial>
            </Text3D>
          </Float>
          <Float {...floatProps}>
            <Text3D {...textProps} position-x={9}>
              E<meshBasicMaterial map={texture}></meshBasicMaterial>
            </Text3D>
          </Float>
          <Float {...floatProps}>
            <Text3D {...textProps} position-x={11.7}>
              .<meshBasicMaterial map={texture}></meshBasicMaterial>
            </Text3D>
          </Float>
          <Float {...floatProps}>
            <Text3D {...textProps} position-x={13}>
              I<meshBasicMaterial map={texture}></meshBasicMaterial>
            </Text3D>
          </Float>
          <Float {...floatProps}>
            <Text3D {...textProps} position-x={14.8}>
              D<meshBasicMaterial map={texture}></meshBasicMaterial>
            </Text3D>
          </Float>
        </group>
      </Center>
      <Html wrapperClass="intro">
        <div className="intro-text">
          <h1>Hello and welcome!</h1>
          <p>
            I'm Hayley and you've found my portfolio! This website uses React
            Three Fiber, and
            <b>
              {" "}
              <u>you'll have the best experience on desktop.</u>{" "}
            </b>
            It is still very much under construction, so please check back often
            for extended features. Later versions will include a better
            experience for mobile users. Feel free to use the contact form if
            you have any questions (or find a bug!)
          </p>
          <button onClick={onFinish}>
            Yeah yeah, I got it. Now let me in!
          </button>
        </div>
      </Html>
    </>
  );
}
