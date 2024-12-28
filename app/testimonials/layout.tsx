import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Témoignages | Mildy Consulting RH',
  description: 'Découvrez les retours d\'expérience de nos clients et leurs succès en matière de transformation RH.',
}

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 