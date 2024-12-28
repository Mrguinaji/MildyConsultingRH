'use client'

import { motion } from 'framer-motion'
import { XCircle, ArrowRight, Calendar, Mail } from 'lucide-react'
import Link from 'next/link'

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-beige-clair/20 pt-32">
      <div className="container max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
        >
          <div className="flex flex-col items-center text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6"
            >
              <XCircle className="w-8 h-8 text-red-500" />
            </motion.div>
            <h1 className="text-3xl font-heading text-bordeaux mb-4">
              Paiement Non Complété
            </h1>
            <p className="text-terre-cuite/80 max-w-md mb-6">
              Le processus de paiement a été interrompu ou n'a pas pu être complété. 
              N'hésitez pas à réessayer ou à nous contacter si vous avez des questions.
            </p>

            <div className="flex items-center justify-center gap-3 p-4 bg-amber-50 text-amber-700 rounded-xl mb-6">
              <Mail className="w-5 h-5" />
              <span>Un email de notification vous a été envoyé</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 bg-terre-cuite text-beige-clair px-6 py-3 rounded-full hover:bg-bordeaux transition-colors"
            >
              <Calendar className="w-5 h-5" />
              Réessayer la réservation
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-terre-cuite hover:text-bordeaux transition-colors"
            >
              Retour à l'accueil
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 