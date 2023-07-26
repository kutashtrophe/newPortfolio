import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { Text } from "@react-three/drei";

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
  const textRef = useRef<any>();
  const rotationSpeed = 0.001;

  useFrame(() => {
    if (modelRef.current && textRef.current) {
      // Update the rotation of the spinning object
      if (
        (modelRef.current.rotation.y <= -2.3 &&
          modelRef.current.rotation.y >= -5.42) ||
        (modelRef.current.rotation.y <= -8.42 &&
          modelRef.current.rotation.y >= -12)
      ) {
        modelRef.current.rotation.y -= rotationSpeed * 4.2; // Faster rotation speed
      } else {
        modelRef.current.rotation.y -= rotationSpeed; // Original rotation speed
      }

      // Update the position and rotation of the attached text
      const modelPosition = modelRef.current.position;
      textRef.current.position.set(
        modelPosition.x,
        modelPosition.y + 3.5,
        modelPosition.z
      );
      textRef.current.rotation.copy(modelRef.current.rotation);
      // console.log(textRef.current.position);
    }
  });

  return (
    <group>
      <group ref={modelRef} dispose={null}>
        <primitive object={gltf.scene} />
      </group>
      <Text ref={textRef} fontSize={1} color="red">
        Sean Kutash
      </Text>
    </group>
  );
};

const Camera = () => {
  const { camera } = useThree();

  useEffect(() => {
    const handleResize = () => {
      camera.zoom = window.innerWidth <= 640 ? 5 : 10;
      camera.updateProjectionMatrix(); // Necessary for the change to take effect
    };

    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [camera]);

  return null;
};

const App: React.FC = () => {
  const gltf = useLoader(GLTFLoader, "/MRdraft3.gltf");

  return (
    <motion.div
      key="home"
      className="overflow-hidden"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="overflow-hidden">
        <Canvas
          className="overflow-hidden translate-x-1/4 mt-24 -z-10"
          style={{ width: "100vw", height: "100vh" }}
          camera={{
            position: [0, 25, 50],
            zoom: window.innerWidth <= 640 ? 5 : 10,
          }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <RotatingModel gltf={gltf} />
          <OrbitControls
            target={[0, 0, -3]}
            enableZoom={false}
            enableRotate={false}
            enablePan={false}
          />
          <Camera />
        </Canvas>
        <div className="absolute text-white top-1/2 left-1/2 -translate-x-full -translate-y-2/3">
          <h1 className=" text-5xl text-center text-red-500 font-bold">
            From navigating oceanic depths in the US Navy to diving deep into
            innovative code solutions I explore complex tech terrains with
            JavaScript, TypeScript, React, and more.
          </h1>
        </div>
      </div>
    </motion.div>
  );
};

export default App;
