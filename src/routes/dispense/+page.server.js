
import { update } from 'sveltefirets'
import { arrayUnion, updateDoc, Timestamp } from 'firebase/firestore'

import { redirect } from '@sveltejs/kit'

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
		console.log({docData,recipientid},arrayUnion)
		update(`recipients/${recipientid}`, { timeLog: arrayUnion(docData)})
    // const db = getFirestore(getAdminApp())
		// // console.log(db.collection("recipients"))
		// const rdoc = await db.collection("recipients").doc(recipientid)
		// updateDoc(rdoc, {
		// 	timeLog: arrayUnion(docData)
		// })
		throw redirect(302,'/')
  }
}