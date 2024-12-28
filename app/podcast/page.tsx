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
    url: "https://open.spotify.com/show/votre-id",
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
    <div className="min-h-screen bg-gradient-to-b from-white to-beige-clair/20 pb-32">
      {/* Hero Section avec plateformes */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-heading text-bordeaux mb-6">
              Notre Podcast RH
            </h1>
            <p className="text-xl text-terre-cuite/80 max-w-3xl mx-auto mb-8">
              Des conversations enrichissantes sur le monde du travail, la carrière et le développement professionnel.
              Écoutez nos experts partager leurs conseils et expériences.
            </p>
            <div className="flex justify-center gap-4">
              {socialPlatforms.map((platform) => (
                <Link
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  className={`${platform.color} text-white px-6 py-3 rounded-full flex items-center gap-2 hover:opacity-90 transition-opacity`}
                >
                  <platform.icon className="w-5 h-5" />
                  <span>{platform.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Barre de recherche et filtres */}
      <section className="py-8 px-4 bg-white shadow-sm">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-terre-cuite/60 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher un épisode..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-terre-cuite/20 focus:border-terre-cuite"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-4 py-2 rounded-lg ${
                  selectedFilter === 'all'
                    ? 'bg-terre-cuite text-white'
                    : 'bg-beige-clair/20 text-terre-cuite'
                }`}
              >
                Tous
              </button>
              <button
                onClick={() => setSelectedFilter('favorites')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  selectedFilter === 'favorites'
                    ? 'bg-terre-cuite text-white'
                    : 'bg-beige-clair/20 text-terre-cuite'
                }`}
              >
                <Heart className="w-4 h-4" />
                Favoris ({favorites.length})
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Episodes List */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {filteredEpisodes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-terre-cuite/80 text-lg">
                Aucun épisode ne correspond à votre recherche.
              </p>
            </div>
          ) : (
            <div className="grid gap-8">
              {filteredEpisodes.map((episode, index) => (
                <motion.div
                  key={episode.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all
                    ${currentEpisode.id === episode.id ? 'ring-2 ring-terre-cuite' : 'hover:shadow-xl'}`}
                  onClick={() => setCurrentEpisode(episode)}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="relative w-full md:w-48 h-48 rounded-xl overflow-hidden shrink-0">
                      <Image
                        src={episode.image}
                        alt={episode.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-2xl font-heading text-bordeaux">
                          {episode.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => toggleFavorite(episode.id, e)}
                            className="p-2 text-terre-cuite hover:text-bordeaux transition-colors"
                          >
                            {favorites.includes(episode.id) ? (
                              <HeartFillIcon className="w-5 h-5" />
                            ) : (
                              <Heart className="w-5 h-5" />
                            )}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setShowShareModal(true)
                            }}
                            className="p-2 text-terre-cuite hover:text-bordeaux transition-colors"
                          >
                            <Share2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-terre-cuite/80 mb-4">
                        {episode.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-terre-cuite/60 mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{episode.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{episode.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Mic className="w-4 h-4" />
                          <span>{episode.host}</span>
                        </div>
                      </div>
                      {currentEpisode.id === episode.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="border-t border-gray-100 pt-4"
                        >
                          <div className="flex gap-4 mb-4">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                setActiveTab('comments')
                              }}
                              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
                                activeTab === 'comments' 
                                  ? 'bg-terre-cuite text-white' 
                                  : 'text-terre-cuite hover:bg-terre-cuite/10'
                              }`}
                            >
                              <MessageCircle className="w-4 h-4" />
                              Commentaires ({episode.comments?.length || 0})
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                setActiveTab('transcription')
                              }}
                              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
                                activeTab === 'transcription' 
                                  ? 'bg-terre-cuite text-white' 
                                  : 'text-terre-cuite hover:bg-terre-cuite/10'
                              }`}
                            >
                              <FileText className="w-4 h-4" />
                              Transcription
                            </button>
                          </div>

                          {activeTab === 'comments' ? (
                            <div className="space-y-4" onClick={e => e.stopPropagation()}>
                              <form 
                                onSubmit={(e) => handleComment(e, episode.id)} 
                                className="flex gap-2"
                              >
                                <input
                                  type="text"
                                  value={newComment}
                                  onChange={(e) => setNewComment(e.target.value)}
                                  placeholder="Ajouter un commentaire..."
                                  className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-terre-cuite/20 focus:border-terre-cuite"
                                />
                                <button
                                  type="submit"
                                  className="p-2 text-terre-cuite hover:text-bordeaux transition-colors"
                                >
                                  <Send className="w-5 h-5" />
                                </button>
                              </form>
                              <div className="max-h-60 overflow-y-auto">
                                {episode.comments?.map((comment) => (
                                  <div key={comment.id} className="bg-beige-clair/10 rounded-lg p-4 mb-2">
                                    <div className="flex justify-between items-center mb-2">
                                      <span className="font-medium text-bordeaux">{comment.author}</span>
                                      <span className="text-sm text-terre-cuite/60">{comment.date}</span>
                                    </div>
                                    <p className="text-terre-cuite/80">{comment.content}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div 
                              className="bg-beige-clair/10 rounded-lg p-4"
                              onClick={e => e.stopPropagation()}
                            >
                              <div className="flex justify-between items-center mb-4">
                                <span className="text-sm text-terre-cuite/60">
                                  {getReadingTime(episode.transcription)}
                                </span>
                                <button
                                  onClick={() => downloadTranscription(episode)}
                                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-terre-cuite/10 text-terre-cuite hover:bg-terre-cuite/20 transition-colors"
                                >
                                  <Download className="w-4 h-4" />
                                  Télécharger
                                </button>
                              </div>
                              <pre className="whitespace-pre-wrap text-terre-cuite/80 font-sans">
                                {episode.transcription}
                              </pre>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Audio Player */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50"
      >
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center gap-6">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
              <Image
                src={currentEpisode.image}
                alt={currentEpisode.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-heading text-bordeaux truncate">
                {currentEpisode.title}
              </h4>
              <p className="text-sm text-terre-cuite/60 truncate">
                {currentEpisode.host}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {/* Logique pour reculer de 10s */}}
                className="p-2 text-terre-cuite hover:text-bordeaux transition-colors"
              >
                <SkipBack className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-3 bg-terre-cuite text-white rounded-full hover:bg-bordeaux transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </button>
              <button
                onClick={() => {/* Logique pour avancer de 10s */}}
                className="p-2 text-terre-cuite hover:text-bordeaux transition-colors"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 flex items-center gap-4">
              <span className="text-sm text-terre-cuite/60 w-12">
                {formatTime(currentTime)}
              </span>
              <div className="flex-1 h-2 bg-beige-clair/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-terre-cuite"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              <span className="text-sm text-terre-cuite/60 w-12">
                {formatTime(duration)}
              </span>
            </div>
            <div className="flex items-center gap-2 w-32">
              <Volume2 className="w-5 h-5 text-terre-cuite" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(parseInt(e.target.value))}
                className="flex-1 h-2 bg-beige-clair/20 rounded-full overflow-hidden appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-terre-cuite"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modal de partage */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-xl font-heading text-bordeaux mb-4">
              Partager cet épisode
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {shareOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={() => shareOnSocial(option.name.toLowerCase())}
                  className={`${option.color} text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity`}
                >
                  <option.icon className="w-5 h-5" />
                  <span>{option.name}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={currentEpisode.spotifyUrl}
                readOnly
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 bg-gray-50"
              />
              <button
                onClick={() => copyLink(currentEpisode.spotifyUrl)}
                className="p-2 text-terre-cuite hover:text-bordeaux transition-colors"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={() => setShowShareModal(false)}
              className="mt-4 w-full px-4 py-2 rounded-lg border border-gray-200 text-terre-cuite hover:bg-beige-clair/10 transition-colors"
            >
              Fermer
            </button>
          </motion.div>
        </div>
      )}
    </div>
  )
}

