<script>
	import { page } from '$app/stores'
	import HomeLink from './HomeLink.svelte'
	import UserMenu from './UserMenu.svelte'
	import SignInOut from '$lib/components/SignInOut.svelte'
	// export let auth
</script>

<header>
	<div class="corner">
		<HomeLink />
	</div>
	<div class="flex-grow"></div>
	<div class="corner">
		<UserMenu />
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: var(--color-theme-1);
		color: white;
		padding: 0.2em;
	}

	.corner {
		width: auto;
		/* height: 3em; */
	}

</style>
