import { Metadata } from 'next'
import Portfolio from '@/components/Portfolio'

export const metadata: Metadata = {
  title: 'Portfolio | Mildy Consulting RH',
  description: "Découvrez nos projets réussis et nos cas d'études en ressources humaines.",
}

export default function PortfolioPage() {
  return (
    <div className="pt-20">
      <Portfolio />
    </div>
  )
}

