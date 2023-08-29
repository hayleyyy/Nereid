import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";

export default function Envelope({ isSent, setIsSent, visible }) {
  const { scene, animations } = useGLTF("./envelope--animated.glb");
  const { ref, actions } = useAnimations(animations);

  const [active, setActive] = useState(0);

  // TODO: Not using this currently, let's add this animation later.
  // const { spring } = useSpring({
  //   spring: active,
  //   config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  // });
  // const rotation = spring.to([0, 1], [0, Math.PI]);

  useEffect(() => {
    if (!isSent && actions) {
      actions.CloseFlap.stop();
      actions.CloseFlap.reset();
    }
    if (isSent) {
      // console.log("senttttt");
      // console.log(scene);
      setActive(1);

      if (actions) {
        // console.log("trying to play");
        // console.log(actions);

        setTimeout(() => {
          actions.LetterDrop.setLoop(THREE.LoopOnce);
          actions.LetterDrop.play();
          actions.CloseFlap.setLoop(THREE.LoopOnce);
          actions.CloseFlap.play();
          actions.CloseFlap.clampWhenFinished = true;

          const closeFlapDuration = 10000;
          setTimeout(() => {
            setIsSent(false);
          }, closeFlapDuration);
        }, 900);
      }
    }
  }, [isSent, actions, setIsSent]);

  return (
    <>
      <a.group>
        <a.primitive
          visible={visible}
          scale={0.6}
          position={[1, -2, 0]}
          ref={ref}
          object={scene}
          rotation-y={-Math.PI * 0.5}
        ></a.primitive>
      </a.group>
    </>
  );
}
