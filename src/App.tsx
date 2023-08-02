import React, { useRef, useEffect, Suspense, useState } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.99, // add scale property to make the page smaller
    y: "-100vh", // add x property to make the page move from left to right
  },
  in: {
    opacity: 1,
    scale: 1, // back to normal scale
    y: 0, // back to normal position
  },
  out: {
    opacity: 0,
    scale: 1.01, // make the page a bit larger
    y: "100vh", // move the page from right to left
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

const RotatingModel: React.FC<{ gltf: any }> = ({ gltf }) => {
  const modelRef = useRef<any>();
  const totalRotation = useRef(0);
  const normRotationSpeed = 0.001;
  const fastRotationSpeed = 0.006;

  useFrame(() => {
    if (modelRef.current) {
      // Get current rotation speed based on total rotation
      const rotationSpeed =
        totalRotation.current % (2 * Math.PI) < Math.PI / 1.3
          ? normRotationSpeed
          : fastRotationSpeed;

      // Apply rotation
      modelRef.current.rotation.y -= rotationSpeed;

      // Update total rotation
      totalRotation.current += rotationSpeed;

      // Reset total rotation every full circle to avoid potential floating point issues
      if (totalRotation.current > 2 * Math.PI) {
        totalRotation.current -= 2 * Math.PI;
      }
    }
  });

  return (
    <group>
      <group ref={modelRef} dispose={null}>
        <primitive object={gltf.scene} />
      </group>
      {/* <Text ref={textRef} fontSize={1} color="red">
        Sean Kutash
      </Text> */}
    </group>
  );
};

const Camera = () => {
  const { camera } = useThree();
  const [fov, setFov] = useState(camera.fov);
  const [scrollSteps, setScrollSteps] = useState(0);

  useFrame(() => {
    const lerpFactor = 0.1;
    camera.fov += (fov - camera.fov) * lerpFactor;
    camera.updateProjectionMatrix();
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 500) {
        camera.zoom = 5;
      } else if (window.innerWidth <= 1000) {
        camera.zoom = 10;
      } else if (window.innerWidth <= 1920) {
        camera.zoom = 8;
      }
      camera.updateProjectionMatrix();
    };

    const handleScroll = (event) => {
      const direction = Math.sign(event.deltaY);
      if (
        (direction < 0 && scrollSteps > -4) ||
        (direction > 0 && scrollSteps < 4)
      ) {
        setFov(fov + direction * 2);
        setScrollSteps(scrollSteps + direction);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("wheel", handleScroll);
    };
  }, [camera, fov, scrollSteps]);

  return null;
};

const App: React.FC = () => {
  const [gltf, setGltf] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setLoading(true);
    const loader = new GLTFLoader();
    const dLoader = new DRACOLoader();
    dLoader.setDecoderPath(
      "https://www.gstatic.com/draco/versioned/decoders/1.5.6/"
    );
    dLoader.setDecoderConfig({ type: "js" });

    loader.setDRACOLoader(dLoader);

    loader.load(
      "/MRcompression4.glb",
      (loadedGltf) => {
        setGltf(loadedGltf);
        setLoading(false);
      },
      // This function is called while loading is progressing
      (xhr) => {
        setProgress((xhr.loaded / xhr.total) * 100);
      }
    );
  }, []);

  return (
    <motion.div
      key="home"
      className="overflow-hidden bg-[#202020]"
      initial={"initial"}
      animate={"in"}
      exit={"out"}
      variants={pageVariants}
      transition={pageTransition}
    >
      {/* Loading bar */}
      {loading && (
        <div className="absolute top-1/3 sm:translate-x-[60vw] md:left-[4vw] translate-x-[20vw] -translate-y-0 z-50 text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-700">Loading...</h1>
          <div className="w-64 h-4 bg-gray-200 rounded-full">
            <div
              className="h-4 bg-green-500 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
      <Canvas
        className="-mt-20 sm:-mt-0 sm:translate-x-[25vw] overflow-hidden md:translate-x-[20vw] md:translate-y-0 translate-y-0 md:mt-24 -z-10"
        style={{ width: "100vw", height: "100vh" }}
        camera={{
          position: [0, 16, 50],
          zoom: window.innerWidth <= 1000 ? 5 : 9.6,
        }}
      >
        {/* //Helpers */}
        {/* <axesHelper args={[5]} /> */}
        {/* <gridHelper args={[10, 10]} /> */}
        {/* <ambientLight intensity={0.5} /> */}
        {/* //White light */}
        <pointLight
          position={[-2.5, 5.32, -2.58]}
          intensity={0.5}
          // decay={2.0}
          castShadow
        />
        {/* //Blue light */}
        <pointLight
          position={[5.82, 0.96, -2.7]}
          intensity={0.4}
          color={"#2A3FDF"}
          // decay={2.0}
          castShadow
        />
        {/* //Orange light */}
        <pointLight
          position={[-0.46, 0.74, 5.94]}
          intensity={0.15}
          color={"#FFA200"}
          // decay={2.0}
          castShadow
        />
        <Suspense fallback={null}>
          {gltf && <RotatingModel gltf={gltf} />}
        </Suspense>
        <OrbitControls
          target={[0, 0, -3]}
          enableZoom={false}
          enableRotate={false}
          enablePan={false}
        />
        <Camera />
      </Canvas>
      <div className="w-full md:w-1/2 absolute landscape:top-[17vh] pb-36 text-white px-2 top-[56vh]  md:top-[19vh] md:mx-[46rem] md:-translate-x-[30rem]">
        <h1 className="text-3xl md:text-9xl justify-center md:max-w-lg max-w-sm text-red-500 font-bold">
          Hi.
        </h1>
        <h2 className="text-2xl md:text-6xl justify-center md:max-w-lg max-w-sm text-red-500 font-bold">
          I'm Sean.
        </h2>
        <br />
        <h1 className="text-xl md:text-5xl justify-center md:max-w-lg max-w-sm pb-36 text-red-500 font-bold">
          From navigating oceanic depths in the US Navy, to diving deep into
          innovative code solutions, <br />I explore complex tech terrains with
          JavaScript, TypeScript, React, and more.
        </h1>
      </div>
    </motion.div>
  );
};

export default App;
