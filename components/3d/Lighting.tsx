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
