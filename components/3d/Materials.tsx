/**
 * Premium material definitions for 3D scenes
 * Uses glass-morphism, metallic, and frosted materials
 */

import * as THREE from "three";

// Color palette
export const COLORS = {
  amber: "#facc15",
  amberDark: "#a16207",
  charcoal: "#171614",
  deep: "#0d0c0a",
  violet: "#c9b4fa",
  white: "#ffffff",
  glass: "rgba(250, 204, 21, 0.1)",
} as const;

/**
 * Frosted glass material with transmission
 */
export function createFrostedGlassMaterial(options?: {
  color?: string;
  transmission?: number;
  roughness?: number;
  thickness?: number;
}): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: options?.color || COLORS.amber,
    transmission: options?.transmission ?? 0.9,
    roughness: options?.roughness ?? 0.1,
    thickness: options?.thickness ?? 0.5,
    ior: 1.5,
    envMapIntensity: 0.5,
    transparent: true,
    opacity: 0.9,
  });
}

/**
 * Metallic gold/amber material for accents
 */
export function createMetallicMaterial(options?: {
  color?: string;
  metalness?: number;
  roughness?: number;
  emissive?: string;
  emissiveIntensity?: number;
}): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: options?.color || COLORS.amber,
    metalness: options?.metalness ?? 0.9,
    roughness: options?.roughness ?? 0.1,
    emissive: options?.emissive || COLORS.amber,
    emissiveIntensity: options?.emissiveIntensity ?? 0.3,
  });
}

/**
 * Wireframe material for geometric accents
 */
export function createWireframeMaterial(options?: {
  color?: string;
  opacity?: number;
}): THREE.MeshBasicMaterial {
  return new THREE.MeshBasicMaterial({
    color: options?.color || COLORS.amber,
    wireframe: true,
    transparent: true,
    opacity: options?.opacity ?? 0.3,
  });
}

/**
 * Emissive material for glowing elements
 */
export function createEmissiveMaterial(options?: {
  color?: string;
  intensity?: number;
  opacity?: number;
}): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: options?.color || COLORS.amber,
    emissive: options?.color || COLORS.amber,
    emissiveIntensity: options?.intensity ?? 0.5,
    transparent: true,
    opacity: options?.opacity ?? 0.8,
  });
}

/**
 * Create a glass panel with edge glow
 */
export function createGlassPanelMaterial(options?: {
  color?: string;
  opacity?: number;
}): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: options?.color || COLORS.white,
    transmission: 0.95,
    roughness: 0.05,
    thickness: 0.1,
    ior: 1.3,
    transparent: true,
    opacity: options?.opacity ?? 0.15,
  });
}
