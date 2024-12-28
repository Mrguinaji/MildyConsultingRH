'use client'

import { motion } from 'framer-motion'
import { 
  Users, TrendingUp, Lightbulb, Target,
  MessageCircle, FileText, BarChart, Briefcase,
  Heart, Sparkles, Scale, Users2, ArrowLeft,
  GraduationCap, Award, Trophy, ArrowUpRight
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { RainbowButton } from '@/components/ui/rainbow-button'
import OrbitingCircles from '@/components/magicui/orbiting-circles'

const orbits = [
  // Orbite intérieure rapide
  {
    icon: <Users className="size-6" />,
    radius: 80,
    duration: 15,
    color: "#6B2737", // bordeaux
    label: "Gestion des Talents",
    description: "Recrutement, développement et fidélisation des talents"
  },
  {
    icon: <TrendingUp className="size-6" />,
    radius: 80,
    duration: 15,
    delay: 7.5,
    color: "#B46060", // terre-cuite
    label: "Performance RH",
    description: "Optimisation des processus et indicateurs RH"
  },
  // Orbite moyenne
  {
    icon: <Lightbulb className="size-6" />,
    radius: 140,
    duration: 25,
    color: "#DEB887", // or-doux
    label: "Innovation RH",
    description: "Solutions innovantes et transformation digitale"
  },
  {
    icon: <Target className="size-6" />,
    radius: 140,
    duration: 25,
    delay: 12.5,
    color: "#6B2737", // bordeaux
    label: "Stratégie RH",
    description: "Alignement RH avec les objectifs d'entreprise"
  },
  // Orbite extérieure lente
  {
    icon: <MessageCircle className="size-6" />,
    radius: 200,
    duration: 35,
    reverse: true,
    color: "#B46060", // terre-cuite
    label: "Communication",
    description: "Communication interne et marque employeur"
  },
  {
    icon: <FileText className="size-6" />,
    radius: 200,
    duration: 35,
    delay: 17.5,
    reverse: true,
    color: "#DEB887", // or-doux
    label: "Conformité",
    description: "Gestion administrative et conformité légale"
  },
  {
    icon: <Briefcase className="size-6" />,
    radius: 200,
    duration: 35,
    delay: 8.75,
    reverse: true,
    color: "#4A4A4A", // gris-neutre
    label: "Formation",
    description: "Développement des compétences et formation continue"
  },
]

const values = [
  {
    icon: Heart,
    title: "Humanité",
    description: "Nous plaçons l'humain au cœur de chaque décision, favorisant des relations authentiques et bienveillantes."
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description: "Nous embrassons le changement et recherchons constamment des solutions créatives aux défis RH modernes."
  },
  {
    icon: Scale,
    title: "Éthique",
    description: "Nous agissons avec intégrité et transparence, respectant les plus hauts standards professionnels."
  },
  {
    icon: Users2,
    title: "Partenariat",
    description: "Nous construisons des relations durables basées sur la confiance et la collaboration."
  }
]

const achievements = [
  {
    icon: Users,
    number: "500+",
    label: "Clients Satisfaits"
  },
  {
    icon: GraduationCap,
    number: "1000+",
    label: "Carrières Transformées"
  },
  {
    icon: Award,
    number: "15+",
    label: "Années d'Expertise"
  },
  {
    icon: Trophy,
    number: "98%",
    label: "Taux de Satisfaction"
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-beige-clair/20 pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Navigation */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-terre-cuite hover:text-bordeaux mb-16 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          Retour à l'accueil
        </Link>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-32"
        >
          <h1 className="text-5xl font-heading text-bordeaux mb-8">
            À Propos de Mildy Consulting
          </h1>
          <p className="text-xl text-terre-cuite/80 leading-relaxed max-w-3xl mx-auto">
            Experts en ressources humaines, passionnés par l'innovation et dévoués à la réussite de nos clients.
            Découvrez notre histoire, nos valeurs et notre vision pour l'avenir des RH.
          </p>
        </motion.div>

        {/* Histoire Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-12 items-center mb-32"
        >
          <div>
            <h2 className="text-3xl font-heading text-bordeaux mb-6">
              Notre Histoire
            </h2>
            <div className="space-y-4 text-terre-cuite/80">
              <p>
                Fondée en 2008, Mildy Consulting est née de la vision d'une approche plus humaine 
                et innovante des ressources humaines. Notre fondatrice, forte de son expérience 
                dans les plus grands groupes, a voulu créer un cabinet de conseil différent.
              </p>
              <p>
                Au fil des années, nous avons développé une expertise unique, combinant méthodes 
                éprouvées et innovations technologiques. Notre croissance s'est construite sur 
                des succès partagés avec nos clients et une réputation d'excellence.
              </p>
              <p>
                Aujourd'hui, nous sommes fiers d'être un acteur majeur du conseil RH, reconnu 
                pour notre approche personnalisée et notre capacité à accompagner aussi bien 
                les grands groupes que les PME dans leur transformation.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-bordeaux/5 to-transparent rounded-2xl" />
            <Image
              src="/images/about/histoire.jpg"
              alt="Histoire de Mildy Consulting"
              width={600}
              height={400}
              className="rounded-2xl shadow-lg"
            />
          </div>
        </motion.div>

        {/* Valeurs Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-32"
        >
          <h2 className="text-3xl font-heading text-bordeaux mb-6">
            Nos Valeurs
          </h2>
          <p className="text-xl text-terre-cuite/80 max-w-3xl mx-auto mb-12">
            Des principes qui guident chacune de nos actions et façonnent notre approche du conseil.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <value.icon className="w-12 h-12 text-terre-cuite mx-auto mb-4" />
                <h3 className="text-xl font-heading text-bordeaux mb-3">
                  {value.title}
                </h3>
                <p className="text-terre-cuite/80">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Notre Approche Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading text-bordeaux mb-6">
              Notre Approche
            </h2>
            <p className="text-xl text-terre-cuite/80 max-w-3xl mx-auto">
              Une vision holistique des ressources humaines, centrée sur l'innovation et l'humain
            </p>
          </div>

          <div className="relative">
            {/* Effet de lumière */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(107,39,55,0.05),transparent_70%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(180,96,96,0.05),transparent_50%)]" />
            </div>

            {/* Système solaire RH */}
            <div className="flex justify-center py-12">
              <OrbitingCircles circles={orbits} />
            </div>
          </div>

          <div className="max-w-3xl mx-auto text-center mt-16">
            <p className="text-lg text-gris-neutre/90 leading-relaxed mb-8">
              Notre approche intégrée combine expertise RH traditionnelle et innovation digitale. 
              Nous plaçons l'humain au cœur de la transformation, en créant des solutions 
              sur-mesure qui répondent aux défis uniques de chaque organisation.
            </p>
            <p className="text-lg text-gris-neutre/90 leading-relaxed">
              De la gestion des talents à la transformation digitale, en passant par 
              le développement de la culture d'entreprise, nous vous accompagnons dans 
              toutes les dimensions de vos enjeux RH.
            </p>
          </div>
        </motion.div>

        {/* Chiffres Clés Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-32"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg text-center"
              >
                <achievement.icon className="w-12 h-12 text-terre-cuite mx-auto mb-4" />
                <div className="text-4xl font-bold text-bordeaux mb-2">
                  {achievement.number}
                </div>
                <div className="text-terre-cuite/80">
                  {achievement.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-white rounded-2xl shadow-lg p-10 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-beige-clair/20 to-transparent" />
          <div className="relative z-10">
            <h2 className="text-3xl font-heading text-bordeaux mb-6">
              Prêt à Transformer vos RH ?
            </h2>
            <p className="text-lg text-terre-cuite/80 mb-8 max-w-2xl mx-auto">
              Découvrez comment notre expertise peut vous aider à relever vos défis RH
              et à construire une organisation plus performante et humaine.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <RainbowButton 
                onClick={() => window.location.href = '/contact'}
                className="group flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Contactez-nous
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </RainbowButton>
              
              <RainbowButton 
                onClick={() => window.location.href = '/services'}
                className="group flex items-center gap-2"
              >
                <Briefcase className="w-5 h-5" />
                Découvrir nos services
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </RainbowButton>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 