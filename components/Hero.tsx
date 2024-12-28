'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles, Target, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

const HeroBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -top-1/2 left-1/2 transform -translate-x-1/2 
      w-[200%] h-[200%] 
      bg-gradient-radial from-beige-clair/10 via-or-doux/5 to-transparent 
      animate-slow-spin opacity-50 blur-3xl" />
    
    <div className="absolute bottom-0 left-0 w-full h-1/2 
      bg-gradient-to-t from-beige-clair/10 to-transparent 
      opacity-50" />
  </div>
)

const HeroHighlight = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ 
      duration: 1, 
      type: "spring", 
      stiffness: 50 
    }}
    className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
    w-[300px] h-[300px] 
    bg-gradient-to-br from-or-doux/20 to-transparent 
    rounded-full blur-3xl opacity-50"
  />
)

const Hero = () => {
  const buttonVariants = {
    initial: { scale: 1, boxShadow: '0 0 0 0 rgba(255,255,255,0.2)' },
    hover: { 
      scale: 1.05, 
      boxShadow: '0 10px 25px -5px rgba(255,255,255,0.2)',
      transition: { duration: 0.3 }
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center 
    bg-beige-clair overflow-hidden">
      
      {/* Ultra-Modern Background */}
      <HeroBackground />
      <HeroHighlight />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Animated Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            type: "spring", 
            stiffness: 50 
          }}
          className="text-5xl md:text-6xl font-heading text-bordeaux 
          mb-6 leading-tight tracking-tight"
        >
          Révolutionnez vos{' '}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="relative inline-block"
          >
            RH
            <Sparkles 
              className="absolute -top-2 -right-6 text-or-doux" 
              size={24} 
              strokeWidth={2} 
            />
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: 0.3,
            type: "spring", 
            stiffness: 50 
          }}
          className="text-xl md:text-2xl text-terre-cuite/90 
          max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Transformez votre stratégie RH avec une approche innovante, 
          personnalisée et centrée sur l'humain.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: 0.5,
            type: "spring", 
            stiffness: 50 
          }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <motion.div
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            className="group"
          >
            <Link 
              href="/services"
              className={cn(
                "inline-flex items-center gap-2 px-8 py-3 rounded-full",
                "bg-bordeaux text-white hover:bg-terre-cuite",
                "transition-all duration-300 transform",
                "group-hover:scale-[1.02] group-hover:shadow-lg",
                "relative overflow-hidden"
              )}
            >
              <Zap className="w-5 h-5 mr-2 text-or-doux" />
              Nos Services
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              
              {/* Subtle Hover Effect */}
              <span 
                className="absolute inset-0 bg-white/10 opacity-0 
                group-hover:opacity-100 transition-opacity duration-300" 
              />
            </Link>
          </motion.div>

          <motion.div
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            className="group"
          >
            <Link 
              href="/about"
              className={cn(
                "inline-flex items-center gap-2 px-8 py-3 rounded-full",
                "bg-white/10 border border-bordeaux/20 text-bordeaux",
                "hover:bg-white/20 hover:border-bordeaux/30",
                "transition-all duration-300 transform",
                "group-hover:scale-[1.02] group-hover:shadow-lg",
                "relative overflow-hidden"
              )}
            >
              <Target className="w-5 h-5 mr-2 text-or-doux" />
              En savoir plus
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              
              {/* Subtle Hover Effect */}
              <span 
                className="absolute inset-0 bg-white/10 opacity-0 
                group-hover:opacity-100 transition-opacity duration-300" 
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

