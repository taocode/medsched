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
	let medications = []
	$: medications = data.medications
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
				<a class="btn btn-primary" href={`/recipient/?id=${r.id}`}
					>{r.displayName}</a>
			</div>
		{:else}
			Loading Recipients...
		{/each}
	</div>
	<h2>Medication?</h2>
	<div class="flex flex-wrap justify-center gap-2">
		<div>
			{#each medications as m}
				<a class="btn btn-primary" href={`/medication/?id=${m.id}`}
					>{m.displayName}</a>
			{/each}
			<a class="btn btn-primary" href="/medication/?id=add"><div class="i-feather-plus">Add Medication</div></a>
		</div>
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
