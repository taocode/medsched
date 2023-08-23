import { initializeApp, getApps, getApp, cert } from "firebase-admin/app"
// import { getFirestore } from "firebase-admin/firestore"
import serviceAccount from './medtimelog-credentials.json' // assert { type: 'json' }
// import { firebaseConfig } from "./firebase"

// console.log('getApps:',getApps())
const APP_ADMIN = 'admin'
const adminConfig = {
  credential: cert(serviceAccount)
}
let adminApp = undefined
export function getAdminApp() {
  if (! adminApp) {
    adminApp = (getApps().some(A => A.name === APP_ADMIN)) ? getApp(APP_ADMIN) : initializeApp(adminConfig, APP_ADMIN)
  }
  return adminApp
}
// export const db = getFirestore(getAdminApp())
// console.log('getApps:',getApps())
