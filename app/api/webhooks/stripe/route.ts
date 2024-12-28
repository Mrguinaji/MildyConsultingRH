import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { Resend } from 'resend'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('La clé secrète Stripe n\'est pas configurée')
}

if (!process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error('La clé secrète du webhook Stripe n\'est pas configurée')
}

if (!process.env.RESEND_API_KEY) {
  throw new Error('La clé API Resend n\'est pas configurée')
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia'
})

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const body = await request.text()
  const signature = headers().get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Signature manquante' },
      { status: 400 }
    )
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    console.log('Webhook Stripe reçu:', event.type)

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session

      if (session.metadata?.type === 'consultation') {
        console.log('Envoi de l\'email de confirmation pour la consultation payante')
        try {
          await resend.emails.send({
            from: 'Mildy Consulting RH <contact@mildyconsulting.com>',
            to: session.customer_email!,
            subject: 'Confirmation de votre consultation',
            text: `Bonjour ${session.metadata.customer_name},\n\nVotre consultation a été confirmée pour le ${session.metadata.date} à ${session.metadata.time}.\n\nVous recevrez bientôt un questionnaire préparatoire à remplir.\n\nCordialement,\nMildy Consulting RH`
          })
          console.log('Email de confirmation envoyé')
        } catch (error) {
          console.error('Erreur lors de l\'envoi de l\'email:', error)
        }
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Erreur webhook:', error)
    return NextResponse.json(
      { error: 'Erreur webhook' },
      { status: 400 }
    )
  }
} 