import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createConsultation } from '@/lib/firebase-utils'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
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
    const { type, date, time, email, name } = await request.json()

    if (!CONSULTATION_TYPES[type as keyof typeof CONSULTATION_TYPES]) {
      return NextResponse.json(
        { error: 'Type de consultation invalide' },
        { status: 400 }
      )
    }

    const consultationType = CONSULTATION_TYPES[type as keyof typeof CONSULTATION_TYPES]

    // Pour les consultations gratuites
    if (type === 'free') {
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

      return NextResponse.json({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?${params.toString()}`
      })
    }

    // Pour les consultations payantes
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
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&type=consultation`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking`,
      metadata: {
        type: 'consultation',
        consultation_type: type,
        date,
        time,
        customer_name: name,
        customer_email: email
      },
    })

    // Créer la consultation dans Firebase
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

    // Mettre à jour la session Stripe avec l'ID de la consultation
    await stripe.checkout.sessions.update(session.id, {
      metadata: {
        ...session.metadata,
        consultation_id: consultationId
      }
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Erreur lors de la création de la session:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création de la session' },
      { status: 500 }
    )
  }
} 