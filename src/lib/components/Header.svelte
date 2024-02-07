<script>
	import { page } from '$app/stores'
	import HomeLink from './HomeLink.svelte'
	import UserMenu from './UserMenu.svelte'
	import SignInOut from '$lib/components/SignInOut.svelte'
	// export let auth

	import { LightSwitch, autoModeWatcher } from '@skeletonlabs/skeleton'
</script>
<svelte:head>{@html '<script>(' + autoModeWatcher.toString() + ')();</script>'}</svelte:head>

<header>
	<div class="contents">
		<div class="corner home">
			<HomeLink />
		</div>
		<div class="flex-grow" />
		<div class="light-switch">
			<LightSwitch />
		</div>
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
	.light-switch {
		@apply mr-2 scale-[80%] mix-blend-overlay opacity-90;
	}
</style>
