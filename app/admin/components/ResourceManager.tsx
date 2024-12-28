'use client'

import { useState, useEffect } from 'react'
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface Resource {
  id: string
  title: string
  description: string
  type: 'document' | 'guide' | 'template' | 'video'
  url: string
  category: string
  publishedAt: string
  downloadCount: number
}

export default function ResourceManager() {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'document' as const,
    url: '',
    category: ''
  })
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    loadResources()
  }, [])

  async function loadResources() {
    try {
      setLoading(true)
      const querySnapshot = await getDocs(collection(db, 'resources'))
      const resourcesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Resource[]
      setResources(resourcesData.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()))
    } catch (error) {
      console.error('Erreur lors du chargement des ressources:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const resourceData = {
        ...formData,
        publishedAt: new Date().toISOString(),
        downloadCount: editingId ? undefined : 0
      }

      if (editingId) {
        await updateDoc(doc(db, 'resources', editingId), resourceData)
      } else {
        await addDoc(collection(db, 'resources'), resourceData)
      }

      setFormData({
        title: '',
        description: '',
        type: 'document',
        url: '',
        category: ''
      })
      setEditingId(null)
      loadResources()
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la ressource:', error)
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette ressource ?')) {
      try {
        await deleteDoc(doc(db, 'resources', id))
        loadResources()
      } catch (error) {
        console.error('Erreur lors de la suppression de la ressource:', error)
      }
    }
  }

  function handleEdit(resource: Resource) {
    setFormData({
      title: resource.title,
      description: resource.description,
      type: resource.type,
      url: resource.url,
      category: resource.category
    })
    setEditingId(resource.id)
  }

  if (loading) {
    return <div className="text-center py-4">Chargement des ressources...</div>
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <h3 className="text-lg font-semibold mb-4">
          {editingId ? 'Modifier la ressource' : 'Ajouter une nouvelle ressource'}
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
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as Resource['type'] })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="document">Document</option>
            <option value="guide">Guide</option>
            <option value="template">Template</option>
            <option value="video">Vidéo</option>
          </select>
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
                  type: 'document',
                  url: '',
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
                Ressource
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Catégorie
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Téléchargements
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {resources.map((resource) => (
              <tr key={resource.id}>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{resource.title}</div>
                  <div className="text-sm text-gray-500">{resource.description.substring(0, 100)}...</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    {
                      document: 'bg-blue-100 text-blue-800',
                      guide: 'bg-green-100 text-green-800',
                      template: 'bg-purple-100 text-purple-800',
                      video: 'bg-red-100 text-red-800'
                    }[resource.type]
                  }`}>
                    {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {resource.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {resource.downloadCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => handleEdit(resource)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(resource.id)}
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