'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Check, X, ArrowRight, BookOpen, Users, 
  Calendar, Clock, Video, MessageCircle,
  FileText, Award, Star, Zap, Shield
} from 'lucide-react'
import Link from 'next/link'

const formations = [
  {
    id: 'starter',
    title: 'Formation RH Fondamentale',
    description: 'Maîtrisez les bases essentielles des ressources humaines et de la gestion du personnel',
    price: '799',
    duration: '2 mois',
    features: [
      'Fondamentaux du droit du travail',
      'Gestion administrative du personnel',
      'Processus de recrutement',
      'Bases de la paie',
      'Outils SIRH essentiels',
      '4 sessions de coaching individuel',
      'Support par email',
      'Ressources et templates RH'
    ],
    notIncluded: [
      'Accompagnement projet',
      'Audit RH complet',
      'Formation sur site',
      'Accès communauté'
    ],
    icon: <BookOpen className="w-6 h-6" />,
    color: 'from-beige-clair to-terre-cuite',
    stripeLink: `/api/checkout/starter?success_url=${process.env.NEXT_PUBLIC_BASE_URL}/success`
  },
  {
    id: 'professional',
    title: 'Transformation RH',
    description: 'Programme avancé pour moderniser et optimiser vos pratiques RH',
    price: '1499',
    duration: '4 mois',
    features: [
      'Tout le pack Fondamental',
      'Digitalisation des processus RH',
      'Gestion des talents',
      'Marque employeur',
      'Conduite du changement',
      '8 sessions de coaching',
      'Audit RH personnalisé',
      'Accès à la communauté RH',
      'Templates avancés et outils digitaux'
    ],
    notIncluded: [
      'Formation sur site',
      'Accompagnement illimité'
    ],
    icon: <Award className="w-6 h-6" />,
    color: 'from-terre-cuite to-bordeaux',
    popular: true,
    stripeLink: `/api/checkout/professional?success_url=${process.env.NEXT_PUBLIC_BASE_URL}/success`
  },
  {
    id: 'elite',
    title: 'Excellence RH',
    description: 'Programme d\'excellence pour une transformation RH complète et stratégique',
    price: '2999',
    duration: '6 mois',
    features: [
      'Tout le pack Transformation',
      'Stratégie RH sur-mesure',
      'Formation sur site',
      'Accompagnement projet illimité',
      'Audit RH complet',
      'KPIs et tableaux de bord',
      'Innovation RH et prospective',
      'Réseau d\'experts RH',
      'Événements exclusifs'
    ],
    icon: <Star className="w-6 h-6" />,
    color: 'from-bordeaux to-black',
    stripeLink: `/api/checkout/elite?success_url=${process.env.NEXT_PUBLIC_BASE_URL}/success`
  }
]

const features = [
  {
    icon: <Video className="w-6 h-6" />,
    title: 'Formation Hybride',
    description: 'Modules en ligne et sessions présentielles pour une expérience optimale'
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: 'Expertise RH',
    description: 'Formateurs experts avec plus de 15 ans d\'expérience'
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'Outils Pratiques',
    description: 'Templates, procédures et outils RH directement applicables'
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Réseau RH',
    description: 'Intégrez une communauté de professionnels RH'
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: 'Suivi Personnalisé',
    description: 'Accompagnement adapté à vos besoins spécifiques'
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Formation Continue',
    description: 'Mises à jour régulières et accès aux nouvelles ressources'
  }
]

const handlePayment = async (plan: string) => {
  try {
    const response = await fetch('/api/payments/formation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ plan })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Erreur lors du paiement')
    }

    if (data.url) {
      window.location.href = data.url
    }
  } catch (error) {
    console.error('Erreur lors du paiement:', error)
    // Ici vous pouvez ajouter une notification d'erreur pour l'utilisateur
  }
}

export default function Formation() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-beige-clair/20 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-heading mb-6 bg-gradient-to-r from-terre-cuite to-bordeaux bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Investissez dans Votre Avenir Professionnel
          </motion.h1>
          <motion.p 
            className="text-xl text-terre-cuite/80 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Des formations sur mesure pour développer vos compétences et accélérer votre carrière. 
            Choisissez le programme qui correspond à vos ambitions.
          </motion.p>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-terre-cuite to-bordeaux rounded-lg flex items-center justify-center text-white mb-4 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-bordeaux mb-2">{feature.title}</h3>
                <p className="text-terre-cuite/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-5xl font-heading mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Choisissez Votre Programme
            </motion.h2>
            <motion.p 
              className="text-xl text-terre-cuite/80 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Des formules adaptées à chaque niveau d'ambition, avec un accompagnement personnalisé 
              pour atteindre vos objectifs.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {formations.map((formation, index) => (
              <motion.div
                key={formation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className={`relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow ${
                  formation.popular ? 'ring-2 ring-terre-cuite' : ''
                }`}
              >
                {formation.popular && (
                  <div className="absolute top-4 right-4 bg-terre-cuite text-white px-3 py-1 rounded-full text-sm font-medium">
                    Populaire
                  </div>
                )}
                <div className={`bg-gradient-to-r ${formation.color} p-6 text-white`}>
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                    {formation.icon}
                  </div>
                  <h3 className="text-2xl font-heading mb-2">{formation.title}</h3>
                  <p className="opacity-90 mb-4">{formation.description}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">{formation.price}€</span>
                    <span className="opacity-80">/ {formation.duration}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <ul className="space-y-4 mb-8">
                    {formation.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-terre-cuite shrink-0 mt-0.5" />
                        <span className="text-terre-cuite/80">{feature}</span>
                      </li>
                    ))}
                    {formation.notIncluded?.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 opacity-50">
                        <X className="w-5 h-5 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    href={formation.stripeLink || '#'}
                    className={`w-full bg-gradient-to-r ${formation.color} text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transition-shadow group`}
                  >
                    <span>Commencer maintenant</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Garantie Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-beige-clair/20 to-beige-clair/5 p-8 rounded-2xl"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-terre-cuite to-bordeaux rounded-full flex items-center justify-center text-white mx-auto mb-6">
              <Shield className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-heading mb-4">Garantie Satisfaction</h2>
            <p className="text-terre-cuite/80 mb-6">
              Nous sommes convaincus de la qualité de nos formations. Si vous n'êtes pas satisfait 
              dans les 14 premiers jours, nous vous remboursons intégralement.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Zap className="w-5 h-5 text-terre-cuite" />
              <span className="text-terre-cuite font-medium">14 jours pour essayer sans risque</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 