import { getDocument, update } from 'sveltefirets'
import { arrayUnion, Timestamp } from 'firebase/firestore'

import { redirect } from '@sveltejs/kit'

/** @type {import('./$types').Actions} */
export const actions = {
	dispense: async ({ request }) => {
		// console.log('dispense()')
		const data = await request.formData()
		const medicationIndex = parseInt(data.get('medicationIndex'))
		const dispenserid = data.get('did')
		const recipientid = data.get('rid')
		const dispensed = Timestamp.now()
		const docData = {
			medicationIndex,
			dispensed,
			dispenserid,
		}
		console.log({ docData, recipientid }, arrayUnion)
		update(`recipients/${recipientid}`, { timeLog: arrayUnion(docData) })
		throw redirect(302, `/recipient?id=${recipientid}`)
	},
	remove: async ({ request }) => {
		const data = await request.formData()
		const recipientid = data.get('rid')
		const entryTime = parseInt(data.get('entryTime'))
		const medicationIndex = data.get('medicationIndex')

		const doc = await getDocument(`/recipients/${recipientid}`)
		// const timeLog = doc.timeLog
		// console.log('good to remove:',{recipientid, docData})
		const timeLog = doc.timeLog
			.filter(
				L =>
					L.dispensed.toMillis() !== entryTime &&
					L.medicationIndex !== medicationIndex
			)
			// correct the order according to date
			.sort((a, b) => a.dispensed.toMillis() - b.dispensed.toMillis())
		// console.log('removing entry from timelog',doc.timeLog.length, timeLog.length)
		update(`recipients/${recipientid}`, { timeLog })
		throw redirect(302, `/recipient?id=${recipientid}`)
	},
}
