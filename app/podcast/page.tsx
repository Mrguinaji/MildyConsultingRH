'use client'

import { useState, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Play, Pause, Volume2, SkipBack, SkipForward, Clock, Mic, Calendar,
  MessageCircle, FileText, Share2, Globe2, Send, Search, Heart,
  Download, Copy, Twitter, Facebook, Linkedin, X, Music
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Icône personnalisée pour le cœur rempli
const HeartFillIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
)

const socialPlatforms = [
  {
    name: "Spotify",
    icon: Music,
    url: "https://open.spotify.com/show/55dpWlrfAaVnvy27H8YSdh",
    color: "bg-[#1DB954]"
  },
  {
    name: "Site Web",
    icon: Globe2,
    url: "https://mildyconsulting.com/podcast",
    color: "bg-terre-cuite"
  }
]

const shareOptions = [
  {
    name: "Twitter",
    icon: Twitter,
    color: "bg-[#1DA1F2]"
  },
  {
    name: "Facebook",
    icon: Facebook,
    color: "bg-[#4267B2]"
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    color: "bg-[#0077B5]"
  }
]

interface Episode {
  id: number
  title: string
  description: string
  duration: string
  date: string
  image: string
  host: string
  spotifyUrl: string
}

const episodes: Episode[] = [
  {
    id: 1,
    title: "Négociation salariale: Obtenez le salaire que vous méritez",
    description: "Découvrez les clés de la négociation salariale et apprenez à valoriser vos compétences pour obtenir la rémunération que vous méritez.",
    duration: "5 min",
    date: "7 Décembre 2023",
    image: "/images/podcast/episode1.jpg",
    host: "Mildy Consulting RH",
    spotifyUrl: "https://open.spotify.com/episode/55dpWlrfAaVnvy27H8YSdh"
  },
  {
    id: 3,
    title: "Entretiens annuel: Révélez votre potentiel",
    description: "Comment préparer et réussir votre entretien annuel pour mettre en valeur vos réalisations et votre potentiel.",
    duration: "5 min",
    date: "7 Décembre 2023",
    image: "/images/podcast/episode3.jpg",
    host: "Mildy Consulting RH",
    spotifyUrl: "https://open.spotify.com/episode/66iERFWagGuqxhezZc6CDL"
  },
  {
    id: 4,
    title: "Le CV: Votre carte de visite professionnelle",
    description: "Les secrets pour créer un CV impactant qui retient l'attention des recruteurs et met en valeur votre parcours.",
    duration: "5 min",
    date: "7 Décembre 2023",
    image: "/images/podcast/episode4.jpg",
    host: "Mildy Consulting RH",
    spotifyUrl: "https://open.spotify.com/episode/4RWuJnaDUrpQ6ZGbjDuDjy"
  },
  {
    id: 5,
    title: "LinkedIn: Le réseau stratégique pour votre carrière",
    description: "Optimisez votre présence sur LinkedIn et utilisez-le comme un véritable outil de développement professionnel.",
    duration: "5 min",
    date: "7 Décembre 2023",
    image: "/images/podcast/episode5.jpg",
    host: "Mildy Consulting RH",
    spotifyUrl: "https://open.spotify.com/episode/0jsuKXPsZUhTW9KtTgVyjV"
  },
  {
    id: 6,
    title: "L'entretien d'embauche: Le scénario gagnant pour briller",
    description: "Préparez-vous efficacement pour vos entretiens d'embauche et apprenez à convaincre vos futurs employeurs.",
    duration: "5 min",
    date: "7 Décembre 2023",
    image: "/images/podcast/episode6.jpg",
    host: "Mildy Consulting RH",
    spotifyUrl: "https://open.spotify.com/episode/5dooAl6C45wV1vfJYA9MMS"
  },
  {
    id: 7,
    title: "Les documents à conserver: vos jokers",
    description: "Guide pratique sur les documents professionnels importants à conserver et leur utilité dans votre carrière.",
    duration: "5 min",
    date: "7 Décembre 2023",
    image: "/images/podcast/episode7.jpg",
    host: "Mildy Consulting RH",
    spotifyUrl: "https://open.spotify.com/episode/7y6ZOKeTrYpwxJaRZd7z0U"
  },
  {
    id: 8,
    title: "L'art de planifier et d'organiser",
    description: "Techniques efficaces pour gérer votre temps et organiser votre emploi du temps professionnel.",
    duration: "5 min",
    date: "7 Décembre 2023",
    image: "/images/podcast/episode8.jpg",
    host: "Mildy Consulting RH",
    spotifyUrl: "https://open.spotify.com/episode/4ybNlh9pGKUYsoPoHyYRrm"
  },
  {
    id: 9,
    title: "Comment choisir son centre de formation",
    description: "Guide complet pour sélectionner le centre de formation adapté à vos objectifs professionnels.",
    duration: "5 min",
    date: "7 Décembre 2023",
    image: "/images/podcast/episode9.jpg",
    host: "Mildy Consulting RH",
    spotifyUrl: "https://open.spotify.com/episode/41yAofHyNFK7s1FALIAX6R"
  },
  {
    id: 10,
    title: "La stratégie professionnelle",
    description: "Développez une stratégie efficace pour atteindre vos objectifs de carrière et évoluer professionnellement.",
    duration: "5 min",
    date: "7 Décembre 2023",
    image: "/images/podcast/episode10.jpg",
    host: "Mildy Consulting RH",
    spotifyUrl: "https://open.spotify.com/episode/2zZKq3PNMkATbfkJuERDBX"
  },
  {
    id: 11,
    title: "Comment faire ses recherches d'emplois ?",
    description: "Méthodologie et conseils pratiques pour une recherche d'emploi efficace et ciblée.",
    duration: "5 min",
    date: "7 Décembre 2023",
    image: "/images/podcast/episode11.jpg",
    host: "Mildy Consulting RH",
    spotifyUrl: "https://open.spotify.com/episode/2zZKq3PNMkATbfkJuERDBX"
  },
  {
    id: 12,
    title: "La stagnation Professionnelle",
    description: "Comment identifier et surmonter une période de stagnation dans votre carrière.",
    duration: "5 min",
    date: "7 Décembre 2023",
    image: "/images/podcast/episode12.jpg",
    host: "Mildy Consulting RH",
    spotifyUrl: "https://open.spotify.com/episode/7CtSI1LNw0BtZeBcgpthJN"
  },
  {
    id: 13,
    title: "Parlons handicap",
    description: "Comprendre et faciliter l'inclusion professionnelle des personnes en situation de handicap.",
    duration: "5 min",
    date: "7 Décembre 2023",
    image: "/images/podcast/episode13.jpg",
    host: "Mildy Consulting RH",
    spotifyUrl: "https://open.spotify.com/episode/3ii0hrZWj1qDY9jNt5Lqm2"
  }
]

