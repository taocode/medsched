<script>
	import { Timestamp } from "firebase/firestore"
	// import { docStore, getFirebaseContext, userStore, collectionStore } from 'sveltefire'
	// import { userStore, getFirebaseContext } from "sveltefire"
	import { readableColor } from "color2k"
	import DayTimeLog from "./DayTimeLog.svelte"
	import { randomColor } from "$lib"
	
	import { user } from '$lib/user'

	export let recipient
	let { id, displayName, medications, timeLog } = recipient
	$: {
		if (recipient) ({ id, displayName, medications, timeLog } = recipient)
	}
	const colors = medications.map( m => m.color ? m.color : randomColor() )
// const user = userStore(auth)
// console.log({user},$user)
const today = new Date()
today.setHours(0,0,0,0)
const yesterday = new Date()
yesterday.setHours(-24,0,0,0)

// $: timeLogByDay = timeLog.map(L => )
$: todayTimeLog = timeLog.filter(L => L.dispensed?.toDate() > today)
$: yesterdayTimeLog = timeLog.filter(L => L.dispensed?.toDate() < today && L.dispensed?.toDate() > yesterday)

async function logMed(medicationIndex) {
	// const db = getFirestore()
	console.log(id, medicationIndex)
	timeLog.push({medicationIndex,delivered: Timestamp.now()})
	const newDoc = recipient
	newDoc.timeLog = timeLog // necessary? unclear
	recipient = undefined
	setTimeout(()=>recipient = newDoc,1)
	// const res = await db.doc('/recipients/'+id).set(recipient)
	// ds.
}
</script>

<div class="show-recipient">
	<h2>{displayName}</h2>
	<div class="flex flex-wrap justify-center gap-2 my-3">
		<form method="POST" action="/recipient?/dispense">
			<input type="hidden" name="did" value={$user.uid} />
			<input type="hidden" name="rid" value={id} />
			{#each medications as m,i}
			<button name="medicationIndex" value={i}
			style={`--bg: ${colors[i]}; --color: ${readableColor(colors[i])};`} 
			>{m.displayName}</button>
			{/each}
		</form>
	</div>
	{#if todayTimeLog.length}
	<DayTimeLog recipientid={id} dayTimeLog={todayTimeLog} {medications}/>
	{/if}
	{#if yesterdayTimeLog.length}
	<DayTimeLog recipientid={id} dayName="Yesterday" dayTimeLog={yesterdayTimeLog} {medications} />
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