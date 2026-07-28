/**
 * Professional lighting setup for 3D scenes
 * Includes ambient, directional, point lights, and environment
 */

import { Environment } from "@react-three/drei";

interface LightingProps {
  intensity?: number;
  colorScheme?: "amber" | "white" | "mixed";
}

/**
 * Ambient and directional lighting setup
 */
export function Lighting({ intensity = 0.5, colorScheme = "amber" }: LightingProps) {
  const amberColor = "#facc15";
  const whiteColor = "#ffffff";

  return (
    <>
      {/* Ambient light for base illumination */}
      <ambientLight intensity={intensity * 0.4} color={whiteColor} />

      {/* Main key light - soft directional */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={intensity * 0.8}
        color={whiteColor}
        castShadow={false}
      />

      {/* Fill light - opposite side */}
      <directionalLight
        position={[-10, 5, -5]}
        intensity={intensity * 0.3}
        color={colorScheme === "amber" ? amberColor : whiteColor}
      />

      {/* Rim light - back lighting for edge definition */}
      <directionalLight
        position={[0, 10, -10]}
        intensity={intensity * 0.4}
        color={colorScheme === "amber" ? amberColor : whiteColor}
      />

      {/* Subtle point lights for local illumination */}
      <pointLight
        position={[5, 5, 5]}
        intensity={intensity * 0.5}
        color={whiteColor}
        distance={20}
        decay={2}
      />

      <pointLight
        position={[-5, -5, 3]}
        intensity={intensity * 0.3}
        color={colorScheme === "amber" ? amberColor : whiteColor}
        distance={15}
        decay={2}
      />
    </>
  );
}

/**
 * HDRI Environment for realistic reflections
 */
export function SceneEnvironment({ preset = "night" }: { preset?: "night" | "warehouse" | "studio" }) {
  return (
    <Environment
      preset={preset}
      background={false}
      blur={0.8}
    />
  );
}

/**
 * Spotlight for dramatic accent lighting
 */
export function AccentSpotlight({
  position = [0, 10, 0],
  target = [0, 0, 0],
  intensity = 1,
  angle = 0.3,
  penumbra = 0.5,
  color = "#facc15"
}: {
  position?: [number, number, number];
  target?: [number, number, number];
  intensity?: number;
  angle?: number;
  penumbra?: number;
  color?: string;
}) {
  return (
    <spotLight
      position={position}
      intensity={intensity}
      angle={angle}
      penumbra={penumbra}
      color={color}
      castShadow={false}
      target-position={target}
    />
  );
}

/**
 * Volumetric-style fog for depth
 */
export function SceneFog({ color = "var(--color-primary)", near = 5, far = 30 }: {
  color?: string;
  near?: number;
  far?: number;
}) {
  return <fog attach="fog" args={[color, near, far]} />;
}
