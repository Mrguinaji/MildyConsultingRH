'use client'

import { motion } from 'framer-motion'
import { Music2, Headphones, ExternalLink } from 'lucide-react'
import Image from 'next/image'

const episodes = [
  {
    id: 1,
    title: "L'innovation RH en Afrique",
    description: "Découvrez comment les entreprises africaines transforment leurs pratiques RH.",
    duration: "45 min",
    date: "15 Jan 2024",
    image: "/podcast/episode1.jpg",
    spotifyUrl: "https://spotify.com/episode1",
  },
  {
    id: 2,
    title: "Leadership au Féminin",
    description: "Témoignages inspirants de femmes leaders qui façonnent le futur des RH.",
    duration: "38 min",
    date: "8 Jan 2024",
    image: "/podcast/episode2.jpg",
    spotifyUrl: "https://spotify.com/episode2",
  },
  {
    id: 3,
    title: "Transformation Digitale RH",
    description: "Les meilleures pratiques pour digitaliser vos processus RH.",
    duration: "42 min",
    date: "1 Jan 2024",
    image: "/podcast/episode3.jpg",
    spotifyUrl: "https://spotify.com/episode3",
  },
]

const PodcastSection = () => {
  return (
    <section className="py-section">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4">Notre Podcast</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Explorez les dernières tendances RH à travers nos conversations inspirantes
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {episodes.map((episode) => (
            <motion.div
              key={episode.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-soft overflow-hidden group"
            >
              <div className="relative h-48 bg-or-doux">
                <Image
                  src={episode.image}
                  alt={episode.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-terre-cuite mb-3">
                  <Headphones size={16} />
                  <span className="text-sm">{episode.duration}</span>
                  <span className="text-sm">•</span>
                  <span className="text-sm">{episode.date}</span>
                </div>
                <h3 className="text-xl mb-2 font-heading">{episode.title}</h3>
                <p className="text-sm mb-4">{episode.description}</p>
                <a
                  href={episode.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-terre-cuite hover:text-bordeaux transition-colors"
                >
                  <Music2 size={20} />
                  <span>Écouter sur Spotify</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://spotify.com/show"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-terre-cuite text-beige-clair px-6 py-3 rounded-full hover:bg-bordeaux transition-colors shadow-soft"
          >
            <Music2 size={24} />
            <span>Voir tous les épisodes sur Spotify</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default PodcastSection

