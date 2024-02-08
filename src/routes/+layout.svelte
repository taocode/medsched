<script lang="ts">
	// import { initializeApp } from 'firebase/app'
	// import { getFirestore } from 'firebase/firestore'
	// import { getAuth } from 'firebase/auth'
	// import { getStorage } from 'firebase/storage'

	import Header from '$lib/components/Header.svelte'
	import LoginComponent from '$lib/components/LoginComponent.svelte'
	import '@unocss/reset/tailwind-compat.css'
	import 'uno.css'
	import './styles.css'

	
import type { AfterNavigate } from '@sveltejs/kit'
import { afterNavigate } from '$app/navigation'

	afterNavigate((params: AfterNavigate) => {
    const isNewPage = params.from?.url.pathname !== params.to?.url.pathname;
    const elemPage = document.querySelector('#page');
    if (isNewPage && elemPage !== null) {
      elemPage.scrollTop = 0;
    }
	});


	// import { page } from '$app/stores'
	import { authState } from 'sveltefirets'
	import { user as userStore } from '$lib/user'
	import '../app.postcss'

	/* Skeleton UI setup */
	// import type { ModalSettings, ModalComponent, ModalStore, ToastSettings, ToastStore } from '@skeletonlabs/skeleton'
	import {
		initializeStores,
		Modal,
		getModalStore,
		type ModalComponent,
		AppShell,
	} from '@skeletonlabs/skeleton'
	initializeStores()

	import ModalEditLogEntry from '$lib/components/modals/ModalEditLogEntry.svelte'
	import ModalDayTimeLog from '$lib/components/modals/ModalDayTimeLog.svelte'

	const modalRegistry: Record<string, ModalComponent> = {
		// Set a unique modal ID, then pass the component reference
		modalEditLogEntry: { ref: ModalEditLogEntry },
		modalDayTimeLog: { ref: ModalDayTimeLog },
		// ...
	}
	const modalStore = getModalStore()

	import Teaser from '$lib/components/Teaser.svelte'
	import Why from '$lib/components/Why.svelte'
	// export let data
	$: authNotInited = $authState === undefined
	$: user = $userStore || authNotInited || null
	// $: user = $userStore || null
</script>

<Modal components={modalRegistry} />

<div class="app" class:blur={$modalStore[0]}>
<AppShell regionPage="relative" slotPageHeader="sticky top-0 z-10"
slotDefault="flex flex-col flex-1 justify-between overflow-scroll" 
slotPageFooter="flex flex-col justify-center items-center">
	<svelte:fragment slot="pageHeader"><Header /></svelte:fragment>
	<main>
		{#if $authState === undefined}
			<div class="text-center">Loading...</div>
		{:else if user}
			<slot />
		{:else}
			<Teaser />
			<div class="mustlogin">
				<h2>Login Required</h2>
				<LoginComponent />
			</div>
			<Why />
		{/if}
	</main>
	<svelte:fragment slot="pageFooter">
		<div>By <a href="https://taocode.com" target="_blank">TAOCODE</a></div>
	</svelte:fragment>
</AppShell>

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
		margin: 1em auto;
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
