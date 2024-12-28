'use client'

import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Eye, 
  Ear, 
  BookOpen, 
  Target, 
  Send,
  Headphones,
  ArrowUpRight,
  Calendar,
  MessageCircle,
  Check
} from 'lucide-react'
import Link from 'next/link'
import { useState, useCallback } from 'react'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RainbowButton } from '@/components/magicui/rainbow-button'
import { Toaster, toast } from 'sonner'

// Déplacer le composant ContactModal en dehors du composant principal
const ContactModal = ({ 
  isOpen, 
  onOpenChange, 
  formData, 
  onFormChange, 
  onSubmit 
}: {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  formData: { name: string; email: string; message: string }
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onSubmit: (e: React.FormEvent) => void
}) => (
  <Dialog open={isOpen} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-[600px] bg-white rounded-2xl">
      <DialogHeader>
        <DialogTitle className="text-3xl font-heading text-bordeaux mb-4">
          Contactez-nous
        </DialogTitle>
        <DialogDescription className="text-gris-neutre/80 mb-6">
          Nous sommes à l'écoute de vos besoins. Laissez-nous un message et nous vous répondrons rapidement.
        </DialogDescription>
      </DialogHeader>
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gris-neutre mb-2">Nom</label>
          <Input 
            type="text" 
            id="name"
            name="name"
            value={formData.name}
            onChange={onFormChange}
            placeholder="Votre nom"
            required 
            className="w-full border border-gray-200 focus:border-bordeaux focus:ring-1 focus:ring-bordeaux"
            autoComplete="name"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-gris-neutre mb-2">Email</label>
          <Input 
            type="email" 
            id="email"
            name="email"
            value={formData.email}
            onChange={onFormChange}
            placeholder="votre@email.com"
            required 
            className="w-full border border-gray-200 focus:border-bordeaux focus:ring-1 focus:ring-bordeaux"
            autoComplete="email"
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-gris-neutre mb-2">Message</label>
          <Textarea 
            id="message"
            name="message"
            value={formData.message}
            onChange={onFormChange}
            placeholder="Votre message..."
            required 
            className="w-full min-h-[120px] border border-gray-200 focus:border-bordeaux focus:ring-1 focus:ring-bordeaux"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-bordeaux hover:bg-terre-cuite text-white transition-colors duration-200"
        >
          <Send className="mr-2 w-5 h-5" /> Envoyer le message
        </Button>
      </form>
    </DialogContent>
  </Dialog>
)

