<script>
	import Recipient from '$lib/components/Recipient.svelte';
import { docStore, getFirebaseContext, userStore, collectionStore } from 'sveltefire';
	const { auth, firestore } = getFirebaseContext()
	const user = userStore(auth)
	const post = docStore(firestore,'posts/id')
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
no recipients added
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

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
