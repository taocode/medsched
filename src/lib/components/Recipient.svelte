<script>
	import { Timestamp } from "firebase/firestore"
	import { docStore, getFirebaseContext, userStore, collectionStore } from 'sveltefire';
	const { auth, firestore } = getFirebaseContext()
	// import { db } from "$lib/firebase"

	export let docObj
	let { id, displayName, medications, timeLog } = docObj
$: {
	if (docObj) ({ id, displayName, medications, timeLog } = docObj)
}

const todayTS = new Date()
todayTS.setHours(0,0,0,0)

$: todayTimeLog = timeLog.filter(L => L.dispensed?.toDate() > todayTS)

function formatTimestamp(ts) {
	const dtm = ts.toDate()
	return dtm.toLocaleTimeString('en-US')
}
async function logMed(medicationIndex) {
	// const db = getFirestore()
	console.log(id, medicationIndex)
	timeLog.push({medicationIndex,delivered: Timestamp.now()})
	const newDoc = docObj
	newDoc.timeLog = timeLog // necessary? unclear
	docObj = undefined
	setTimeout(()=>docObj = newDoc,1)
	// const res = await db.collection('recipients').doc('/recipients/'+id).set(docObj)
	// ds.
}
function findTodaysCount(medIndex,dispTS) {
	console.log({medIndex,dispTS})
	return 1 + todayTimeLog
		.filter(L => L.medicationIndex === medIndex)
		.findIndex(L => L.dispensed === dispTS)
}
</script>

<div class="show-recipient">
	<h2>{displayName}</h2>
	<div>Tap to log (coming soon)</div>
	<div class="flex flex-wrap justify-center gap-2 my-3">
		{#each medications as m,i}
		<button class="" on:click={()=>logMed(i)}>{m.displayName}</button>
		{/each}
	</div>
	<h3>Today:</h3>
	<table>
		{#each todayTimeLog as L}
			<tr>
				<td>{findTodaysCount(L.medicationIndex,L.dispensed)} of {medications[L.medicationIndex].schedule.length}</td>
				<td>{medications[L.medicationIndex].displayName}</td> 
				<td>{formatTimestamp(L.dispensed)}</td>
			</tr>
		{/each}
	</table>
</div>


<style>
.show-recipient {
	text-align: center;
}
table {
	min-width: 30ch;
	margin: 0 auto;
}
td {
	padding: 0.2em 0.05em;
}
td:last-child {
	text-align: right;
}
ul {
	list-style-type: none;
	padding: 0;
}
ul li {
	margin: 0.2rem auto;
}
</style>