// ObjVendingMachine.jsx
import { useEffect, useRef, useState } from "react";
import { useGLTF, Html } from "@react-three/drei";
import { Select } from "@react-three/postprocessing";
import { useSceneContext } from "./SceneProvider";
import { useCameraContext } from "./CameraProvider";
import VendingMachineLights from "./ObjVendingMachineLights";

export default function VendingMachine() {
  const { registerObject, handleObjectClick } = useSceneContext();
  const { focusedObjectName } = useCameraContext();
  const vendingMachine = useGLTF("./vendingmachine.glb");
  const [hovered, setHovered] = useState(false);
  const handlePointerOver = () => setHovered(true);
  const handlePointerOut = () => setHovered(false);
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerObject("vendingMachine", ref.current);
    }
  }, [registerObject, ref]);

  useEffect(() => {
    if (focusedObjectName === "vendingMachine") {
      // console.log("focused!");
      ref.current.rotation.y = Math.PI;
      ref.current.position.set(3, -4, -0.9);
    } else {
      // console.log("not focused!");
      ref.current.rotation.y = -0.5 * Math.PI;
      ref.current.position.set(4.35, -2.5, -0.9);
    }
  }, [focusedObjectName]);

  return (
    <>
      <group ref={ref} scale={1.2}>
        <Select enabled={hovered}>
          <primitive
            object={vendingMachine.scene}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            onPointerDown={() => handleObjectClick("vendingMachine")}
          />
        </Select>
        <VendingMachineLights></VendingMachineLights>
        {focusedObjectName === "vendingMachine" && (
          <Html wrapperClass="projects" position={[-1, 2.5, 0]}>
            <div className="projects-inner-wrapper">
              <div class="projects-inner">
                <h1>Past Professional Work</h1>
                <p>
                  This page is still being built into an interactive 3D
                  experience! But for now, here are the basics:
                  <br />
                  <br />
                </p>
                <div class="projects-position">
                  <h2>Royal Canadian Mint</h2>
                  <h3>What I worked on:</h3>
                  <p>
                    Campaigns for Canadian and international coins, including
                    banners, web graphics, emails, and web content. Created
                    monthly launch email of all new products.
                  </p>
                  <h3>Noteable achievements:</h3>
                  <p>
                    Created structured, reusable content blocks for newly
                    introduced email system to be used in all product emails.
                  </p>
                  <p>
                    Designed and built newly launched newsletter, telling the
                    stories behind popular coins.
                  </p>
                </div>
                <div class="projects-position">
                  <h2>Formula</h2>
                  <h3>What I worked on:</h3>
                  <p>
                    Worked as a full-stack developer on Totalview, a suite of
                    CRM software, using ASP.NET Core, Typescript and C#.
                  </p>
                  <h3>Noteable achievements:</h3>
                  <p>
                    Restructured front-end architecture allowing for more
                    scalable and reusable code. Created an organized styling
                    system using SCSS to allow for quicker and easier updates
                    across all files.
                  </p>
                  <p>
                    Conducted UX testing, designed and built application for
                    display of telephony statistics to users who were employees
                    in a call centre.
                  </p>
                </div>
                <div class="projects-position">
                  <h2>Mercatus</h2>
                  <h3>What I worked on:</h3>
                  <p>
                    Worked as a front-end developer on software providing an
                    online shopping experience for grocery retail chains and
                    their customers. Worked mainly in Angular.
                  </p>
                  <h3>Noteable achievements:</h3>
                  <p>
                    Streamlined user experience for "Add to Cart" buttons for
                    complex products with multiple variations.
                  </p>
                  <p>
                    Created a Sass template allowing for more straightforward
                    customization of client branding.
                  </p>
                </div>
                <div class="projects-position">
                  <h2>Bell</h2>
                  <h3>What I worked on:</h3>
                  <p>
                    Worked as a front-end developer for television channels and
                    shows, including CTV, the Amazing Race, Master Chef, Marilyn
                    Denis, and others. Worked mainly in Angular.
                  </p>
                  <h3>Noteable achievements:</h3>
                  <p>
                    Implemented CTV redesign, modernizing the website and
                    allowing for a more mobile-friendly and responsive
                    experience.
                  </p>
                  <p>
                    Created customizable widgets for displaying media, watching
                    videos and reading article snippets, using Angular.
                  </p>
                </div>
              </div>
            </div>
          </Html>
        )}
      </group>
    </>
  );
}
