"use client";

import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Suspense, useState } from "react";
import Nailong from "./Nailong";
import ModelBoundary, { MissingModelNotice } from "./ModelBoundary";

function LoadingFallback() {
  return (
    <mesh position={[0, 0.2, 0]}>
      <sphereGeometry args={[0.62, 16, 16]} />
      <meshStandardMaterial color="#f7d879" roughness={0.75} />
    </mesh>
  );
}

function DioramaPedestal() {
  return (
    <group position={[0, -0.95, 0]}>
      <mesh position={[0, -0.06, 0]}>
        <cylinderGeometry args={[1.15, 1.28, 0.14, 28]} />
        <meshStandardMaterial color="#e8a8b8" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.01, 0]}>
        <cylinderGeometry args={[0.98, 1.05, 0.04, 28]} />
        <meshStandardMaterial color="#fff0f5" roughness={0.9} />
      </mesh>
    </group>
  );
}

export default function NailongWorld({
  onReact
}: {
  onReact: (clipName?: string) => void;
}) {
  const [modelFailed, setModelFailed] = useState(false);

  if (modelFailed) {
    return <MissingModelNotice />;
  }

  return (
    <ModelBoundary onError={() => setModelFailed(true)}>
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <Canvas
          resize={{ scroll: false, debounce: { scroll: 50, resize: 50 } }}
          dpr={[1, 1.25]}
          camera={{ position: [0, 0.35, 4.7], fov: 36 }}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: true
          }}
          style={{
            background: "transparent",
            width: "100%",
            height: "100%",
            display: "block"
          }}
        >
          <ambientLight intensity={1.4} color="#fffaf2" />
          <hemisphereLight args={["#fff6e7", "#e8d5bd", 1.1]} />
          <directionalLight
            position={[3, 5, 4]}
            intensity={1.8}
            color="#fff7e6"
          />
          <directionalLight
            position={[-3, 2, 2]}
            intensity={0.7}
            color="#f2afc0"
          />
          <ModelBoundary
            fallback={<LoadingFallback />}
            onError={() => setModelFailed(true)}
          >
            <Suspense fallback={<LoadingFallback />}>
              <Float speed={1.3} rotationIntensity={0.05} floatIntensity={0.1}>
                <Nailong onReact={onReact} />
              </Float>
              <DioramaPedestal />
            </Suspense>
          </ModelBoundary>
        </Canvas>
      </div>
    </ModelBoundary>
  );
}
