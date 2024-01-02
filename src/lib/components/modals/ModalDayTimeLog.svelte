<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton'
	import { formatDateValue, formatTimestampMedDate } from '$lib'
	import DayTimeLog from '../DayTimeLog.svelte'
	const modalStore = getModalStore()
	export let parent
	function dateValue(timeMillis) {
		return formatDateValue(new Date(timeMillis))
	}
	function cancel() {
		modalStore.close()
	}
	let { dayTimeLog, recipient, medications } = $modalStore[0].meta
	
	const dateFormatted = formatTimestampMedDate(dayTimeLog[0].dispensed)

	function update(event) {
		// console.log('update()',{newValue}, new Date(newValue).getTime())
		const { recipient, dispensedMillis } = $modalStore[0].meta
		editTimeLogEntry(
			recipient,
			dispensedMillis,
			new Date(newValue).getTime()
		)
		modalStore.close()
	}
</script>

{#if $modalStore[0]}
	<article class="modal px-4 pb-4">
		<button class="btn variant-glass-surface closer" on:click={cancel}><span class="i-fe-close"></span></button>
		<DayTimeLog
			dayName={dateFormatted}
			{recipient}
			{dayTimeLog}
			{medications} />
	</article>
{/if}

<style lang="postcss">
	.modal {
		@apply relative flex-col text-center bg-gray-50 dark:bg-gray-900;
	}
	.closer {
		@apply absolute -right-2 -top-3 bg-gray-100 dark:bg-gray-800 rounded-full p-2;
	}
</style>
