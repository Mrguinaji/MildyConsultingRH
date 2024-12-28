import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import MeetingLinkEmail from '@/emails/MeetingLinkEmail'

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined')
}

const resend = new Resend(process.env.RESEND_API_KEY)

const MEETING_LINK = 'https://meet.google.com/syw-xacp-moz'

export async function POST(request: Request) {
  try {
    const { to, name, consultationType, date, time } = await request.json()

    const emailResult = await resend.emails.send({
      from: 'Mildy Consulting <onboarding@resend.dev>',
      to,
      subject: 'Lien pour votre consultation de demain',
      react: MeetingLinkEmail({
        customerName: name,
        consultationType,
        date,
        time,
        meetingLink: MEETING_LINK
      })
    })

    if (!emailResult.data?.id) {
      throw new Error('Échec de l\'envoi de l\'email')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi de l\'email' },
      { status: 500 }
    )
  }
} 