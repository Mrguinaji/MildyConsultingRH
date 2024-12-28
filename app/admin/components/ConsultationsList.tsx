'use client'

import { useState, useEffect } from 'react'
import { collection, query, orderBy, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { Consultation } from '@/lib/firebase'

export default function ConsultationsList() {
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, pending, completed
  const [sortBy, setSortBy] = useState('date') // date, status, type

  useEffect(() => {
    loadConsultations()
  }, [])

  async function loadConsultations() {
    try {
      setLoading(true)
      const q = query(collection(db, 'consultations'), orderBy('date', 'desc'))
      const querySnapshot = await getDocs(q)
      const data = querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      })) as Consultation[]
      setConsultations(data)
    } catch (error) {
      console.error('Erreur lors du chargement des consultations:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredConsultations = consultations
    .filter(consultation => {
      if (filter === 'all') return true
      return consultation.status === filter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case 'status':
          return a.status.localeCompare(b.status)
        case 'type':
          return a.type.localeCompare(b.type)
        default:
          return 0
      }
    })

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>
  }

  return (
    <div>
      <div className="mb-6 flex gap-4">
        <select 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="all">Tous les statuts</option>
          <option value="pending">En attente</option>
          <option value="completed">Terminé</option>
          <option value="cancelled">Annulé</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="date">Trier par date</option>
          <option value="status">Trier par statut</option>
          <option value="type">Trier par type</option>
        </select>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Heure
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Questionnaire
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredConsultations.map((consultation) => (
              <tr key={consultation.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(consultation.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {consultation.time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {consultation.customerName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {consultation.customerEmail}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    consultation.type === 'free' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {consultation.type === 'free' ? 'Découverte' : 'Standard'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    consultation.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : consultation.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {consultation.status === 'pending' ? 'En attente' :
                     consultation.status === 'completed' ? 'Terminé' : 'Annulé'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {consultation.questionnaireSubmitted ? (
                    <span className="text-green-600">Soumis</span>
                  ) : (
                    <span className="text-red-600">Non soumis</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                    onClick={() => {/* TODO: Voir détails */}}
                  >
                    Voir
                  </button>
                  <button 
                    className="text-red-600 hover:text-red-900"
                    onClick={() => {/* TODO: Annuler */}}
                  >
                    Annuler
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