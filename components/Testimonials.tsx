'use client'

import AvatarCircles from "@/components/magicui/avatar-circles"

const clients = [
  {
    imageUrl: "https://i.pravatar.cc/300?img=1",
    profileUrl: "#",
    name: "Sophie Martin",
    role: "DRH, Tech Solutions"
  },
  {
    imageUrl: "https://i.pravatar.cc/300?img=2",
    profileUrl: "#",
    name: "Thomas Dubois",
    role: "CEO, StartupFlow"
  },
  {
    imageUrl: "https://i.pravatar.cc/300?img=3",
    profileUrl: "#",
    name: "Marie Leroy",
    role: "Responsable RH, InnovCorp"
  },
  {
    imageUrl: "https://i.pravatar.cc/300?img=4",
    profileUrl: "#",
    name: "Alexandre Bernard",
    role: "Directeur Général, PME+"
  },
  {
    imageUrl: "https://i.pravatar.cc/300?img=5",
    profileUrl: "#",
    name: "Claire Dupont",
    role: "DRH, FutureTech"
  },
  {
    imageUrl: "https://i.pravatar.cc/300?img=6",
    profileUrl: "#",
    name: "Laurent Moreau",
    role: "CEO, Digital Solutions"
  }
]

export default function TestimonialsSection() {
  return (
    <section className="py-20 overflow-hidden">
      <div className="container relative">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-heading text-bordeaux mb-6">
            Ils nous font confiance
          </h2>
          <p className="text-xl text-terre-cuite/90 max-w-2xl mx-auto leading-relaxed">
            Découvrez les professionnels qui nous ont fait confiance pour transformer leurs pratiques RH
          </p>
        </div>

        <div className="relative py-12">
          {/* Effet de lumière */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(107,39,55,0.1),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(180,96,96,0.1),transparent_50%)]" />
          </div>
          
          {/* Avatars */}
          <div className="relative flex flex-col items-center gap-16">
            <AvatarCircles
              avatarUrls={clients}
              numPeople={15}
              className="justify-center"
            />
          </div>
        </div>

        <div className="max-w-2xl mx-auto text-center mt-8">
          <p className="text-lg text-gris-neutre/90">
            Rejoignez plus de 50 entreprises qui ont déjà transformé leur approche RH 
            avec Mildy Consulting. Notre expertise fait la différence dans leur succès quotidien.
          </p>
        </div>
      </div>
    </section>
  )
} 