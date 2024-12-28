'use client'

import { useState, useEffect } from 'react'
import { collection, query, getDocs, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { Consultation } from '@/lib/firebase'

export default function DashboardStats() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    cancelled: 0,
    freeConsultations: 0,
    standardConsultations: 0,
    questionnaireSubmitted: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  async function loadStats() {
    try {
      setLoading(true)
      const q = query(collection(db, 'consultations'))
      const querySnapshot = await getDocs(q)
      const consultations = querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      })) as Consultation[]

      setStats({
        total: consultations.length,
        pending: consultations.filter(c => c.status === 'pending').length,
        completed: consultations.filter(c => c.status === 'completed').length,
        cancelled: consultations.filter(c => c.status === 'cancelled').length,
        freeConsultations: consultations.filter(c => c.type === 'free').length,
        standardConsultations: consultations.filter(c => c.type === 'standard').length,
        questionnaireSubmitted: consultations.filter(c => c.questionnaireSubmitted).length,
      })
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error)
    } finally {
      setLoading(false)
    }
  }

  async function exportData() {
    try {
      const q = query(collection(db, 'consultations'))
      const querySnapshot = await getDocs(q)
      const consultations = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))

      // Convertir en CSV
      const headers = [
        'ID',
        'Date',
        'Heure',
        'Client',
        'Email',
        'Type',
        'Statut',
        'Questionnaire',
        'Créé le',
      ]
      const rows = consultations.map(c => [
        c.id,
        c.date,
        c.time,
        c.customerName,
        c.customerEmail,
        c.type === 'free' ? 'Découverte' : 'Standard',
        c.status === 'pending' ? 'En attente' : c.status === 'completed' ? 'Terminé' : 'Annulé',
        c.questionnaireSubmitted ? 'Oui' : 'Non',
        new Date(c.createdAt.seconds * 1000).toLocaleString(),
      ])
      const csv = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n')

      // Télécharger le fichier
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `consultations_${new Date().toISOString().split('T')[0]}.csv`
      link.click()
    } catch (error) {
      console.error('Erreur lors de l\'export:', error)
    }
  }

  if (loading) {
    return <div className="text-center py-4">Chargement des statistiques...</div>
  }

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Consultations</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">En attente</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Terminées</p>
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Annulées</p>
              <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Types de consultation</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm text-gray-600">Découverte</p>
              <p className="text-2xl font-bold text-green-600">{stats.freeConsultations}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Standard</p>
              <p className="text-2xl font-bold text-blue-600">{stats.standardConsultations}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Questionnaires</h3>
          <div>
            <p className="text-sm text-gray-600">Soumis</p>
            <p className="text-2xl font-bold">{stats.questionnaireSubmitted}</p>
            <p className="text-sm text-gray-600 mt-2">
              Taux de réponse: {((stats.questionnaireSubmitted / stats.total) * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={exportData}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
        >
          Exporter les données (CSV)
        </button>
      </div>
    </div>
  )
} 