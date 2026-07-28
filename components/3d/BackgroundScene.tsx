"use client";

/**
 * Ambient 3D Background Scene
 * Subtle animated background elements for sections
 * Features:
 * - Floating particles
 * - Abstract wireframe geometry
 * - Glowing nodes
 * - Slow ambient motion
 */

import { useRef, useMemo, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Sparkles,
  Points,
  PointMaterial,
  Line,
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
const VIOLET = "#c9b4fa";

/**
 * Particle field for ambient atmosphere
 */
function ParticleField({ count = 200, spread = 15, color = AMBER }: {
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
      arr[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.5;
    }
    return arr;
  }, [count, spread]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.02;
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.01) * 0.05;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={0.03}
        sizeAttenuation
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
}

/**
 * Floating wireframe geometric shapes
 */
function FloatingGeometries() {
  return (
    <group>
      {/* Wireframe icosahedron */}
      <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh position={[-8, 3, -8]} scale={1.5}>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial
            color={AMBER}
            wireframe
            transparent
            opacity={0.15}
          />
        </mesh>
      </Float>

      {/* Wireframe octahedron */}
      <Float speed={0.6} rotationIntensity={0.15} floatIntensity={0.25}>
        <mesh position={[9, -2, -6]} scale={1.2}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial
            color={VIOLET}
            wireframe
            transparent
            opacity={0.12}
          />
        </mesh>
      </Float>

      {/* Wireframe torus */}
      <Float speed={0.7} rotationIntensity={0.1} floatIntensity={0.2}>
        <mesh position={[7, 5, -10]} scale={1}>
          <torusGeometry args={[0.8, 0.15, 8, 24]} />
          <meshBasicMaterial
            color={AMBER_DARK}
            wireframe
            transparent
            opacity={0.1}
          />
        </mesh>
      </Float>

      {/* Wireframe dodecahedron */}
      <Float speed={0.9} rotationIntensity={0.18} floatIntensity={0.28}>
        <mesh position={[-6, -4, -7]} scale={0.8}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshBasicMaterial
            color={AMBER}
            wireframe
            transparent
            opacity={0.1}
          />
        </mesh>
      </Float>
    </group>
  );
}

/**
 * Glowing node cluster
 */
function GlowingNodes() {
  const nodesRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 10,
        -8 - Math.random() * 4,
      ] as [number, number, number],
      scale: 0.03 + Math.random() * 0.04,
      speed: 0.5 + Math.random() * 0.5,
      offset: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame(({ clock }) => {
    if (!nodesRef.current) return;
    const t = clock.elapsedTime;
    nodesRef.current.children.forEach((node, i) => {
      if (node instanceof THREE.Mesh) {
        const pulse = 0.7 + Math.sin(t * nodes[i].speed + nodes[i].offset) * 0.3;
        node.scale.setScalar(nodes[i].scale * pulse);
      }
    });
  });

  return (
    <group ref={nodesRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? AMBER : VIOLET}
            emissive={i % 2 === 0 ? AMBER : VIOLET}
            emissiveIntensity={0.8}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Ambient sparkles
 */
function AmbientSparkles() {
  return (
    <>
      <Sparkles
        count={40}
        scale={20}
        size={3}
        speed={0.2}
        color={AMBER}
        opacity={0.15}
      />
      <Sparkles
        count={25}
        scale={18}
        size={2}
        speed={0.15}
        color={VIOLET}
        opacity={0.1}
      />
    </>
  );
}

/**
 * Abstract mesh blob
 */
function AbstractBlob({ position = [0, 0, -10], scale = 3 }: {
  position?: [number, number, number];
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    meshRef.current.rotation.x = t * 0.05;
    meshRef.current.rotation.y = t * 0.08;
  });

  return (
    <Float speed={0.3} rotationIntensity={0.05} floatIntensity={0.1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color={AMBER}
          wireframe
          transparent
          opacity={0.05}
        />
      </mesh>
    </Float>
  );
}

/**
 * Main background scene
 */
function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;

    // Subtle parallax based on mouse
    groupRef.current.position.x = mouse.x * 0.3;
    groupRef.current.position.y = mouse.y * 0.2;
  });

  return (
    <group ref={groupRef}>
      {/* Particle fields at different depths */}
      <ParticleField count={150} spread={20} color={AMBER} />
      <ParticleField count={100} spread={25} color={VIOLET} />

      {/* Floating geometries */}
      <FloatingGeometries />

      {/* Glowing nodes */}
      <GlowingNodes />

      {/* Ambient sparkles */}
      <AmbientSparkles />

      {/* Abstract blobs in far background */}
      <AbstractBlob position={[-15, 8, -20]} scale={4} />
      <AbstractBlob position={[12, -5, -18]} scale={3} />
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
 * Main BackgroundScene component
 * Subtle animated 3D background for page sections
 */
export default function BackgroundScene({ className = "" }: { className?: string }) {
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
        dpr={[1, 1]}
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ background: "transparent" }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "low-power",
        }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Lighting intensity={0.3} colorScheme="mixed" />
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
