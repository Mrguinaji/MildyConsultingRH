import Booking from '@/components/Booking'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Réserver une consultation | Mildy Consulting RH',
  description: 'Prenez rendez-vous pour une consultation personnalisée avec nos experts RH.',
}

export default function BookingPage() {
  return (
    <main>
      <Booking />
    </main>
  )
}