const platformIcons = {
  web: Globe2,
  heart: Heart,
  heartFill: HeartFillIcon
}

const EpisodeCard = ({ episode, isActive, onClick }: { episode: typeof episodes[0], isActive: boolean, onClick: () => void }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showPlayer, setShowPlayer] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div 
      className={`relative bg-white rounded-xl shadow-md overflow-hidden transition-all ${
        isActive ? 'ring-2 ring-bordeaux' : 'hover:shadow-lg'
      }`}
    >
      <div className="relative aspect-[4/5] w-full group cursor-pointer" onClick={onClick}>
        <Image
          src={episode.image}
          alt={episode.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <button
            onClick={togglePlay}
            className="bg-bordeaux text-white p-4 rounded-full hover:scale-110 transition-transform"
          >
            {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
          </button>
          <a
            href={episode.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1DB954] text-white p-4 rounded-full hover:scale-110 transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            <Music className="w-8 h-8" />
          </a>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-heading text-lg text-bordeaux mb-2">{episode.title}</h3>
        <p className="text-sm text-terre-cuite/80 line-clamp-2 mb-3">
          {episode.description}
        </p>
        <div className="flex items-center justify-between text-xs text-terre-cuite/60">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{episode.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{episode.duration}</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
          <button
            onClick={() => setShowPlayer(!showPlayer)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-bordeaux text-white rounded-lg hover:bg-bordeaux/90 transition-colors"
          >
            {showPlayer ? (
              <>
                <X className="w-5 h-5" />
                <span>Masquer le lecteur</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                <span>Écouter sur le site</span>
              </>
            )}
          </button>
          <a
            href={episode.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#1DB954] text-white rounded-lg hover:bg-[#1DB954]/90 transition-colors"
          >
            <Music className="w-5 h-5" />
            <span>Écouter sur Spotify</span>
          </a>
        </div>
        {showPlayer && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <audio
              ref={audioRef}
              controls
              className="w-full"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              src={`/podcasts/${episode.id}.mp3`}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default function PodcastPage() {
  const [currentEpisode, setCurrentEpisode] = useState(episodes[0])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'favorites'>('all')
  const [favorites, setFavorites] = useState<number[]>([])

  // Filtrage des épisodes
  const filteredEpisodes = useMemo(() => {
    let filtered = episodes
    
    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(episode => 
        episode.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        episode.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        episode.host.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filtre par favoris
    if (selectedFilter === 'favorites') {
      filtered = filtered.filter(episode => favorites.includes(episode.id))
    }

    return filtered
  }, [searchTerm, selectedFilter, favorites])

  // Gestion des favoris
  const toggleFavorite = (episodeId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setFavorites(prev => 
      prev.includes(episodeId)
        ? prev.filter(id => id !== episodeId)
        : [...prev, episodeId]
    )
  }

  return (
    <div className="container py-12">
      {/* En-tête */}
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl text-bordeaux mb-4">
          Podcast RH
        </h1>
        <p className="text-terre-cuite/80 max-w-2xl mx-auto">
          Découvrez nos épisodes sur les ressources humaines, le développement professionnel et les tendances du marché du travail.
        </p>
      </div>

      {/* Plateformes d'écoute */}
      <div className="flex justify-center gap-4 mb-12">
        {socialPlatforms.map(platform => (
          <a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${platform.color} text-white px-6 py-3 rounded-full flex items-center gap-2 hover:opacity-90 transition-opacity`}
          >
            <platform.icon className="w-5 h-5" />
            <span>Écouter sur {platform.name}</span>
          </a>
        ))}
      </div>

      {/* Liste des épisodes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {episodes.map(episode => (
          <EpisodeCard
            key={episode.id}
            episode={episode}
            isActive={currentEpisode.id === episode.id}
            onClick={() => setCurrentEpisode(episode)}
          />
        ))}
      </div>
    </div>
  )
}

