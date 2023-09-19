// TopFloor.jsx
import { useEffect, useRef } from "react";
import { useGLTF, Html } from "@react-three/drei";
import { useSceneContext } from "./SceneProvider";
import { useCameraContext } from "./CameraProvider";

export default function TopFloor() {
  const TopFloor = useGLTF("./lilhouse-top-floor.glb");
  const { registerObject } = useSceneContext();
  const { focusedObjectName } = useCameraContext();
  const ref = useRef();

  useEffect(() => {
    if (ref.current && TopFloor.scene) {
      registerObject("TopFloor", ref.current);
    }
  }, [registerObject, ref, TopFloor]);

  useEffect(() => {
    if (ref.current) {
      ref.current.visible = focusedObjectName === "TopFloor";
    }
  }, [focusedObjectName]);

  return (
    <>
      <primitive object={TopFloor.scene} position={[0, 0, 0]} ref={ref} />
      {focusedObjectName === "TopFloor" && (
        <Html
          wrapperClass="about-me"
          transform
          distanceFactor={1.5}
          position={[0.3, 1, 0]}
        >
          <div className="about-me-inner-wrapper">
            <div className="about-me-inner">
              <h1>Oh, we have company!</h1>
              <div className="about-me-position">
                <p>
                  As you can see, I'm still busy unpacking and moving into my
                  comfy new space here! I'll continue to decorate this room and
                  make it a cozy place all my visitors to get to know me. In the
                  meantime, here's some quick info about your hostess!
                </p>
                <p>
                  I'm a Canadian, living in Ottawa with my two cat-children,
                  Button and Luna. I love creative and interactive design. An
                  app or website which is thrilling and stokes the
                  inquisitiveness of the user is what I aim for. People should
                  always find their experiences both easy and delightful!
                </p>
                <p>
                  In my spare time, I enjoy gaming, playing around with Unity
                  and 3D modeling, painting, photography, video editing and
                  travel.
                </p>
                <p>
                  Please visit me again soon to get a closer look into my world!
                </p>
                <p> </p>
                <h3>~ H</h3>
              </div>
            </div>
          </div>
        </Html>
      )}
    </>
  );
}
