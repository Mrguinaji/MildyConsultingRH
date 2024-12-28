'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initPage = async () => {
      try {
        const sessionId = searchParams.get('session_id')
        const type = searchParams.get('type')
        const free = searchParams.get('free')
        
        // Pour les consultations gratuites
        if (free === 'true') {
          setLoading(false)
          return
        }

        // Pour les consultations payantes
        if (sessionId) {
          const response = await fetch(`/api/payments/verify?session_id=${sessionId}&type=${type}`)
          if (!response.ok) {
            throw new Error('Erreur lors de la vérification du paiement')
          }
        }

        setLoading(false)
      } catch (err) {
        console.error('Erreur:', err)
        setError('Une erreur est survenue lors de la confirmation')
        setLoading(false)
      }
    }

    initPage()
  }, [searchParams])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Une erreur est survenue</h1>
          <p className="text-gray-600 mb-8">{error}</p>
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Réservation confirmée !
          </h1>
          <p className="text-lg text-gray-600">
            Votre consultation a été réservée avec succès. Vous allez recevoir un email de confirmation avec tous les détails.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Prochaines étapes :</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span>Vérifiez votre boîte email pour la confirmation et les détails de la consultation</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span>Remplissez le questionnaire préparatoire que vous allez recevoir</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span>La veille de la consultation, vous recevrez le lien pour la visioconférence</span>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 