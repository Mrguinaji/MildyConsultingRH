import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './firebase'
import type { Consultation, QuestionnaireResponse, EmailLog } from './firebase'

// Collections
const consultationsRef = collection(db, 'consultations')
const questionnaireResponsesRef = collection(db, 'questionnaire_responses')
const emailLogsRef = collection(db, 'email_logs')

// Consultations
export async function createConsultation(data: Omit<Consultation, 'id' | 'createdAt' | 'updatedAt'>) {
  const docRef = await addDoc(consultationsRef, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return docRef.id
}

export async function getConsultation(id: string) {
  const docRef = doc(consultationsRef, id)
  const docSnap = await getDoc(docRef)
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Consultation : null
}

export async function updateConsultation(id: string, data: Partial<Consultation>) {
  const docRef = doc(consultationsRef, id)
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

export async function getTomorrowConsultations() {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)

  const nextDay = new Date(tomorrow)
  nextDay.setDate(nextDay.getDate() + 1)

  const q = query(
    consultationsRef,
    where('date', '>=', tomorrow.toISOString().split('T')[0]),
    where('date', '<', nextDay.toISOString().split('T')[0])
  )

  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Consultation)
}

// Questionnaire Responses
export async function saveQuestionnaireResponse(data: Omit<QuestionnaireResponse, 'id' | 'submittedAt'>) {
  const docRef = await addDoc(questionnaireResponsesRef, {
    ...data,
    submittedAt: serverTimestamp(),
  })
  return docRef.id
}

export async function getQuestionnaireResponse(consultationId: string) {
  const q = query(questionnaireResponsesRef, where('consultationId', '==', consultationId))
  const querySnapshot = await getDocs(q)
  return querySnapshot.empty ? null : { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() } as QuestionnaireResponse
}

// Email Logs
export async function logEmail(data: Omit<EmailLog, 'id' | 'sentAt'>) {
  const docRef = await addDoc(emailLogsRef, {
    ...data,
    sentAt: serverTimestamp(),
  })
  return docRef.id
}

export async function getEmailLogs(consultationId: string) {
  const q = query(emailLogsRef, where('consultationId', '==', consultationId))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as EmailLog)
} 