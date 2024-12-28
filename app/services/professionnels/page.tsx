"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Dialog } from "@headlessui/react"
import { 
  Users, 
  TrendingUp, 
  Lightbulb, 
  Target,
  MessageCircle,
  FileText,
  BarChart,
  CheckCircle2,
  Building2,
  ArrowRight,
  Calendar,
  MessageSquare,
  Phone,
  X,
  Clock,
  ChevronDown,
  HelpCircle
} from "lucide-react"

const professionalServices = [
  {
    icon: <Users className="size-8" />,
    title: "Recrutement & Talent Acquisition",
    description: "Optimisez votre processus de recrutement avec nos solutions sur mesure.",
    features: [
      "Définition des profils et compétences recherchés",
      "Stratégie de sourcing et d'attraction des talents",
      "Évaluation et sélection des candidats",
      "Accompagnement à l'intégration"
    ]
  },
  {
    icon: <Building2 className="size-8" />,
    title: "Transformation RH",
    description: "Accompagnement dans la digitalisation et modernisation de vos processus RH.",
    features: [
      "Audit des processus RH existants",
      "Définition de la stratégie de transformation",
      "Implémentation d'outils digitaux",
      "Formation des équipes RH"
    ]
  },
  {
    icon: <Target className="size-8" />,
    title: "Stratégie & Organisation",
    description: "Alignez votre stratégie RH avec les objectifs de votre entreprise.",
    features: [
      "Diagnostic organisationnel",
      "Définition des objectifs stratégiques",
      "Plan d'action et KPIs",
      "Accompagnement au changement"
    ]
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

const consultationOptions = [
  {
    id: "starter",
    title: "Consultation Initiale",
    duration: "30 min",
    price: 0,
    description: "Découverte de vos besoins et présentation de nos solutions",
    included: [
      "Évaluation initiale",
      "Présentation des solutions",
      "Recommandations personnalisées"
    ]
  },
  {
    id: "standard",
    title: "Consultation Approfondie",
    duration: "1h",
    price: 150,
    description: "Analyse détaillée et plan d'action personnalisé",
    included: [
      "Analyse approfondie",
      "Plan d'action détaillé",
      "Recommandations stratégiques",
      "Support post-consultation"
    ],
    highlight: true
  },
  {
    id: "premium",
    title: "Consultation Stratégique",
    duration: "2h",
    price: 250,
    description: "Stratégie complète et accompagnement personnalisé",
    included: [
      "Analyse stratégique complète",
      "Plan d'action détaillé",
      "Recommandations prioritaires",
      "Support prioritaire",
      "Suivi à 30 jours"
    ]
  }
]

const faqItems = [
  {
    question: "Combien coûte un consulting RH pour une entreprise ?",
    answer: "Le coût du consulting RH varie en fonction de vos besoins spécifiques et de l'ampleur du projet. Nous proposons différentes formules, de la consultation ponctuelle au accompagnement complet. Nos tarifs débutent à partir de 150€ pour une consultation approfondie. Contactez-nous pour obtenir un devis personnalisé adapté à votre situation."
  },
  {
    question: "Pourquoi se faire accompagner lors d'une recherche d'emploi ?",
    answer: "Un accompagnement professionnel lors de votre recherche d'emploi augmente significativement vos chances de succès. Notre expertise vous permet d'optimiser votre CV, de préparer vos entretiens, de définir votre stratégie de recherche et de valoriser vos compétences. Nous vous aidons également à développer votre réseau professionnel et à cibler les opportunités les plus pertinentes."
  },
  {
    question: "Comment se déroulent les séances d'accompagnement ?",
    answer: "Les séances d'accompagnement sont personnalisées et structurées en plusieurs étapes : un diagnostic initial pour comprendre vos besoins, l'élaboration d'un plan d'action sur mesure, des séances de travail régulières (en présentiel ou en visio), et un suivi continu de vos progrès. Chaque séance dure entre 1h et 2h, selon la formule choisie."
  }
]

export default function ProfessionalServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [selectedOption, setSelectedOption] = useState(null)
  const [openFaqIndex, setOpenFaqIndex] = useState(0)

  const handleBooking = (option) => {
    setSelectedOption(option)
    setIsModalOpen(true)
  }

  const handlePayment = async () => {
    // Ici, nous ajouterions la logique pour créer une session Stripe
    if (selectedOption && selectedDate && selectedTime) {
      try {
        const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            consultationType: selectedOption.id,
            price: selectedOption.price,
            date: selectedDate,
            time: selectedTime
          }),
        })
        
        const session = await response.json()
        
        // Rediriger vers Stripe Checkout
        window.location.href = session.url
      } catch (error) {
        console.error('Payment error:', error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-beige-clair/50 to-transparent">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(107,39,55,0.1),transparent_70%)]" />
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-heading text-bordeaux mb-6">
              Services Professionnels
            </h1>
            <p className="text-xl text-terre-cuite/90">
              Des solutions RH sur mesure pour accompagner la croissance et la transformation 
              de votre entreprise. Notre expertise au service de votre réussite.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid gap-12"
          >
            {professionalServices.map((service, index) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="relative bg-white rounded-2xl p-8 shadow-lg overflow-hidden group"
              >
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-bordeaux/5 to-terre-cuite/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  {/* Header */}
                  <div className="flex items-start gap-6 mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-bordeaux/10 to-terre-cuite/10 text-bordeaux">
                      {service.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-heading text-bordeaux mb-2">
                        {service.title}
                      </h2>
                      <p className="text-terre-cuite/90">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {service.features.map((feature, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle2 className="size-5 text-bordeaux flex-shrink-0" />
                        <span className="text-gris-neutre">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to action amélioré */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-20"
          >
            <div className="max-w-5xl mx-auto px-4">
              <h3 className="text-3xl font-heading text-bordeaux text-center mb-4">
                Prêt à transformer votre approche RH ?
              </h3>
              <p className="text-xl text-terre-cuite/90 text-center mb-12 max-w-2xl mx-auto">
                Choisissez le format de consultation qui vous convient le mieux et réservez 
                directement votre créneau.
              </p>

              {/* Options de consultation */}
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {consultationOptions.map((option) => (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={`relative bg-white rounded-2xl p-6 shadow-lg overflow-hidden group ${
                      option.highlight ? 'ring-2 ring-bordeaux' : ''
                    }`}
                  >
                    {option.highlight && (
                      <div className="absolute top-0 right-0 bg-bordeaux text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                        Recommandé
                      </div>
                    )}
                    
                    <div className="mb-4">
                      <h4 className="text-xl font-heading text-bordeaux mb-2">
                        {option.title}
                      </h4>
                      <div className="flex items-center gap-2 text-terre-cuite mb-2">
                        <Clock className="size-4" />
                        <span>{option.duration}</span>
                      </div>
                      <p className="text-gris-neutre mb-4">
                        {option.description}
                      </p>
                      <div className="text-2xl font-heading text-bordeaux mb-4">
                        {option.price === 0 ? 'Gratuit' : `${option.price}€`}
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      {option.included.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="size-4 text-bordeaux flex-shrink-0" />
                          <span className="text-sm text-gris-neutre">{item}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => handleBooking(option)}
                      className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                        option.highlight
                          ? 'bg-gradient-to-r from-bordeaux to-terre-cuite text-white hover:shadow-lg hover:-translate-y-0.5'
                          : 'border-2 border-bordeaux text-bordeaux hover:bg-bordeaux hover:text-white'
                      }`}
                    >
                      <Calendar className="size-4" />
                      Réserver
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Autres options de contact */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full border-2 border-terre-cuite text-terre-cuite font-medium hover:bg-terre-cuite hover:text-white transition-colors group"
                >
                  <MessageSquare className="size-4 transition-transform group-hover:scale-110" />
                  Demander un devis personnalisé
                </a>
                <div className="relative group">
                  <a
                    href="tel:+33652208794"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full border-2 border-or-doux text-or-doux font-medium hover:bg-or-doux hover:text-white transition-colors group"
                  >
                    <Phone className="size-4 transition-transform group-hover:scale-110" />
                    Appelez-nous
                  </a>
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gris-neutre text-white px-3 py-1.5 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    06 52 20 87 94
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-beige-clair/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 text-terre-cuite mb-4">
              <HelpCircle className="size-6" />
              <h2 className="text-sm font-medium tracking-wider uppercase">
                Une question ?
              </h2>
            </div>
            <h3 className="text-3xl md:text-4xl font-heading text-bordeaux mb-4">
              F.A.Q
            </h3>
            <p className="text-lg text-terre-cuite/90 max-w-2xl mx-auto">
              Les questions régulièrement posées par nos clients.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? -1 : index)}
                    className="w-full flex items-center justify-between gap-4 p-6 text-left"
                  >
                    <span className="text-lg font-medium text-bordeaux">
                      {item.question}
                    </span>
                    <ChevronDown 
                      className={`size-5 text-terre-cuite flex-shrink-0 transition-transform ${
                        openFaqIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  <div 
                    className={`overflow-hidden transition-all ${
                      openFaqIndex === index ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <p className="px-6 pb-6 text-gris-neutre">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal de réservation */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-2xl bg-white rounded-2xl p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <Dialog.Title className="text-2xl font-heading text-bordeaux">
                  Réserver votre consultation
                </Dialog.Title>
                {selectedOption && (
                  <p className="text-terre-cuite/90">
                    {selectedOption.title} - {selectedOption.duration}
                  </p>
                )}
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gris-neutre hover:text-bordeaux transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Ici, nous ajouterions le composant de calendrier */}
              <div className="bg-beige-clair/20 rounded-xl p-4">
                <h4 className="font-medium text-bordeaux mb-4">
                  Sélectionnez une date
                </h4>
                {/* Intégration du calendrier */}
                <div className="calendar-placeholder h-64 bg-white rounded-lg">
                  {/* Nous implémenterions un vrai calendrier ici */}
                </div>
              </div>

              {/* Sélection de l'heure */}
              <div>
                <h4 className="font-medium text-bordeaux mb-4">
                  Sélectionnez une heure
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {/* Nous générerions dynamiquement les créneaux disponibles */}
                  {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'].map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        selectedTime === time
                          ? 'border-bordeaux bg-bordeaux text-white'
                          : 'border-gray-200 hover:border-bordeaux'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bouton de confirmation */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={handlePayment}
                disabled={!selectedDate || !selectedTime}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-bordeaux to-terre-cuite text-white font-medium hover:shadow-lg transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirmer et payer
                <ArrowRight className="size-4" />
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
} 