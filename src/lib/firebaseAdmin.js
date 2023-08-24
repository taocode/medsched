import { initializeApp, apps, getApps, app, getApp, credential } from "firebase-admin"
// import admin from "firebase-admin"
// import { getFirestore } from "firebase/firestore"
import serviceAccount from './medtimelog-credentials.json' // assert { type: 'json' }
// import { firebaseConfig } from "./firebase"

// console.log('getApps:',getApps())
const APP_ADMIN = 'admin'
const adminConfig = {
  credential: credential.cert(serviceAccount)
}
// console.log({adminConfig})
let adminApp = undefined
export function getAdminApp() {
  console.log({apps,app},getApps,app(APP_ADMIN))
  if (adminApp === undefined) {
    adminApp = apps.some(A => A?.name === APP_ADMIN) ? app(APP_ADMIN) : initializeApp(adminConfig, APP_ADMIN)
    adminApp.firestore()
  }
  return adminApp
}
export function getDB() {
  return getAdminApp().firestore()
} 
// console.log('getApps:',getApps())
