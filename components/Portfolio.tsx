'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { 
  Clock, TrendingUp, ChevronLeft, ChevronRight,
  Users, Award, Target, ArrowRight, X, Sparkles,
  Play, Pause, Share2, ExternalLink, Maximize2
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface Project {
  id: number
  title: string
  description: string
  client: string
  duration: string
  image: {
    src: string
    alt: string
  }
  results: {
    icon: React.ReactNode
    value: string
    label: string
  }[]
  testimonial?: {
    content: string
    author: string
    role: string
  }
  tags: string[]
}

const projects: Project[] = [
  {
    id: 1,
    title: "Reconversion Professionnelle Réussie",
    description: "Accompagnement complet d'une cadre en reconversion vers le secteur du digital. Bilan de compétences, formation ciblée et coaching personnalisé ont permis une transition fluide vers un nouveau poste de Product Owner.",
    client: 'Sarah M.',
    duration: '4 mois',
    image: {
      src: "/images/portfolio/reconversion-thumb.jpg",
      alt: "Reconversion professionnelle réussie"
    },
    tags: ['Reconversion', 'Coaching', 'Digital'],
    results: [
      {
        icon: <Users className="w-5 h-5" />,
        value: "3",
        label: "Offres reçues"
      },
      {
        icon: <Award className="w-5 h-5" />,
        value: "+40%",
        label: "Augmentation salariale"
      },
      {
        icon: <Target className="w-5 h-5" />,
        value: "8/10",
        label: "Satisfaction globale"
      }
    ],
    testimonial: {
      content: "Mildy Consulting m'a guidée pas à pas dans ma reconversion. Leur approche personnalisée et leur expertise m'ont donné confiance pour réussir ce changement.",
      author: "Sarah M.",
      role: "Product Owner"
    }
  },
  {
    id: 2,
    title: "Optimisation de Profil Senior",
    description: "Accompagnement d'un cadre dirigeant dans la valorisation de son parcours et l'optimisation de sa présence professionnelle. Refonte complète du CV, du profil LinkedIn et préparation aux entretiens.",
    client: 'Philippe D.',
    duration: '2 mois',
    image: {
      src: "/images/portfolio/senior-thumb.jpg",
      alt: "Optimisation profil senior"
    },
    tags: ['Personal Branding', 'LinkedIn', 'Executive'],
    results: [
      {
        icon: <Users className="w-5 h-5" />,
        value: "+200%",
        label: "Visibilité LinkedIn"
      },
      {
        icon: <Award className="w-5 h-5" />,
        value: "5",
        label: "Entretiens décrochés"
      },
      {
        icon: <Target className="w-5 h-5" />,
        value: "CDI",
        label: "Contrat obtenu"
      }
    ],
    testimonial: {
      content: "L'expertise de Mildy Consulting en personal branding a complètement transformé ma présence professionnelle. Les résultats ont dépassé mes attentes.",
      author: "Philippe D.",
      role: "Directeur Commercial"
    }
  },
  {
    id: 3,
    title: "Retour à l'Emploi Post-Congé Parental",
    description: "Accompagnement personnalisé d'une professionnelle souhaitant reprendre son activité après un congé parental. Focus sur la mise à jour des compétences et la négociation d'un retour adapté.",
    client: 'Marie L.',
    duration: '3 mois',
    image: {
      src: "/images/portfolio/retour-emploi-thumb.jpg",
      alt: "Retour à l'emploi réussi"
    },
    tags: ['Réinsertion', 'Négociation', 'Équilibre'],
    results: [
      {
        icon: <Users className="w-5 h-5" />,
        value: "4/5j",
        label: "Télétravail obtenu"
      },
      {
        icon: <Award className="w-5 h-5" />,
        value: "Formation",
        label: "Mise à niveau"
      },
      {
        icon: <Target className="w-5 h-5" />,
        value: "Flexible",
        label: "Horaires adaptés"
      }
    ],
    testimonial: {
      content: "Grâce à Mildy Consulting, j'ai pu négocier un retour qui respecte mon équilibre vie pro/perso. Leur soutien a été déterminant.",
      author: "Marie L.",
      role: "Cheffe de Projet"
    }
  },
  {
    id: 4,
    title: "Lancement d'Activité Indépendante",
    description: "Accompagnement d'un professionnel dans la création de son activité de consultant indépendant. De la définition de l'offre au développement commercial, en passant par le positionnement stratégique.",
    client: 'Thomas B.',
    duration: '6 mois',
    image: {
      src: "/images/portfolio/independant-thumb.jpg",
      alt: "Lancement activité indépendante"
    },
    tags: ['Entrepreneuriat', 'Stratégie', 'Business'],
    results: [
      {
        icon: <Users className="w-5 h-5" />,
        value: "3",
        label: "Premiers clients"
      },
      {
        icon: <Award className="w-5 h-5" />,
        value: "+25%",
        label: "Objectif CA"
      },
      {
        icon: <Target className="w-5 h-5" />,
        value: "100%",
        label: "Autonomie"
      }
    ],
    testimonial: {
      content: "L'accompagnement de Mildy Consulting a été crucial dans le lancement réussi de mon activité. Leur expertise m'a permis d'éviter de nombreux écueils.",
      author: "Thomas B.",
      role: "Consultant Indépendant"
    }
  },
  {
    id: 5,
    title: "Transformation RH chez TechCorp",
    description: "Mise en place d'un système SIRH moderne et formation des équipes. Notre intervention a permis d'optimiser les processus RH et d'améliorer l'expérience collaborateur.",
    client: 'TechCorp',
    duration: '6 mois',
    image: {
      src: "/images/portfolio/techcorp-thumb-1.jpg",
      alt: "Dashboard SIRH TechCorp"
    },
    tags: ['SIRH', 'Formation', 'Digital'],
    results: [
      {
        icon: <Users className="w-5 h-5" />,
        value: "+85%",
        label: "Satisfaction employés"
      },
      {
        icon: <Award className="w-5 h-5" />,
        value: "-40%",
        label: "Temps de traitement"
      },
      {
        icon: <Target className="w-5 h-5" />,
        value: "150K€",
        label: "Économies annuelles"
      }
    ],
    testimonial: {
      content: "L'expertise de Mildy Consulting a été déterminante dans la réussite de notre transformation digitale RH.",
      author: "Marie Dubois",
      role: "DRH - TechCorp"
    }
  },
  {
    id: 6,
    title: "Coaching de Développement Personnel",
    description: "Accompagnement d'une jeune professionnelle dans le développement de son leadership et de sa confiance en soi. Programme personnalisé incluant des sessions de coaching et des ateliers pratiques.",
    client: 'Julie R.',
    duration: '4 mois',
    image: {
      src: "/images/portfolio/coaching-thumb.jpg",
      alt: "Coaching développement personnel"
    },
    tags: ['Leadership', 'Coaching', 'Développement'],
    results: [
      {
        icon: <Users className="w-5 h-5" />,
        value: "12",
        label: "Sessions coaching"
      },
      {
        icon: <Award className="w-5 h-5" />,
        value: "Promotion",
        label: "Évolution obtenue"
      },
      {
        icon: <Target className="w-5 h-5" />,
        value: "+60%",
        label: "Confiance en soi"
      }
    ],
    testimonial: {
      content: "Le coaching m'a permis de révéler mon potentiel et de prendre confiance en mes capacités de leader. Une expérience transformatrice.",
      author: "Julie R.",
      role: "Team Lead"
    }
  }
]

