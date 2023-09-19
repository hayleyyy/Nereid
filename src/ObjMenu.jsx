// ObjMenu.jsx
import { useState, useEffect, useLayoutEffect, useRef, useMemo } from "react";
import { Html, useGLTF } from "@react-three/drei";
import { Select } from "@react-three/postprocessing";
import { useSceneContext } from "./SceneProvider";
import { useCameraContext } from "./CameraProvider";

export default function ChalkboardMenu() {
  const { nodes } = useGLTF("./menusign.glb");
  const sign = nodes["sign"];
  const [chalkboardMenuHtml, setChalkboardMenuHtml] = useState("");
  const { registerObject, handleObjectClick } = useSceneContext();
  const [hovered, setHovered] = useState(false);
  const ref = useRef();
  const { focusedObjectName } = useCameraContext();

  // TODO: Let's add a texture to the signboard when it hasn't been clicked on.

  const handlePointerOver = () => setHovered(true);
  const handlePointerOut = () => setHovered(false);

  useEffect(() => {
    if (ref.current) {
      registerObject("sign", ref.current);
    }
  }, [registerObject, ref]);

  const handleMenuLinkClick = (event) => {
    console.log("-----------HANDLE MENU CLICK IS CALLED--------------");
    event.preventDefault();
    event.stopPropagation();
    const action = event.target.getAttribute("data-action");
    switch (action) {
      case "about":
        handleObjectClick("TopFloor");
        break;
      case "projects":
        handleObjectClick("vendingMachine");
        break;
      case "contact":
        handleObjectClick("mailbox");
        break;
      default:
        console.error(`Unknown action: ${action}`);
    }
  };

  useEffect(() => {
    const menuList = document.getElementById("menu-list");

    if (menuList) {
      menuList.addEventListener("click", handleMenuLinkClick);
    }

    return () => {
      if (menuList) {
        menuList.removeEventListener("click", handleMenuLinkClick);
      }
    };
  }, []);

  const htmlComponent = useMemo(() => {
    if (focusedObjectName === "sign") {
      return (
        <Html
          occlude
          wrapperClass="content"
          distanceFactor={1}
          transform
          rotation-x={-0.208}
          rotation-y={-Math.PI * 2} // weird z-index bug fix
          position-z={0.53}
          position-y={0.46}
        >
          <div className="chalkboard">
            <h3>Today's menu!</h3>
            <div className="menu">
              <ul id="menu-list">
                <li>
                  <a
                    data-action="about"
                    onClick={handleMenuLinkClick}
                    data-text="About me"
                  >
                    <div className="star"></div>About me
                  </a>
                </li>
                <li>
                  <a
                    data-action="projects"
                    onClick={handleMenuLinkClick}
                    data-text="Projects"
                  >
                    <div className="star"></div>Projects
                  </a>
                </li>
                <li>
                  <a
                    data-action="contact"
                    onClick={handleMenuLinkClick}
                    data-text="Get in touch"
                  >
                    <div className="star"></div>Get in touch
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Html>
      );
    }
    return null;
  }, [focusedObjectName, chalkboardMenuHtml]);

  useEffect(() => {
    console.log("focusedObjectName in menu", focusedObjectName);
  }, [focusedObjectName]);

  return (
    <>
      <group
        ref={ref}
        position-x={4.5}
        position-y={-2}
        position-z={4.6}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onPointerDown={() => handleObjectClick("sign")}
      >
        <Select enabled={hovered && focusedObjectName == null}>
          <group
            position={focusedObjectName == "sign" ? [0, -0.3, 0.5] : [0, 0, 0]}
          >
            <primitive object={sign} rotation-y={-Math.PI * 0.5} scale={1.2} />
            {htmlComponent}
          </group>
        </Select>
      </group>
    </>
  );
}
