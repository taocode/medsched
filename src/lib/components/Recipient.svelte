<script>
	import { Timestamp } from "firebase/firestore"
	import { docStore, getFirebaseContext, userStore, collectionStore } from 'sveltefire';
	const { auth, firestore } = getFirebaseContext()

	export let docObj
const { id, displayName } = docObj
// let displayName = docObj.displayName
let medications = docObj.medications
let timeLog = docObj.timeLog
const todayTS = new Date()
todayTS.setHours(0,0,0,0)
$: todayTimeLog = timeLog.filter(L => L.dispensed?.toDate() > todayTS)
function formatTimestamp(ts) {
	const dtm = ts.toDate()
	return dtm.toLocaleTimeString('en-US')
}
function logMed(medicationIndex) {
	console.log(id, medicationIndex)
	timeLog.push({medicationIndex,delivered: Timestamp.now()})
	docObj.timeLog = timeLog
	const ds = docStore(firestore,'/recipients/'+id)
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
	{#each todayTimeLog as L}
		{medications[L.medicationIndex].displayName} - {formatTimestamp(L.dispensed)}
	{/each}
</div>


<style>
h2{
	font-size: 1.5em;
}
.show-recipient {
	text-align: center;
}
</style>