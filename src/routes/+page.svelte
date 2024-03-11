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
	import { Auth } from '@supabase/auth-ui-svelte'
	import { ThemeSupa } from '@supabase/auth-ui-shared'

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

	<div class="flex flex-wrap justify-center gap-2 my-3">
		{#each recipients as r}
			<div>
				<a
					class="btn variant-filled-primary"
					href={`/recipient?id=${r.id}`}>{r.displayName}</a>
			</div>
		{:else}
			Loading...
		{/each}
	</div>
</section>
<div class="row flex-center flex">
	<div class="col-6 form-widget">
		<Auth
			supabaseClient={data.supabase}
			view="magic_link"
			redirectTo={`${data.url}/auth/callback`}
			showLinks={false}
			appearance={{ theme: ThemeSupa, style: { input: 'color: #fff' } }}
		/>
	</div>
</div>

<style lang="postcss">
	section {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		flex: 0.6;
	}
</style>
