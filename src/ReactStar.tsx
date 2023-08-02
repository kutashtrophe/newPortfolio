import * as THREE from "three";
import { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Line, Sphere } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

export default function ReactStar({ scale = [1, 1, 1], scrollPosition = 0 }) {
  let position = [scrollPosition * 2.5, scrollPosition * 2.5, 0];

  if (window.innerWidth < 1000) {
    position = [scrollPosition * 32, scrollPosition * 32, 0];
  }

  return (
    <group position={position} scale={scale as any}>
      {/* <color attach="background" args={["black"]} /> */}
      <Float speed={4} rotationIntensity={2} floatIntensity={5}>
        <Atom />
      </Float>
      {/* <Stars saturation={0} count={400} speed={0.5} /> */}
      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={1.5} radius={0.95} />
      </EffectComposer>
    </group>
  );
}

function Atom(props: any) {
  const points = useMemo(
    () =>
      new THREE.EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(
        100
      ),
    []
  );
  return (
    <group {...props}>
      <Line worldUnits points={points} color="#61dbfb" lineWidth={0.02} />
      <Line
        worldUnits
        points={points}
        color="#61dbfb"
        lineWidth={0.02}
        rotation={[0, 0, 1]}
      />
      <Line
        worldUnits
        points={points}
        color="#61dbfb"
        lineWidth={0.02}
        rotation={[0, 0, -1]}
      />
      <Electron position={[0, 0, 0.5]} speed={4} />
      <Electron
        position={[0, 0, 0.5]}
        rotation={[0, 0, Math.PI / 3]}
        speed={6.5}
      />
      <Electron
        position={[0, 0, 0.5]}
        rotation={[0, 0, -Math.PI / 3]}
        speed={7}
      />
      <Sphere args={[0.55, 64, 64]}>
        <meshBasicMaterial color={[6, 0.5, 2]} toneMapped={false} />
      </Sphere>
    </group>
  );
}

function Electron({ radius = 2.75, speed = 6, ...props }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    ref.current.position.set(
      Math.sin(t) * radius,
      (Math.cos(t) * radius * Math.atan(t)) / Math.PI / 1.25,
      0
    );
  });

  return (
    <group {...props}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.2]} />
        <meshBasicMaterial color={[10, 1, 10]} toneMapped={false} />
      </mesh>
    </group>
  );
}
