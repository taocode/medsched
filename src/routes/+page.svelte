<script>
	import Recipient from '$lib/components/Recipient.svelte';
	import { docStore, getFirebaseContext, userStore, collectionStore } from 'sveltefire';
	const { auth, firestore } = getFirebaseContext()
	// const user = userStore(auth)
	// const post = docStore(firestore,'posts/id')
	const recipients = collectionStore(firestore,'recipients')
	let editRecipient = false

	let editingRecipient = undefined
	function workOnRecipient(r) {
		editingRecipient = r
		editRecipient = true
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Track and Log medication use" />
</svelte:head>

<section>

<h2>Recipient?</h2>

{#each $recipients as r}
<div><button on:click={()=>workOnRecipient(r)}>{r.displayName}</button></div>

{:else}
Loading...
{/each}

{#if editRecipient}
<Recipient 
	docObj={editingRecipient} />
{/if}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

</style>
