import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Resend } from 'resend'
import ConsultationConfirmation from '@/emails/ConsultationConfirmation'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia'
})

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('session_id')
    const type = searchParams.get('type')
    const free = searchParams.get('free')
    const date = searchParams.get('date')
    const time = searchParams.get('time')
    const email = searchParams.get('email')
    const name = searchParams.get('name')

    // Pour les consultations gratuites
    if (free === 'true' && type === 'consultation' && date && time && email && name) {
      return NextResponse.json({
        status: 'complete',
        customer_email: decodeURIComponent(email),
        customer_name: decodeURIComponent(name),
        payment_status: 'free',
        amount_total: 0,
        currency: 'eur',
        metadata: {
          type: 'consultation',
          consultation_type: 'free',
          date,
          time,
          customer_name: decodeURIComponent(name),
          customer_email: decodeURIComponent(email)
        }
      })
    }

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID manquant' },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    // Si c'est une consultation payante, on envoie l'email de confirmation
    if (type === 'consultation' && session.payment_status === 'paid') {
      await resend.emails.send({
        from: 'Mildy Consulting RH <contact@mildyconsulting.com>',
        to: session.metadata.customer_email || session.customer_email!,
        subject: 'Confirmation de votre consultation',
        react: ConsultationConfirmation({
          customerName: session.metadata.customer_name || 'Client',
          consultationType: session.metadata.consultation_type === 'standard' ? 'Consultation Standard' : 'Consultation Découverte',
          date: session.metadata.date,
          time: session.metadata.time,
          isPaid: true,
          price: session.amount_total ? session.amount_total / 100 : undefined
        })
      })
    }

    return NextResponse.json({
      status: session.status,
      customer_email: session.metadata.customer_email || session.customer_email,
      customer_name: session.metadata.customer_name,
      payment_status: session.payment_status,
      amount_total: session.amount_total,
      currency: session.currency,
      metadata: session.metadata
    })
  } catch (error) {
    console.error('Erreur lors de la vérification de la session:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la vérification de la session' },
      { status: 500 }
    )
  }
} 