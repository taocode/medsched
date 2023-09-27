<script lang="ts">
	import { page } from '$app/stores'
	import Recipient from '$lib/components/Recipient.svelte'
	import { docStore } from 'sveltefirets'
	// import type { PageData } from './$types';
	// export let data
	let recipientId = ''
	let recipient = undefined
	// $: ({recipient} = data)
	$: {
		recipientId = $page.url.searchParams.get('id')
		recipient = docStore(`recipients/${recipientId}`)
		// console.log({recipientId},recipient)
		// ({recipient} = data)
		// console.log({ recipient })

	}
</script>

<svelte:head>
	<title>Recipient: {$recipient?.displayName || 'Oops'} - MedTimeLog</title>
</svelte:head>

{#if $recipient}
<Recipient recipient={$recipient} />
{/if}