const MotionImage = motion(Image)

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [30, -30])
  const rotateY = useTransform(x, [-100, 100], [-30, 30])

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    setMousePosition({
      x: event.clientX - centerX,
      y: event.clientY - centerY
    })
    x.set(event.clientX - centerX)
    y.set(event.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  const nextProject = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const previousProject = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  return (
    <div className="relative px-4">
      {/* Contrôles de lecture */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg text-terre-cuite hover:text-bordeaux transition-colors"
        >
          {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg text-terre-cuite hover:text-bordeaux transition-colors"
        >
          <Share2 className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Navigation */}
      <motion.button
        whileHover={{ scale: 1.1, x: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={previousProject}
        className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg text-terre-cuite hover:text-bordeaux transition-all"
      >
        <ChevronLeft className="w-6 h-6" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.9 }}
        onClick={nextProject}
        className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg text-terre-cuite hover:text-bordeaux transition-all"
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button>

      {/* Projet principal */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden"
        style={{
          perspective: 2000
        }}
      >
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          style={{
            rotateX: isHovered ? rotateX : 0,
            rotateY: isHovered ? rotateY : 0,
            transition: "all 0.5s ease-out"
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative h-[400px] md:h-full group">
            <MotionImage
              src={projects[currentIndex].image.src}
              alt={projects[currentIndex].image.alt}
              fill
              className="object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-bordeaux/80 via-bordeaux/40 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="absolute bottom-6 left-6 right-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {projects[currentIndex].tags.map((tag, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium hover:bg-white/20 transition-colors cursor-default"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
              <motion.h2
                className="text-3xl font-heading mb-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                {projects[currentIndex].title}
              </motion.h2>
              <motion.div
                className="flex items-center gap-6 text-white/90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>{projects[currentIndex].client}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{projects[currentIndex].duration}</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="h-full flex flex-col"
            >
              <motion.p
                className="text-terre-cuite/80 text-lg mb-8 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {projects[currentIndex].description}
              </motion.p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {projects[currentIndex].results.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-beige-clair/20 to-beige-clair/5 rounded-lg p-4 text-center backdrop-blur-sm hover:shadow-lg transition-all"
                  >
                    <motion.div
                      className="text-terre-cuite mb-2"
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    >
                      {result.icon}
                    </motion.div>
                    <motion.div
                      className="text-xl font-bold text-bordeaux mb-1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      {result.value}
                    </motion.div>
                    <motion.div
                      className="text-sm text-terre-cuite/70"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                    >
                      {result.label}
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {projects[currentIndex].testimonial && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-gradient-to-br from-beige-clair/20 to-beige-clair/5 rounded-lg p-6 mb-8 relative overflow-hidden group hover:shadow-lg transition-all"
                >
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-4 right-4"
                  >
                    <Sparkles className="text-terre-cuite/20 w-6 h-6" />
                  </motion.div>
                  <motion.p
                    className="text-terre-cuite/80 italic mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    "{projects[currentIndex].testimonial.content}"
                  </motion.p>
                  <div>
                    <p className="font-medium text-bordeaux">
                      {projects[currentIndex].testimonial.author}
                    </p>
                    <p className="text-sm text-terre-cuite/70">
                      {projects[currentIndex].testimonial.role}
                    </p>
                  </div>
                </motion.div>
              )}

              <div className="mt-auto flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedProject(projects[currentIndex])}
                  className="flex-1 bg-gradient-to-r from-terre-cuite to-bordeaux text-white py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg group"
                >
                  <span>Explorer ce projet</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-3 rounded-lg bg-beige-clair/10 text-terre-cuite hover:bg-beige-clair/20 transition-colors"
                >
                  <Maximize2 className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Modal détails projet */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative h-64 md:h-96 group">
                <MotionImage
                  src={selectedProject.image.src}
                  alt={selectedProject.image.alt}
                  fill
                  className="object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-bordeaux/80 via-bordeaux/40 to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.9 }}
                />
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg"
                >
                  <X className="w-5 h-5 text-terre-cuite" />
                </motion.button>
                <motion.div
                  className="absolute bottom-6 left-6 right-6 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedProject.tags.map((tag, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                  <h3 className="text-3xl font-heading mb-2">
                    {selectedProject.title}
                  </h3>
                  <div className="flex items-center gap-6 text-white/90">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      <span>{selectedProject.client}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{selectedProject.duration}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
              <div className="p-8">
                <motion.p
                  className="text-terre-cuite/80 text-lg mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {selectedProject.description}
                </motion.p>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {selectedProject.results.map((result, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-gradient-to-br from-beige-clair/20 to-beige-clair/5 rounded-lg p-4 text-center hover:shadow-lg transition-all"
                    >
                      <motion.div
                        className="text-terre-cuite mb-2"
                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      >
                        {result.icon}
                      </motion.div>
                      <div className="text-xl font-bold text-bordeaux mb-1">{result.value}</div>
                      <div className="text-sm text-terre-cuite/70">{result.label}</div>
                    </motion.div>
                  ))}
                </div>
                {selectedProject.testimonial && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-gradient-to-br from-beige-clair/20 to-beige-clair/5 rounded-lg p-6 relative overflow-hidden group hover:shadow-lg transition-all"
                  >
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute top-4 right-4"
                    >
                      <Sparkles className="text-terre-cuite/20 w-6 h-6" />
                    </motion.div>
                    <p className="text-terre-cuite/80 italic mb-4">
                      "{selectedProject.testimonial.content}"
                    </p>
                    <div>
                      <p className="font-medium text-bordeaux">
                        {selectedProject.testimonial.author}
                      </p>
                      <p className="text-sm text-terre-cuite/70">
                        {selectedProject.testimonial.role}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Miniatures avec progression */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        {projects.map((project, index) => (
          <motion.button
            key={project.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setIsAutoPlaying(false)
              setCurrentIndex(index)
            }}
            className={`relative h-24 rounded-lg overflow-hidden ${
              index === currentIndex ? 'ring-2 ring-terre-cuite shadow-lg' : ''
            }`}
          >
            <MotionImage
              src={project.image.src}
              alt={project.image.alt}
              fill
              className="object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className={`absolute inset-0 bg-gradient-to-t from-bordeaux/80 to-transparent transition-opacity`}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: index === currentIndex ? 0 : 0.5 }}
            />
            {index === currentIndex && isAutoPlaying && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-terre-cuite/20"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear" }}
              >
                <motion.div
                  className="h-full bg-terre-cuite"
                  layoutId="progress"
                />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default Portfolio

