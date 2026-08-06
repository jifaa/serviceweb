'use client'

import { useState, useRef, useCallback } from 'react'
import { SplineScene } from "@/components/ui/spline"
import { Card } from "@/components/ui/shadcn-card"
import { Spotlight } from "@/components/ui/spotlight"

export function SplineSceneBasic() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height
    setMousePosition({ x, y })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setMousePosition({ x: 0, y: 0 })
  }, [])

  return (
    <Card
      ref={containerRef}
      className="w-full h-[500px] bg-black/[0.96] relative overflow-hidden cursor-default"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <div className="flex h-full">
        {/* Left content - Text */}
        <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-50">
            Interactive 3D
          </h1>
          <p className="mt-4 text-neutral-300 max-w-lg">
            Bring your UI to life with beautiful 3D scenes. Create immersive experiences
            that capture attention and enhance your design.
          </p>
        </div>

        {/* Right content - Robot with cursor tracking */}
        <div className="flex-1 relative">
          <div
            className="w-full h-full transition-transform duration-300 ease-out"
            style={{
              transform: `
                perspective(1000px)
                rotateY(${mousePosition.x * 8}deg)
                rotateX(${-mousePosition.y * 5}deg)
                scale3d(1.02, 1.02, 1.02)
              `,
            }}
          >
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </Card>
  )
}
