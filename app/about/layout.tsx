import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'À Propos | Mildred Conseils RH',
  description: 'Découvrez l\'histoire et les valeurs de Mildred Conseils, un cabinet de conseil RH innovant depuis 2022.',
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 