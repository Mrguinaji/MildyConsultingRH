import { Resend } from 'resend'
import { BookingConfirmationEmail } from '@/emails/BookingConfirmation'

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is missing')
}

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendBookingConfirmationEmail({
  email,
  consultationType,
  date,
  time,
  clientName,
}: {
  email: string
  consultationType: string
  date: string
  time: string
  clientName?: string
}) {
  try {
    const data = await resend.emails.send({
      from: 'Mildy Consulting RH <onboarding@resend.dev>',
      to: email,
      subject: 'Confirmation de votre réservation - Mildy Consulting RH',
      react: BookingConfirmationEmail({
        consultationType,
        date,
        time,
        clientName,
      }),
    })

    return { success: true, data }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error }
  }
} 