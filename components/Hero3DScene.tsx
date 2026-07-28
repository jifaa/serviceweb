"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

interface Hero3DSceneProps {
  scrollYProgress?: number;
}

// Check device capabilities
const isMobile = () =>
  typeof window !== "undefined" && window.innerWidth < 768;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const supportsWebGL = () => {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
};

// Color palette from project
const colors = {
  amber: "#facc15",
  amberDark: "#a16207",
  dark: "#262211",
  charcoal: "#171614",
};

// Floating shape component
interface FloatingShapeProps {
  geometry: THREE.BufferGeometry;
  color: string;
  position: [number, number, number];
  rotationSpeed: [number, number, number];
  floatSpeed?: number;
  scale?: number;
}

function FloatingShape({
  geometry,
  color,
  position,
  rotationSpeed,
  floatSpeed = 1,
  scale = 1,
}: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!meshRef.current) return;
    // Slow rotation
    meshRef.current.rotation.x += rotationSpeed[0];
    meshRef.current.rotation.y += rotationSpeed[1];
    meshRef.current.rotation.z += rotationSpeed[2];
  });

  return (
    <Float speed={floatSpeed} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <primitive object={geometry} attach="geometry" />
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.5}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
    </Float>
  );
}

// Main scene with mouse parallax and scroll reactivity
interface SceneProps {
  scrollYProgress?: number;
}

function Scene({ scrollYProgress = 0 }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  // Create geometries once with memoization
  const geometries = useMemo(() => ({
    icosahedron: new THREE.IcosahedronGeometry(1, 0),
    torus: new THREE.TorusGeometry(0.8, 0.2, 8, 16),
    octahedron: new THREE.OctahedronGeometry(0.9),
    box: new THREE.BoxGeometry(1, 1, 1),
    dodecahedron: new THREE.DodecahedronGeometry(0.7),
  }), []);

  // Mouse parallax effect
  useFrame(() => {
    if (!groupRef.current) return;

    // Smooth mouse tracking
    const targetX = mouse.x * 0.8;
    const targetY = mouse.y * 0.8;

    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.02;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.02;

    // Scale down based on scroll progress
    const scrollScale = Math.max(0.3, 1 - scrollYProgress * 0.5);
    groupRef.current.scale.setScalar(scrollScale);

    // Fade out based on scroll progress
    const scrollOpacity = Math.max(0, 1 - scrollYProgress * 1.5);
    groupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        child.material.opacity = scrollOpacity * 0.5;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Main icosahedron - largest, center-left */}
      <FloatingShape
        geometry={geometries.icosahedron}
        color={colors.amber}
        position={[-2.5, 0.5, -3]}
        rotationSpeed={[0.002, 0.003, 0.001]}
        floatSpeed={2}
        scale={0.9}
      />

      {/* Torus - right side */}
      <FloatingShape
        geometry={geometries.torus}
        color={colors.amberDark}
        position={[2.8, -0.8, -2]}
        rotationSpeed={[0.001, 0.002, 0.003]}
        floatSpeed={1.5}
        scale={0.7}
      />

      {/* Octahedron - top right */}
      <FloatingShape
        geometry={geometries.octahedron}
        color={colors.amber}
        position={[0.5, 2.2, -4]}
        rotationSpeed={[0.003, 0.001, 0.002]}
        floatSpeed={2.5}
        scale={0.6}
      />

      {/* Small box - bottom left */}
      <FloatingShape
        geometry={geometries.box}
        color={colors.dark}
        position={[-1.8, -2, -2.5]}
        rotationSpeed={[0.002, 0.001, 0.002]}
        floatSpeed={1}
        scale={0.5}
      />

      {/* Dodecahedron - background accent */}
      <FloatingShape
        geometry={geometries.dodecahedron}
        color={colors.charcoal}
        position={[1.5, 1, -5]}
        rotationSpeed={[0.001, 0.003, 0.001]}
        floatSpeed={1.8}
        scale={0.4}
      />

      {/* Additional small icosahedron for depth */}
      <FloatingShape
        geometry={geometries.icosahedron}
        color={colors.amberDark}
        position={[3, 1.5, -4]}
        rotationSpeed={[0.002, 0.001, 0.003]}
        floatSpeed={2.2}
        scale={0.35}
      />
    </group>
  );
}

// Loading fallback
function LoadingFallback() {
  return null;
}

// Main component with guards
export default function Hero3DScene({ scrollYProgress = 0 }: Hero3DSceneProps) {
  // Check capabilities
  if (typeof window === "undefined") {
    return null;
  }

  // Skip on mobile, reduced motion, or no WebGL
  if (isMobile() || prefersReducedMotion() || !supportsWebGL()) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.6 }}
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.5]} // Cap pixel ratio for performance
        camera={{ position: [0, 0, 6], fov: 55 }}
        style={{ background: "transparent" }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "low-power",
        }}
      >
        <Suspense fallback={<LoadingFallback />}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <pointLight
            position={[10, 10, 10]}
            intensity={0.8}
            color="#ffffff"
          />
          <pointLight
            position={[-10, -10, -5]}
            intensity={0.4}
            color={colors.amber}
          />
          <pointLight
            position={[0, 5, 5]}
            intensity={0.3}
            color={colors.amberDark}
          />

          {/* Main Scene */}
          <Scene scrollYProgress={scrollYProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
