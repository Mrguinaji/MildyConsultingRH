import { NextResponse } from 'next/server'
import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('La clé secrète Stripe n\'est pas configurée')
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia'
})

export async function GET(request: Request) {
  try {
    console.log('Début de la vérification du paiement')
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('session_id')
    const type = searchParams.get('type')

    if (!sessionId) {
      console.error('Session ID manquant')
      return NextResponse.json(
        { error: 'Session ID manquant' },
        { status: 400 }
      )
    }

    console.log('Récupération de la session Stripe:', sessionId)
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    console.log('Session Stripe récupérée:', session.id)

    return NextResponse.json({
      status: session.status,
      customer_email: session.customer_email,
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