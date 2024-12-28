import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Notre Histoire | Mildred Conseils RH',
  description: 'Découvrez le parcours et la mission de Mildred Conseils, un cabinet de conseil RH innovant dédié à la transformation des ressources humaines.',
}

export default function NotreHistoireLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 