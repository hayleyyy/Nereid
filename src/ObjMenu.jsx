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

  // Let's make each link have an event listener so we can control what it does.
  const handleIframeLoad = (event) => {
    const iframeDocument = event.target.contentDocument;
    if (iframeDocument) {
      // Attach event listeners to the links inside the iframe
      iframeDocument.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", handleMenuLinkClick);
      });
    }
  };

  // And then we assign our own action, depending on the individual link.
  const handleMenuLinkClick = (event) => {
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

  useLayoutEffect(() => {
    const chalkboardMenuContent = `
      <link rel="stylesheet" href="./styles/chalkboard.css">
      <div class="chalkboard">
        <h1>Today's menu!</h1>
        <div class="menu">
        <ul>
          <li style="--clr:#edb4d8"><a href="#" data-action="about" data-text="About me"><div class="star"></div>About me</a></li>
          <li style="--clr:#80bfe8"><a href="#" data-action="projects" data-text="Projects"><div class="star"></div>Projects</a></li>
          <li style="--clr:#98e3ac"><a href="#" data-action="contact" data-text="Get in touch"><div class="star"></div>Get in touch</a></li>
        </ul>
        </div>
        </div>
    `;

    setChalkboardMenuHtml(chalkboardMenuContent);
  }, []);

  const htmlComponent = useMemo(() => {
    if (focusedObjectName === "sign") {
      return (
        <Html
          occlude
          wrapperClass="content"
          distanceFactor={0.75}
          transform
          rotation-x={-0.208}
          rotation-y={-Math.PI * 2} // weird z-index bug fix
          position-z={0.53}
          position-y={0.46}
        >
          <iframe srcDoc={chalkboardMenuHtml} onLoad={handleIframeLoad} />
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
