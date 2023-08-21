<script>
	import { Timestamp } from "firebase/firestore"
	import { docStore, getFirebaseContext, userStore, collectionStore } from 'sveltefire';
	const { auth, firestore } = getFirebaseContext()
	// import { db } from "$lib/firebase"

	export let docObj
const { id, displayName, medications, timeLog } = docObj

const todayTS = new Date()
todayTS.setHours(0,0,0,0)
$: todayTimeLog = timeLog.filter(L => L.dispensed?.toDate() > todayTS)
function formatTimestamp(ts) {
	const dtm = ts.toDate()
	return dtm.toLocaleTimeString('en-US')
}
async function logMed(medicationIndex) {
	// const db = getFirestore()
	console.log(id, medicationIndex,db)
	timeLog.push({medicationIndex,delivered: Timestamp.now()})
	docObj.timeLog = timeLog // necessary? unclear
	// const res = await db.collection('recipients').doc('/recipients/'+id).set(docObj)
	// ds.
}
</script>

<div class="show-recipient">
	<h2>{displayName}</h2>
	<div>Tap medication to log delivery</div>
	<div class="flex flex-wrap gap-2 my-3">
		{#each medications as m,i}
		<button class="" on:click={()=>logMed(i)}>{m.displayName}</button>
		{/each}
	</div>
	<h3>Today:</h3>
	<ul>
		{#each todayTimeLog as L}
			<li>{medications[L.medicationIndex].displayName} - {formatTimestamp(L.dispensed)}</li>
		{/each}
	</ul>
</div>


<style>
h2{
	font-size: 1.5em;
}
.show-recipient {
	text-align: center;
}
ul {
	list-style-type: none;
	padding: 0;
}
ul li {
	margin: 0.2rem auto;
}
</style>