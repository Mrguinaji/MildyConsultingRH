import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import MeetingLinkEmail from '@/emails/MeetingLinkEmail'

// Vérification de l'authentification pour les appels CRON
const CRON_SECRET = process.env.CRON_SECRET
const MEETING_LINK = 'https://meet.google.com/syw-xacp-moz'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: Request) {
  try {
    // Vérification du secret
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get('secret')

    if (secret !== CRON_SECRET) {
      return new Response('Unauthorized', { status: 401 })
    }

    // Récupération des consultations de demain depuis la base de données
    // TODO: Implémenter la logique de récupération des consultations
    const tomorrowConsultations = [
      // Exemple de structure
      {
        customerEmail: 'client@example.com',
        customerName: 'John Doe',
        consultationType: 'Consultation Standard',
        date: '2024-01-01',
        time: '10:00',
        meetingLink: MEETING_LINK
      }
    ]

    const resend = new Resend(process.env.RESEND_API_KEY)

    // Envoi des emails pour chaque consultation
    for (const consultation of tomorrowConsultations) {
      try {
        await resend.emails.send({
          from: 'Mildy Consulting <onboarding@resend.dev>',
          to: consultation.customerEmail,
          subject: 'Lien pour votre consultation de demain',
          react: MeetingLinkEmail({
            customerName: consultation.customerName,
            consultationType: consultation.consultationType,
            date: consultation.date,
            time: consultation.time,
            meetingLink: consultation.meetingLink
          })
        })
      } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error)
      }
    }

    return NextResponse.json({
      success: true,
      message: `${tomorrowConsultations.length} emails envoyés`
    })
  } catch (error) {
    console.error('Erreur lors de l\'exécution du CRON:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'exécution du CRON' },
      { status: 500 }
    )
  }
} 