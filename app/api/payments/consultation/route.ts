import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createConsultation } from '@/lib/firebase-utils'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('La clé secrète Stripe n\'est pas configurée')
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia'
})

const CONSULTATION_TYPES = {
  free: {
    price: 0,
    name: 'Consultation Découverte',
    duration: '30 minutes'
  },
  standard: {
    price: 99,
    name: 'Consultation Standard',
    duration: '1 heure'
  }
}

export async function POST(request: Request) {
  try {
    console.log('Début de la création de la session de paiement')
    const { type, date, time, email, name } = await request.json()
    console.log('Données reçues:', { type, date, time, email, name })

    if (!CONSULTATION_TYPES[type as keyof typeof CONSULTATION_TYPES]) {
      console.error('Type de consultation invalide:', type)
      return NextResponse.json(
        { error: 'Type de consultation invalide' },
        { status: 400 }
      )
    }

    const consultationType = CONSULTATION_TYPES[type as keyof typeof CONSULTATION_TYPES]

    // Pour les consultations gratuites
    if (type === 'free') {
      console.log('Création d\'une consultation gratuite')
      try {
        // Créer la consultation dans Firebase
        const consultationId = await createConsultation({
          customerEmail: email,
          customerName: name,
          type: 'free',
          date,
          time,
          status: 'pending',
          paymentStatus: 'free',
          questionnaireSubmitted: false
        })
        console.log('Consultation gratuite créée avec l\'ID:', consultationId)

        // Encodage des paramètres pour l'URL
        const params = new URLSearchParams({
          type: 'consultation',
          free: 'true',
          date,
          time,
          email: encodeURIComponent(email),
          name: encodeURIComponent(name),
          consultation_id: consultationId
        })

        const successUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/success?${params.toString()}`
        console.log('URL de succès générée:', successUrl)

        return NextResponse.json({ url: successUrl })
      } catch (error) {
        console.error('Erreur lors de la création de la consultation gratuite:', error)
        return NextResponse.json(
          { error: 'Erreur lors de la création de la consultation gratuite' },
          { status: 500 }
        )
      }
    }

    // Pour les consultations payantes
    console.log('Création d\'une consultation payante')
    try {
      // Créer d'abord la consultation dans Firebase
      console.log('Création de la consultation dans Firebase')
      const consultationId = await createConsultation({
        customerEmail: email,
        customerName: name,
        type: 'standard',
        date,
        time,
        status: 'pending',
        paymentStatus: 'pending',
        questionnaireSubmitted: false
      })
      console.log('Consultation créée avec l\'ID:', consultationId)

      // Créer la session Stripe
      console.log('Création de la session Stripe')
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer_email: email,
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: consultationType.name,
                description: `Consultation RH de ${consultationType.duration} le ${date} à ${time}`,
              },
              unit_amount: consultationType.price * 100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&type=consultation&consultation_id=${consultationId}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking`,
        metadata: {
          type: 'consultation',
          consultation_type: type,
          date,
          time,
          customer_name: name,
          customer_email: email,
          consultation_id: consultationId
        },
      })
      console.log('Session Stripe créée:', session.id)

      return NextResponse.json({ url: session.url })
    } catch (error) {
      console.error('Erreur lors de la création de la session de paiement:', error)
      return NextResponse.json(
        { error: 'Erreur lors de la création de la session de paiement' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Erreur générale:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue' },
      { status: 500 }
    )
  }
} 