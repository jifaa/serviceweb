"use client";

/**
 * Interactive Tech Stack 3D Scene
 * Features:
 * - Floating 3D technology icons with brand colors
 * - Hover animations with glow
 * - Smooth idle floating motion
 * - Premium materials
 *
 * Note: Technology brand colors (#61DAFB, #3178C6, etc.) are used intentionally
 * for accurate technology recognition in the tech stack showcase.
 */

import { useRef, useMemo, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Text,
  RoundedBox,
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

const AMBER = "#facc15";
const AMBER_DARK = "#a16207";
const CHARCOAL = "#171614";

// Technology brand colors - intentionally used for accurate tech recognition
// Using official brand colors: React (#61DAFB), TypeScript (#3178C6), Tailwind (#06B6D4), Node (#339933)
const TECH_COLORS = {
  react: "#61DAFB",
  typescript: "#3178C6",
  tailwind: "#06B6D4",
  nodejs: "#339933",
} as const;

interface TechItem {
  name: string;
  color: string;
  position: [number, number, number];
  rotation: [number, number, number];
  floatSpeed: number;
  scale: number;
}

/**
 * Tech icon as glowing sphere with text
 */
function TechSphere({ item }: { item: TechItem }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!meshRef.current || !glowRef.current) return;

    const t = clock.elapsedTime;

    // Subtle rotation
    meshRef.current.rotation.y = t * 0.3 + item.rotation[1];
    meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;

    // Glow pulse
    const pulse = hovered ? 1.2 : 0.8 + Math.sin(t * 2) * 0.2;
    (glowRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.5 * pulse;

    // Scale on hover
    const targetScale = hovered ? item.scale * 1.15 : item.scale;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );
  });

  return (
    <Float speed={item.floatSpeed} rotationIntensity={0.1} floatIntensity={0.3}>
      <group
        position={item.position}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        {/* Main sphere */}
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial
            color={item.color}
            metalness={0.7}
            roughness={0.2}
            emissive={item.color}
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* Glow overlay */}
        <mesh ref={glowRef} scale={1.1}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial
            color={item.color}
            transparent
            opacity={0.3}
            emissive={item.color}
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Text label */}
        <Text
          position={[0, -0.7, 0]}
          fontSize={0.2}
          color={CHARCOAL}
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter.woff"
        >
          {item.name}
        </Text>
      </group>
    </Float>
  );
}

/**
 * Tech icon as rounded box
 */
function TechBox({ item }: { item: TechItem }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const t = clock.elapsedTime;

    // Subtle rotation
    meshRef.current.rotation.y = t * 0.25 + item.rotation[1];
    meshRef.current.rotation.x = Math.cos(t * 0.15) * 0.15;

    // Scale on hover
    const targetScale = hovered ? item.scale * 1.1 : item.scale;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );
  });

  return (
    <Float speed={item.floatSpeed} rotationIntensity={0.08} floatIntensity={0.25}>
      <group
        position={item.position}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <RoundedBox ref={meshRef} args={[0.6, 0.6, 0.6]} radius={0.1} smoothness={4}>
          <meshStandardMaterial
            color={item.color}
            metalness={0.8}
            roughness={0.15}
            emissive={item.color}
            emissiveIntensity={hovered ? 0.4 : 0.2}
          />
        </RoundedBox>

        {/* Text label */}
        <Text
          position={[0, -0.6, 0]}
          fontSize={0.18}
          color={CHARCOAL}
          anchorX="center"
          anchorY="middle"
        >
          {item.name}
        </Text>
      </group>
    </Float>
  );
}

/**
 * Tech icon as ring/torus
 */
function TechRing({ item }: { item: TechItem }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const t = clock.elapsedTime;

    // Continuous rotation
    meshRef.current.rotation.x = t * 0.4;
    meshRef.current.rotation.z = t * 0.2;

    // Scale on hover
    const targetScale = hovered ? item.scale * 1.12 : item.scale;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );
  });

  return (
    <Float speed={item.floatSpeed * 0.8} rotationIntensity={0.05} floatIntensity={0.2}>
      <group
        position={item.position}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <mesh ref={meshRef}>
          <torusGeometry args={[0.35, 0.08, 16, 32]} />
          <meshStandardMaterial
            color={item.color}
            metalness={0.9}
            roughness={0.1}
            emissive={item.color}
            emissiveIntensity={hovered ? 0.5 : 0.25}
          />
        </mesh>

        {/* Text label */}
        <Text
          position={[0, -0.6, 0]}
          fontSize={0.18}
          color={CHARCOAL}
          anchorX="center"
          anchorY="middle"
        >
          {item.name}
        </Text>
      </group>
    </Float>
  );
}

/**
 * Main tech scene content
 */
function TechSceneContent() {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  // Define tech items with brand colors for accurate recognition
  // TECH_COLORS are intentionally outside the main design system for tech recognition
  const techItems: TechItem[] = useMemo(() => [
    {
      name: "React",
      color: TECH_COLORS.react,
      position: [-3, 1, 0],
      rotation: [0, 0, 0],
      floatSpeed: 1.2,
      scale: 1,
    },
    {
      name: "Next.js",
      color: CHARCOAL,
      position: [0, 0.5, 0],
      rotation: [0, 0, 0],
      floatSpeed: 1,
      scale: 1.1,
    },
    {
      name: "TypeScript",
      color: TECH_COLORS.typescript,
      position: [3, 1, 0],
      rotation: [0, 0, 0],
      floatSpeed: 1.3,
      scale: 1,
    },
    {
      name: "Tailwind",
      color: TECH_COLORS.tailwind,
      position: [-1.5, -1, 0],
      rotation: [0, 0, 0],
      floatSpeed: 0.9,
      scale: 0.95,
    },
    {
      name: "Node.js",
      color: TECH_COLORS.nodejs,
      position: [1.5, -1, 0],
      rotation: [0, 0, 0],
      floatSpeed: 1.1,
      scale: 0.95,
    },
  ], []);

  useFrame(() => {
    if (!groupRef.current) return;

    // Subtle parallax
    groupRef.current.rotation.y = mouse.x * 0.1;
    groupRef.current.rotation.x = mouse.y * 0.05;
  });

  return (
    <group ref={groupRef}>
      {techItems.map((item, index) => (
        <TechSphere key={index} item={item} />
      ))}
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
 * TechScene component
 * Interactive floating tech stack icons
 */
export default function TechScene({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (typeof window === "undefined") return null;
  if (isMobile() || prefersReducedMotion() || !supportsWebGL()) return null;
  if (!mounted) return null;

  return (
    <div className={`absolute inset-0 z-0 pointer-events-none ${className}`}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "low-power",
        }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Lighting intensity={0.5} colorScheme="white" />
          <TechSceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
