'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, ArrowUpRight, MessageCircle, Calendar,
  Users, TrendingUp, Lightbulb, Headphones, Target,
  BarChart, Shield, Award, ChevronRight, CheckCircle,
  Clock, DollarSign, FileText, Briefcase, GraduationCap,
  Building2, UserCircle
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { RainbowButton } from '@/components/ui/rainbow-button'
import { Toaster } from 'sonner'

interface Service {
  icon: any
  title: string
  description: string
  benefits: string[]
  features: {
    icon: any
    title: string
    description: string
  }[]
  pricing?: {
    price: string
    duration: string
    features: string[]
  }
  cta: {
    text: string
    link: string
  }
}

type ServiceType = 'professionnels' | 'particuliers'

const servicesParticuliers: Service[] = [
  {
    icon: FileText,
    title: "CV & Lettre de Motivation",
    description: "Optimisez vos candidatures avec des documents professionnels qui mettent en valeur votre parcours et vos compétences.",
    benefits: [
      "CV optimisé pour les ATS",
      "Mise en valeur de vos réalisations",
      "Style moderne et professionnel",
      "Lettre de motivation personnalisée"
    ],
    features: [
      {
        icon: Target,
        title: "Analyse du profil",
        description: "Étude approfondie de votre parcours et de vos objectifs professionnels."
      },
      {
        icon: FileText,
        title: "Rédaction sur mesure",
        description: "Création de documents adaptés à votre secteur et niveau d'expérience."
      },
      {
        icon: Shield,
        title: "Suivi personnalisé",
        description: "Accompagnement et révisions jusqu'à votre satisfaction complète."
      }
    ],
    pricing: {
      price: "À partir de 150€",
      duration: "Délai 48-72h",
      features: [
        "CV professionnel",
        "Lettre de motivation",
        "2 révisions incluses",
        "Format Word et PDF",
        "Version anglaise en option"
      ]
    },
    cta: {
      text: "Commander votre CV",
      link: "/contact"
    }
  },
  {
    icon: Briefcase,
    title: "Coaching Carrière",
    description: "Bénéficiez d'un accompagnement personnalisé pour définir et atteindre vos objectifs professionnels.",
    benefits: [
      "Vision claire de vos objectifs",
      "Stratégie de carrière définie",
      "Confiance renforcée",
      "Plan d'action concret"
    ],
    features: [
      {
        icon: Target,
        title: "Bilan professionnel",
        description: "Analyse de votre parcours et identification de vos aspirations."
      },
      {
        icon: GraduationCap,
        title: "Développement personnel",
        description: "Travail sur vos soft skills et votre personal branding."
      },
      {
        icon: BarChart,
        title: "Plan d'action",
        description: "Définition d'objectifs SMART et des étapes pour les atteindre."
      }
    ],
    pricing: {
      price: "90€/heure",
      duration: "Pack 5 séances recommandé",
      features: [
        "Séances individuelles",
        "Exercices pratiques",
        "Support entre les séances",
        "Suivi des progrès",
        "Outils et ressources"
      ]
    },
    cta: {
      text: "Commencer le coaching",
      link: "/booking"
    }
  },
  {
    icon: UserCircle,
    title: "Personal Branding",
    description: "Développez votre marque personnelle et augmentez votre visibilité professionnelle sur LinkedIn et autres réseaux.",
    benefits: [
      "Profil LinkedIn optimisé",
      "Visibilité accrue",
      "Réseau professionnel étendu",
      "Image professionnelle renforcée"
    ],
    features: [
      {
        icon: Target,
        title: "Audit de présence",
        description: "Analyse de votre présence en ligne actuelle et recommandations."
      },
      {
        icon: Shield,
        title: "Stratégie de contenu",
        description: "Plan de publication et conseils pour engager votre audience."
      },
      {
        icon: Users,
        title: "Networking",
        description: "Techniques pour développer votre réseau professionnel."
      }
    ],
    pricing: {
      price: "À partir de 300€",
      duration: "Programme sur 1 mois",
      features: [
        "Audit complet",
        "Optimisation LinkedIn",
        "Stratégie éditoriale",
        "Formation posting",
        "Suivi personnalisé"
      ]
    },
    cta: {
      text: "Développer votre marque",
      link: "/contact"
    }
  }
]

