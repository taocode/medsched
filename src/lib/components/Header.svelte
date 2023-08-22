<script>
	import { page } from '$app/stores';
	import SignInOut from '$lib/components/SignInOut.svelte';
	// export let auth
</script>

<header>
	<div class="flex-grow"></div>
	<div class="corner">
		<SignInOut />
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		width: auto;
		/* height: 3em; */
	}

</style>
