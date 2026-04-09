import { initializeApp, getApps, getApp } from "firebase/app"
import { getDatabase, ref, onValue, update, push, get, remove } from "firebase/database"

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL:
    process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ||
    (projectId ? `https://${projectId}.firebaseio.com` : undefined),
  projectId,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

let app: any = null
let db: any = null

const isFirebaseConfigured =
  typeof window !== "undefined" &&
  !!firebaseConfig.apiKey &&
  !!firebaseConfig.databaseURL &&
  !!firebaseConfig.projectId &&
  !!firebaseConfig.appId

if (isFirebaseConfigured) {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
  db = getDatabase(app)
} else {
  // Firebase is not available in this environment. Continue without database access.
}

export { db, ref, onValue, update, push, get, remove }
