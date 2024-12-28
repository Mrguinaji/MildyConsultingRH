'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Home, Search } from 'lucide-react'
import { RainbowButton } from '@/components/ui/rainbow-button'

const NotFound = () => {
  // Animation des chiffres 404
  const numberVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    })
  }

  // Animation du message
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4,
        duration: 0.5
      }
    }
  }

  // Animation des boutons
  const buttonVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.6,
        duration: 0.5
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-beige-clair/30 to-white flex flex-col items-center justify-center px-4">
      {/* Motif de fond */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(180,96,96,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(107,39,55,0.05),transparent_50%)]" />
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* Titre 404 animé */}
        <div className="flex justify-center items-center gap-4 mb-8">
          {[4, 0, 4].map((number, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={numberVariants}
              initial="hidden"
              animate="visible"
              className="text-8xl md:text-9xl font-heading font-bold text-bordeaux"
            >
              {number}
            </motion.div>
          ))}
        </div>

        {/* Message d'erreur */}
        <motion.div
          variants={messageVariants}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <h1 className="text-2xl md:text-3xl font-heading text-bordeaux mb-4">
            Oups ! Cette page semble s'être égarée...
          </h1>
          <p className="text-terre-cuite/80 text-lg">
            Ne vous inquiétez pas, il arrive même aux meilleures pages de se perdre. 
            Laissez-nous vous guider vers le bon chemin.
          </p>
        </motion.div>

        {/* Boutons d'action */}
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <Link href="/">
            <RainbowButton className="group w-full sm:w-auto">
              <Home className="w-5 h-5" />
              Retour à l'accueil
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            </RainbowButton>
          </Link>
          <Link href="/contact">
            <RainbowButton className="group w-full sm:w-auto">
              <Search className="w-5 h-5" />
              Nous contacter
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            </RainbowButton>
          </Link>
        </motion.div>

        {/* Illustration géométrique */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md h-1 bg-gradient-to-r from-transparent via-terre-cuite/20 to-transparent" />
      </div>
    </div>
  )
}

export default NotFound 