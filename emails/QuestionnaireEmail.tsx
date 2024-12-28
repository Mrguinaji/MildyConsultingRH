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

interface QuestionnaireEmailProps {
  customerName: string
  consultationType: string
  date: string
  time: string
  questionnaireLink: string
}

export default function QuestionnaireEmail({
  customerName,
  consultationType,
  date,
  time,
  questionnaireLink,
}: QuestionnaireEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Questionnaire préparatoire pour votre consultation</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto py-8 px-4">
            <Heading className="text-2xl font-bold text-gray-800 mb-6">
              Préparez votre consultation RH
            </Heading>

            <Text className="text-gray-700 mb-4">
              Bonjour {customerName},
            </Text>

            <Text className="text-gray-700 mb-4">
              Pour préparer au mieux votre {consultationType} prévue le {date} à {time}, nous vous invitons à remplir le questionnaire préparatoire en cliquant sur le lien ci-dessous.
            </Text>

            <Text className="text-gray-700 mb-6">
              Ce questionnaire nous permettra de mieux comprendre vos besoins et d'optimiser notre temps d'échange.
            </Text>

            <Link
              href={questionnaireLink}
              className="bg-primary text-white px-6 py-3 rounded-lg text-center block w-full mb-6"
            >
              Accéder au questionnaire
            </Link>

            <Text className="text-gray-700 mb-4">
              Nous vous recommandons de :
            </Text>

            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li className="mb-2">Prendre le temps de réfléchir à vos réponses</li>
              <li className="mb-2">Préparer vos questions pour la consultation</li>
              <li className="mb-2">Rassembler les documents pertinents</li>
            </ul>

            <Text className="text-gray-700 mb-4">
              La veille de la consultation, vous recevrez un email avec le lien pour la visioconférence.
            </Text>

            <Text className="text-gray-700 mb-4">
              Si vous avez des questions, n'hésitez pas à nous contacter.
            </Text>

            <Text className="text-gray-700">
              À bientôt,<br />
              L'équipe Mildy Consulting
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
} 