import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function SteelFrame() {
  const groupRef = useRef();
  const reduceMotion = useMemo(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#e0b563",
        metalness: 0.45,
        roughness: 0.38,
        emissive: "#3a2708",
        emissiveIntensity: 0.35,
      }),
    []
  );
  const columnGeometry = useMemo(() => new THREE.BoxGeometry(0.16, 3, 0.16), []);
  const beamGeometry = useMemo(() => new THREE.BoxGeometry(2.8, 0.14, 0.14), []);

  const columnPositions = [
    [-1.4, 0, -1.4],
    [1.4, 0, -1.4],
    [-1.4, 0, 1.4],
    [1.4, 0, 1.4],
  ];

  useFrame((_, delta) => {
    if (groupRef.current && !reduceMotion) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {columnPositions.map((position, index) => (
        <mesh key={index} position={position} geometry={columnGeometry} material={material} />
      ))}
      <mesh position={[0, 1.4, -1.4]} geometry={beamGeometry} material={material} />
      <mesh position={[0, 1.4, 1.4]} geometry={beamGeometry} material={material} />
      <mesh
        position={[-1.4, 1.4, 0]}
        rotation={[0, Math.PI / 2, 0]}
        geometry={beamGeometry}
        material={material}
      />
      <mesh
        position={[1.4, 1.4, 0]}
        rotation={[0, Math.PI / 2, 0]}
        geometry={beamGeometry}
        material={material}
      />
      <mesh position={[0, -0.3, -1.4]} geometry={beamGeometry} material={material} />
      <mesh position={[0, -0.3, 1.4]} geometry={beamGeometry} material={material} />
    </group>
  );
}

export default function HeroSteelScene() {
  return (
    <Canvas
      camera={{ position: [4.2, 2.4, 5], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 6, 4]} intensity={2.2} color="#fff1d0" />
      <directionalLight position={[-4, 3, 3]} intensity={0.9} color="#ffdca0" />
      <pointLight position={[0, 1, 5]} intensity={0.5} color="#ffffff" />
      <Center>
        <SteelFrame />
      </Center>
      <ContactShadows position={[0, -1.7, 0]} opacity={0.4} blur={2.4} far={3} color="#000000" />
    </Canvas>
  );
}
