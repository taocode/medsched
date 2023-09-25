<script lang="ts">
	import { page } from '$app/stores'
	import Medication from '$lib/components/Medication.svelte'
	import { docStore } from 'sveltefirets'
	// import type { PageData } from './$types';
	// export let data
	let medicationId = ''
	let medication = undefined
	// $: ({medication} = data)
	$: {
		medicationId = $page.url.searchParams.get('id')
		medication = docStore(`medications/${medicationId}`)
		console.log({medicationId},medication)
		// ({medication} = data)
		// console.log({ medication })

	}
</script>


<h1>Medication</h1>

{#if medicationId === 'add'}
<p>Let's add a med</p>
{/if}
Describe medication here.

