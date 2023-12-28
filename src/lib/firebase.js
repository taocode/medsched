import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// Your web app's Firebase configuration
import { firebaseConfig } from 'sveltefirets'

const APP_RO = 'ro'
let appRO
export function getAppRO() {
	if (appRO) return appRO
	appRO = getApps().some(F => F.name === APP_RO)
		? getApp(APP_RO)
		: initializeApp(firebaseConfig, APP_RO)
		// const db = getFirestore(appRO)
		// connectFirestoreEmulator(db, '127.0.0.1', 8080)
	return appRO
}

export function getFirebaseContext() {
	const auth = 'TBD'
	const firestore = getFirestore(getAppRO())
	return { auth, firestore }
}

// export const db = getFirestore(app)
// export const firestore = getFirestore(app)
// export const auth = getAuth(app)
// export const storage = getStorage(app)
