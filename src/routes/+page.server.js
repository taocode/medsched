import { getAdminApp, getDB } from '$lib/firebaseAdmin'
import { firestore } from 'firebase-admin'

/** @type {import('./$types').PageServerLoad} */
export function load() {
  const db = getDB()
  // console.log('getDB',{db})
  return { }
}