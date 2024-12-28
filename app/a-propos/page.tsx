'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Podcast, Users, Rocket, ArrowRight, Calendar, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { RainbowButton } from '@/components/ui/rainbow-button'

export default function AboutPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <main className="min-h-screen pt-24 pb-16">
      {/* En-tête avec effet parallaxe */}
      <section className="relative h-[40vh] overflow-hidden bg-gradient-to-b from-beige-clair to-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(180,96,96,0.05),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(107,39,55,0.05),transparent_50%)]" />
        </div>
        <div className="container relative h-full flex flex-col justify-center items-center text-center">
          <motion.h1 
            className="text-5xl md:text-6xl font-heading text-bordeaux mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            À Propos
          </motion.h1>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-terre-cuite to-bordeaux rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>
      </section>

      {/* Contenu principal */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-12">
            {/* Introduction */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-beige-clair/30 rounded-xl">
                  <MapPin className="w-6 h-6 text-terre-cuite" />
                </div>
                <div>
                  <h2 className="text-2xl font-heading text-bordeaux mb-4">Notre Cabinet</h2>
                  <p className="text-terre-cuite/80 leading-relaxed mb-4">
                    Au cœur du 12e arrondissement de Paris, MILDY CONSULTING RH se distingue comme un cabinet de conseil innovant, spécialisé dans la transformation des ressources humaines. Notre expertise unique combine vision stratégique et approche humaine pour répondre aux défis RH d'aujourd'hui et de demain.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-terre-cuite" />
                      <span className="text-sm text-terre-cuite/80">Excellence RH</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-terre-cuite" />
                      <span className="text-sm text-terre-cuite/80">Approche Humaine</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-terre-cuite" />
                      <span className="text-sm text-terre-cuite/80">Disponibilité</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Notre Mission */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-beige-clair/30 rounded-xl">
                  <Rocket className="w-6 h-6 text-terre-cuite" />
                </div>
                <div>
                  <h2 className="text-2xl font-heading text-bordeaux mb-4">Notre Mission</h2>
                  <p className="text-terre-cuite/80 leading-relaxed mb-6">
                    Notre mission est double : propulser les carrières individuelles vers de nouveaux sommets et transformer les entreprises en environnements de travail épanouissants et performants. Nous croyons fermement qu'une approche personnalisée est la clé du succès.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-beige-clair/10 p-4 rounded-xl">
                      <h3 className="font-heading text-bordeaux mb-2">Pour les Particuliers</h3>
                      <p className="text-terre-cuite/80 text-sm">
                        Coaching personnalisé, stratégies de carrière sur mesure et accompagnement vers l'excellence professionnelle.
                      </p>
                    </div>
                    <div className="bg-beige-clair/10 p-4 rounded-xl">
                      <h3 className="font-heading text-bordeaux mb-2">Pour les Entreprises</h3>
                      <p className="text-terre-cuite/80 text-sm">
                        Solutions RH innovantes, optimisation des processus et création d'une culture d'entreprise performante.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Notre Fondatrice */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative h-[600px] md:h-[700px] rounded-xl overflow-hidden">
                  <Image
                    src="/images/fondatrice.jpg"
                    alt="Ingrid DEJEAN - Fondatrice de MILDY CONSULTING RH"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bordeaux/50 to-transparent" />
                </div>
                <div>
                  <div className="p-3 bg-beige-clair/30 rounded-xl inline-block mb-4">
                    <Users className="w-6 h-6 text-terre-cuite" />
                  </div>
                  <h2 className="text-2xl font-heading text-bordeaux mb-4">Ingrid DEJEAN</h2>
                  <h3 className="text-lg text-terre-cuite mb-4">Fondatrice & Consultante RH Senior</h3>
                  <p className="text-terre-cuite/80 leading-relaxed mb-6">
                    Passionnée par les ressources humaines et l'innovation, Ingrid DEJEAN a fondé MILDY CONSULTING RH avec une vision claire : révolutionner l'approche RH traditionnelle. Son expertise unique et sa compréhension approfondie des enjeux actuels font d'elle une référence dans le domaine.
                  </p>
                  <p className="text-terre-cuite/80 leading-relaxed mb-6">
                    Co-créatrice d'un podcast RH dynamique et engageant, elle partage régulièrement ses connaissances et insights sur les dernières tendances du secteur.
                  </p>
                  <Link href="/podcast" className="inline-flex items-center gap-2 text-terre-cuite hover:text-bordeaux transition-colors">
                    <Podcast className="w-5 h-5" />
                    <span>Découvrir notre podcast</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Section Contact */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <h2 className="text-2xl font-heading text-bordeaux mb-6">
              Prêt à Transformer Votre Approche RH ?
            </h2>
            <p className="text-terre-cuite/80 mb-8 max-w-2xl mx-auto">
              Que vous soyez un particulier en quête d'évolution professionnelle ou une entreprise souhaitant optimiser sa stratégie RH, nous sommes là pour vous accompagner vers le succès.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link href="/contact">
                <RainbowButton className="group">
                  <Phone className="w-5 h-5" />
                  Discutons de Votre Projet
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </RainbowButton>
              </Link>
              <Link href="/booking">
                <RainbowButton className="group">
                  <Calendar className="w-5 h-5" />
                  Réserver une Consultation
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </RainbowButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

