<script lang="ts">
	import { dev } from '$app/environment'
	import { formatTimestampLong, randomColor } from '$lib'
	import { readableColor } from 'color2k'

	import { removeTimeLogEntry } from '$lib/db'

	export let recipient
	export let dayName = 'Today'
	export let dayTimeLog = []
	export let medications = []
	export let allowEdit = dev

	import {
		getModalStore,
		type ModalSettings,
	} from '@skeletonlabs/skeleton'
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
	$: dailyTotal = medications.reduce(
		(p, c) => p + c.schedule?.length || 0,
		0
	)
	$: daysCount = dayTimeLog.length

	function removeConfirm(dispensedMillis, summary) {
		// rmForm = event.target
		console.log('remove medindex:', summary)
		const modal: ModalSettings = {
			backdropClasses: 'bg-primary-800',
			type: 'confirm',
			title: 'Please Confirm',
			body: `Remove ${summary}?`,
			response: (r: boolean | undefined) => {
				console.log('response:', r)
				if (r) removeTimeLogEntry(recipient, dispensedMillis)
			},
		}
		modalStore.trigger(modal)
	}
	function editEntry(dispensedMillis, summary) {
		console.log(`edit entry for ${recipient.displayName}`, {
			recipient,
			summary,
			dispensedMillis,
		})
		const modal: ModalSettings = {
			type: 'component',
			component: 'modalEditLogEntry',
			title: `Edit ${summary}?`,
			meta: {
				dispensedMillis,
				recipient,
			},
		}
		modalStore.trigger(modal)
	}
</script>

<h3>
	<span class="count">{daysCount}</span>{#if dailyTotal}<span
			class="total">{dailyTotal}</span
		>{/if}
	{dayName}:
</h3>
<div class="day-log">
	{#each dayTimeLog as L, i}
		<div
			class="entry"
			class:has-total={medications[L.medicationIndex].schedule}
			style={`--bg: ${colors[L.medicationIndex]};
			--color: ${readableColor(colors[L.medicationIndex])}`}>
			<div class="count">
				{findDaysCount(L.medicationIndex, L.dispensed)}
			</div>
			{#if medications[L.medicationIndex].schedule}<div class="total">
					{medications[L.medicationIndex].schedule.length}
				</div>{/if}
			<div class="name">{medications[L.medicationIndex].displayName}</div>
			{#if allowEdit}
				<div class="actions">
					<div>
						<button
							class="btn edit variant-filled-warning"
							on:click|preventDefault={() =>
								editEntry(
									L.dispensed.toMillis(),
									`${
										medications[L.medicationIndex].displayName
									} at ${formatTimestampLong(L.dispensed)}`
								)}>
							<div class="i-fe-pencil" />
						</button>
					</div>
					<div>
						<button
							class="btn variant-filled-error delete"
							on:click|preventDefault={() =>
								removeConfirm(
									L.dispensed.toMillis(),
									`${
										medications[L.medicationIndex].displayName
									} at ${formatTimestampLong(L.dispensed)}`
								)}>
							<div class="i-fe-trash" />
						</button>
					</div>
				</div>
			{/if}
			<div class="date-col">{formatTimestampLong(L.dispensed)}</div>
		</div>
	{/each}
</div>

{#if $modalStore[0]}
	<header>{$modalStore[0].title}</header>
	<article>{$modalStore[0].body}</article>
{/if}

<style lang="postcss">
	.day-log {
		min-width: 20ch;
		@apply flex flex-col gap-2 max-w-[38ch] mx-auto;
		--br: 0.5rem;
	}
	.entry {
		@apply grid mx-auto gap-2 w-full relative px-[0.5ch];
		grid-template-columns: 0.5ch 2fr 1fr;
		background-color: var(--bg);
		color: var(--color);
		border-radius: var(--br);
	}
	.entry.has-total {
		grid-template-columns: 0.5ch 4ch 3fr 2fr;
	}
	.entry > div {
		padding: 0.25rem 0.5rem;
	}
	.entry {
		font-size: 0.95em;
	}
	.count {
		/* padding-right: 0; */
		@apply max-w-[3ch] pr-1;
	}
	.total {
		/* padding-left: 0; */
		@apply max-w-[5ch] p-0 whitespace-nowrap;
	}
	.total::before {
		content: '/';
		font-size: 0.75em;
		display: inline;
		padding: 0 0.33em 0 0;
	}
	.date-col {
		@apply text-right whitespace-nowrap;
	}
	.btn {
		margin-top: -0.25rem;
		padding: 0.5em 1.5em;
		border-radius: 0;
	}
	.actions {
		@apply absolute flex inset-0 justify-end z-[-1] opacity-0 transition-all duration-200;
	}
	.entry:hover .actions {
		@apply z-50 opacity-100;
	}
</style>
