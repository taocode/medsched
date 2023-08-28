<script>
	import { formatTimestampLong, randomColor } from '$lib';
	import { readableColor } from 'color2k'

	import { Modal, Button, ButtonGroup } from 'flowbite-svelte'
	
	export let recipientid
	export let dayName = 'Today'
	export let dayTimeLog = []
	export let medications = []
	export let allowEdit = false

	function findDaysCount(medIndex,dispTS) {
	// console.log({medIndex,dispTS})
	return 1 + dayTimeLog
		.filter(L => L.medicationIndex === medIndex)
		.findIndex(L => L.dispensed === dispTS)
	}

	const colors = medications.map( m => m.color ? m.color : randomColor )
	$: dailyTotal = medications.reduce((p,c) => p+c.schedule.length,0)
	$: daysCount = dayTimeLog.length

	let confirmRm = false
	let rmDetails = ''
	let rmForm
	function removeConfirm(event) {
		rmForm = event.target
		rmDetails = rmForm.dataset.summary
		// console.log('remove?')
		confirmRm = true
		return false
	}
</script>
<h3><span class="count">{daysCount}</span><span class="total">{dailyTotal}</span> {dayName}:</h3>
<table>
	{#each dayTimeLog as L,i}
	<tr style={`--bg: ${colors[L.medicationIndex]};
			--color: ${readableColor(colors[L.medicationIndex])}`}>
				<td class="count">{findDaysCount(L.medicationIndex,L.dispensed)}</td>
				<td class="total">{medications[L.medicationIndex].schedule.length}</td>
				<td>{medications[L.medicationIndex].displayName}</td>
				<td class="date-col">{formatTimestampLong(L.dispensed)}
				</td>
				{#if allowEdit}
				<td>
					<form method="POST" action="/recipient?/remove"
						data-summary={`${medications[L.medicationIndex].displayName} at ${formatTimestampLong(L.dispensed)}`} 
						on:submit|preventDefault={removeConfirm}>
						<input type="hidden" name="rid" value={recipientid} />
						<input type="hidden" name="did" value={L.dispenserid} />
						<input type="hidden" name="entryTime" value={L.dispensed.toMillis()} />
						<input type="hidden" name="medicationIndex" value={L.medicationIndex} />
						<button class="confirm">
							<div class="i-fe-trash"></div>
						</button>
					</form>
				</td>
				{/if}
			</tr>
		{/each}
	</table>
	<Modal title="Remove?"
	autoclose 
	bind:open={confirmRm}>
		<span class="strike">{rmDetails}</span>?
		<svelte:fragment slot="footer">
			<Button color="red" on:click={()=>{rmForm.submit()}}>Yes, remove</Button>
			<Button color="alternative">No thanks</Button>
		</svelte:fragment>
	</Modal>
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
	.count::after {
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
		background: var(--color-remove,darkred);
	}
	</style>