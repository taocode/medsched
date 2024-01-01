<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton'
	import { formatDateValue } from '$lib'
	import { editTimeLogEntry } from '$lib/db'
	const modalStore = getModalStore()
	export let parent
	function dateValue(timeMillis) {
		return formatDateValue(new Date(timeMillis))
	}
	function cancel() {
		modalStore.close()
	}
	let newValue = dateValue($modalStore[0].meta.dispensedMillis)

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
	<div class="modal px-4">
		<form action="#" on:submit|preventDefault={update}>
			<button class="closer" on:click|preventDefault={cancel}
				><span class="icon i-fe-close"></span></button>
			<header><h2>{$modalStore[0].title}</h2></header>
			<article>
				<div class="edit-entry">
					<input
						type="datetime-local"
						class="variant-glass-surface"
						step="1"
						bind:value={newValue}
						on:keydown={e => {
							if (e.code === 'Enter') update(e)
						}} />
				</div>
			</article>
			<footer>
				<div class="actions">
					<button
						class="btn variant-soft-error"
						on:click|preventDefault={cancel}>Cancel</button>
					<button class="btn variant-filled-warning">Update</button>
				</div>
			</footer>
		</form>
	</div>
{/if}

<style lang="postcss">
	.modal {
		@apply relative flex-col text-center bg-gray-50 dark:bg-gray-900;
	}
	.closer {
		@apply absolute -right-2 -top-3 bg-gray-100 dark:bg-gray-800 rounded-full h-6 w-6;
	}
	h2 {
		@apply my-3;
	}
	.actions {
		@apply flex flex-wrap gap-3 justify-end my-3;
	}
</style>
