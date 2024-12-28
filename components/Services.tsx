'use client'

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const prestations = [
  {
    title: "Consulting Particulier",
    description: "Accompagnement personnalisé pour votre développement professionnel",
    link: "/services/particuliers",
    image: "/images/consulting-particulier.jpg",
    gradient: "from-bordeaux to-terre-cuite",
  },
  {
    title: "Consulting Professionnel",
    description: "Solutions sur mesure pour les entreprises et organisations",
    link: "/services/professionnels",
    image: "/images/consulting-pro.jpg",
    gradient: "from-terre-cuite to-or-doux",
  },
]

const services = [
  {
    title: "Recrutement & Talent",
    description: "Optimisez votre processus de recrutement et attirez les meilleurs talents",
    category: "pro",
  },
  {
    title: "Formation RH",
    description: "Développez les compétences de vos équipes RH",
    category: "pro",
  },
  {
    title: "Bilan de Compétences",
    description: "Évaluez vos compétences et définissez votre projet professionnel",
    category: "particulier",
  },
  {
    title: "Coaching Carrière",
    description: "Accompagnement personnalisé pour votre évolution professionnelle",
    category: "particulier",
  },
]

export default function Services() {
  return (
    <section className="py-20 bg-gradient-to-b from-beige-clair/50 to-transparent">
      <div className="container">
        {/* En-tête */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-sm font-medium tracking-wider text-terre-cuite uppercase mb-4">
              Services & Prestations
            </h2>
            <h3 className="text-4xl md:text-5xl font-heading text-bordeaux mb-6">
              Notre Expertise à Votre Service
            </h3>
            <p className="text-xl text-terre-cuite/90 max-w-2xl mx-auto">
              Nos prestations de consulting à Paris s'adressent aux particuliers et aux professionnels.
            </p>
          </motion.div>
        </div>

        {/* Prestations principales */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {prestations.map((prestation, index) => (
            <motion.div
              key={prestation.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Link 
                href={prestation.link}
                className="group block relative overflow-hidden rounded-2xl"
              >
                <div className="aspect-[16/9] relative">
                  {/* Overlay gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${prestation.gradient} opacity-90`} />
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-heading text-white mb-2">
                        {prestation.title}
                      </h3>
                      <p className="text-white/90">
                        {prestation.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2 text-white font-medium">
                      <span>Découvrir</span>
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Services détaillés */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-md hover:shadow-xl transition-all"
            >
              <div className="absolute top-0 right-0 px-3 py-1 text-xs font-medium rounded-bl-lg bg-gradient-to-r from-bordeaux to-terre-cuite text-white">
                {service.category === "pro" ? "Professionnel" : "Particulier"}
              </div>
              
              <h4 className="text-lg font-heading text-bordeaux mb-2">
                {service.title}
              </h4>
              <p className="text-sm text-terre-cuite/90">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

