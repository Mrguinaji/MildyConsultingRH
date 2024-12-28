"use client"

import { cn } from "@/lib/utils"

interface OrbitingCircle {
  icon: React.ReactNode
  radius: number
  duration: number
  delay?: number
  reverse?: boolean
  color?: string
  label: string
  description: string
}

interface OrbitingCirclesProps {
  className?: string
  circles: OrbitingCircle[]
}

export default function OrbitingCircles({
  className,
  circles,
}: OrbitingCirclesProps) {
  return (
    <div className={cn("relative size-[500px]", className)}>
      {/* Cercle central (RH) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="absolute -inset-8 bg-gradient-to-br from-bordeaux/10 to-terre-cuite/5 blur-xl rounded-full" />
          <span className="relative text-7xl font-heading bg-gradient-to-br from-bordeaux to-terre-cuite bg-clip-text text-transparent">
            RH
          </span>
        </div>
      </div>

      {/* Orbites */}
      {circles.map((circle, index) => (
        <div
          key={index}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          {/* Ligne d'orbite */}
          <div
            className="absolute rounded-full border border-dashed border-bordeaux/10"
            style={{
              width: circle.radius * 2,
              height: circle.radius * 2,
              left: -circle.radius,
              top: -circle.radius,
            }}
          />

          {/* Élément en orbite */}
          <div
            className="absolute"
            style={{
              transformOrigin: "0 0",
              animation: `orbit var(--duration) linear infinite${circle.reverse ? " reverse" : ""}`,
              animationDelay: "var(--delay)",
              "--duration": `${circle.duration}s`,
              "--delay": `${circle.delay || 0}s`,
              "--radius": `${circle.radius}px`,
            } as React.CSSProperties}
          >
            <div
              className={cn(
                "absolute group",
                "rounded-full bg-beige-clair",
                "shadow-lg transition-all duration-300 hover:scale-110",
                "border border-bordeaux/10"
              )}
              style={{
                width: "48px",
                height: "48px",
                transform: `translate(${circle.radius - 24}px, -24px)`,
              }}
            >
              {/* Icône */}
              <div 
                className="size-full flex items-center justify-center"
                style={{ color: circle.color }}
              >
                {circle.icon}
              </div>

              {/* Info-bulle */}
              <div 
                className="absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible
                          transition-all duration-200 z-50 pointer-events-none"
                style={{
                  left: "50%",
                  transform: "translateX(-50%)",
                  top: "calc(100% + 8px)",
                  width: "200px",
                }}
              >
                <div className="relative bg-white rounded-lg shadow-xl p-3">
                  {/* Flèche */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 border-8 border-transparent border-b-white" />
                  
                  {/* Contenu */}
                  <p className="font-heading text-sm text-bordeaux mb-1">
                    {circle.label}
                  </p>
                  <p className="text-xs text-terre-cuite/90">
                    {circle.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 