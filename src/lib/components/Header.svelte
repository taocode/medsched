<script>
	import { page } from '$app/stores'
	import HomeLink from './HomeLink.svelte'
	import UserMenu from './UserMenu.svelte'
	import SignInOut from '$lib/components/SignInOut.svelte'
	// export let auth
</script>

<header>
	<div class="contents">
		<div class="corner home">
			<HomeLink />
		</div>
		<div class="flex-grow" />
		<div class="corner user">
			<UserMenu />
		</div>
	</div>
</header>

<style>
	header {
		background-color: var(--color-theme-1);
	}
	.contents {
		display: flex;
		justify-content: space-around;
		align-items: center;
		color: white;
		padding: 0.5em 0.2em;
		max-width: 40ch;
		margin: 0 auto;
	}
	.corner {
		width: auto;
		/* height: 3em; */
	}
</style>
