import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import ConsultationConfirmation from '@/emails/ConsultationConfirmation'

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined')
}

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { to, name, consultationType, date, time, isPaid } = await request.json()

    const emailResult = await resend.emails.send({
      from: 'Mildy Consulting <onboarding@resend.dev>',
      to,
      subject: isPaid ? 'Confirmation de votre consultation' : 'Confirmation de votre consultation gratuite',
      react: ConsultationConfirmation({
        customerName: name,
        consultationType,
        date,
        time,
        isPaid
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