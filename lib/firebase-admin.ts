import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
}

// Initialize Firebase Admin
const app = getApps().length === 0 ? initializeApp(firebaseAdminConfig) : getApps()[0]
export const adminDb = getFirestore(app)

// Admin Utilities
export async function updateConsultationStatus(consultationId: string, status: 'completed' | 'cancelled') {
  const consultationRef = adminDb.collection('consultations').doc(consultationId)
  await consultationRef.update({
    status,
    updatedAt: new Date(),
  })
}

export async function getConsultationsByDateRange(startDate: Date, endDate: Date) {
  const consultationsRef = adminDb.collection('consultations')
  const snapshot = await consultationsRef
    .where('date', '>=', startDate.toISOString().split('T')[0])
    .where('date', '<', endDate.toISOString().split('T')[0])
    .orderBy('date', 'asc')
    .get()

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

export async function getUpcomingConsultations() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const consultationsRef = adminDb.collection('consultations')
  const snapshot = await consultationsRef
    .where('date', '>=', today.toISOString().split('T')[0])
    .where('status', '==', 'pending')
    .orderBy('date', 'asc')
    .get()

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
} 