"use client";

/**
 * Premium Hero 3D Scene
 * Features:
 * - Abstract geometric sculpture with glass-morphism
 * - Interactive mouse parallax
 * - Scroll-based animations
 * - Professional lighting
 * - Floating ambient elements spread across full hero section
 */

import { useRef, useMemo, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Sparkles,
  MeshTransmissionMaterial,
  Environment,
  Points,
  PointMaterial,
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
      <group ref={groupRef} position={[0, 0, -3]}>
        {/* Main glass torus knot */}
        <mesh ref={meshRef} scale={2.1}>
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
        <mesh scale={2.1}>
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
 * Floating glass icosahedron - SPREAD ACROSS HERO
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
 * Metallic ring accent - SPREAD ACROSS HERO
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
 * Glowing orb accents - SPREAD ACROSS HERO
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
 * Small floating geometric - SPREAD ACROSS HERO
 */
function FloatingGeometric({ position = [0, 0, 0], scale = 0.3, color = CHARCOAL, geometry = "octahedron" }: {
  position?: [number, number, number];
  scale?: number;
  color?: string;
  geometry?: "octahedron" | "dodecahedron" | "icosahedron";
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    meshRef.current.rotation.x = t * 0.3;
    meshRef.current.rotation.y = t * 0.4;
  });

  return (
    <Float speed={1.5 + Math.random()} rotationIntensity={0.3} floatIntensity={0.4}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {geometry === "octahedron" && <octahedronGeometry args={[1, 0]} />}
        {geometry === "dodecahedron" && <dodecahedronGeometry args={[1, 0]} />}
        {geometry === "icosahedron" && <icosahedronGeometry args={[1, 0]} />}
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          emissive={color === CHARCOAL ? AMBER : color}
          emissiveIntensity={0.1}
          wireframe={color !== CHARCOAL}
          transparent={color !== CHARCOAL}
          opacity={color !== CHARCOAL ? 0.4 : 1}
        />
      </mesh>
    </Float>
  );
}

/**
 * Particle field for ambient atmosphere - SPREAD ACROSS FULL CANVAS
 */
function ParticleField({ count = 300, spread = 25, color = AMBER }: {
  count?: number;
  spread?: number;
  color?: string;
}) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * spread;
      arr[i * 3 + 1] = (Math.random() - 0.5) * spread;
      arr[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.5 - 2;
    }
    return arr;
  }, [count, spread]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.02;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        opacity={0.5}
      />
    </Points>
  );
}

/**
 * Main scene with objects SPREAD ACROSS FULL HERO SECTION
 */
