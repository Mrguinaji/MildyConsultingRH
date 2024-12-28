'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Menu, X, Circle, Square, Triangle } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const PHI = 1.618033988749895 // Nombre d'or

const navItems = [
  { name: 'À Propos', path: '/a-propos', shape: Circle },
  { name: 'Services', path: '/services', shape: Square },
  { name: 'Portfolio', path: '/portfolio', shape: Triangle },
  { name: 'Podcast', path: '/podcast', shape: Circle },
  { name: 'Réserver', path: '/booking', shape: Square },
]

const LogoSVG = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 100 100" 
    className="w-16 h-16"
    style={{
      filter: 'drop-shadow(0px 2px 4px rgba(139, 69, 19, 0.1))'
    }}
  >
    {/* Fond avec motif géométrique */}
    <defs>
      <pattern id="gridPattern" width="10" height="10" patternUnits="userSpaceOnUse">
        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#D4A76A" strokeWidth="0.5" opacity="0.2"/>
      </pattern>
    </defs>
    <circle cx="50" cy="50" r="48" fill="url(#gridPattern)" className="transition-all duration-300"/>
    
    {/* Formes géométriques principales */}
    <g className="transition-transform duration-300 group-hover:rotate-[5deg]" style={{ transformOrigin: 'center' }}>
      {/* Hexagone de fond */}
      <path 
        d="M50 5 L85 25 L85 75 L50 95 L15 75 L15 25 Z" 
        fill="#FDF6E9" 
        stroke="#8B4513" 
        strokeWidth="1.5"
      />
      
      {/* Symboles des personnes stylisés */}
      <g transform="translate(25, 30)">
        {/* Première personne */}
        <path 
          d="M0 20 L20 0 L40 20 L30 20 L30 40 L10 40 L10 20 Z" 
          fill="#8B4513"
          className="transition-transform duration-300 group-hover:translate-y-[-2px]"
        />
        {/* Deuxième personne */}
        <path 
          d="M10 30 L30 10 L50 30 L40 30 L40 50 L20 50 L20 30 Z" 
          fill="#D4A76A"
          className="transition-transform duration-300 group-hover:translate-y-[2px]"
        />
      </g>
    </g>
  </svg>
)

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)

  // Animations basées sur le scroll
  const headerOpacity = useTransform(scrollY, [0, 50], [0.9, 1])
  const headerBlur = useTransform(scrollY, [0, 50], [8, 12])
  const scale = useTransform(scrollY, [0, 100], [1, 0.95])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header 
      style={{ opacity: headerOpacity }}
      className={`fixed w-full z-50 transition-all duration-500 ease-out
        ${isScrolled ? 'bg-white/90' : 'bg-white/80'}
        backdrop-blur-[var(--blur)]`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div 
        className="absolute inset-0 bg-gradient-to-r from-beige-clair/20 via-transparent to-bordeaux/10"
        style={{ 
          clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
          opacity: isScrolled ? 0.8 : 0.4
        }}
      />

      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          {/* Logo et nom du site */}
          <Link href="/" className="relative group py-2">
            <motion.div 
              className="relative flex items-center gap-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-[#D4A76A]/5 to-[#8B4513]/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ scale }}
              />
              <LogoSVG />
              <div className="flex flex-col">
                <motion.span 
                  className="text-3xl font-heading text-[#1B365D] font-bold tracking-wide"
                  whileHover={{ x: 2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  MILDY
                </motion.span>
                <div className="flex items-center gap-2">
                  <motion.span 
                    className="text-lg text-[#8B4513] tracking-wider"
                    whileHover={{ x: 2 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    CONSULTING
                  </motion.span>
                  <motion.span 
                    className="text-lg font-bold text-[#D4A76A]"
                    whileHover={{ x: 2 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    RH
                  </motion.span>
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Menu mobile */}
          <motion.button 
            onClick={() => setIsOpen(!isOpen)}
            className="z-50 md:hidden relative"
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 text-bordeaux" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 text-bordeaux" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.button>

          {/* Navigation desktop */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-2">
              {navItems.map((item, index) => {
                const Icon = item.shape
                return (
                  <motion.li 
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.path}
                      className="relative group px-4 py-2 flex items-center gap-2"
                    >
                      <motion.div 
                        className={`absolute inset-0 rounded-lg transition-colors duration-200
                          ${pathname === item.path ? 'bg-terre-cuite/10' : 'bg-transparent group-hover:bg-beige-clair/30'}`}
                        layoutId="nav-background"
                      />
                      <div className="relative flex items-center gap-2">
                        <motion.div
                          whileHover={{ rotate: 180 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Icon className={`w-4 h-4 ${pathname === item.path ? 'text-terre-cuite' : 'text-bordeaux group-hover:text-terre-cuite'} transition-colors`} />
                        </motion.div>
                        <span className={`text-sm font-medium tracking-wide ${pathname === item.path ? 'text-terre-cuite' : 'text-bordeaux group-hover:text-terre-cuite'} transition-colors`}>
                          {item.name}
                        </span>
                      </div>
                    </Link>
                  </motion.li>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* Menu mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-white/95 shadow-lg md:hidden border-t border-or-doux/20 overflow-hidden"
          >
            <nav className="container mx-auto py-6">
              <ul className="space-y-4">
                {navItems.map((item, index) => {
                  const Icon = item.shape
                  return (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="px-4"
                    >
                      <Link
                        href={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`group flex items-center gap-3 py-2 ${
                          pathname === item.path ? 'text-terre-cuite' : 'text-bordeaux'
                        }`}
                      >
                        <motion.div
                          whileHover={{ rotate: 180 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Icon className="w-5 h-5 group-hover:text-terre-cuite transition-colors" />
                        </motion.div>
                        <span className="font-medium group-hover:text-terre-cuite transition-colors">
                          {item.name}
                        </span>
                      </Link>
                    </motion.li>
                  )
                })}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header

