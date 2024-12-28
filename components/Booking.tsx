'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { CalendarDays, Clock, Euro, Info, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { loadStripe } from '@stripe/stripe-js'

const consultationTypes = [
  {
    id: 'diagnostic',
    title: 'Diagnostic RH',
    duration: '1h',
    price: 199,
    description: "Évaluation complète de vos pratiques RH actuelles et recommandations."
  },
  {
    id: 'strategy',
    title: 'Stratégie RH',
    duration: '2h',
    price: 349,
    description: "Développement d'une stratégie RH adaptée à vos objectifs."
  },
  {
    id: 'coaching',
    title: 'Coaching Personnalisé',
    duration: '1h30',
    price: 279,
    description: "Accompagnement personnalisé pour vos défis RH spécifiques."
  }
]

const timeSlots = [
  '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'
]

// Initialisation de Stripe avec la clé publique
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '')

export default function BookingSection() {
  const [date, setDate] = useState<Date>()
  const [selectedType, setSelectedType] = useState<string>()
  const [selectedTime, setSelectedTime] = useState<string>()
  const [email, setEmail] = useState<string>('')
  const [step, setStep] = useState<'type' | 'datetime' | 'confirm'>('type')
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const handleBooking = async () => {
    console.log('Début handleBooking')
    console.log('Valeurs actuelles:', { date, selectedType, selectedTime, email })

    if (!date || !selectedType || !selectedTime || !email) {
      console.log('Champs manquants:', { date, selectedType, selectedTime, email })
      toast.error('Veuillez remplir tous les champs requis')
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      console.log('Email invalide:', email)
      toast.error('Veuillez entrer une adresse email valide')
      return
    }

    try {
      const consultation = consultationTypes.find(t => t.id === selectedType)
      if (!consultation) {
        console.log('Type de consultation non trouvé:', selectedType)
        toast.error('Type de consultation non trouvé')
        return
      }

      const payload = {
        consultationType: consultation.title,
        price: consultation.price,
        date: format(date, 'dd MMMM yyyy', { locale: fr }),
        time: selectedTime,
        email: email.trim(),
      }

      console.log('Envoi de la requête avec payload:', payload)

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      console.log('Réponse reçue:', {
        status: response.status,
        statusText: response.statusText,
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Erreur de réponse:', errorData)
        throw new Error(errorData.error || 'Erreur lors de la création de la session')
      }

      const data = await response.json()
      console.log('Données reçues:', data)

      if (!data.url) {
        console.error('URL manquante dans la réponse:', data)
        throw new Error('URL de redirection manquante')
      }

      console.log('Redirection vers:', data.url)
      window.location.href = data.url
    } catch (error) {
      console.error('Erreur complète:', error)
      toast.error('Une erreur est survenue lors de la création de la session de paiement')
    }
  }

  const selectedConsultation = consultationTypes.find(t => t.id === selectedType)

  return (
    <div className="max-w-4xl mx-auto">
      {/* Cards de consultation avec design minimaliste */}
      <div className="grid gap-6 md:grid-cols-3">
        {consultationTypes.map((type, index) => (
          <motion.div
            key={type.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="h-full"
          >
            <Card 
              className={`relative h-full overflow-hidden cursor-pointer transition-all duration-300 bg-white/95 backdrop-blur-sm group
                ${selectedType === type.id 
                  ? 'ring-2 ring-terre-cuite shadow-2xl translate-y-[-4px]' 
                  : 'hover:translate-y-[-4px] shadow-lg hover:shadow-xl'
                }
              `}
              onClick={() => {
                setSelectedType(type.id)
                setStep('datetime')
              }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-6">
                  <CardTitle className="text-2xl font-heading text-bordeaux">{type.title}</CardTitle>
                  <div className="flex items-center gap-2 text-terre-cuite">
                    <span className="text-2xl font-heading">{type.price}€</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-terre-cuite/80 mb-2">
                  <Clock size={14} />
                  <span>{type.duration}</span>
                </div>
                <CardDescription className="text-sm text-terre-cuite/90 line-clamp-2">
                  {type.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-terre-cuite to-bordeaux transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Bouton de réservation avec popup */}
      <AnimatePresence>
        {selectedType && step === 'datetime' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex justify-center mt-12"
          >
            <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-white/95 text-terre-cuite hover:text-bordeaux px-8 py-6 text-lg rounded-full
                    shadow-lg hover:shadow-xl transition-all group relative overflow-hidden border border-terre-cuite/20"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <CalendarDays className="w-6 h-6" />
                    Choisir une date
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white/95 backdrop-blur-sm border-none max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-heading text-bordeaux">
                    {selectedConsultation?.title}
                  </DialogTitle>
                  <DialogDescription>
                    Sélectionnez une date et un horaire pour votre consultation
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-8 md:grid-cols-2 p-4">
                  <div className="space-y-4">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      locale={fr}
                      className="rounded-lg border-none bg-white/50 p-3
                        [&_.rdp-day]:transition-transform [&_.rdp-day:hover]:scale-110
                        [&_.rdp-day_button:hover]:bg-terre-cuite/20
                        [&_.rdp-day_button:focus]:bg-terre-cuite/20
                        [&_.rdp-day_button.rdp-day_selected]:bg-terre-cuite"
                    />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-heading text-bordeaux">Horaires disponibles</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant="outline"
                          className={`py-6 border-terre-cuite/20 ${
                            selectedTime === time 
                              ? 'bg-terre-cuite text-beige-clair hover:bg-terre-cuite' 
                              : 'hover:bg-terre-cuite/10'
                          }`}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                    <Button
                      className="w-full bg-terre-cuite hover:bg-bordeaux text-beige-clair mt-4"
                      disabled={!date || !selectedTime}
                      onClick={() => {
                        setIsCalendarOpen(false)
                        setStep('confirm')
                      }}
                    >
                      Confirmer l'horaire
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dialog de confirmation */}
      <AnimatePresence>
        {step === 'confirm' && selectedConsultation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mt-12"
          >
            <Card className="bg-white/95 backdrop-blur-sm border-none">
              <CardHeader>
                <CardTitle className="text-2xl font-heading text-bordeaux">Confirmez votre réservation</CardTitle>
                <CardDescription>Vérifiez les détails de votre consultation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-4 p-6 bg-beige-clair/20 rounded-xl">
                    <div className="flex justify-between items-center">
                      <span className="text-terre-cuite">Date</span>
                      <span className="font-medium">{date && format(date, 'dd MMMM yyyy', { locale: fr })}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-terre-cuite">Heure</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-terre-cuite">Type</span>
                      <span className="font-medium">{selectedConsultation.title}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-heading">
                      <span className="text-terre-cuite">Prix</span>
                      <span className="font-medium">{selectedConsultation.price}€</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-terre-cuite">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      className="w-full px-4 py-2 rounded-lg border border-terre-cuite/20 focus:outline-none focus:ring-2 focus:ring-terre-cuite focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-4">
                    <Button 
                      variant="outline" 
                      className="border-terre-cuite/20 text-terre-cuite hover:bg-terre-cuite/10"
                      onClick={() => {
                        setStep('type')
                        setSelectedType(undefined)
                        setDate(undefined)
                        setSelectedTime(undefined)
                      }}
                    >
                      Annuler
                    </Button>
                    <Button 
                      className="bg-terre-cuite hover:bg-bordeaux text-beige-clair px-8"
                      onClick={handleBooking}
                    >
                      Confirmer et Payer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

