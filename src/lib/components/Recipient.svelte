<script>
	import { Timestamp } from "firebase/firestore"
	// import { docStore, getFirebaseContext, userStore, collectionStore } from 'sveltefire'
	// import { userStore, getFirebaseContext } from "sveltefire"
	import { readableColor } from "color2k"
	import DayTimeLog from "./DayTimeLog.svelte"
	import { formatTimestampShort, randomColor } from "$lib"
	
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

$: timeLogByDay = timeLog.reduce((p,L,i) => {
	const entryDay = L.dispensed?.toDate()
	entryDay.setHours(0,0,0,0)
	let lastDay = p[p.length-1]
	const lastEntry = (lastDay.length) ? lastDay[lastDay.length-1] : L
	const lastEntryDay = lastEntry.dispensed.toDate()
	lastEntryDay.setHours(0,0,0,0)
	// console.log('reducing',i, {lastDay, entryDay, lastEntryDay})
	if (lastEntryDay.getTime() !== entryDay.getTime()) {
		lastDay = []
		p.push(lastDay)
	}
	lastDay.push(L)
	return p
},[[]]).reverse()
$: todayTimeLog = timeLogByDay[0]
$: yesterdayTimeLog = timeLogByDay[1]

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
	<div class="my-3">
		<form class="flex flex-wrap justify-center gap-2" method="POST" action="/recipient?/dispense">
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
	<DayTimeLog recipientid={id} dayTimeLog={todayTimeLog} {medications} allowEdit={true}/>
	{/if}
	<h3>{timeLogByDay.length} Days:</h3>
	<div class="days-summary">
		{#each timeLogByDay as L}
		<div class="day-summary rounded">
			<div class="count">{L.length}</div>
			<div class="date">{formatTimestampShort(L[0].dispensed)}</div>
		</div>
		{/each}
	</div>
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
.days-summary {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	gap: 0.5rem;
}
.day-summary {
	background-color: #555;
	padding: 0.3em 0.4em;
	color: white;
	line-height: 1.2;
}
.day-summary .count {
	font-size: 1.3em;
}
.day-summary .date {
	font-size: 0.8em;
}
</style>