<script lang="ts">
	// import { arrayUnion, Timestamp } from 'firebase/firestore'
	// import { fade } from 'svelte/transition'
	// import { docStore, getFirebaseContext, userStore, collectionStore } from 'sveltefire'
	// import { userStore, getFirebaseContext } from "sveltefire"
	import { desaturate, readableColor, transparentize } from 'color2k'
	import DayTimeLog from './DayTimeLog.svelte'
	import ChartDispenseLog from './ChartDispenseLog.svelte'
	import { confetti } from '@neoconfetti/svelte'
	import {
		formatTimestampShortDate,
		formatTimestampMedDate,
		formatTimestampShort,
		randomColor,
	} from '$lib'
	import {
		type ModalSettings,
		getModalStore,
	} from '@skeletonlabs/skeleton'
	const modalStore = getModalStore()

	import { dispenseRecipientMedication } from '$lib/db'
	import { user } from '$lib/user'

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
	const lastDaysCount = 14
	const lastDaysDate = new Date(
		today.getTime() - lastDaysCount * 24 * 60 * 60 * 1000
	)
	// console.log({lastDaysDate})
	$: todayTimeLog = timeLog.filter(L => L.dispensed?.toDate() > today)
	$: daysCounts = todayTimeLog.reduce((p, c) => {
		const mi = c.medicationIndex
		if (isNaN(p[mi])) p[mi] = 0
		p[mi]++
		return p
	}, {})
	$: pastTimeLog = timeLogByDay.filter(
		DL => DL[0]?.dispensed?.toDate() < today
	)
	$: lastDaysTimeLog = timeLogByDay.filter(
		DL => DL[0]?.dispensed?.toDate() > lastDaysDate
	)
	$: lastDose = timeLog.reverse().reduce((p,c,i)=> { 
		if (!p[c.medicationIndex]) {
			p[c.medicationIndex] = {
				date: c.dispensed.toDate(),
				dispensed: c.dispensed,
				count: 1,
				name: medications[c.medicationIndex].displayName,
			}
		} else {
			p[c.medicationIndex].count++
		}
		return p
	}, new Array(medications.length))

	$: showFetti = recipient.medications.reduce(
		(p, c, i) => p && c.schedule?.length === daysCounts[i],
		true
	)

	async function dispense(medIndex) {
		dispenseRecipientMedication($user.uid, recipient.id, medIndex)
	}
	function daysTotal(medIndex) {
		return recipient.medications[medIndex].schedule?.length || 0
	}
	function hasSchedule(medIndex) {
		return recipient.medications[medIndex].schedule
	}
	function showPTLD(n) {
		const dayTimeLog = lastDaysTimeLog[n]
		// console.log({n, dayTimeLog})
		const modal: ModalSettings = {
			type: 'component',
			component: 'modalDayTimeLog',
			title: '',
			body: '',
			meta: {
				dayTimeLog,
				recipient,
				medications,
			},
		}
		modalStore.trigger(modal)
	}
</script>

<div class="show-recipient">
	<h2>{displayName}</h2>
	{#if showFetti}<div class="fetti"><div use:confetti></div></div>{/if}
	<div class="my-3">
		<div class="flex flex-wrap justify-center gap-2">
			{#each medications as m, i}
				<button
					name="medicationIndex"
					value={i}
					class="btn btn-dispense med-color"
					on:click|preventDefault={() => dispense(i)}
					style="--bg: {colors[i]}; 
					--bgbg: {transparentize(colors[i], 0.42)}; 
					--color: {readableColor(colors[i])}; 
					--fill-percent: {hasSchedule(i)
						? (daysCounts[i] / daysTotal(i) || 0) * 100
						: daysCounts[i] > 0
							? 100
							: 0}%;"
					type="button"
					><span class="label-dispense">{m.displayName} </span></button>
			{/each}
		</div>
	</div>
	{#if todayTimeLog.length}
		<DayTimeLog
			{recipient}
			dayTimeLog={todayTimeLog}
			{medications}
			allowEdit
			brief />
	{/if}

	<div class="display-area">
		<div class="display chart">
			<ChartDispenseLog log={lastDaysTimeLog} {colors} {medications} />
		</div>
	</div>

	<h3>{lastDaysTimeLog.length} of the Past {lastDaysCount+1} Days</h3>
	<div class="days-summary">
		{#each lastDaysTimeLog as L, n}
			<button class="day-summary rounded" on:click={() => showPTLD(n)}>
				<div class="count">{L.length}</div>
				<div class="date">{formatTimestampShortDate(L[0].dispensed)}</div>
			</button>
		{/each}
	</div>

	<h3>{pastTimeLog.length} Total Days in Log</h3>
	<h3>Last Dose</h3>
<div class="last-doses">
	{#each lastDose as {name, dispensed, count},i}
	<div class="med-color" style="--bg: {colors[i]};
	--color: {readableColor(colors[i])};"
	>{name} <span class="count">{count}</span> - {formatTimestampShortDate(dispensed)} {formatTimestampShort(dispensed)}</div>
	{/each}
</div>

</div>

<style lang="postcss">
	.show-recipient {
		text-align: center;
	}
	.med-color {
		background-color: var(--bgbg);
		color: var(--color);
		border: 2px solid var(--bg);
		padding: 0.2em 0.75em;
	}
	.fetti {
		@apply flex justify-center fixed inset-0 pt-[6em] z-20 pointer-events-none;
	}
	.label-dispense {
		@apply z-20 relative;
	}
	.btn-dispense {
		@apply relative overflow-hidden z-10;
	}
	.last-doses {
		@apply flex gap-1 flex-col w-fit mx-auto;
	}
	.count {
		@apply text-[0.8em];
	}
	.last-doses .med-color {
		@apply rounded;
		background-color: var(--bg);
	}
	.btn-dispense::before {
		@apply content-[''] absolute inset-0 right-auto;
		transition: width 0.75s ease;
		width: var(--fill-percent);
		background-color: var(--bg);
	}
	.btn-dispense::after {
		content: var(--fill-percent);
		@apply absolute z-20 inset-0;
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
	.display-area {
		@apply relative;
	}
</style>
