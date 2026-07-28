"use client";

/**
 * Premium Hero 3D Scene
 * Features:
 * - Abstract geometric sculpture with glass-morphism
 * - Interactive mouse parallax
 * - Scroll-based animations
 * - Professional lighting
 * - Floating ambient elements
 */

import { useRef, useMemo, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Sparkles,
  MeshTransmissionMaterial,
  MeshDistortMaterial,
  Environment,
  useTexture,
  RoundedBox,
  Torus,
  Icosahedron,
  Octahedron,
  Dodecahedron,
  Sphere,
} from "@react-three/drei";
import * as THREE from "three";
import { Lighting } from "./Lighting";

// Guard functions
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

// Color palette
const AMBER = "#facc15";
const AMBER_DARK = "#a16207";
const CHARCOAL = "#171614";
const VIOLET = "#c9b4fa";

/**
 * Glass sculpture - Main centerpiece
 */
function GlassSculpture({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current || !meshRef.current) return;

    const t = clock.elapsedTime;

    // Subtle breathing motion
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.08;
    meshRef.current.rotation.y = t * 0.15;
    meshRef.current.rotation.z = Math.sin(t * 0.2) * 0.05;

    // Scroll fade and scale
    const scale = Math.max(0.3, 1 - scrollProgress * 0.5);
    groupRef.current.scale.setScalar(scale);

    // Opacity based on scroll
    if (meshRef.current.material instanceof THREE.MeshPhysicalMaterial) {
      meshRef.current.material.opacity = Math.max(0.2, 1 - scrollProgress * 1.2);
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={groupRef} position={[0, 0, -2]}>
        {/* Main glass torus knot */}
        <mesh ref={meshRef} scale={1.2}>
          <torusKnotGeometry args={[0.8, 0.25, 128, 32, 2, 3]} />
          <MeshTransmissionMaterial
            backside
            samples={8}
            thickness={0.5}
            roughness={0.05}
            transmission={0.95}
            ior={1.5}
            chromaticAberration={0.02}
            color={AMBER}
            envMapIntensity={0.6}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Wireframe overlay for edge definition */}
        <mesh scale={1.21}>
          <torusKnotGeometry args={[0.8, 0.25, 128, 32, 2, 3]} />
          <meshBasicMaterial
            color={AMBER}
            wireframe
            transparent
            opacity={0.15}
          />
        </mesh>
      </group>
    </Float>
  );
}

/**
 * Floating glass icosahedron cluster
 */
function GlassCluster({ position = [0, 0, 0], scale = 1 }: {
  position?: [number, number, number];
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = clock.elapsedTime * 0.2;
    meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.15) * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[0.5, 1]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.3}
          roughness={0.1}
          transmission={0.92}
          ior={1.4}
          color={VIOLET}
          envMapIntensity={0.4}
          transparent
          opacity={0.75}
        />
      </mesh>
    </Float>
  );
}

/**
 * Metallic ring accent
 */
function MetallicRing({ position = [0, 0, 0], scale = 1, rotationSpeed = 0.001 }: {
  position?: [number, number, number];
  scale?: number;
  rotationSpeed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += rotationSpeed;
    meshRef.current.rotation.y += rotationSpeed * 1.5;
  });

  return (
    <Float speed={1.8} rotationIntensity={0.1} floatIntensity={0.2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[0.6, 0.08, 16, 64]} />
        <meshStandardMaterial
          color={AMBER}
          metalness={0.95}
          roughness={0.1}
          emissive={AMBER}
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  );
}

/**
 * Glowing orb accents
 */
function GlowingOrb({ position = [0, 0, 0], size = 0.1, color = AMBER }: {
  position?: [number, number, number];
  size?: number;
  color?: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    const pulse = 0.8 + Math.sin(t * 2 + position[0]) * 0.2;
    (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.4 * pulse;
  });

  return (
    <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={size}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
}

/**
 * Abstract geometric shapes
 */
function GeometricShapes() {
  return (
    <group>
      {/* Small floating octahedrons */}
      <Float speed={2.2} rotationIntensity={0.4} floatIntensity={0.4}>
        <mesh position={[-3, 1.5, -4]} scale={0.3}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={CHARCOAL}
            metalness={0.8}
            roughness={0.2}
            emissive={AMBER}
            emissiveIntensity={0.1}
          />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.3}>
        <mesh position={[3.5, -1, -3]} scale={0.25}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={CHARCOAL}
            metalness={0.8}
            roughness={0.2}
            emissive={VIOLET}
            emissiveIntensity={0.1}
          />
        </mesh>
      </Float>

      {/* Small dodecahedrons */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.35}>
        <mesh position={[-2.5, -2, -5]} scale={0.35}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={AMBER_DARK}
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={0.25} floatIntensity={0.4}>
        <mesh position={[2, 2.5, -4]} scale={0.2}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={AMBER}
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      </Float>
    </group>
  );
}

/**
 * Main scene with mouse parallax
 */
function Scene({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;

    // Smooth mouse parallax
    const targetX = mouse.x * 0.8;
    const targetY = mouse.y * 0.6;

    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.02;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.02;
  });

  return (
    <group ref={groupRef}>
      {/* Main glass sculpture */}
      <GlassSculpture scrollProgress={scrollProgress} />

      {/* Glass cluster */}
      <GlassCluster position={[-2, 0.5, -1]} scale={0.8} />
      <GlassCluster position={[2.5, -0.5, -2]} scale={0.5} />

      {/* Metallic rings */}
      <MetallicRing position={[-1.5, -1.5, -3]} scale={0.7} rotationSpeed={0.002} />
      <MetallicRing position={[1, 2, -2.5]} scale={0.5} rotationSpeed={-0.0015} />

      {/* Glowing orbs */}
      <GlowingOrb position={[3, 1, -4]} size={0.15} color={AMBER} />
      <GlowingOrb position={[-2.5, -1.5, -3]} size={0.12} color={VIOLET} />
      <GlowingOrb position={[1.5, -2, -4.5]} size={0.08} color={AMBER_DARK} />
      <GlowingOrb position={[-1, 2.5, -3.5]} size={0.1} color={AMBER} />

      {/* Geometric accents */}
      <GeometricShapes />

      {/* Sparkles */}
      <Sparkles
        count={60}
        scale={12}
        size={2}
        speed={0.3}
        color={AMBER}
        opacity={0.4}
      />
    </group>
  );
}

/**
 * Loading fallback
 */
function LoadingFallback() {
  return null;
}

/**
 * Main HeroScene component
 */
export default function HeroScene({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // SSR guard
  if (typeof window === "undefined") {
    return null;
  }

  // Capability guards
  if (isMobile() || prefersReducedMotion() || !supportsWebGL()) {
    return null;
  }

  if (!mounted) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.7 }}
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={<LoadingFallback />}>
          {/* Lighting */}
          <Lighting intensity={0.6} colorScheme="mixed" />

          {/* HDRI Environment for reflections */}
          <Environment preset="night" background={false} blur={0.7} />

          {/* Main Scene */}
          <Scene scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
