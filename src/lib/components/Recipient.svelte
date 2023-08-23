<script>
	import { Timestamp } from "firebase/firestore"
	// import { getFirestore } from "firebase-admin/firestore"
	import { docStore, getFirebaseContext, userStore, collectionStore } from 'sveltefire';
	import { readableColor } from "color2k"
	import DayTimeLog from "./DayTimeLog.svelte"
	const { auth, firestore } = getFirebaseContext()
	// import { getAdminApp } from "$lib/firebaseAdmin"
	// const db = getFirestore(getAdminApp())

	export let docObj
	let { id, displayName, medications, timeLog } = docObj
$: {
	if (docObj) ({ id, displayName, medications, timeLog } = docObj)
}

const today = new Date()
today.setHours(0,0,0,0)
const yesterday = new Date()
yesterday.setHours(-24,0,0,0)

$: todayTimeLog = timeLog.filter(L => L.dispensed?.toDate() > today)
$: yesterdayTimeLog = timeLog.filter(L => L.dispensed?.toDate() < today && L.dispensed?.toDate() > yesterday)

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
</script>

<div class="show-recipient">
	<h2>{displayName}</h2>
	<div class="flex flex-wrap justify-center gap-2 my-3">
		{#each medications as m,i}
		<button
			style={`--bg: ${m.color}; --color: ${readableColor(m.color)};`} 
			on:click={()=>logMed(i)}>{m.displayName}</button>
		{/each}
	</div>
	{#if todayTimeLog.length}
	<DayTimeLog dayTimeLog={todayTimeLog} {medications}/>
	{/if}
	{#if yesterdayTimeLog.length}
	<DayTimeLog dayName="Yesterday" dayTimeLog={yesterdayTimeLog} {medications} />
	{/if}
</div>

<style>
.show-recipient {
	text-align: center;
}
button {
	background-color: var(--bg);
	color: var(--color);
	border: 0;
	padding: 0.2em 0.5em;
	border-radius: 0.2rem;
}
</style>