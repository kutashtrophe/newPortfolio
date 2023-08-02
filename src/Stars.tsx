import { useState, useRef, useEffect, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import "./AboutMe.tsx";
import ReactStar from "./ReactStar";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

export default function Stars({ scrollPosition }: { scrollPosition: number }) {
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(6900), { radius: 5 })
  );

  const [scale, setScale] = useState([0.15, 0.15, 0.15]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1000) {
        setScale([0.08, 0.08, 0.08]); // Small scale for small viewport
      } else {
        setScale([0.15, 0.15, 0.15]); // Normal scale for large viewport
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call once immediately

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 15 - scrollPosition / 690;
    ref.current.rotation.y -= delta / 20 - scrollPosition / 690;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Suspense fallback={null}>
        <ReactStar scrollPosition={scrollPosition} scale={scale} />
      </Suspense>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.01}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}