function Scene({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;

    // Smooth mouse parallax
    const targetX = mouse.x * 1.2;
    const targetY = mouse.y * 0.8;

    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.015;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.015;
  });

  return (
    <group ref={groupRef}>
      {/* ========== MAIN GLASS SCULPTURE - CENTER ========== */}
      <GlassSculpture scrollProgress={scrollProgress} />

      {/* ========== GLASS CLUSTERS - SPREAD ACROSS FULL HERO ========== */}
      {/* Left side */}
      <GlassCluster position={[-6, 2, -4]} scale={0.6} />
      <GlassCluster position={[-5, -1.5, -3]} scale={0.4} />
      {/* Center */}
      <GlassCluster position={[0, 3, -5]} scale={0.5} />
      <GlassCluster position={[1, -2.5, -4]} scale={0.35} />
      {/* Right side */}
      <GlassCluster position={[5, 1.5, -3]} scale={0.55} />
      <GlassCluster position={[6, -1, -5]} scale={0.4} />
      {/* Far corners */}
      <GlassCluster position={[-8, -2, -6]} scale={0.3} />
      <GlassCluster position={[8, 2.5, -5]} scale={0.35} />

      {/* ========== METALLIC RINGS - SPREAD ACROSS FULL HERO ========== */}
      {/* Top area */}
      <MetallicRing position={[-3, 4, -4]} scale={0.8} rotationSpeed={0.002} />
      <MetallicRing position={[4, 3.5, -5]} scale={0.6} rotationSpeed={-0.0015} />
      {/* Middle area */}
      <MetallicRing position={[-7, 0, -3]} scale={0.5} rotationSpeed={0.0018} />
      <MetallicRing position={[7, 0.5, -4]} scale={0.45} rotationSpeed={-0.002} />
      {/* Bottom area */}
      <MetallicRing position={[-2, -3.5, -4]} scale={0.55} rotationSpeed={0.0012} />
      <MetallicRing position={[3, -4, -5]} scale={0.4} rotationSpeed={-0.0018} />
      {/* Far edges */}
      <MetallicRing position={[-9, 2, -6]} scale={0.35} rotationSpeed={0.0025} />
      <MetallicRing position={[9, -2, -6]} scale={0.4} rotationSpeed={-0.001} />

      {/* ========== GLOWING ORBS - SPREAD ACROSS FULL HERO ========== */}
      {/* Top left to bottom right diagonal */}
      <GlowingOrb position={[-5, 3, -4]} size={0.12} color={AMBER} />
      <GlowingOrb position={[-2, 2, -3.5]} size={0.08} color={VIOLET} />
      <GlowingOrb position={[0, 1, -4]} size={0.1} color={AMBER} />
      <GlowingOrb position={[2, -1, -3.5]} size={0.08} color={VIOLET} />
      <GlowingOrb position={[5, -2, -4]} size={0.12} color={AMBER} />

      {/* Corners */}
      <GlowingOrb position={[-7, 3.5, -5]} size={0.1} color={VIOLET} />
      <GlowingOrb position={[-8, -1, -6]} size={0.07} color={AMBER_DARK} />
      <GlowingOrb position={[7, 2.5, -5]} size={0.09} color={AMBER} />
      <GlowingOrb position={[8, -1.5, -6]} size={0.08} color={VIOLET} />

      {/* Additional scattered */}
      <GlowingOrb position={[-4, -2.5, -4]} size={0.06} color={AMBER} />
      <GlowingOrb position={[3, 2.5, -5]} size={0.07} color={VIOLET} />
      <GlowingOrb position={[-1, 3.5, -6]} size={0.05} color={AMBER_DARK} />
      <GlowingOrb position={[1, -3, -5]} size={0.06} color={AMBER} />
      <GlowingOrb position={[-6, 0.5, -5]} size={0.05} color={VIOLET} />
      <GlowingOrb position={[6, -0.5, -5]} size={0.06} color={AMBER} />

      {/* ========== FLOATING GEOMETRICS - SPREAD ACROSS FULL HERO ========== */}
      {/* Top row */}
      <FloatingGeometric position={[-5, 4.5, -5]} scale={0.25} color={CHARCOAL} geometry="octahedron" />
      <FloatingGeometric position={[-2, 5, -6]} scale={0.2} color={AMBER} geometry="dodecahedron" />
      <FloatingGeometric position={[1, 4.8, -5.5]} scale={0.22} color={VIOLET} geometry="icosahedron" />
      <FloatingGeometric position={[4, 5, -6]} scale={0.18} color={CHARCOAL} geometry="octahedron" />

      {/* Middle row */}
      <FloatingGeometric position={[-7, 1, -4]} scale={0.28} color={CHARCOAL} geometry="octahedron" />
      <FloatingGeometric position={[-3.5, 0.5, -5]} scale={0.2} color={AMBER} geometry="dodecahedron" />
      <FloatingGeometric position={[2, -0.5, -4]} scale={0.24} color={CHARCOAL} geometry="octahedron" />
      <FloatingGeometric position={[6, 1.5, -5]} scale={0.22} color={VIOLET} geometry="icosahedron" />

      {/* Bottom row */}
      <FloatingGeometric position={[-4, -3, -5]} scale={0.2} color={AMBER} geometry="dodecahedron" />
      <FloatingGeometric position={[-1, -4, -4.5]} scale={0.26} color={CHARCOAL} geometry="octahedron" />
      <FloatingGeometric position={[2, -3.5, -5]} scale={0.18} color={VIOLET} geometry="icosahedron" />
      <FloatingGeometric position={[5, -3, -6]} scale={0.24} color={CHARCOAL} geometry="octahedron" />

      {/* Far corners */}
      <FloatingGeometric position={[-9, 3, -7]} scale={0.15} color={AMBER} geometry="dodecahedron" />
      <FloatingGeometric position={[-8, -2.5, -7]} scale={0.18} color={VIOLET} geometry="icosahedron" />
      <FloatingGeometric position={[8, 3, -7]} scale={0.16} color={CHARCOAL} geometry="octahedron" />
      <FloatingGeometric position={[9, -3, -7]} scale={0.2} color={AMBER} geometry="dodecahedron" />

      {/* ========== PARTICLE FIELDS - FULL CANVAS COVERAGE ========== */}
      <ParticleField count={200} spread={30} color={AMBER} />
      <ParticleField count={150} spread={28} color={VIOLET} />

      {/* ========== SPARKLES - FULL HERO COVERAGE ========== */}
      <Sparkles
        count={80}
        scale={25}
        size={2.5}
        speed={0.3}
        color={AMBER}
        opacity={0.4}
      />
      <Sparkles
        count={50}
        scale={22}
        size={2}
        speed={0.2}
        color={VIOLET}
        opacity={0.3}
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
        camera={{ position: [0, 0, 10], fov: 55 }}
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
