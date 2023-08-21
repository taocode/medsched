// import { cert } from 'firebase-admin/app'
// import { getFirestore, Timestamp, FieldValue, Filter } from 'firebase-admin/firestore'

// import { getFirestore } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';
// import { getStorage } from 'firebase/storage';


// Initialize Firebase
// const app = initializeApp(firebaseConfig);
import serviceAccount from './medtimelog-credentials.json'

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyC5iP7AMx4IHIv6CcG9nUMdbScwrSM7Qpc",
  authDomain: "medtimelog.firebaseapp.com",
  // credential: cert(serviceAccount),
  projectId: "medtimelog",
  storageBucket: "medtimelog.appspot.com",
  messagingSenderId: "331132141308",
  appId: "1:331132141308:web:b29777869ff763fd682179"
}

let app
export function setApp(newApp) {
  app = newApp
}
export function getApp() {
  return app;
}
// export const db = getFirestore(app)
// export const firestore = getFirestore(app)
// export const auth = getAuth(app)
// export const storage = getStorage(app)
