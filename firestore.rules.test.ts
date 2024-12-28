import {
  assertSucceeds,
  assertFails,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing'
import { doc, getDoc, setDoc, collection } from 'firebase/firestore'

let testEnv: RulesTestEnvironment

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: 'mildyconsultingrh',
    firestore: {
      rules: require('./firestore.rules'),
    },
  })
})

afterAll(async () => {
  await testEnv.cleanup()
})

beforeEach(async () => {
  await testEnv.clearFirestore()
})

describe('Consultations Collection', () => {
  it('permet la création sans authentification', async () => {
    const db = testEnv.unauthenticatedContext().firestore()
    const consultationRef = doc(collection(db, 'consultations'))
    
    await assertSucceeds(
      setDoc(consultationRef, {
        customerEmail: 'test@example.com',
        customerName: 'Test User',
        type: 'free',
        date: '2024-01-01',
        time: '10:00',
        status: 'pending',
        paymentStatus: 'free',
        questionnaireSubmitted: false,
      })
    )
  })

  it('permet la lecture par l\'administrateur', async () => {
    const adminDb = testEnv.authenticatedContext('admin', { isAdmin: true }).firestore()
    const consultationRef = doc(collection(adminDb, 'consultations'), 'test-id')
    
    await assertSucceeds(getDoc(consultationRef))
  })

  it('permet la lecture par le propriétaire', async () => {
    const userEmail = 'user@example.com'
    const userDb = testEnv.authenticatedContext('user', { email: userEmail }).firestore()
    const consultationRef = doc(collection(userDb, 'consultations'), 'test-id')
    
    // Créer d'abord la consultation
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'consultations/test-id'), {
        customerEmail: userEmail,
        customerName: 'Test User',
        type: 'free',
        date: '2024-01-01',
      })
    })
    
    await assertSucceeds(getDoc(consultationRef))
  })

  it('refuse la lecture par un autre utilisateur', async () => {
    const userEmail = 'other@example.com'
    const userDb = testEnv.authenticatedContext('other-user', { email: userEmail }).firestore()
    const consultationRef = doc(collection(userDb, 'consultations'), 'test-id')
    
    // Créer d'abord la consultation
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'consultations/test-id'), {
        customerEmail: 'original@example.com',
        customerName: 'Original User',
        type: 'free',
        date: '2024-01-01',
      })
    })
    
    await assertFails(getDoc(consultationRef))
  })
})

describe('Questionnaire Responses Collection', () => {
  it('permet la création par le propriétaire de la consultation', async () => {
    const userEmail = 'user@example.com'
    const userDb = testEnv.authenticatedContext('user', { email: userEmail }).firestore()
    
    // Créer d'abord la consultation
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'consultations/test-id'), {
        customerEmail: userEmail,
        customerName: 'Test User',
        type: 'free',
        date: '2024-01-01',
      })
    })
    
    const responseRef = doc(collection(userDb, 'questionnaire_responses'))
    await assertSucceeds(
      setDoc(responseRef, {
        consultationId: 'test-id',
        responses: {
          question1: 'answer1',
        },
      })
    )
  })

  it('refuse la création par un autre utilisateur', async () => {
    const userDb = testEnv.authenticatedContext('other-user', { email: 'other@example.com' }).firestore()
    
    // Créer d'abord la consultation
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'consultations/test-id'), {
        customerEmail: 'original@example.com',
        customerName: 'Original User',
        type: 'free',
        date: '2024-01-01',
      })
    })
    
    const responseRef = doc(collection(userDb, 'questionnaire_responses'))
    await assertFails(
      setDoc(responseRef, {
        consultationId: 'test-id',
        responses: {
          question1: 'answer1',
        },
      })
    )
  })
})

describe('Email Logs Collection', () => {
  it('permet la lecture par l\'administrateur', async () => {
    const adminDb = testEnv.authenticatedContext('admin', { isAdmin: true }).firestore()
    const logRef = doc(collection(adminDb, 'email_logs'), 'test-id')
    
    await assertSucceeds(getDoc(logRef))
  })

  it('refuse la lecture par un utilisateur normal', async () => {
    const userDb = testEnv.authenticatedContext('user', { email: 'user@example.com' }).firestore()
    const logRef = doc(collection(userDb, 'email_logs'), 'test-id')
    
    await assertFails(getDoc(logRef))
  })

  it('refuse l\'écriture même par l\'administrateur', async () => {
    const adminDb = testEnv.authenticatedContext('admin', { isAdmin: true }).firestore()
    const logRef = doc(collection(adminDb, 'email_logs'), 'test-id')
    
    await assertFails(
      setDoc(logRef, {
        consultationId: 'test-id',
        type: 'confirmation',
        to: 'test@example.com',
        subject: 'Test',
        status: 'success',
      })
    )
  })
}) 