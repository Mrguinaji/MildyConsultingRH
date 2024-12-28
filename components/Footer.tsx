import Link from 'next/link'
import Image from 'next/image'
import { Linkedin, Twitter, Instagram, Shield } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-beige-clair/5 to-bordeaux/5 pt-24 pb-12 overflow-hidden">
      {/* Effet de fond dynamique */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(180,96,96,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(107,39,55,0.05),transparent_50%)]" />
        <div className="absolute inset-0 backdrop-blur-3xl opacity-30" />
      </div>

      <div className="container relative z-10">
        {/* Logo et tagline */}
        <div className="flex flex-col items-center mb-16">
          <Link href="/" className="mb-6">
            <Image
              src="/images/logo.png"
              alt="Mildy Consulting RH"
              width={120}
              height={40}
              className="h-auto w-auto"
            />
          </Link>
          <p className="text-terre-cuite/80 text-sm max-w-md text-center">
            Innovez vos ressources humaines avec une approche centrée sur l'humain et la performance
          </p>
        </div>

        {/* Navigation et liens */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div>
            <h4 className="font-heading text-bordeaux mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services/entreprises" className="text-sm text-terre-cuite/70 hover:text-terre-cuite transition-colors">
                  Entreprises
                </Link>
              </li>
              <li>
                <Link href="/services/particuliers" className="text-sm text-terre-cuite/70 hover:text-terre-cuite transition-colors">
                  Particuliers
                </Link>
              </li>
              <li>
                <Link href="/services/formation" className="text-sm text-terre-cuite/70 hover:text-terre-cuite transition-colors">
                  Formation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-bordeaux mb-4">Ressources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/podcast" className="text-sm text-terre-cuite/70 hover:text-terre-cuite transition-colors">
                  Podcast RH
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-terre-cuite/70 hover:text-terre-cuite transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-sm text-terre-cuite/70 hover:text-terre-cuite transition-colors">
                  Études de cas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-bordeaux mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-sm text-terre-cuite/70 hover:text-terre-cuite transition-colors">
                  Nous contacter
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-sm text-terre-cuite/70 hover:text-terre-cuite transition-colors">
                  Réserver un RDV
                </Link>
              </li>
              <li>
                <a href="tel:+33652208794" className="text-sm text-terre-cuite/70 hover:text-terre-cuite transition-colors">
                  06 52 20 87 94
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-bordeaux mb-4">Suivez-nous</h4>
            <div className="flex gap-4">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors group"
              >
                <Linkedin className="w-5 h-5 text-terre-cuite group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors group"
              >
                <Twitter className="w-5 h-5 text-terre-cuite group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors group"
              >
                <Instagram className="w-5 h-5 text-terre-cuite group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Séparateur avec effet */}
        <div className="relative h-px w-full mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-terre-cuite/20 to-transparent" />
        </div>

        {/* Pied de page avec informations légales */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-terre-cuite/60">
          <div className="flex items-center gap-6">
            <span>© 2024 Mildy Consulting RH</span>
            <Link href="/mentions-legales" className="hover:text-terre-cuite transition-colors">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="hover:text-terre-cuite transition-colors">
              Politique de confidentialité
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>Site sécurisé - SSL/TLS</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

