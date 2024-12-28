import { NextResponse } from 'next/server'
import { getUpcomingConsultations, getConsultationsByDateRange, updateConsultationStatus } from '@/lib/firebase-admin'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    let consultations

    if (startDate && endDate) {
      consultations = await getConsultationsByDateRange(
        new Date(startDate),
        new Date(endDate)
      )
    } else {
      consultations = await getUpcomingConsultations()
    }

    return NextResponse.json(consultations)
  } catch (error) {
    console.error('Erreur lors de la récupération des consultations:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des consultations' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const { id, status } = await request.json()

    if (!id || !status) {
      return NextResponse.json(
        { error: 'ID et statut requis' },
        { status: 400 }
      )
    }

    await updateConsultationStatus(id, status)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la consultation:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de la consultation' },
      { status: 500 }
    )
  }
} 