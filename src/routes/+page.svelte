<script>
	import { docStore, getFirebaseContext, userStore, collectionStore } from 'sveltefire';
	const { auth, firestore } = getFirebaseContext()
	const user = userStore(auth)
	const post = docStore(firestore,'posts/id')
	const recipients = collectionStore(firestore,'recipients')
	let addRecipient = false
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Track and Log medication use" />
</svelte:head>

<section>

<h2>Recipient?</h2>

{#each $recipients as r}
<div>{r}</div>
{:else}
no recipients added
{/each}
<button title="add recipient" on:click={()=>addRecipient = ! addRecipient}>
	<div class="i-fe-plus"></div>
</button>

{#if addRecipient}
add form here
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
