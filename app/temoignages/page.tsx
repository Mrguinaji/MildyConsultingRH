"use client"

import { MessageCircle, Star, Clock } from "lucide-react"

const allTestimonials = [
  {
    name: "Sophie Martin",
    role: "DRH, Tech Solutions",
    testimonial: "L'accompagnement de Mildy Consulting a été déterminant dans la transformation de notre département RH. Leur approche innovante et personnalisée a permis d'améliorer significativement nos processus.",
    date: "Il y a 2 semaines",
    avatar: "https://i.pravatar.cc/300?img=1"
  },
  {
    name: "Thomas Dubois",
    role: "CEO, StartupFlow",
    testimonial: "Une expertise remarquable et un véritable partenariat qui nous a permis de structurer notre stratégie RH de manière efficace et durable.",
    date: "Il y a 1 mois",
    avatar: "https://i.pravatar.cc/300?img=2"
  },
  {
    name: "Marie Leroy",
    role: "Responsable RH, InnovCorp",
    testimonial: "Professionnalisme, écoute et solutions adaptées. Mildy Consulting nous a aidés à moderniser nos pratiques RH avec des résultats concrets.",
    date: "Il y a 2 mois",
    avatar: "https://i.pravatar.cc/300?img=3"
  },
  // ... ajoutez plus de témoignages ici
]

function TestimonialCard({ name, role, testimonial, date, avatar }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start gap-4">
        <img
          src={avatar}
          alt={name}
          className="size-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading text-lg text-bordeaux">{name}</h3>
              <p className="text-sm text-terre-cuite">{role}</p>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-4 text-or-doux" />
              ))}
            </div>
          </div>
          
          <p className="mt-4 text-gris-neutre/90">{testimonial}</p>
          
          <div className="mt-4 flex items-center gap-2 text-sm text-gris-neutre/70">
            <Clock className="size-4" />
            <time>{date}</time>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TemoignagesPage() {
  return (
    <div className="container py-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-heading text-bordeaux mb-6">
          Témoignages de nos clients
        </h1>
        <p className="text-xl text-terre-cuite/90 max-w-2xl mx-auto">
          Découvrez les retours d'expérience de nos clients et comment nous les avons 
          accompagnés dans leur transformation RH
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allTestimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </div>
  )
} 