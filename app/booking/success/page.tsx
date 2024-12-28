"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-beige-clair/50 to-transparent py-20">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 shadow-lg text-center"
          >
            <div className="mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="size-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="size-10 text-green-600" />
              </motion.div>
              
              <h1 className="text-3xl font-heading text-bordeaux mb-4">
                Réservation confirmée !
              </h1>
              <p className="text-terre-cuite/90 mb-8">
                Votre consultation a été réservée avec succès. Vous recevrez un email de confirmation 
                avec tous les détails de votre rendez-vous.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="p-4 bg-beige-clair/20 rounded-lg">
                <div className="flex items-center justify-center gap-2 text-bordeaux mb-2">
                  <Calendar className="size-5" />
                  <span className="font-medium">Prochaines étapes</span>
                </div>
                <p className="text-sm text-terre-cuite/90">
                  Préparez les documents pertinents pour optimiser notre séance. 
                  Nous vous enverrons un rappel 24h avant le rendez-vous.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-terre-cuite text-terre-cuite font-medium hover:bg-terre-cuite hover:text-white transition-colors"
              >
                <ArrowLeft className="size-4" />
                Retour à l'accueil
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-bordeaux to-terre-cuite text-white font-medium hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                Nous contacter
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 