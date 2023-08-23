import { initializeApp, getApps, getApp } from "firebase/app"
// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyC5iP7AMx4IHIv6CcG9nUMdbScwrSM7Qpc",
  authDomain: "medtimelog.firebaseapp.com",
  projectId: "medtimelog",
  storageBucket: "medtimelog.appspot.com",
  messagingSenderId: "331132141308",
  appId: "1:331132141308:web:b29777869ff763fd682179"
}

const APP_RO = 'ro'
let appRO
export function getAppRO() {
  if (appRO) return appRO
  appRO = (getApps().some(F => F.name === APP_RO)) ? getApp(APP_RO) : initializeApp(firebaseConfig,APP_RO)
  return appRO
}

// export const db = getFirestore(app)
// export const firestore = getFirestore(app)
// export const auth = getAuth(app)
// export const storage = getStorage(app)
