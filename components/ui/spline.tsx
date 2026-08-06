'use client'

import { Suspense, lazy, useRef, useState, useCallback, useEffect } from 'react'
import type { Application } from '@splinetool/runtime'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
    scene: string
    className?: string
    onMouseMove?: (e: MouseEvent) => void
}

export function SplineScene({ scene, className, onMouseMove }: SplineSceneProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [splineApp, setSplineApp] = useState<Application | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const mousePosition = useRef({ x: 0, y: 0 })
    const targetLook = useRef({ x: 0, y: 0 })
    const currentLook = useRef({ x: 0, y: 0 })
    const headObjRef = useRef<any>(null)

    // Smooth animation loop for cursor tracking
    useEffect(() => {
        if (!splineApp || !isLoaded) return

        let animationId: number

        const animate = () => {
            if (!headObjRef.current) {
                animationId = requestAnimationFrame(animate)
                return
            }

            // Smooth interpolation for look-at effect
            const lerpFactor = 0.1

            currentLook.current.x += (targetLook.current.x - currentLook.current.x) * lerpFactor
            currentLook.current.y += (targetLook.current.y - currentLook.current.y) * lerpFactor

            // Apply look-at rotation to head - use additive approach
            try {
                const obj = headObjRef.current

                // For looking up/down: rotate X
                // For looking left/right: rotate Y
                // Use the look values as direct rotation offsets
                obj.rotation.x = currentLook.current.x
                obj.rotation.y = currentLook.current.y
                obj.rotation.z = currentLook.current.x * 0.2 // Slight tilt when looking up/down

            } catch {
                // Object might have been removed
            }

            animationId = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            if (animationId) cancelAnimationFrame(animationId)
        }
    }, [splineApp, isLoaded])

    // Find and setup head object after load
    useEffect(() => {
        if (!splineApp || !isLoaded) return

        // Find the main head/object to track
        const objectNames = [
            'Head', 'Robot', 'Object', 'Character', 'Sphere',
            'Cube', 'B'
        ]

        for (const name of objectNames) {
            const obj = splineApp.findObjectByName(name)
            if (obj) {
                headObjRef.current = obj
                console.log(`Found tracking object: ${name}`)
                break
            }
        }

        // If no named object found, try to get the first child of root
        if (!headObjRef.current) {
            try {
                const root = splineApp.findObjectByName('Scene')
                if (root) {
                    const children = (root as any).children || []
                    if (children.length > 0) {
                        headObjRef.current = children[0]
                        console.log('Using root child for tracking')
                    }
                }
            } catch {
                // Ignore
            }
        }
    }, [splineApp, isLoaded])

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!containerRef.current) return

        const rect = containerRef.current.getBoundingClientRect()

        // Normalize cursor position to -1 to 1 range
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1  // -1 (left) to 1 (right)
        const y = ((e.clientY - rect.top) / rect.height) * 2 - 1  // -1 (top) to 1 (bottom)

        mousePosition.current = { x, y }

        // Calculate look-at target
        // X rotation: look down when cursor is at bottom (positive y), up when at top (negative y)
        // Y rotation: look left when cursor is at right (positive x), right when at left (negative x)
        const lookX = y * 0.8   // Up/down rotation (inverted)
        const lookY = x * 1.2  // Left/right rotation (inverted)

        targetLook.current = {
            x: lookX,
            y: lookY
        }

        onMouseMove?.(e)
    }, [onMouseMove])

    useEffect(() => {
        const container = containerRef.current
        if (container) {
            container.addEventListener('mousemove', handleMouseMove)
            return () => {
                container.removeEventListener('mousemove', handleMouseMove)
            }
        }
    }, [handleMouseMove])

    const handleSplineLoad = useCallback((app: Application) => {
        setSplineApp(app)
        setIsLoaded(true)
        console.log('Spline loaded successfully!')

        // Debug: List all object names in the scene
        try {
            const debugObjects: string[] = []
            const namesToTry = [
                'Head', 'Robot', 'Character', 'Sphere', 'Cube',
                'Group', 'Mesh', 'Camera', 'Light', 'B', 'Object'
            ]

            namesToTry.forEach(name => {
                const obj = app.findObjectByName(name)
                if (obj) {
                    debugObjects.push(name)
                }
            })

            if (debugObjects.length > 0) {
                console.log('Found objects:', debugObjects.join(', '))
            } else {
                console.log('No named objects found')
            }
        } catch (err) {
            console.log('Debug error:', err)
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className="w-full h-full relative"
        >
            <Suspense
                fallback={
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="loader"></div>
                    </div>
                }
            >
                <Spline
                    scene={scene}
                    className={className}
                    onLoad={handleSplineLoad}
                />
            </Suspense>

            {/* Loading indicator */}
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-2">
                        <div className="loader"></div>
                        <span className="text-white/70 text-sm">Loading 3D...</span>
                    </div>
                </div>
            )}
        </div>
    )
}
