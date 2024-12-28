'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Calendar, MapPin, Phone, Mail, FileText, PenTool, Linkedin, GraduationCap, Users, Search } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const services = [
  {
    title: "CV Attractif",
    description: "Créez un CV professionnel qui met en valeur vos compétences et expériences.",
    icon: FileText,
    benefits: [
      "Analyse de votre parcours",
      "Mise en page professionnelle",
      "Mots-clés optimisés",
      "Relecture et corrections",
      "Format adapté aux ATS"
    ]
  },
  {
    title: "Lettre de Motivation",
    description: "Rédigez une lettre de motivation percutante qui retient l'attention des recruteurs.",
    icon: PenTool,
    benefits: [
      "Structure personnalisée",
      "Arguments ciblés",
      "Style professionnel",
      "Mise en valeur des compétences",
      "Adaptation à l'entreprise"
    ]
  },
  {
    title: "Profil LinkedIn",
    description: "Optimisez votre présence professionnelle sur LinkedIn pour attirer les recruteurs.",
    icon: Linkedin,
    benefits: [
      "Photo professionnelle",
      "Titre accrocheur",
      "Résumé impactant",
      "Mots-clés stratégiques",
      "Recommandations"
    ]
  },
  {
    title: "Choix Formation",
    description: "Identifiez la formation idéale pour votre projet professionnel.",
    icon: GraduationCap,
    benefits: [
      "Analyse des besoins",
      "Comparatif des organismes",
      "Étude des financements",
      "Validation du projet",
      "Accompagnement administratif"
    ]
  },
  {
    title: "Préparation Entretiens",
    description: "Préparez-vous efficacement pour réussir vos entretiens d'embauche.",
    icon: Users,
    benefits: [
      "Simulation d'entretiens",
      "Questions fréquentes",
      "Langage corporel",
      "Négociation salariale",
      "Feedback personnalisé"
    ]
  },
  {
    title: "Recherche d'Emploi",
    description: "Maîtrisez les techniques de recherche d'emploi efficaces.",
    icon: Search,
    benefits: [
      "Stratégie personnalisée",
      "Réseaux professionnels",
      "Veille du marché",
      "Candidatures spontanées",
      "Suivi des candidatures"
    ]
  }
]

export default function ParticuliersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-beige-clair/20">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-heading text-bordeaux mb-6">
              Consulting Particulier
            </h1>
            <p className="text-xl text-terre-cuite/80 max-w-3xl mx-auto mb-8">
              Un accompagnement à la carte et personnalisé pour votre recherche d'emploi en France métropolitaine et dans les Outre-mer françaises.
            </p>
            <div className="max-w-2xl mx-auto text-terre-cuite/80">
              <p className="mb-6">
                Forts de notre expertise en matière de ressources humaines, nous vous accompagnons de façon personnalisée dans votre démarche, grâce à des conseils professionnels.
              </p>
              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-2 bg-terre-cuite text-beige-clair px-8 py-4 rounded-full hover:bg-bordeaux transition-colors"
              >
                Réserver un appel gratuit
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-heading text-bordeaux text-center mb-12"
          >
            Faites appel à nos services
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow"
              >
                <div className="w-12 h-12 bg-terre-cuite/10 rounded-full flex items-center justify-center mb-6">
                  <service.icon className="w-6 h-6 text-terre-cuite" />
                </div>
                <h3 className="text-2xl font-heading text-bordeaux mb-4">
                  {service.title}
                </h3>
                <p className="text-terre-cuite/80 mb-6">
                  {service.description}
                </p>
                <div className="space-y-3 mb-8">
                  {service.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-terre-cuite shrink-0 mt-0.5" />
                      <span className="text-sm text-terre-cuite/80">{benefit}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center w-full gap-2 bg-terre-cuite text-beige-clair px-6 py-3 rounded-full hover:bg-bordeaux transition-colors"
                >
                  En savoir plus
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-beige-clair/30 rounded-2xl p-8 md:p-12"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-heading text-bordeaux mb-6">
                  Nos Coordonnées
                </h2>
                <p className="text-terre-cuite/80 mb-8">
                  Nous sommes joignables par téléphone ou grâce à un formulaire de contact.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-terre-cuite shrink-0" />
                    <div>
                      <p className="text-terre-cuite">61, rue de Lyon</p>
                      <p className="text-terre-cuite">75012 Paris</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="w-6 h-6 text-terre-cuite" />
                    <a href="tel:0652208794" className="text-terre-cuite hover:text-bordeaux transition-colors">
                      06 52 20 87 94
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-terre-cuite text-beige-clair px-8 py-4 rounded-full hover:bg-bordeaux transition-colors"
                >
                  Nous Contacter
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 