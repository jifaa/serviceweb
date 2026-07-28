# Plan: Menambahkan Elemen 3D ke Website ServiceWeb

## Overview
Menambahkan elemen 3D interaktif ke website portfolio web developer dengan pendekatan **progressive enhancement** — 3D sebagai enhancement visual di atas website yang sudah berfungsi penuh.

## Current State Analysis

| Component | Current | Needs |
|-----------|---------|-------|
| `Hero3DScene.tsx` | Wireframe shapes (icosahedron, torus, octahedron, box, dodecahedron) dengan `meshStandardMaterial wireframe` | Upgrade ke glass-morphism dengan transmission/refraction effects |
| `Services.tsx` | 6 service cards dengan inline SVG icons, `tilt3d={true}` sudah aktif | Ganti SVG dengan CSS 3D icons yang lebih interaktif |
| `Portfolio.tsx` | Cards dengan `tilt3d={true}` tapi tanpa glare | Aktifkan glare effect + depth layers |
| `use3DTilt.ts` | Full tilt implementation dengan glare support | ✅ Already complete |
| `Card.tsx` | Supports `tiltOptions` termasuk glare | ✅ Already complete |

---

## Implementation Tasks

### Task 1: Upgrade Hero3DScene.tsx — Glass Morphism Enhancement
**File:** `components/Hero3DScene.tsx`

**Changes:**
1. **Replace main icosahedron material** from wireframe to glass-morphism:
   - Use `MeshPhysicalMaterial` with `transmission={0.9}`, `roughness={0.05}`, `ior={1.5}`, `thickness={0.5}`, `color: "#facc15"` (amber), `envMapIntensity={0.3}`
   - Add edge glow with a second mesh using `meshStandardMaterial` wireframe amber at lower opacity

2. **Enhance wireframe accents:**
   - Keep wireframe aesthetic for TorusKnot and additional shapes
   - Use amber colors consistently

3. **Add Sparkles ambient effect:**
   - Import `Sparkles` from `@react-three/drei`
   - Add: `<Sparkles count={40} scale={10} size={1.5} speed={0.4} color="#facc15" opacity={0.25} />`
   - Position in the scene group

4. **Keep existing functionality:**
   - Mouse parallax (already implemented)
   - Scroll fade + scale (already implemented)
   - All guards (mobile, reduced-motion, WebGL check)
   - `dpr={[1, 1.5]}`, `powerPreference: "low-power"`

**Code changes:**
```tsx
// Replace meshStandardMaterial on main icosahedron with:
<meshPhysicalMaterial
  color={colors.amber}
  transmission={0.9}
  roughness={0.05}
  ior={1.5}
  thickness={0.5}
  envMapIntensity={0.3}
/>

// Add Sparkles after all shapes
<Sparkles count={40} scale={10} size={1.5} speed={0.4} color={colors.amber} opacity={0.25} />
```

---

### Task 2: Create Service3DIcon Component
**New File:** `components/Service3DIcon.tsx`

**Purpose:** Replace inline SVG icons with CSS 3D icons that have hover animations.

**Approach:** CSS 3D transforms (no WebGL) — lightweight, performant, mobile-friendly.

**Design per service:**
| Service | 3D Shape Description |
|---------|---------------------|
| Landing Page | 3D phone shape (box + rounded corners via CSS) |
| Website UMKM | 3D shopping bag (cylinder-ish via CSS) |
| Dashboard Admin | 3D bar chart (3 bars with different heights) |
| Web Application | 3D globe (sphere via CSS radial gradient) |
| Custom Website | 3D code brackets (`</>` shape) |
| UI/UX Implementation | 3D palette/brush (circle + triangle) |

**Features:**
- CSS `transform-style: preserve-3d` + `perspective`
- Hover: rotateY(15deg) + scale(1.1) + subtle glow
- Use `backdrop-filter: blur()` for glass effect on icon container
- Mobile: return SVG fallback

**Implementation pattern:**
```tsx
"use client";

import { useRef, useEffect, useState } from "react";
import { animate } from "animejs";

interface Service3DIconProps {
  type: "landing-page" | "umkm" | "dashboard" | "webapp" | "custom" | "uiux";
  className?: string;
}

export function Service3DIcon({ type, className = "" }: Service3DIconProps) {
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    setIsFinePointer(
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    );
  }, []);

  // Render SVG fallback on mobile/touch
  if (!isFinePointer) {
    return <div className={className}>{/* SVG fallback */}</div>;
  }

  return (
    <div className={`service-icon-3d ${className}`}>
      {/* CSS 3D shape implementation */}
    </div>
  );
}
```

