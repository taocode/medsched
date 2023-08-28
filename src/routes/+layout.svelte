<script>
	// import { initializeApp } from 'firebase/app'
	// import { getFirestore } from 'firebase/firestore'
	// import { getAuth } from 'firebase/auth'
	// import { getStorage } from 'firebase/storage'

	import Header from '$lib/components/Header.svelte'
	import LoginComponent from '$lib/components/LoginComponent.svelte'
	import '@unocss/reset/tailwind-compat.css'
	import 'uno.css'
	import './styles.css'

	import { page } from '$app/stores'
  import { authState } from 'sveltefirets'
  import { user as userStore } from '$lib/user'
	import Teaser from '$lib/components/Teaser.svelte';
	import Why from '$lib/components/Why.svelte';
  $: authNotInited = $authState === undefined
  $: userDataFromCookie = $page.data?.user
  $: user = $userStore || (authNotInited && userDataFromCookie) || null

</script>

<div class="app">
	<Header />
	<main>
{#if $authState === undefined}
  <div class="text-center">Loading...</div>
{:else}
  {#if user}
			<slot />
		{:else}
			<Teaser />
			<div class="mustlogin">
				<h2>Login Required</h2>
				<LoginComponent />
			</div>
			<Why />
		{/if}
	{/if}
</main>
		
	<footer>
		<p>By <a href="https://taocode.com">TAOCODE</a></p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
	.mustlogin {
		text-align: center;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 0 1rem 1rem 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
