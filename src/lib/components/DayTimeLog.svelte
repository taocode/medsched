<script lang='ts'>
	import { formatTimestampLong, randomColor } from '$lib'
	import { readableColor } from 'color2k'

	import { removeTimeLogEntry } from '$lib/db'

	export let recipient
	export let dayName = 'Today'
	export let dayTimeLog = []
	export let medications = []
	export let allowEdit = false

	import { getModalStore } from '@skeletonlabs/skeleton'
	const modalStore = getModalStore()
							
	function findDaysCount(medIndex, dispTS) {
		// console.log({medIndex,dispTS})
		return (
			1 +
			dayTimeLog
				.filter(L => L.medicationIndex === medIndex)
				.findIndex(L => L.dispensed === dispTS)
		)
	}

	const colors = medications.map(m => (m.color ? m.color : randomColor()))
	$: dailyTotal = medications.reduce((p, c) => p + c.schedule?.length || 0, 0)
	$: daysCount = dayTimeLog.length

	let confirmRm = false
	let rmSummary = ''

	function removeConfirm(dispensedMillis,summary) {
		// rmForm = event.target
		console.log('remove medindex:',summary)
		const modal: ModalSettings = {
			backdropClasses: 'bg-primary-800',
			type: 'confirm',
			title: 'Please Confirm',
			body:  `Remove ${summary}?`,
			response: (r: boolean | undefined) => {
				console.log('response:', r)
				if (r) removeTimeLogEntry(recipient,dispensedMillis)
			},
		}
		modalStore.trigger(modal)
	}
</script>

<h3>
	<span class="count">{daysCount}</span>{#if dailyTotal}<span class="total">{dailyTotal}</span>{/if}
	{dayName}:
</h3>
<table>
	{#each dayTimeLog as L, i}
		<tr
			style={`--bg: ${colors[L.medicationIndex]};
			--color: ${readableColor(colors[L.medicationIndex])}`}>
			<td class="count">{findDaysCount(L.medicationIndex, L.dispensed)}</td>
			{#if medications[L.medicationIndex].schedule}<td class="total">{medications[L.medicationIndex].schedule.length}</td>{/if}
			<td>{medications[L.medicationIndex].displayName}</td>
			<td class="date-col">{formatTimestampLong(L.dispensed)} </td>
			{#if allowEdit}
				<td>
					<div>
						<button class="confirm" 
							on:click|preventDefault={()=>removeConfirm(L.dispensed.toMillis(),`${
								medications[L.medicationIndex].displayName
							} at ${formatTimestampLong(L.dispensed)}`)}>
							<div class="i-fe-trash" />
						</button>
					</div>
				</td>
			{/if}
		</tr>
	{/each}
</table>

{#if $modalStore[0]}
	<header>{$modalStore[0].title}</header>
	<article>{$modalStore[0].body}</article>
{/if}

<style>
	table {
		min-width: 30ch;
		margin: 0 auto;
		border-collapse: separate;
		border-spacing: 0 0.6em;
		--br: 0.5rem;
	}
	tr {
		background-color: var(--bg);
		color: var(--color);
	}
	td {
		padding: 0.25rem 0.5rem;
	}
	td:first-child {
		border-top-left-radius: var(--br);
		border-bottom-left-radius: var(--br);
	}
	.count {
		padding-right: 0;
	}
	.total {
		padding-left: 0;
	}
	.total::before {
		content: '/';
		font-size: 0.75em;
		display: inline-block;
		padding: 0 0.25em;
	}
	td:last-child {
		border-top-right-radius: var(--br);
		border-bottom-right-radius: var(--br);
	}
	.date-col {
		text-align: right;
	}
	td button {
		color: transparent;
		background-color: transparent;
		padding: 0 0.2em;
	}
	tr:hover td button {
		color: white;
		background: var(--color-remove, darkred);
	}
</style>
