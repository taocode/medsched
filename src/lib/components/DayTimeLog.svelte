<script>
	import { randomColor } from '$lib';
	import { readableColor } from 'color2k'
	export let dayName = 'Today'
	export let dayTimeLog = []
	export let medications = []

	function formatTimestamp(ts) {
		const dtm = ts.toDate()
		return dtm.toLocaleTimeString('en-US')
	}

	function findDaysCount(medIndex,dispTS) {
	// console.log({medIndex,dispTS})
	return 1 + dayTimeLog
		.filter(L => L.medicationIndex === medIndex)
		.findIndex(L => L.dispensed === dispTS)
	}

	const colors = medications.map( m => m.color ? m.color : randomColor )
	$: dailyTotal = medications.reduce((p,c) => p+c.schedule.length,0)
	$: daysCount = dayTimeLog.length
</script>
<h3><span class="count">{daysCount}</span><span class="total">{dailyTotal}</span> {dayName}:</h3>
<table>
	{#each dayTimeLog as L}
		<tr style={`--bg: ${colors[L.medicationIndex]};
		--color: ${readableColor(colors[L.medicationIndex])}`}>
			<td class="count">{findDaysCount(L.medicationIndex,L.dispensed)}</td>
			<td class="total">{medications[L.medicationIndex].schedule.length}</td>
			<td>{medications[L.medicationIndex].displayName}</td>
			<td>{formatTimestamp(L.dispensed)}</td>
		</tr>
	{/each}
</table>

<style>
	h3 {
		margin: 1.5rem 0 0.5rem;
	}
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
		text-align: right;
	}
	</style>