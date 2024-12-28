'use client'

import { useState, useEffect } from 'react'
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface Podcast {
  id: string
  title: string
  description: string
  url: string
  date: string
  duration: string
  category: string
}

export default function PodcastManager() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    duration: '',
    category: ''
  })
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    loadPodcasts()
  }, [])

  async function loadPodcasts() {
    try {
      setLoading(true)
      const querySnapshot = await getDocs(collection(db, 'podcasts'))
      const podcastsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Podcast[]
      setPodcasts(podcastsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
    } catch (error) {
      console.error('Erreur lors du chargement des podcasts:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const podcastData = {
        ...formData,
        date: new Date().toISOString()
      }

      if (editingId) {
        await updateDoc(doc(db, 'podcasts', editingId), podcastData)
      } else {
        await addDoc(collection(db, 'podcasts'), podcastData)
      }

      setFormData({
        title: '',
        description: '',
        url: '',
        duration: '',
        category: ''
      })
      setEditingId(null)
      loadPodcasts()
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du podcast:', error)
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce podcast ?')) {
      try {
        await deleteDoc(doc(db, 'podcasts', id))
        loadPodcasts()
      } catch (error) {
        console.error('Erreur lors de la suppression du podcast:', error)
      }
    }
  }

  function handleEdit(podcast: Podcast) {
    setFormData({
      title: podcast.title,
      description: podcast.description,
      url: podcast.url,
      duration: podcast.duration,
      category: podcast.category
    })
    setEditingId(podcast.id)
  }

  if (loading) {
    return <div className="text-center py-4">Chargement des podcasts...</div>
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <h3 className="text-lg font-semibold mb-4">
          {editingId ? 'Modifier le podcast' : 'Ajouter un nouveau podcast'}
        </h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Titre</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">URL</label>
          <input
            type="url"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Durée</label>
          <input
            type="text"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            placeholder="ex: 45:30"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Catégorie</label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="flex justify-end space-x-3">
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setFormData({
                  title: '',
                  description: '',
                  url: '',
                  duration: '',
                  category: ''
                })
                setEditingId(null)
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Annuler
            </button>
          )}
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            {editingId ? 'Mettre à jour' : 'Ajouter'}
          </button>
        </div>
      </form>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Titre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Catégorie
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Durée
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {podcasts.map((podcast) => (
              <tr key={podcast.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{podcast.title}</div>
                  <div className="text-sm text-gray-500">{podcast.description.substring(0, 100)}...</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {podcast.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {podcast.duration}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(podcast.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(podcast)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(podcast.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 