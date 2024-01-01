import { arrayUnion, Timestamp } from 'firebase/firestore'
import { update } from 'sveltefirets'

export async function removeTimeLogEntry(recipient, dispensedMillis) {
	// console.log('good to remove:',recipient.timeLog.length,{recipient})
	const timeLog = recipient.timeLog
		.filter(
			L => L.dispensed.toMillis() !== dispensedMillis
			// && L.medicationIndex !== rmMedIndex
		)
		// correct the order according to date
		.sort((a, b) => a.dispensed.toMillis() - b.dispensed.toMillis())
	// console.log('removing entry from timelog',recipient.timeLog.length, timeLog.length)
	update(`recipients/${recipient.id}`, { timeLog })
	// throw redirect(302, `/recipient?id=${recipientid}`)
}

export async function dispenseRecipientMedication(
	dispenserid,
	recipientid,
	medicationIndex
) {
	const dispensed = Timestamp.now()
	const docData = {
		medicationIndex,
		dispensed,
		dispenserid,
	}
	// console.log({ docData, recipientid }, arrayUnion)
	update(`recipients/${recipientid}`, { timeLog: arrayUnion(docData) })
}

export async function editTimeLogEntry(
	recipient,
	originalDispensedMillis,
	newDispensedMillis
) {
	const old = recipient.timeLog.filter(
		L => L.dispensed.toMillis() === originalDispensedMillis
	)
	const { medicationIndex, dispenserid } = old[0]
	const dispensed = Timestamp.fromMillis(newDispensedMillis)
	const logEntry = {
		medicationIndex,
		dispensed,
		dispenserid,
	}
	// console.log('edited:',recipient.displayName,recipient.timeLog.length,{recipient,logEntry})
	const timeLog = [...recipient.timeLog, logEntry]
		.filter(
			L => L.dispensed.toMillis() !== originalDispensedMillis
			// && L.medicationIndex !== rmMedIndex
		)
		// correct the order according to date
		.sort((a, b) => a.dispensed.toMillis() - b.dispensed.toMillis())
	// console.log('removing entry from timelog',recipient.timeLog.length, timeLog.length)
	update(`recipients/${recipient.id}`, { timeLog })
	// throw redirect(302, `/recipient?id=${recipientid}`)
}
