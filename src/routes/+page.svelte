<script>
	import Recipient from '$lib/components/Recipient.svelte';
	import { docStore, getFirebaseContext, userStore, collectionStore } from 'sveltefire';
	const { auth, firestore } = getFirebaseContext()
	// const user = userStore(auth)
	// const post = docStore(firestore,'posts/id')
	const recipients = collectionStore(firestore,'recipients')

	let editingRecipient = undefined
	function workOnRecipient(r) {
		editingRecipient = undefined
		setTimeout(()=> editingRecipient = r, 1)
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Track and Log medication use" />
</svelte:head>

<section>

<h2>Recipient?</h2>

<div class="flex flex-wrap justify-center gap-2">
	{#each $recipients as r}
	<div><button on:click={() => workOnRecipient(r)}>{r.displayName}</button></div>
	{:else}
	Loading...
	{/each}
</div>

{#if editingRecipient}
<Recipient 
	docObj={editingRecipient} />
{/if}

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
