'use client'

import { useState, useMemo } from 'react'
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

const episodes = [
  {
    id: 4,
    title: "Épisode 1 : Découvrez Mildy Consulting RH",
    description: "Dans ce premier épisode, découvrez Mildy Consulting RH, notre approche unique des ressources humaines et notre vision pour l'avenir du travail.",
    duration: "30 min",
    date: "28 Décembre 2023",
    image: "/images/podcast/episode4.jpg",
    host: "Mildy Consulting RH",
    audioUrl: null,
    spotifyUrl: "https://open.spotify.com/episode/55dpWlrfAaVnvy27H8YSdh",
    transcription: `
      [00:00] Introduction
      Bienvenue dans le premier épisode du podcast Mildy Consulting RH...

      [05:00] Notre Vision
      Chez Mildy Consulting RH, nous croyons en une approche humaine...

      [15:00] Nos Services
      Découvrez nos services de conseil en ressources humaines...

      [25:00] Conclusion
      Merci d'avoir écouté ce premier épisode...
    `,
    comments: []
  },
  {
    id: 1,
    title: "Les clés d'une reconversion professionnelle réussie",
    description: "Découvrez les étapes essentielles pour réussir votre transition professionnelle et les pièges à éviter.",
    duration: "45 min",
    date: "15 Mars 2024",
    image: "/images/podcast/episode1.jpg",
    host: "Marie Dupont",
    audioUrl: "/podcasts/episode1.mp3",
    spotifyUrl: "https://open.spotify.com/episode/xyz1",
    transcription: `
      [00:00] Introduction
      Bonjour à tous et bienvenue dans ce nouvel épisode...

      [05:30] Les étapes clés
      La première étape consiste à faire un bilan...

      [15:45] Les erreurs à éviter
      Attention à ne pas précipiter votre décision...

      [30:00] Témoignages
      Écoutons maintenant Sarah qui a réussi sa reconversion...
    `,
    comments: [
      {
        id: 1,
        author: "Julie M.",
        date: "16 Mars 2024",
        content: "Merci pour ces conseils précieux ! La partie sur le bilan de compétences m'a particulièrement aidée."
      },
      {
        id: 2,
        author: "Thomas L.",
        date: "15 Mars 2024",
        content: "Super épisode ! J'aimerais avoir plus de détails sur le financement de la formation."
      }
    ]
  },
  {
    id: 2,
    title: "Comment se démarquer sur le marché du travail en 2024",
    description: "Les stratégies efficaces pour mettre en valeur vos compétences et attirer l'attention des recruteurs.",
    duration: "38 min",
    date: "8 Mars 2024",
    image: "/images/podcast/episode2.jpg",
    host: "Jean Martin",
    audioUrl: "/podcasts/episode2.mp3",
    spotifyUrl: "https://open.spotify.com/episode/xyz2",
    transcription: `
      [00:00] Introduction
      Dans cet épisode, nous allons explorer les stratégies...

      [08:15] Personal Branding
      Développer votre marque personnelle est essentiel...

      [20:30] Réseaux Sociaux
      LinkedIn est devenu un outil incontournable...

      [32:00] Conclusion
      Pour résumer, voici les points clés à retenir...
    `,
    comments: [
      {
        id: 1,
        author: "Marc D.",
        date: "9 Mars 2024",
        content: "Excellents conseils sur LinkedIn, j'ai déjà commencé à les appliquer !"
      }
    ]
  },
  {
    id: 3,
    title: "L'art de la négociation salariale",
    description: "Les techniques pour négocier votre salaire avec confiance et obtenir la rémunération que vous méritez.",
    duration: "42 min",
    date: "1 Mars 2024",
    image: "/images/podcast/episode3.jpg",
    host: "Sophie Bernard",
    audioUrl: "/podcasts/episode3.mp3",
    spotifyUrl: "https://open.spotify.com/episode/xyz3",
    transcription: `
      [00:00] Introduction
      La négociation salariale est un moment crucial...

      [10:20] Préparation
      La clé d'une bonne négociation est la préparation...

      [25:45] Techniques de Négociation
      Voici les phrases à utiliser et à éviter...

      [38:00] Conclusion
      Rappel des points essentiels...
    `,
    comments: [
      {
        id: 1,
        author: "Pierre L.",
        date: "2 Mars 2024",
        content: "Ces techniques m'ont permis d'obtenir une augmentation de 15% !"
      },
      {
        id: 2,
        author: "Marie C.",
        date: "1 Mars 2024",
        content: "J'aurais aimé avoir ces conseils plus tôt dans ma carrière."
      }
    ]
  }
]

const platformIcons = {
  web: Globe2,
  heart: Heart,
  heartFill: HeartFillIcon
}

const EpisodeCard = ({ episode, isActive, onClick }: { episode: typeof episodes[0], isActive: boolean, onClick: () => void }) => (
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
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <a
          href={episode.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#1DB954] text-white p-4 rounded-full hover:scale-110 transition-transform"
          onClick={(e) => e.stopPropagation()}
        >
          <Play className="w-8 h-8" />
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
      <div className="mt-4 pt-4 border-t border-gray-100">
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
    </div>
  </div>
)

export default function PodcastPage() {
  const [currentEpisode, setCurrentEpisode] = useState(episodes[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [activeTab, setActiveTab] = useState<'comments' | 'transcription'>('comments')
  const [searchTerm, setSearchTerm] = useState("")
  const [favorites, setFavorites] = useState<number[]>([])
  const [showShareModal, setShowShareModal] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'favorites'>('all')
  const [volume, setVolume] = useState(100)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

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

  // Estimation du temps de lecture de la transcription
  const getReadingTime = (text: string) => {
    const wordsPerMinute = 200
    const words = text.split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} min de lecture`
  }

  // Téléchargement de la transcription
  const downloadTranscription = (episode: typeof episodes[0]) => {
    const element = document.createElement("a")
    const file = new Blob([episode.transcription], {type: 'text/plain'})
    element.href = URL.createObjectURL(file)
    element.download = `transcription-${episode.title.toLowerCase().replace(/\s+/g, '-')}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  // Formatage du temps audio
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  // Gestion des favoris
  const toggleFavorite = (episodeId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setFavorites(prev => 
      prev.includes(episodeId)
        ? prev.filter(id => id !== episodeId)
        : [...prev, episodeId]
    )
  }

  // Partage sur les réseaux sociaux
  const shareOnSocial = (platform: string) => {
    const url = currentEpisode.spotifyUrl
    const text = `Écoutez "${currentEpisode.title}" sur notre podcast RH`
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
    }

    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank')
  }

  // Copier le lien
  const copyLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      // Vous pouvez ajouter une notification ici
    } catch (err) {
      console.error('Erreur lors de la copie:', err)
    }
  }

  // Gestion des commentaires
  const handleComment = (e: React.FormEvent, episodeId: number) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const updatedEpisodes = episodes.map(episode => {
      if (episode.id === episodeId) {
        return {
          ...episode,
          comments: [
            ...(episode.comments || []),
            {
              id: Date.now(),
              author: "Utilisateur",
              date: new Date().toLocaleDateString('fr-FR'),
              content: newComment
            }
          ]
        }
      }
      return episode
    })

    const updatedCurrentEpisode = updatedEpisodes.find(ep => ep.id === episodeId)
    if (updatedCurrentEpisode) {
      setCurrentEpisode(updatedCurrentEpisode)
    }

    setNewComment("")
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

