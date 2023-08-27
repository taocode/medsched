<script lang="ts">
	import Recipient from "$lib/components/Recipient.svelte"
	// import type { PageData } from './$types';
  export let data
	let recipient = {id:0}
	// $: ({recipient} = data)
	$: {
		recipient = data.recipient
		console.log({recipient})
	}
</script>

<Recipient {recipient} />