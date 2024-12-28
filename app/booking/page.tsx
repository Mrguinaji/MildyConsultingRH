"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, CheckCircle2, Users, Timer, Mail, User } from 'lucide-react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { fr } from 'date-fns/locale'
import { format } from 'date-fns'

const consultationTypes = [
  {
    id: 'free',
    title: 'Consultation Découverte',
    duration: '30 minutes',
    price: 0,
    description: 'Premier rendez-vous pour discuter de vos besoins',
    features: [
      'Évaluation de vos besoins',
      'Présentation de nos services',
      'Recommandations initiales',
      'Sans engagement'
    ],
    icon: <Timer className="w-6 h-6" />
  },
  {
    id: 'standard',
    title: 'Consultation Standard',
    duration: '1 heure',
    price: 99,
    description: 'Consultation approfondie avec plan d\'action',
    features: [
      'Analyse détaillée de votre situation',
      'Plan d\'action personnalisé',
      'Recommandations stratégiques',
      'Suivi par email'
    ],
    icon: <Users className="w-6 h-6" />,
    highlight: true
  }
]

export default function BookingPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Heures disponibles (à adapter selon vos besoins)
  const availableTimes = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'
  ]

  const handleBooking = async () => {
    if (!selectedType || !selectedDate || !selectedTime || !email || !name) {
      setError('Veuillez remplir tous les champs')
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Veuillez entrer une adresse email valide')
      return
    }

    setError(null)
    setLoading(true)
    try {
      const response = await fetch('/api/payments/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: selectedType,
          date: format(selectedDate, 'dd/MM/yyyy'),
          time: selectedTime,
          email,
          name
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la réservation')
      }

      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Erreur lors de la réservation:', error)
      setError('Une erreur est survenue lors de la réservation')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-beige-clair/20 to-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-heading mb-6 bg-gradient-to-r from-terre-cuite to-bordeaux bg-clip-text text-transparent">
            Réservez Votre Consultation
          </h1>
          <p className="text-xl text-terre-cuite/80 max-w-2xl mx-auto">
            Commencez par une consultation gratuite ou optez pour une session approfondie avec nos experts RH
          </p>
        </motion.div>

        {/* Types de consultation */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {consultationTypes.map((type) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow cursor-pointer ${
                selectedType === type.id ? 'ring-2 ring-terre-cuite' : ''
              } ${type.highlight ? 'border-2 border-terre-cuite/20' : ''}`}
              onClick={() => setSelectedType(type.id)}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-terre-cuite to-bordeaux rounded-lg flex items-center justify-center text-white">
                  {type.icon}
                </div>
                <div>
                  <h3 className="text-xl font-heading text-bordeaux">{type.title}</h3>
                  <p className="text-terre-cuite/80">{type.duration}</p>
                </div>
                <div className="ml-auto text-2xl font-heading text-bordeaux">
                  {type.price === 0 ? 'Gratuit' : `${type.price}€`}
                </div>
              </div>
              
              <p className="text-terre-cuite/80 mb-6">{type.description}</p>
              
              <div className="space-y-3">
                {type.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-terre-cuite" />
                    <span className="text-terre-cuite/80">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {selectedType && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
          >
            <h2 className="text-2xl font-heading text-bordeaux mb-8 text-center">
              Réservez votre créneau
            </h2>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
                {error}
              </div>
            )}

            {/* Informations personnelles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-6 h-6 text-terre-cuite" />
                  <h3 className="text-xl font-heading">Nom</h3>
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Votre nom"
                  className="w-full p-3 border border-terre-cuite/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terre-cuite/50"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Mail className="w-6 h-6 text-terre-cuite" />
                  <h3 className="text-xl font-heading">Email</h3>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="w-full p-3 border border-terre-cuite/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terre-cuite/50"
                />
              </div>
            </div>

            {/* Sélection date et heure */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-6 h-6 text-terre-cuite" />
                  <h3 className="text-xl font-heading">Date</h3>
                </div>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date: Date) => setSelectedDate(date)}
                  minDate={new Date()}
                  locale={fr}
                  dateFormat="dd/MM/yyyy"
                  className="w-full p-3 border border-terre-cuite/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terre-cuite/50"
                  placeholderText="Sélectionnez une date"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-6 h-6 text-terre-cuite" />
                  <h3 className="text-xl font-heading">Heure</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-lg border transition-colors ${
                        selectedTime === time
                          ? 'bg-terre-cuite text-white border-terre-cuite'
                          : 'border-terre-cuite/20 text-terre-cuite/80 hover:border-terre-cuite/50'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleBooking}
              disabled={!selectedDate || !selectedTime || !email || !name || loading}
              className={`w-full bg-gradient-to-r from-terre-cuite to-bordeaux text-white py-4 px-8 rounded-lg flex items-center justify-center gap-2 group transition-all ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
              }`}
            >
              <span>
                {loading ? 'Traitement en cours...' : 'Réserver maintenant'}
              </span>
              {!loading && (
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              )}
            </button>

            {selectedType !== 'free' && (
              <p className="text-center text-terre-cuite/60 mt-6">
                Un acompte de {consultationTypes.find(t => t.id === selectedType)?.price}€ sera demandé pour confirmer votre réservation
              </p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
} 