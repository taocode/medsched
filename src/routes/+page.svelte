<script>
	// import { page } from '$app/stores'
	// import { authState, FirebaseUiAuth, saveUserData, collectionStore } from 'sveltefirets'
	// import { user } from '$lib/user'

	import Recipient from '$lib/components/Recipient.svelte'

	// const recipients =

	let editingRecipient = undefined
	function workOnRecipient(r) {
		editingRecipient = undefined
		setTimeout(() => (editingRecipient = r), 1)
	}
	export let data
	let recipients = []
	$: recipients = data.recipients
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Track and Log medication use" />
</svelte:head>

<section>
	<h2>Recipient?</h2>

	<div class="flex flex-wrap justify-center gap-2">
		{#each recipients as r}
			<div>
				<a class="btn btn-primary" href={`/recipient?id=${r.id}`}
					>{r.displayName}</a>
			</div>
		{:else}
			Loading...
		{/each}
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		flex: 0.6;
	}
</style>