**CSS styles (inline or globals.css):**
```css
.service-icon-3d {
  transform-style: preserve-3d;
  perspective: 400px;
  transition: transform 0.35s ease-out;
}

.service-icon-3d:hover {
  transform: rotateY(15deg) rotateX(-5deg) scale(1.1);
}
```

---

### Task 3: Update Services.tsx — Integrate Service3DIcon
**File:** `components/Services.tsx`

**Changes:**
1. **Update `services` data array:**
   - Change `icon` field from SVG JSX to string identifier (e.g., `"landing-page"`, `"umkm"`, etc.)
   - This allows Service3DIcon to render the appropriate 3D shape

2. **Import and use Service3DIcon:**
   ```tsx
   import { Service3DIcon } from "./Service3DIcon";

   // In ServiceCard:
   <div className="icon-container">
     <Service3DIcon type={service.iconType} />
   </div>
   ```

3. **Keep anime.js hover animations** on card and icon wrapper (already implemented)

4. **Add entrance animation for icons** using anime.js IntersectionObserver pattern (consistent with codebase):
   ```tsx
   // In ServiceCard, animate icon on mount
   useEffect(() => {
     if (iconRef.current) {
       set(iconRef.current, { opacity: 0, scale: 0.5 });
       // Animation triggered by parent stagger
     }
   }, []);
   ```

---

### Task 4: Update Portfolio.tsx — Enable Glare + Depth Layers
**File:** `components/Portfolio.tsx`

**Changes:**
1. **Add tiltOptions with glare:**
   ```tsx
   <Card
     variant="feature-light"
     tilt3d={true}
     tiltOptions={{
       max: 6,
       scale: 1.02,
       glare: true,
       maxGlare: 0.2
     }}
     ...
   >
   ```

2. **Add internal depth layers:**
   - Image container: `transform: translateZ(-10px)`
   - Title: `transform: translateZ(5px)`
   - This creates parallax depth on tilt

   ```tsx
   {/* Image - goes back on tilt */}
   <div style={{ transform: "translateZ(-10px)", transformStyle: "preserve-3d" }}>
     <img ... />
   </div>

   {/* Content - comes forward on tilt */}
   <div style={{ transform: "translateZ(5px)", transformStyle: "preserve-3d" }}>
     <h3>...</h3>
     <p>...</p>
   </div>
   ```

---

## Files to Modify

| File | Action | Lines Affected |
|------|--------|----------------|
| `components/Hero3DScene.tsx` | Modify | ~80-90 lines (materials, add Sparkles) |
| `components/Service3DIcon.tsx` | **Create** | ~200 lines (new component) |
| `components/Services.tsx` | Modify | ~20 lines (update data, integrate component) |
| `components/Portfolio.tsx` | Modify | ~15 lines (add tiltOptions, depth layers) |

---

## Performance Considerations

| Optimization | Implementation |
|--------------|----------------|
| Mobile guard | CSS media query `(hover: hover) and (pointer: fine)` in Service3DIcon |
| Reduced motion | Already handled by existing `prefersReducedMotion()` check |
| Canvas efficiency | `dpr={[1, 1.5]}`, `powerPreference: "low-power"` (already in Hero) |
| CSS 3D (Services) | No WebGL overhead, pure CSS transforms |
| Lazy loading | Hero3DScene already uses `dynamic()` import |

---

## Testing Checklist

After implementation:
- [ ] `npm run build` exits 0
- [ ] `tsc --noEmit` exits 0
- [ ] Chrome desktop: 3D visible, interactive, smooth 60fps
- [ ] Mobile (or DevTools): 3D NOT rendered, site fully functional
- [ ] Reduce Motion enabled: 3D NOT rendered
- [ ] No horizontal scrollbar
- [ ] TargetCursor still works
- [ ] All existing animations (anime.js) still work

---

## Implementation Order

1. **Task 4 (Portfolio)** — Simplest change, validates tilt/glare work
2. **Task 1 (Hero upgrade)** — Core 3D enhancement
3. **Task 2 (Service3DIcon)** — New component with CSS 3D
4. **Task 3 (Services integration)** — Hook up new component

This order ensures each piece works before moving to the next.
