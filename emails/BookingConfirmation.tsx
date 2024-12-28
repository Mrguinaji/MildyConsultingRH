import {
  Html,
  Body,
  Container,
  Text,
  Link,
  Preview,
  Section,
  Hr,
  Button,
} from '@react-email/components'

interface BookingConfirmationEmailProps {
  consultationType: string
  date: string
  time: string
  clientName?: string
}

export const BookingConfirmationEmail = ({
  consultationType,
  date,
  time,
  clientName = 'cher client',
}: BookingConfirmationEmailProps) => {
  return (
    <Html>
      <Preview>Confirmation de votre réservation chez Mildy Consulting RH</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Text style={heading}>Confirmation de Réservation</Text>
            <Text style={paragraph}>
              Bonjour {clientName},
            </Text>
            <Text style={paragraph}>
              Nous vous remercions pour votre réservation. Votre consultation a été confirmée avec succès.
            </Text>

            <Section style={detailsContainer}>
              <Text style={detailsHeading}>Détails de votre réservation :</Text>
              <Text style={details}>
                Type de consultation : {consultationType}
                <br />
                Date : {date}
                <br />
                Heure : {time}
              </Text>
            </Section>

            <Text style={paragraph}>
              Pour vous préparer au mieux à notre rendez-vous, nous vous recommandons de :
            </Text>
            <ul style={list}>
              <li>Préparer vos questions et objectifs</li>
              <li>Rassembler les documents pertinents</li>
              <li>Être dans un endroit calme pour la consultation</li>
            </ul>

            <Button style={button} href="https://mildyconsulting.com/calendar">
              Ajouter au calendrier
            </Button>

            <Hr style={hr} />

            <Text style={paragraph}>
              Si vous avez des questions avant notre rendez-vous, n'hésitez pas à nous contacter.
            </Text>

            <Text style={footer}>
              Cordialement,
              <br />
              L'équipe Mildy Consulting RH
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '580px',
}

const heading = {
  fontSize: '32px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#6B2737', // bordeaux
  margin: '0 0 24px',
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#404040',
  margin: '16px 0',
}

const detailsContainer = {
  backgroundColor: '#F9F5F3', // beige-clair
  padding: '24px',
  borderRadius: '12px',
  margin: '24px 0',
}

const detailsHeading = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#6B2737', // bordeaux
  margin: '0 0 16px',
}

const details = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#404040',
  margin: '0',
}

const list = {
  margin: '16px 0',
  padding: '0 0 0 24px',
  color: '#404040',
}

const button = {
  backgroundColor: '#C1666B', // terre-cuite
  borderRadius: '24px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px 24px',
  margin: '32px auto',
  maxWidth: '240px',
}

const hr = {
  borderColor: '#E5E7EB',
  margin: '32px 0',
}

const footer = {
  fontSize: '14px',
  lineHeight: '24px',
  color: '#666666',
  margin: '48px 0 0',
} 