const servicesPro: Service[] = [
  {
    icon: Users,
    title: "Gestion des talents",
    description: "Optimisez votre capital humain avec nos solutions de gestion des talents sur mesure. De l'acquisition à la rétention, nous vous accompagnons dans chaque étape.",
    benefits: [
      "Réduction du turnover de 35%",
      "Amélioration de l'engagement des employés",
      "Processus de recrutement optimisé",
      "Développement des compétences ciblé"
    ],
    features: [
      {
        icon: Target,
        title: "Recrutement stratégique",
        description: "Identification et attraction des meilleurs talents adaptés à votre culture d'entreprise."
      },
      {
        icon: BarChart,
        title: "Évaluation des performances",
        description: "Mise en place de systèmes d'évaluation objectifs et motivants."
      },
      {
        icon: Shield,
        title: "Fidélisation",
        description: "Stratégies personnalisées pour retenir vos talents clés."
      }
    ],
    pricing: {
      price: "Sur devis",
      duration: "Engagement minimum 3 mois",
      features: [
        "Audit initial approfondi",
        "Plan d'action personnalisé",
        "Suivi mensuel des KPIs",
        "Formation des managers",
        "Support continu"
      ]
    },
    cta: {
      text: "Optimisez vos talents",
      link: "/contact"
    }
  },
  {
    icon: TrendingUp,
    title: "Transformation RH",
    description: "Accompagnement dans la digitalisation et l'optimisation de vos processus RH pour une gestion plus efficace et moderne de vos ressources humaines.",
    benefits: [
      "Gain de productivité de 40%",
      "Réduction des coûts administratifs",
      "Meilleure expérience employé",
      "Processus RH automatisés"
    ],
    features: [
      {
        icon: Lightbulb,
        title: "Audit & Stratégie",
        description: "Analyse complète de vos processus actuels et définition de la roadmap de transformation."
      },
      {
        icon: TrendingUp,
        title: "Digitalisation",
        description: "Implémentation d'outils SIRH modernes et formation des équipes."
      },
      {
        icon: Users,
        title: "Change Management",
        description: "Accompagnement des équipes dans la transition et adoption des nouveaux processus."
      }
    ],
    pricing: {
      price: "À partir de 15K€",
      duration: "6 à 12 mois",
      features: [
        "Audit des processus existants",
        "Sélection et déploiement SIRH",
        "Formation des utilisateurs",
        "Support post-déploiement",
        "Mesure des résultats"
      ]
    },
    cta: {
      text: "Transformez vos RH",
      link: "/contact"
    }
  },
  {
    icon: Lightbulb,
    title: "Culture d'entreprise",
    description: "Développez une culture d'entreprise forte et positive qui favorise l'engagement, l'innovation et la performance collective.",
    benefits: [
      "Engagement employés +45%",
      "Innovation accrue",
      "Marque employeur renforcée",
      "Collaboration améliorée"
    ],
    features: [
      {
        icon: Target,
        title: "Diagnostic culturel",
        description: "Évaluation de votre culture actuelle et définition des valeurs cibles."
      },
      {
        icon: Users,
        title: "Programme d'engagement",
        description: "Mise en place d'initiatives pour renforcer l'adhésion aux valeurs."
      },
      {
        icon: Award,
        title: "Leadership",
        description: "Formation des managers aux pratiques de leadership positif."
      }
    ],
    cta: {
      text: "Cultivez l'excellence",
      link: "/contact"
    }
  },
  {
    icon: Headphones,
    title: "Conseil stratégique",
    description: "Alignez votre stratégie RH avec vos objectifs business pour maximiser la performance et la croissance de votre organisation.",
    benefits: [
      "ROI mesurable",
      "Objectifs alignés",
      "Décisions éclairées",
      "Vision long terme"
    ],
    features: [
      {
        icon: BarChart,
        title: "Analyse stratégique",
        description: "Évaluation de l'alignement entre RH et objectifs business."
      },
      {
        icon: Target,
        title: "Planning RH",
        description: "Développement de plans RH adaptés à vos ambitions."
      },
      {
        icon: Shield,
        title: "Gestion des risques",
        description: "Identification et mitigation des risques RH."
      }
    ],
    pricing: {
      price: "1500€ / jour",
      duration: "Missions ponctuelles ou récurrentes",
      features: [
        "Diagnostic initial",
        "Recommandations stratégiques",
        "Plan d'action détaillé",
        "Accompagnement mise en œuvre",
        "Reporting régulier"
      ]
    },
    cta: {
      text: "Définissez votre stratégie",
      link: "/contact"
    }
  }
]

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [serviceType, setServiceType] = useState<ServiceType>('professionnels')

  const currentServices = serviceType === 'professionnels' ? servicesPro : servicesParticuliers

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-beige-clair/20 pt-28 pb-20">
      <Toaster richColors />

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Navigation */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-terre-cuite hover:text-bordeaux mb-16 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          Retour à l'accueil
        </Link>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl font-heading text-bordeaux mb-8">
            Nos Services
          </h1>
          <p className="text-xl text-terre-cuite/80 leading-relaxed max-w-3xl mx-auto mb-12">
            Des solutions RH sur-mesure pour transformer et dynamiser vos ressources humaines.
            Découvrez nos services spécialisés et commencez votre transformation dès aujourd'hui.
          </p>

          {/* Toggle services type */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setServiceType('professionnels')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                serviceType === 'professionnels'
                  ? 'bg-terre-cuite text-white'
                  : 'bg-beige-clair/20 text-terre-cuite hover:bg-beige-clair/30'
              }`}
            >
              <Building2 className="w-5 h-5" />
              Entreprises
            </button>
            <button
              onClick={() => setServiceType('particuliers')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                serviceType === 'particuliers'
                  ? 'bg-terre-cuite text-white'
                  : 'bg-beige-clair/20 text-terre-cuite hover:bg-beige-clair/30'
              }`}
            >
              <UserCircle className="w-5 h-5" />
              Particuliers
            </button>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {currentServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer"
              onClick={() => setSelectedService(service)}
            >
              <div className="p-8">
                <service.icon className="w-12 h-12 text-terre-cuite mb-6 
                  group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-heading text-bordeaux mb-4">
                  {service.title}
                </h3>
                <p className="text-terre-cuite/80 mb-6">
                  {service.description}
                </p>
                <div className="space-y-3 mb-6">
                  {service.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 text-terre-cuite/80">
                      <CheckCircle className="w-5 h-5 text-terre-cuite shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  {service.pricing && (
                    <div className="flex items-center gap-2 text-sm text-terre-cuite/60">
                      <DollarSign className="w-4 h-4" />
                      <span>{service.pricing.price}</span>
                      <span>•</span>
                      <Clock className="w-4 h-4" />
                      <span>{service.pricing.duration}</span>
                    </div>
                  )}
                  <button className="flex items-center gap-1 text-terre-cuite hover:text-bordeaux transition-colors">
                    En savoir plus
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-10 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-beige-clair/20 to-transparent" />
          <div className="relative z-10">
            <h2 className="text-3xl font-heading text-bordeaux mb-6">
              Votre Transformation RH Commence Ici
            </h2>
            <p className="text-lg text-terre-cuite/80 mb-8 max-w-2xl mx-auto">
              Chaque entreprise est unique, chaque défi mérite une approche personnalisée. 
              Commençons à travailler ensemble pour révéler le plein potentiel de vos ressources humaines.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <RainbowButton 
                onClick={() => window.location.href = '/contact'}
                className="group flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Contactez-nous
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </RainbowButton>
              
              <RainbowButton 
                onClick={() => window.location.href = '/booking'}
                className="group flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Réserver un rendez-vous
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </RainbowButton>
            </div>
          </div>
        </motion.div>

        {/* Modal détails service */}
        <AnimatePresence>
          {selectedService && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedService(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <selectedService.icon className="w-12 h-12 text-terre-cuite" />
                      <h3 className="text-3xl font-heading text-bordeaux">
                        {selectedService.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedService(null)}
                      className="p-2 hover:bg-beige-clair/20 rounded-lg transition-colors"
                    >
                      <ArrowUpRight className="w-6 h-6 text-terre-cuite" />
                    </button>
                  </div>

                  <p className="text-lg text-terre-cuite/80 mb-8">
                    {selectedService.description}
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {selectedService.features.map((feature, index) => (
                      <div
                        key={index}
                        className="bg-beige-clair/10 rounded-lg p-6"
                      >
                        <feature.icon className="w-8 h-8 text-terre-cuite mb-4" />
                        <h4 className="text-lg font-medium text-bordeaux mb-2">
                          {feature.title}
                        </h4>
                        <p className="text-terre-cuite/80">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {selectedService.pricing && (
                    <div className="bg-beige-clair/10 rounded-lg p-6 mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-heading text-bordeaux">
                          Tarification
                        </h4>
                        <div className="flex items-center gap-2 text-terre-cuite">
                          <span className="text-2xl font-bold">
                            {selectedService.pricing.price}
                          </span>
                          <span className="text-terre-cuite/60">
                            • {selectedService.pricing.duration}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {selectedService.pricing.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-terre-cuite/80">
                            <CheckCircle className="w-5 h-5 text-terre-cuite shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-center">
                    <Link
                      href={selectedService.cta.link}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-terre-cuite text-white rounded-lg hover:bg-bordeaux transition-colors"
                    >
                      {selectedService.cta.text}
                      <ArrowUpRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