const AboutPage = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleContactFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }))
  }, [])

  const handleContactSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation des champs
    if (!contactForm.name.trim()) {
      toast.error('Veuillez saisir votre nom')
      return
    }
    
    if (!contactForm.email.trim() || !/\S+@\S+\.\S+/.test(contactForm.email)) {
      toast.error('Veuillez saisir un email valide')
      return
    }
    
    if (!contactForm.message.trim()) {
      toast.error('Veuillez saisir un message')
      return
    }

    // TODO: Implement actual form submission logic
    console.log('Contact Form Submitted:', contactForm)
    
    // Afficher le toast de confirmation
    toast.success('Message envoyé avec succès !', {
      description: 'Nous vous répondrons dans les meilleurs délais.',
      duration: 4000,
      icon: <Check className="w-5 h-5 text-green-500" />,
      position: 'bottom-right',
      classNames: {
        toast: 'bg-white border border-green-200 shadow-lg',
        description: 'text-gris-neutre',
        icon: 'mr-2'
      }
    })

    // Réinitialiser le formulaire et fermer le modal
    setContactForm({ name: '', email: '', message: '' })
    setIsContactModalOpen(false)
  }, [contactForm])

  const features = [
    {
      icon: Eye,
      title: "Sens de l'observation",
      description: "Une approche analytique qui décèle les opportunités de transformation."
    },
    {
      icon: Ear,
      title: "Écoute attentive",
      description: "Comprendre en profondeur les besoins uniques de chaque client."
    },
    {
      icon: BookOpen,
      title: "Connaissances approfondies",
      description: "Une expertise RH pointue et constamment actualisée."
    },
    {
      icon: Target,
      title: "Volonté de satisfaction",
      description: "Des solutions sur-mesure qui répondent précisément à vos enjeux."
    }
  ]

  const PodcastHighlight = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl 
      bg-gradient-to-br from-white/[0.08] to-transparent 
      border border-white/[0.12] 
      backdrop-blur-sm p-8 mb-20 group
      hover:border-white/[0.2] transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/[0.05] to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      
      <div className="flex items-center justify-between flex-wrap gap-6">
        <div className="flex items-center space-x-6">
          <div className="bg-white/[0.12] p-4 rounded-xl">
            <Headphones className="w-8 h-8 text-white/80" />
          </div>
          <div>
            <h3 className="text-xl font-medium text-white mb-2">
              Insights RH Exclusifs
            </h3>
            <p className="text-base text-white/70">
              Découvrez nos podcasts et contenus stratégiques
            </p>
          </div>
        </div>
        <Link 
          href="/podcast"
          className="group/link flex items-center gap-2 
          px-6 py-3 rounded-xl
          border border-white/[0.12] 
          text-white/90 hover:text-white
          transition-all duration-300 
          hover:border-white/[0.2]
          hover:bg-white/[0.05]"
        >
          Explorer
          <ArrowUpRight 
            className="w-5 h-5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" 
          />
        </Link>
      </div>
    </motion.div>
  )

  const ContactSection = () => (
    <>
      <ContactModal 
        isOpen={isContactModalOpen}
        onOpenChange={setIsContactModalOpen}
        formData={contactForm}
        onFormChange={handleContactFormChange}
        onSubmit={handleContactSubmit}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="relative bg-gradient-to-br from-white/[0.08] to-transparent 
        border border-white/[0.12] 
        backdrop-blur-sm rounded-2xl p-10 text-center group
        hover:border-white/[0.2] transition-all duration-300"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/[0.05] to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        
        <h2 className="text-3xl font-heading text-white mb-6">
          Votre Transformation RH Commence Ici
        </h2>
        <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
          Nous sommes prêts à vous accompagner dans votre évolution stratégique. 
          Chaque entreprise est unique, chaque défi mérite une approche personnalisée.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <RainbowButton 
            onClick={() => setIsContactModalOpen(true)}
            className="group/contact flex items-center gap-2"
          >
            <MessageCircle className="w-5 h-5 mr-2 text-or-doux" />
            Contactez-nous
            <ArrowUpRight 
              className="w-5 h-5 transition-transform group-hover/contact:translate-x-0.5 group-hover/contact:-translate-y-0.5" 
            />
          </RainbowButton>
          
          <RainbowButton 
            onClick={() => window.location.href = '/booking'}
            className="group/booking flex items-center gap-2"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Réserver un rendez-vous
            <ArrowUpRight 
              className="w-5 h-5 transition-transform group-hover/booking:translate-x-0.5 group-hover/booking:-translate-y-0.5" 
            />
          </RainbowButton>
        </div>
      </motion.div>
    </>
  )

  return (
    <div className="min-h-screen bg-black pt-28 pb-20">
      {/* Ajout du Toaster de Sonner */}
      <Toaster richColors />

      {/* Background Effects */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05),transparent_50%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 sm:px-8 lg:px-12">
        {/* Navigation */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-16 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          Retour à l'accueil
        </Link>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl font-heading text-white mb-8">
              Notre Histoire
            </h1>
            <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
              Un parcours dédié à la transformation et à l'innovation des ressources humaines
            </p>
          </motion.div>

          {/* Podcast Highlight */}
          <PodcastHighlight />

          {/* Story Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-gradient-to-br from-white/[0.08] to-transparent 
            backdrop-blur-sm border border-white/[0.12] 
            rounded-2xl p-10 mb-20 group
            hover:border-white/[0.2] transition-all duration-300"
          >
            <div className="flex flex-col space-y-6">
              <p className="text-lg font-light tracking-wide text-white/90 leading-relaxed">
                Notre mission : transformer et dynamiser les ressources humaines 
                à travers une approche sur-mesure et humaine. Nous croyons que 
                chaque entreprise et chaque professionnel a un potentiel unique 
                à développer.
              </p>
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
                className="bg-gradient-to-br from-white/[0.08] to-transparent 
                backdrop-blur-sm border border-white/[0.12] 
                rounded-2xl p-8 group
                hover:border-white/[0.2] transition-all duration-300
                hover:bg-white/[0.02]"
              >
                <feature.icon className="w-10 h-10 text-white/80 mb-6 
                  group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-medium text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-base text-white/80 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <ContactSection />
        </div>
      </div>
    </div>
  )
}

export default AboutPage 