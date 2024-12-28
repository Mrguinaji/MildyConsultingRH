'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, Download, Mail, ClipboardList, Video, FileText } from 'lucide-react'
import Link from 'next/link'

interface SessionData {
  status: string
  customer_email: string
  customer_name: string
  payment_status: string
  amount_total: number
  currency: string
  metadata: {
    type: 'formation' | 'consultation'
    consultation_type?: string
    date?: string
    time?: string
  }
}

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const type = searchParams.get('type')
  const free = searchParams.get('free')
  const date = searchParams.get('date')
  const time = searchParams.get('time')
  const email = searchParams.get('email')
  const name = searchParams.get('name')
  
  const [session, setSession] = useState<SessionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [emailSent, setEmailSent] = useState(false)

  useEffect(() => {
    const fetchSession = async () => {
      try {
        // Pour les consultations gratuites
        if (free === 'true' && type === 'consultation' && date && time && email && name) {
          const sessionData: SessionData = {
            status: 'complete',
            customer_email: decodeURIComponent(email),
            customer_name: decodeURIComponent(name),
            payment_status: 'free',
            amount_total: 0,
            currency: 'eur',
            metadata: {
              type: 'consultation',
              consultation_type: 'free',
              date,
              time
            }
          }
          setSession(sessionData)

          // Envoi de l'email pour consultation gratuite
          if (!emailSent) {
            try {
              // Envoi de l'email de confirmation
              const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  to: sessionData.customer_email,
                  name: sessionData.customer_name,
                  consultationType: 'Consultation Découverte',
                  date: sessionData.metadata.date,
                  time: sessionData.metadata.time,
                  isPaid: false
                }),
              })

              if (!response.ok) {
                throw new Error('Erreur lors de l\'envoi de l\'email')
              }

              // Envoi du questionnaire préparatoire
              const questionnaireResponse = await fetch('/api/send-questionnaire', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  to: sessionData.customer_email,
                  name: sessionData.customer_name,
                  consultationType: 'Consultation Découverte',
                  date: sessionData.metadata.date,
                  time: sessionData.metadata.time
                }),
              })

              if (!questionnaireResponse.ok) {
                console.error('Erreur lors de l\'envoi du questionnaire')
              }

              setEmailSent(true)
            } catch (error) {
              console.error('Erreur lors de l\'envoi de l\'email:', error)
            }
          }

          setLoading(false)
          return
        }

        // Pour les consultations payantes
        if (!sessionId) {
          setError('Informations de session manquantes')
          setLoading(false)
          return
        }

        const response = await fetch(`/api/payments/verify?session_id=${sessionId}&type=${type}`)
        if (!response.ok) {
          throw new Error('Échec de la récupération des détails de la session')
        }

        const data = await response.json()
        setSession(data)

        // Envoi de l'email pour consultation payante
        if (!emailSent && data.status === 'complete') {
          try {
            // Envoi de l'email de confirmation
            const response = await fetch('/api/send-email', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                to: data.customer_email,
                name: data.customer_name,
                consultationType: data.metadata.consultation_type === 'standard' ? 'Consultation Standard' : 'Consultation Découverte',
                date: data.metadata.date,
                time: data.metadata.time,
                isPaid: true
              }),
            })

            if (!response.ok) {
              throw new Error('Erreur lors de l\'envoi de l\'email')
            }

            // Envoi du questionnaire préparatoire
            const questionnaireResponse = await fetch('/api/send-questionnaire', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                to: data.customer_email,
                name: data.customer_name,
                consultationType: data.metadata.consultation_type === 'standard' ? 'Consultation Standard' : 'Consultation Découverte',
                date: data.metadata.date,
                time: data.metadata.time
              }),
            })

            if (!questionnaireResponse.ok) {
              console.error('Erreur lors de l\'envoi du questionnaire')
            }

            setEmailSent(true)
          } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'email:', error)
          }
        }
      } catch (err) {
        setError('Erreur lors de la récupération des détails de la session')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchSession()
  }, [sessionId, type, free, date, time, email, name, emailSent])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Une erreur est survenue</h1>
          <p className="text-gray-600 mb-8">{error || 'Session introuvable'}</p>
          <Link
            href="/"
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    )
  }

  const getSuccessMessage = () => {
    if (session.metadata.type === 'consultation') {
      return session.payment_status === 'free'
        ? `Votre consultation découverte gratuite a été réservée pour le ${session.metadata.date} à ${session.metadata.time}.`
        : `Votre consultation pour le ${session.metadata.date} à ${session.metadata.time} a été confirmée.`
    }
    return 'Votre paiement a été confirmé.'
  }

  const getNextSteps = () => {
    if (session.metadata.type === 'consultation') {
      return [
        {
          icon: <Mail className="w-6 h-6 text-primary" />,
          title: 'Confirmation par email',
          description: 'Un email de confirmation vous a été envoyé avec les détails de votre consultation.'
        },
        {
          icon: <ClipboardList className="w-6 h-6 text-primary" />,
          title: 'Questionnaire préparatoire',
          description: 'Vous recevrez un questionnaire préparatoire à remplir avant la consultation.'
        },
        {
          icon: <Video className="w-6 h-6 text-primary" />,
          title: 'Lien visioconférence',
          description: 'La veille de la consultation, vous recevrez le lien pour la visioconférence.'
        },
        {
          icon: <FileText className="w-6 h-6 text-primary" />,
          title: 'Préparation',
          description: 'Préparez vos questions et documents pertinents pour optimiser notre échange.'
        }
      ]
    }
    return []
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-block"
          >
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
          </motion.div>
          <h1 className="text-3xl font-bold mt-4 mb-2">Réservation Confirmée !</h1>
          <p className="text-gray-600">
            {getSuccessMessage()}
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Détails de la réservation</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Nom</span>
              <span className="font-medium">{session.customer_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email</span>
              <span className="font-medium">{session.customer_email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date</span>
              <span className="font-medium">{session.metadata.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Heure</span>
              <span className="font-medium">{session.metadata.time}</span>
            </div>
            {session.payment_status !== 'free' && (
              <div className="flex justify-between">
                <span className="text-gray-600">Montant</span>
                <span className="font-medium">
                  {(session.amount_total / 100).toLocaleString('fr-FR', {
                    style: 'currency',
                    currency: session.currency.toUpperCase()
                  })}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Prochaines étapes</h2>
          <div className="space-y-4">
            {getNextSteps().map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-lg">
                  {step.icon}
                </div>
                <div>
                  <h3 className="font-medium">{step.title}</h3>
                  <p className="text-gray-600 text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors text-center"
          >
            Retour à l'accueil
          </Link>
          <Link
            href="/contact"
            className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary/10 transition-colors text-center"
          >
            Contacter le support
          </Link>
        </div>
      </motion.div>
    </div>
  )
} 