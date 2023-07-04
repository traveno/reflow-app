import { CameraControls, Center, Edges, GizmoHelper, GizmoViewport, Plane, Text3D } from "@react-three/drei";
import { Canvas, ThreeElements } from "@react-three/fiber";
import { resolveResource } from "@tauri-apps/api/path";
import { useEffect, useRef, useState } from "react";
import GCode from "./lib/GCode";
import { UnlistenFn, listen } from "@tauri-apps/api/event";
import { configExists } from "./lib/Config";
import { readTextFile } from "@tauri-apps/api/fs";
import { degToRad } from "three/src/math/MathUtils";
import * as THREE from "three";

function Render() {
  const [previews, setPreviews] = useState<JSX.Element[]>([]);
  const controlsRef = useRef<CameraControls>(null);

  configExists().then(exists => {
  console.log('Config exists:', exists);
  });

  useEffect(() => {
  let fileDropUnlisten: UnlistenFn;

  listen('tauri://file-drop', async event => {
      const filePaths = event.payload as string[];
      const loadedData: string[] = [];

      for (let f of filePaths) {
      try {
          loadedData.push(await readTextFile(f));
      } catch (error) {
          console.error(error);
      }
      }
  }).then(unlisten => fileDropUnlisten = unlisten);

  return () => {
      if (fileDropUnlisten) fileDropUnlisten();
  }
  });

  // Test GCode file that loads up automatically
  const [testGCode, setTestGCode] = useState<JSX.Element>(null!);
  useEffect(() => {
    resolveResource('../resources/test.gcode').then(readTextFile).then(data => setTestGCode(
      <GCode key="../resources/test.gcode" textData={data} />  
    ));
  }, []);

  return (
    <Canvas shadows camera={{ position: [0, -10, 10], up: [0, 0, 1], fov: 65 }}>
      {/* <color attach="background" args={['skyblue']} /> */}
      <CameraControls makeDefault ref={controlsRef} />

      <gridHelper args={[15, 25, '#666666', '#666666']} position={[0, 0, 0.001]} rotation={[degToRad(90), 0, 0]} />

      <Plane
        args={[15, 15]}
      >
        <meshStandardMaterial
          color={'#555555'}
          transparent
          opacity={1}
          // side={THREE.DoubleSide}
        />
        <Edges 
          color={'#ff5555'}
          scale={1.05}
        />
      </Plane>

      <ambientLight />
      <ReflowLogo />

      {previews}

      {testGCode &&
        testGCode
      }

      <axesHelper scale={2} position={[-5, -5, 0.1]} />
    </Canvas>
  );
}

function ReflowLogo(props: ThreeElements['mesh']) {
  return (
      <Center position={[0, 6, 0.125]}>
        <Text3D
          font={'/Inter_Bold.json'}
          castShadow
          bevelEnabled
          scale={1}
          height={0.25}
          bevelSize={0.01}
          bevelSegments={10}
          curveSegments={128}
          bevelThickness={0.01}
        >
          reflow
          <meshNormalMaterial />
        </Text3D>
      </Center>
  )
}

function Gizmo() {
  return (
    <GizmoHelper alignment="top-right" margin={[100, 100]} up={[0, 0, 1]} onUpdate={() => {}}>
      <GizmoViewport up={[0, 0, 1]} />
    </GizmoHelper>
  );
}

export default Render;