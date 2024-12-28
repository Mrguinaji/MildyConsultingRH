'use client'

import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const allTestimonials = [
  {
    name: "Marie L.",
    role: "Directrice RH",
    company: "Entreprise Tech",
    body: "Une approche innovante qui a transformé notre vision des RH. L'accompagnement personnalisé nous a permis d'atteindre nos objectifs rapidement.",
    date: "Janvier 2024"
  },
  {
    name: "Thomas D.",
    role: "CEO",
    company: "Startup Innovation",
    body: "Un accompagnement d'excellence qui a dynamisé notre entreprise. Les solutions proposées étaient parfaitement adaptées à nos besoins.",
    date: "Décembre 2023"
  },
  {
    name: "Sarah K.",
    role: "DRH",
    company: "Groupe International",
    body: "Des solutions concrètes et adaptées à nos enjeux. Une expertise remarquable dans la transformation des processus RH.",
    date: "Novembre 2023"
  },
  {
    name: "Pierre M.",
    role: "Directeur",
    company: "PME Industrielle",
    body: "Un partenariat qui a révolutionné notre culture d'entreprise. Les résultats ont dépassé nos attentes.",
    date: "Octobre 2023"
  },
  {
    name: "Sophie B.",
    role: "Manager RH",
    company: "Cabinet Conseil",
    body: "Des solutions innovantes et sur mesure qui ont permis d'améliorer significativement notre performance RH.",
    date: "Septembre 2023"
  },
  {
    name: "Jean D.",
    role: "DRH",
    company: "Groupe Retail",
    body: "Un accompagnement personnalisé qui fait la différence. L'expertise et le professionnalisme sont au rendez-vous.",
    date: "Août 2023"
  },
  {
    name: "Claire M.",
    role: "Responsable RH",
    company: "Entreprise Média",
    body: "Une collaboration fructueuse qui nous a permis de moderniser nos pratiques RH et d'améliorer l'engagement de nos équipes.",
    date: "Juillet 2023"
  },
  {
    name: "Laurent P.",
    role: "Directeur Général",
    company: "PME Services",
    body: "Un impact significatif sur notre organisation. Les conseils stratégiques ont été déterminants dans notre transformation.",
    date: "Juin 2023"
  }
]

const TestimonialCard = ({ testimonial, index }: { testimonial: typeof allTestimonials[0], index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className={`
      relative p-8 rounded-xl
      bg-gradient-to-br from-white/[0.08] to-transparent
      backdrop-blur-sm
      border border-white/[0.08]
      transition-all duration-500
      hover:border-white/[0.12] hover:from-white/[0.12]
    `}
  >
    <div className="flex flex-col h-full">
      <p className="text-[15px] font-light tracking-wide text-white/90 mb-6">
        "{testimonial.body}"
      </p>
      
      <div className="mt-auto">
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
          <div>
            <p className="text-[14px] font-medium text-white tracking-wide">
              {testimonial.name}
            </p>
            <p className="text-[13px] text-white/70 tracking-wide">
              {testimonial.role} • {testimonial.company}
            </p>
            <p className="text-[12px] text-white/50 mt-1">
              {testimonial.date}
            </p>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
)

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      {/* Effets de fond */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05),transparent_50%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>
          
          <h1 className="text-4xl font-heading text-white mb-4">
            Témoignages Clients
          </h1>
          <p className="text-lg text-white/70">
            Découvrez les retours d'expérience de nos clients et leurs succès en matière de transformation RH.
          </p>
        </div>

        {/* Grille de témoignages */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allTestimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.name} 
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  )
} 