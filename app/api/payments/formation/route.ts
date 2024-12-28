import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia'
})

const FORMATION_PRICES = {
  starter: {
    price: 799,
    name: 'Formation RH Fondamentale'
  },
  professional: {
    price: 1499,
    name: 'Transformation RH'
  },
  elite: {
    price: 2999,
    name: 'Excellence RH'
  }
}

export async function POST(request: Request) {
  try {
    const { plan } = await request.json()

    if (!FORMATION_PRICES[plan as keyof typeof FORMATION_PRICES]) {
      return NextResponse.json(
        { error: 'Plan invalide' },
        { status: 400 }
      )
    }

    const selectedPlan = FORMATION_PRICES[plan as keyof typeof FORMATION_PRICES]

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: selectedPlan.name,
              description: `Accès complet à la formation ${selectedPlan.name}`,
            },
            unit_amount: selectedPlan.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&type=formation`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/services/formation`,
      metadata: {
        type: 'formation',
        plan: plan,
      },
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