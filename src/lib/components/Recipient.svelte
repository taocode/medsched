<script>
	import { arrayUnion, Timestamp } from 'firebase/firestore'
	import { fade } from 'svelte/transition'
	// import { docStore, getFirebaseContext, userStore, collectionStore } from 'sveltefire'
	// import { userStore, getFirebaseContext } from "sveltefire"
	import { readableColor } from 'color2k'
	import DayTimeLog from './DayTimeLog.svelte'
	import {
		formatTimestampShortDate,
		formatTimestampMedDate,
		randomColor,
	} from '$lib'

	import { dispenseRecipientMedication } from '$lib/db'
	import { user } from '$lib/user'
	import { update } from 'sveltefirets'

	export let recipient
	let { id, displayName, medications, timeLog } = recipient
	$: {
		if (recipient) ({ id, displayName, medications, timeLog } = recipient)
	}
	const colors = medications.map(m => (m.color ? m.color : randomColor()))
	// const user = userStore(auth)
	// console.log({user},$user)
	const today = new Date()
	today.setHours(0, 0, 0, 0)
	// const thing = new Timestamp()
	$: timeLogByDay = timeLog
		.reduce(
			(p, L, i) => {
				const entryDay = L.dispensed?.toDate()
				entryDay.setHours(0, 0, 0, 0)
				let lastDay = p[p.length - 1]
				const lastEntry = lastDay.length ? lastDay[lastDay.length - 1] : L
				const lastEntryDay = lastEntry.dispensed.toDate()
				lastEntryDay.setHours(0, 0, 0, 0)
				// console.log('reducing',i, {lastDay, entryDay, lastEntryDay})
				if (lastEntryDay.getTime() !== entryDay.getTime()) {
					lastDay = []
					p.push(lastDay)
				}
				lastDay.push(L)
				return p
			},
			[[]]
		)
		.reverse()
	$: todayTimeLog = timeLog.filter(L => L.dispensed?.toDate() > today)
	$: pastTimeLog = timeLogByDay.filter(DL => DL[0]?.dispensed?.toDate() < today)
	let pastTimeLogDetail = []

	async function dispense(medicationIndex) {
		return dispenseRecipientMedication($user.uid, recipient.id, medicationIndex)
	}
</script>

<div class="show-recipient">
	<h2>{displayName}</h2>
	<div class="my-3">
		<div
			class="flex flex-wrap justify-center gap-2">
			{#each medications as m, i}
				<button
					name="medicationIndex"
					value={i}
					class="btn"
					on:click|preventDefault={() => dispense(i) }
					style={`--bg: ${colors[i]}; --color: ${readableColor(colors[i])};`}
					type="button"
					>{m.displayName}</button>
			{/each}
		</div>
	</div>
	{#if todayTimeLog.length}
		<DayTimeLog
			recipient={recipient}
			dayTimeLog={todayTimeLog}
			{medications}
			allowEdit={true} />
	{/if}
	<h3>Past {pastTimeLog.length} Days:</h3>
	<div class="days-summary">
		{#each pastTimeLog as L, n}
			<button
				class="day-summary rounded"
				on:click={() => {
					pastTimeLogDetail = pastTimeLog[n]
					console.log('ptld', n, pastTimeLogDetail)
				}}>
				<div class="count">{L.length}</div>
				<div class="date">{formatTimestampShortDate(L[0].dispensed)}</div>
			</button>
		{/each}
	</div>
	{#if pastTimeLogDetail.length}
		<div class="pastLogDetail" in:fade>
			<DayTimeLog
				recipientid={id}
				dayName={'on ' + formatTimestampMedDate(pastTimeLogDetail[0].dispensed)}
				dayTimeLog={pastTimeLogDetail}
				{medications} />
		</div>
	{/if}
</div>

<style>
	.show-recipient {
		text-align: center;
	}
	button {
		background-color: var(--bg);
		color: var(--color);
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
		transition: all 200ms ease;
	}
	.day-summary:hover {
		background-color: var(--color-theme-1, red);
	}
	.day-summary .count {
		font-size: 1.3em;
	}
	.day-summary .date {
		font-size: 0.8em;
	}
</style>
