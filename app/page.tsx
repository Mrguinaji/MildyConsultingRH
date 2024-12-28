import { Metadata } from 'next'
import Hero from '@/components/Hero'
import About from '@/app/about/About'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import PodcastSection from '@/components/Podcast'
import Booking from '@/components/Booking'
import { ArrowRight, Clock, Award, Smile, MessageCircle } from 'lucide-react'
import { RainbowButton } from '@/components/ui/rainbow-button'
import TestimonialsSection from '@/components/Testimonials'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Mildy Consulting RH | Innovez vos ressources humaines',
  description: "Mildy Consulting RH vous accompagne dans la transformation et l'innovation de vos pratiques RH.",
}

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="min-h-[90vh] bg-beige-clair relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-5"></div>
        <Hero />
      </section>

      {/* À Propos Section */}
      <section className="py-section bg-white">
        <About />
      </section>

      {/* Services Section avec fond coloré */}
      <section className="py-section bg-gradient-to-br from-beige-clair to-or-doux">
        <Services />
      </section>

      {/* Portfolio Section */}
      <section className="py-section bg-gradient-to-br from-white to-beige-clair/5">
        <div className="container">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-beige-clair/30 rounded-full text-terre-cuite font-medium text-sm mb-4">
              Nos Success Stories
            </span>
            <h2 className="text-4xl md:text-5xl font-heading text-bordeaux mb-6">Nos Réalisations</h2>
            <p className="text-lg text-terre-cuite/90 max-w-2xl mx-auto">
              Découvrez comment nous avons aidé nos clients à transformer leurs pratiques RH et à atteindre leurs objectifs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="mb-6">
                <span className="text-3xl text-bordeaux">01</span>
              </div>
              <h3 className="text-xl font-heading text-bordeaux mb-4">Transformation RH chez TechCorp</h3>
              <p className="text-terre-cuite/80 mb-6">Mise en place d'un système SIRH moderne et formation des équipes pour optimiser les processus RH.</p>
              <div className="flex items-center justify-between text-sm text-terre-cuite/70">
                <span>TechCorp</span>
                <span>6 mois</span>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="mb-6">
                <span className="text-3xl text-bordeaux">02</span>
              </div>
              <h3 className="text-xl font-heading text-bordeaux mb-4">Culture d'innovation chez InnovateNow</h3>
              <p className="text-terre-cuite/80 mb-6">Développement d'un programme de gestion des talents axé sur l'innovation et la créativité.</p>
              <div className="flex items-center justify-between text-sm text-terre-cuite/70">
                <span>InnovateNow</span>
                <span>8 mois</span>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="mb-6">
                <span className="text-3xl text-bordeaux">03</span>
              </div>
              <h3 className="text-xl font-heading text-bordeaux mb-4">Refonte du recrutement pour GrowthStartup</h3>
              <p className="text-terre-cuite/80 mb-6">Implémentation d'un processus de recrutement agile et inclusif pour optimiser l'expérience candidat.</p>
              <div className="flex items-center justify-between text-sm text-terre-cuite/70">
                <span>GrowthStartup</span>
                <span>4 mois</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <Link 
              href="/portfolio" 
              className="inline-flex items-center gap-2 text-terre-cuite hover:text-bordeaux transition-colors group"
            >
              <span className="font-medium">Découvrir tous nos projets</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-section bg-white">
        <TestimonialsSection />
      </section>

      {/* Podcast Section avec fond subtil */}
      <section className="py-section bg-beige-clair/30">
        <PodcastSection />
      </section>

      {/* Section Réservation/Contact avec design amélioré */}
      <section className="py-section relative overflow-hidden bg-gradient-to-b from-white to-beige-clair/20">
        {/* Effet de fond amélioré */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(107,39,55,0.03),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(180,96,96,0.05),transparent_50%)]" />
        </div>

        {/* Contenu principal */}
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-2 bg-beige-clair/30 rounded-full text-terre-cuite font-medium text-sm mb-4">
              Première Consultation Gratuite
            </span>
            <h2 className="text-5xl font-heading text-bordeaux mb-6 leading-tight">
              Commençons à Construire <br />
              Votre Stratégie RH
            </h2>
            <p className="text-xl text-terre-cuite/90 max-w-2xl mx-auto mb-8">
              Transformez vos pratiques RH avec notre expertise. Bénéficiez d'une consultation personnalisée 
              pour définir ensemble vos besoins et élaborer une stratégie sur mesure.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link href="/booking">
                <RainbowButton className="group">
                  <Clock className="w-5 h-5" />
                  Réserver ma consultation
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </RainbowButton>
              </Link>
              <Link href="/contact">
                <RainbowButton className="group">
                  <MessageCircle className="w-5 h-5" />
                  Nous contacter
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </RainbowButton>
              </Link>
            </div>
          </div>

          {/* Cards de consultation avec style amélioré */}
          <div className="relative">
            {/* Effet de lumière subtil */}
            <div className="absolute inset-0 bg-gradient-radial from-white/50 to-transparent blur-3xl"></div>
            <div className="relative">
              <Booking />
            </div>
          </div>

          {/* Avantages avec design amélioré */}
          <div className="mt-20 grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <RainbowButton className="w-full h-full">
                <div className="flex items-start gap-4 p-2">
                  <Clock className="w-8 h-8 text-terre-cuite shrink-0" />
                  <div className="text-left">
                    <div className="font-heading text-lg text-bordeaux mb-2">Flexibilité Garantie</div>
                    <div className="text-sm text-terre-cuite/80">
                      Horaires adaptés à vos disponibilités
                      <br />Consultations en présentiel ou à distance
                    </div>
                  </div>
                </div>
              </RainbowButton>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <RainbowButton className="w-full h-full">
                <div className="flex items-start gap-4 p-2">
                  <Award className="w-8 h-8 text-terre-cuite shrink-0" />
                  <div className="text-left">
                    <div className="font-heading text-lg text-bordeaux mb-2">Expertise Reconnue</div>
                    <div className="text-sm text-terre-cuite/80">
                      15+ années d'expérience
                      <br />Consultants certifiés et spécialisés
                    </div>
                  </div>
                </div>
              </RainbowButton>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <RainbowButton className="w-full h-full">
                <div className="flex items-start gap-4 p-2">
                  <Smile className="w-8 h-8 text-terre-cuite shrink-0" />
                  <div className="text-left">
                    <div className="font-heading text-lg text-bordeaux mb-2">Satisfaction Client</div>
                    <div className="text-sm text-terre-cuite/80">
                      98% de clients satisfaits
                      <br />Accompagnement personnalisé
                    </div>
                  </div>
                </div>
              </RainbowButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

