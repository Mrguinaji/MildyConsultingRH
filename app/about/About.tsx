'use client'

import { 
  Users, 
  TrendingUp, 
  Lightbulb, 
  Target,
  MessageCircle,
  FileText,
  BarChart,
  Briefcase
} from "lucide-react"
import OrbitingCircles from "@/components/magicui/orbiting-circles"

const orbits = [
  // Orbite intérieure rapide
  {
    icon: <Users className="size-6" />,
    radius: 80,
    duration: 15,
    color: "#6B2737", // bordeaux
    label: "Gestion des Talents",
    description: "Recrutement, développement et fidélisation des talents"
  },
  {
    icon: <TrendingUp className="size-6" />,
    radius: 80,
    duration: 15,
    delay: 7.5,
    color: "#B46060", // terre-cuite
    label: "Performance RH",
    description: "Optimisation des processus et indicateurs RH"
  },
  // Orbite moyenne
  {
    icon: <Lightbulb className="size-6" />,
    radius: 140,
    duration: 25,
    color: "#DEB887", // or-doux
    label: "Innovation RH",
    description: "Solutions innovantes et transformation digitale"
  },
  {
    icon: <Target className="size-6" />,
    radius: 140,
    duration: 25,
    delay: 12.5,
    color: "#6B2737", // bordeaux
    label: "Stratégie RH",
    description: "Alignement RH avec les objectifs d'entreprise"
  },
  // Orbite extérieure lente
  {
    icon: <MessageCircle className="size-6" />,
    radius: 200,
    duration: 35,
    reverse: true,
    color: "#B46060", // terre-cuite
    label: "Communication",
    description: "Communication interne et marque employeur"
  },
  {
    icon: <FileText className="size-6" />,
    radius: 200,
    duration: 35,
    delay: 17.5,
    reverse: true,
    color: "#DEB887", // or-doux
    label: "Conformité",
    description: "Gestion administrative et conformité légale"
  },
  {
    icon: <Briefcase className="size-6" />,
    radius: 200,
    duration: 35,
    delay: 8.75,
    reverse: true,
    color: "#4A4A4A", // gris-neutre
    label: "Formation",
    description: "Développement des compétences et formation continue"
  },
]

export default function About() {
  return (
    <section className="py-20 overflow-hidden">
      <div className="container relative">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-heading text-bordeaux mb-6">
            Notre Approche
          </h2>
          <p className="text-xl text-terre-cuite/90 max-w-2xl mx-auto leading-relaxed">
            Une vision holistique des ressources humaines, centrée sur l'innovation et l'humain
          </p>
        </div>

        <div className="relative">
          {/* Effet de lumière */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(107,39,55,0.05),transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(180,96,96,0.05),transparent_50%)]" />
          </div>

          {/* Système solaire RH */}
          <div className="flex justify-center py-12">
            <OrbitingCircles circles={orbits} />
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center mt-16">
          <p className="text-lg text-gris-neutre/90 leading-relaxed mb-8">
            Notre approche intégrée combine expertise RH traditionnelle et innovation digitale. 
            Nous plaçons l'humain au cœur de la transformation, en créant des solutions 
            sur-mesure qui répondent aux défis uniques de chaque organisation.
          </p>
          <p className="text-lg text-gris-neutre/90 leading-relaxed">
            De la gestion des talents à la transformation digitale, en passant par 
            le développement de la culture d'entreprise, nous vous accompagnons dans 
            toutes les dimensions de vos enjeux RH.
          </p>
        </div>
      </div>
    </section>
  )
}

