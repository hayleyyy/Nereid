// ObjMailbox.jsx
import { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { Select } from "@react-three/postprocessing";
import { useSceneContext } from "./SceneProvider";
import { useCameraContext } from "./CameraProvider";
import MailboxContent from "./MailboxContent";
import Envelope from "./Envelope";

export default function MailboxContact() {
  const { registerObject, handleObjectClick } = useSceneContext();
  const { focusedObjectName } = useCameraContext();
  const { nodes } = useGLTF("./mailbox.glb");
  const mailbox = nodes["mailbox"];
  const [isSent, setIsSent] = useState(false);
  const [hovered, setHovered] = useState(false);
  const handlePointerOver = () => setHovered(true);
  const handlePointerOut = () => setHovered(false);
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerObject("mailbox", ref.current);
    }
  }, [registerObject, ref]);

  const handleSendLetter = () => {
    setIsSent(true);
  };

  // TODO: reset isSent when mail is done or user clicks away from mailbox

  return (
    <group ref={ref} position={[-6.3, -1, 5.5]} scale={1}>
      <group
        position={focusedObjectName == "mailbox" ? [0, 0.3, 0] : [0, 0, 0]}
      >
        <Select enabled={hovered}>
          <primitive
            position={[1, 0, 0]}
            object={mailbox}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            onPointerDown={() => handleObjectClick("mailbox")}
          />
        </Select>
        <group position={[-2, 1.5, 0.1]}>
          <MailboxContent
            visible={focusedObjectName === "mailbox"}
            onSend={handleSendLetter}
            isSent={isSent}
            setIsSent={setIsSent}
          />
          <ambientLight
            layers={1}
            visible={focusedObjectName === "mailbox"}
            intensity={0.3}
          />
          <Envelope
            visible={isSent && focusedObjectName === "mailbox"}
            isSent={isSent}
            setIsSent={setIsSent}
          ></Envelope>
        </group>
      </group>
    </group>
  );
}
