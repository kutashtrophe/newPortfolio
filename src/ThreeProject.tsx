import { Vector3 } from "three";
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text3D, SpotLight, useDepthBuffer } from "@react-three/drei";

function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
}

export default function ThreeProject() {
  return (
    <Canvas
      // shadows
      style={{ width: "100vw", height: "100vh" }}
      camera={{ position: [0, 2, 6], fov: 60, near: 1, far: 50 }}
    >
      <color attach="background" args={["#202020"]} />
      <fog attach="fog" args={["#202020", 5, 20]} />
      {/* <ambientLight intensity={0.01} /> */}
      <Scene />
    </Canvas>
  );
}

function Scene() {
  const depthBuffer = useDepthBuffer({ frames: 1, size: 2048 });
  const windowWidth = useWindowWidth();

  let textSize;
  let textPosition;
  if (windowWidth < 760) {
    // if it's 'sm' in Tailwind terms
    textSize = 0.28; // set the size you want for small screens
    textPosition = [-0.95, 1, 1.25];
  } else if (windowWidth < 1320) {
    textSize = 0.6; // the default size for larger screens
    textPosition = [-2.0, 0, 1.25];
  } else if (windowWidth < 1920) {
    textSize = 1;
    textPosition = [-3.3, 0, 1.25];
  } else {
    textSize = 1.25;
    textPosition = [-4.2, 0, 1.25];
  }

  return (
    <>
      <MovingSpot
        depthBuffer={depthBuffer}
        color="#0fBFFF"
        position={[2, 3, 2]}
      />
      <MovingSpot
        depthBuffer={depthBuffer}
        color="#ffCEEB"
        position={[0, 3, 0]}
      />
      <Text3D
        font="./fonts/helvetiker_regular.typeface.json"
        castShadow
        receiveShadow
        size={textSize}
        position={textPosition}
        rotation={[0, 0, 0]}
      >
        <meshStandardMaterial
          attach="material"
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.01}
          aoMapIntensity={10}
        />
        PROJECTS
      </Text3D>
      <mesh
        receiveShadow
        castShadow
        position={[0, -1, -0.1]}
        rotation-x={-Math.PI / 2}
      >
        <planeGeometry args={[50, 50]} />
        <meshPhongMaterial />
      </mesh>
    </>
  );
}

function MovingSpot({ vec = new Vector3(), ...props }) {
  const light = useRef();
  const viewport = useThree((state) => state.viewport);
  useFrame((state) => {
    light.current.target.position.lerp(
      vec.set(
        (state.mouse.x * viewport.width) / 2,
        (state.mouse.y * viewport.height) / 2,
        0
      ),
      0.1
    );
    light.current.target.updateMatrixWorld();
  });
  return (
    <SpotLight
      castShadow
      ref={light}
      penumbra={1.2}
      distance={6}
      angle={0.36}
      attenuation={6}
      anglePower={5}
      intensity={2}
      {...props}
    />
  );
}
