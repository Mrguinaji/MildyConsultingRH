import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components'
import { Tailwind } from '@react-email/tailwind'

interface MeetingLinkEmailProps {
  customerName: string
  consultationType: string
  date: string
  time: string
  meetingLink: string
}

export default function MeetingLinkEmail({
  customerName,
  consultationType,
  date,
  time,
  meetingLink,
}: MeetingLinkEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Lien pour votre consultation de demain</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto py-8 px-4">
            <Heading className="text-2xl font-bold text-gray-800 mb-6">
              Votre consultation RH de demain
            </Heading>

            <Text className="text-gray-700 mb-4">
              Bonjour {customerName},
            </Text>

            <Text className="text-gray-700 mb-4">
              Votre {consultationType} est prévue demain, le {date} à {time}.
            </Text>

            <Text className="text-gray-700 mb-6">
              Voici le lien pour rejoindre la visioconférence :
            </Text>

            <Link
              href={meetingLink}
              className="bg-primary text-white px-6 py-3 rounded-lg text-center block w-full mb-6"
            >
              Rejoindre la réunion
            </Link>

            <Text className="text-gray-700 mb-4">
              Pour une consultation optimale, nous vous recommandons de :
            </Text>

            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li className="mb-2">Tester votre connexion internet</li>
              <li className="mb-2">Vérifier que votre caméra et votre micro fonctionnent</li>
              <li className="mb-2">Choisir un endroit calme pour la consultation</li>
              <li className="mb-2">Avoir vos documents à portée de main</li>
            </ul>

            <Text className="text-gray-700 mb-4">
              En cas de problème technique, n'hésitez pas à nous contacter.
            </Text>

            <Text className="text-gray-700">
              À demain,<br />
              L'équipe Mildy Consulting
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
} 