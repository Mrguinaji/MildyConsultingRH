"use client"

import { useState, FormEvent } from "react"
import { motion } from "framer-motion"
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send
} from "lucide-react"
import ToastNotification from "@/components/ui/toast-notification"

const contactInfo = [
  {
    icon: <MapPin className="size-5" />,
    title: "Adresse",
    details: "61, rue de Lyon, 75012 Paris"
  },
  {
    icon: <Phone className="size-5" />,
    title: "Téléphone",
    details: "06 52 20 87 94"
  },
  {
    icon: <Mail className="size-5" />,
    title: "Email",
    details: "contact@mildyconsulting.com"
  },
  {
    icon: <Clock className="size-5" />,
    title: "Horaires",
    details: "Lun - Ven: 9h00 - 18h00"
  }
]

export default function ContactPage() {
  const [showNotification, setShowNotification] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Ici, vous ajouterez la logique d'envoi du formulaire
    // Par exemple, l'appel à votre API

    // Afficher la notification
    setShowNotification(true)
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
              Contactez-nous
            </h1>
            <p className="text-xl text-terre-cuite/90">
              Une question ? Un projet ? N'hésitez pas à nous contacter. 
              Notre équipe est à votre écoute pour vous accompagner.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-heading text-bordeaux mb-6">
                Envoyez-nous un message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gris-neutre mb-2">
                      Nom
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-bordeaux/20 focus:border-bordeaux transition-colors"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gris-neutre mb-2">
                      Prénom
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-bordeaux/20 focus:border-bordeaux transition-colors"
                      placeholder="Votre prénom"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gris-neutre mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-bordeaux/20 focus:border-bordeaux transition-colors"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gris-neutre mb-2">
                    Sujet
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-bordeaux/20 focus:border-bordeaux transition-colors"
                    placeholder="Sujet de votre message"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gris-neutre mb-2">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-bordeaux/20 focus:border-bordeaux transition-colors resize-none"
                    placeholder="Votre message..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-bordeaux to-terre-cuite text-white font-medium hover:shadow-lg transition-shadow"
                >
                  Envoyer
                  <Send className="size-4" />
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:pl-12"
            >
              <h2 className="text-2xl font-heading text-bordeaux mb-8">
                Informations de contact
              </h2>
              <div className="grid gap-8">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="p-3 rounded-xl bg-gradient-to-br from-bordeaux/10 to-terre-cuite/10 text-bordeaux">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-bordeaux mb-1">
                        {info.title}
                      </h3>
                      <p className="text-terre-cuite/90">
                        {info.details}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map */}
              <div className="mt-12">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.1752435621383!2d2.3703413!3d48.8484595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6721743f06de9%3A0x3d86bdb14e6f6!2s61%20Rue%20de%20Lyon%2C%2075012%20Paris!5e0!3m2!1sfr!2sfr!4v1710876069599!5m2!1sfr!2sfr"
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: "1rem" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Notification */}
      <ToastNotification
        message="Message envoyé avec succès !"
        isVisible={showNotification}
        onClose={() => setShowNotification(false)}
        duration={5000}
      />
    </div>
  )
} 