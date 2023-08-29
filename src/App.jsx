// App.jsx
import { Canvas } from "@react-three/fiber";
import {
  Selection,
  EffectComposer,
  Outline,
  Bloom,
} from "@react-three/postprocessing";
import Experience from "./Experience";
import { useCameraContext } from "./CameraProvider";
import { SceneProvider } from "./SceneProvider";
import { CameraProvider } from "./CameraProvider";
import { CommonStateProvider } from "./CommonStateProvider";

const AppContent = () => {
  const { isFocusingOnObject } = useCameraContext();

  return (
    <Canvas antialias="true">
      <Selection>
        <EffectComposer multisampling={8} autoClear={false} depthBuffer={true}>
          {!isFocusingOnObject && (
            <Outline
              blur={true}
              visibleEdgeColor="#d7e7fa"
              hiddenEdgeColor="#d7e7fa"
              edgeStrength={0.9}
              xRay={false}
            ></Outline>
          )}
          <Bloom
            mipmapBlur
            intensity={0.6}
            luminanceThreshold={0.9}
            luminanceSmoothing={0.8}
          ></Bloom>

          <Experience />
        </EffectComposer>
      </Selection>
    </Canvas>
  );
};

const App = () => {
  return (
    <CommonStateProvider>
      <CameraProvider>
        <SceneProvider>
          <AppContent />
        </SceneProvider>
      </CameraProvider>
    </CommonStateProvider>
  );
};

export default App;
