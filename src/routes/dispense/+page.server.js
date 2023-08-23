
import { getAdminApp, getDB } from '$lib/firebaseAdmin'
import { arrayUnion, collection, doc, getFirestore, updateDoc, Timestamp } from 'firebase/firestore'

import { redirect } from '@sveltejs/kit'
import { firestore } from 'firebase-admin'

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({request}) => {
		const data = await request.formData();
    const medicationIndex = parseInt(data.get('medicationIndex'))
    const dispenserid = data.get('did')
		const recipientid = data.get('rid')
		const dispensed = Timestamp.now()
		const docData = {
			medicationIndex,
			dispenserid,
			dispensed,
		}
    const db = getAdminApp().firestore()
		console.log(db.collection("recipients"))
		const rdoc = await db.collection("recipients").doc(recipientid)
		console.log({docData,recipientid,rdoc})
		updateDoc(rdoc, {
			timeLog: arrayUnion(docData)
		})
		throw redirect(302,'/')
  }
}