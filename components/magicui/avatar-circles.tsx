"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"

interface Avatar {
  imageUrl: string
  profileUrl: string
  name: string
  role: string
}

interface AvatarCirclesProps {
  className?: string
  numPeople?: number
  avatarUrls: Avatar[]
  moreLink?: string
}

export default function AvatarCircles({
  numPeople,
  className,
  avatarUrls,
  moreLink = "/temoignages",
}: AvatarCirclesProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="relative flex -space-x-6">
        {avatarUrls.map((avatar, index) => (
          <div
            key={index}
            className="group relative transition-transform duration-300 hover:z-10 hover:-translate-y-1"
            style={{
              zIndex: avatarUrls.length - index,
            }}
          >
            <div className="relative">
              <div className="size-20 rounded-full bg-gradient-to-br from-bordeaux/20 to-terre-cuite/20 p-1">
                <div className="size-full rounded-full bg-beige-clair p-0.5">
                  <img
                    className="size-full rounded-full object-cover"
                    src={avatar.imageUrl}
                    width={80}
                    height={80}
                    alt={`${avatar.name} - ${avatar.role}`}
                  />
                </div>
              </div>
            </div>

            {/* Info bulle au survol */}
            <div className="absolute -bottom-24 left-1/2 hidden -translate-x-1/2 transform rounded-xl bg-white p-4 shadow-xl transition-all group-hover:block">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 transform border-8 border-transparent border-b-white" />
              <p className="font-heading text-lg text-bordeaux whitespace-nowrap">{avatar.name}</p>
              <p className="text-sm text-terre-cuite whitespace-nowrap">{avatar.role}</p>
            </div>
          </div>
        ))}

        {(numPeople ?? 0) > 0 && (
          <Link 
            href={moreLink}
            className="group relative transition-transform duration-300 hover:z-10 hover:-translate-y-1"
            style={{ zIndex: 0 }}
          >
            <div className="size-20 rounded-full bg-gradient-to-br from-bordeaux to-terre-cuite p-0.5">
              <div className="flex size-full items-center justify-center rounded-full bg-beige-clair font-medium text-bordeaux group-hover:bg-white transition-colors">
                +{numPeople}
              </div>
            </div>

            {/* Info bulle au survol */}
            <div className="absolute -bottom-24 left-1/2 hidden -translate-x-1/2 transform rounded-xl bg-white p-4 shadow-xl transition-all group-hover:block">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 transform border-8 border-transparent border-b-white" />
              <p className="font-heading text-sm text-bordeaux whitespace-nowrap">Voir tous les témoignages</p>
              <p className="text-xs text-terre-cuite whitespace-nowrap">Découvrez l'ensemble de nos clients satisfaits</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  )
} 