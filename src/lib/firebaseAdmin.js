import { initializeApp, getApps, getApp, cert } from "firebase-admin/app"
// import admin from "firebase-admin"
import { getFirestore } from "firebase-admin/firestore"
import serviceAccount from './medtimelog-credentials.json' // assert { type: 'json' }
// import { firebaseConfig } from "./firebase"

// console.log('getApps:',getApps())
const APP_ADMIN = 'admin'
const adminConfig = {
  credential: cert(serviceAccount)
}
// console.log({adminConfig})
let adminApp = undefined
export function getAdminApp() {
  // console.log({apps})
  if (adminApp === undefined) {
    adminApp = getApps().some(A => A?.name === APP_ADMIN) ? getApp(APP_ADMIN) : initializeApp(adminConfig, APP_ADMIN)
  }
  return adminApp
}
let db = undefined
export function getDB() {
  if (db === undefined) {
    console.log("getDB(initing)")
    db = getFirestore(getAdminApp())
  }
  return db
} 
// console.log('getApps:',getApps())
