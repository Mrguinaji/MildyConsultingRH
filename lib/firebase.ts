import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
export const db = getFirestore(app)

// Types
export type ConsultationType = 'free' | 'standard'
export type ConsultationStatus = 'pending' | 'completed' | 'cancelled'
export type PaymentStatus = 'pending' | 'completed' | 'free' | 'failed'

export interface Consultation {
  id: string
  customerEmail: string
  customerName: string
  type: ConsultationType
  date: string
  time: string
  status: ConsultationStatus
  paymentStatus: PaymentStatus
  questionnaireSubmitted: boolean
  createdAt: Date
  updatedAt: Date
}

export interface QuestionnaireResponse {
  id: string
  consultationId: string
  responses: {
    [key: string]: string | string[]
  }
  submittedAt: Date
}

export interface EmailLog {
  id: string
  consultationId: string
  type: 'confirmation' | 'reminder' | 'questionnaire'
  to: string
  subject: string
  sentAt: Date
  status: 'success' | 'failed'
  error?: string
} 