<script lang="ts">
	import { dev } from '$app/environment'
	import {
		formatTimestampLong,
		formatTimestampShort,
		randomColor,
	} from '$lib'
	import { readableColor } from 'color2k'

	import { removeTimeLogEntry } from '$lib/db'

	export let recipient
	export let dayName = 'Today'
	export let dayTimeLog = []
	export let medications = []
	export let allowEdit = dev
	export let brief = false

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

<h3 style="--total: {dailyTotal};">
	<span class="count">{daysCount}</span>{#if dailyTotal}<span
			class="total">/ {dailyTotal}</span
		>{/if}
	{dayName}:
</h3>
<div class="day-log" class:brief>
	{#each dayTimeLog as L, i}
		<div
			class="entry"
			class:has-total={medications[L.medicationIndex].schedule}
			style="--bg: {colors[L.medicationIndex]};
			--color: {readableColor(colors[L.medicationIndex])};
			--total: {medications[L.medicationIndex].schedule?.length || 0}">
			<div class="count">
				{findDaysCount(L.medicationIndex, L.dispensed)}
			</div>
			{#if !brief}<div class="name">
					{medications[L.medicationIndex].displayName}
				</div>{/if}
			<div class="date-col">{formatTimestampShort(L.dispensed)}</div>
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
		@apply flex flex-col gap-2 max-w-fit mx-auto;
		--br: 0.5rem;
	}
	.brief {
		@apply flex-row flex-wrap;
	}
	.brief .date-col {
		font-size: 0.8em;
		padding-top: 0.2em;
	}
	.entry {
		@apply flex mx-auto gap-1 relative px-[0.5ch];
		/* grid-template-columns: 0.5ch 2fr 1fr; */
		background-color: var(--bg);
		color: var(--color);
		border-radius: var(--br);
		padding: 0.1rem 0.5rem;
	}
	.entry {
		font-size: 0.95em;
	}
	.count {
		/* padding-right: 0; */
		@apply max-w-[6ch] pr-1;
	}
	.has-total .count::after {
		counter-reset: total var(--total);
		content: '\200a/\2009' counter(total);
	}
	.total,
	.count::after {
		font-size: 0.7em;
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
