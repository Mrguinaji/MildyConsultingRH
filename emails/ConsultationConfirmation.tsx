import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import { Tailwind } from '@react-email/tailwind'

interface ConsultationConfirmationProps {
  customerName: string
  consultationType: string
  date: string
  time: string
  isPaid: boolean
  price?: number
}

export default function ConsultationConfirmation({
  customerName,
  consultationType,
  date,
  time,
  isPaid,
  price
}: ConsultationConfirmationProps) {
  return (
    <Html>
      <Head />
      <Preview>Confirmation de votre consultation avec Mildy Consulting RH</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto py-8 px-4">
            <Heading className="text-2xl font-bold text-center text-gray-900 mb-6">
              Confirmation de votre consultation
            </Heading>

            <Section className="bg-gray-50 rounded-lg p-6 mb-6">
              <Text className="text-gray-900 mb-4">
                Bonjour {customerName},
              </Text>
              <Text className="text-gray-700 mb-4">
                Nous vous confirmons votre réservation pour une {consultationType} le {date} à {time}.
              </Text>
              {isPaid ? (
                <Text className="text-gray-700 mb-4">
                  Votre paiement de {price}€ a bien été reçu.
                </Text>
              ) : (
                <Text className="text-gray-700 mb-4">
                  Cette consultation est gratuite et sans engagement.
                </Text>
              )}
            </Section>

            <Section className="mb-6">
              <Heading className="text-xl font-semibold mb-4">Détails de la consultation</Heading>
              <Text className="text-gray-700">
                • Type : {consultationType}
                <br />
                • Date : {date}
                <br />
                • Heure : {time}
                <br />
                • Format : Visioconférence (le lien vous sera envoyé la veille)
              </Text>
            </Section>

            <Section className="mb-6">
              <Heading className="text-xl font-semibold mb-4">Prochaines étapes</Heading>
              <Text className="text-gray-700">
                1. Vous recevrez un questionnaire préparatoire à remplir avant la consultation
                <br />
                2. La veille de la consultation, vous recevrez le lien pour la visioconférence
                <br />
                3. Préparez vos questions et documents pertinents pour optimiser notre échange
              </Text>
            </Section>

            <Hr className="border-gray-200 my-6" />

            <Section>
              <Text className="text-gray-700 text-sm">
                Si vous avez besoin de modifier ou d'annuler votre rendez-vous, merci de nous contacter au moins 24h à l'avance.
              </Text>
              <Text className="text-gray-700 text-sm">
                Pour toute question, n'hésitez pas à nous contacter :
                <br />
                • Par email : <Link href="mailto:contact@mildyconsulting.com">contact@mildyconsulting.com</Link>
                <br />
                • Par téléphone : <Link href="tel:+33123456789">01 23 45 67 89</Link>
              </Text>
            </Section>

            <Hr className="border-gray-200 my-6" />

            <Text className="text-gray-500 text-sm text-center">
              © 2024 Mildy Consulting RH. Tous droits réservés.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
} 