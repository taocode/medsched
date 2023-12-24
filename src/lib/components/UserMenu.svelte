<script>
	import { page } from '$app/stores'
	import { authState, logOut } from 'sveltefirets'
	import { user as userStore } from '$lib/user'
	import { LightSwitch } from '@skeletonlabs/skeleton'
	$: authNotInited = $authState === undefined
	$: userDataFromCookie = $page.data?.user
	$: user = $userStore || (authNotInited && userDataFromCookie) || null
	// only use page data set from the cookie before authState has been inited so that when a user logs out, the user value here doesn't fall back to the page data  value initially set by the cookie. Even though the cookie is cleared on logout, the page data is not updated.
	let show = false
</script>

<div class="usermenu">
	{#if user}
		<button on:click={() => (show = !show)}>
			<img src={user.photoURL} alt={user.displayName} />
		</button>
		{#if show}
			<div class="light-switch bg-gray-300 dark:bg-gray-600">
				<LightSwitch />
			</div>
			<button title="Sign Out" class="signout" on:click={logOut}>
				<div class="i-fe-logout" />
			</button>
		{/if}
	{/if}
</div>

<style lang="postcss">
	.usermenu {
		max-width: 6em;
		height: 2em;
		display: flex;
		gap: 0.5em;
	}
	img {
		border-radius: 100%;
		max-height: 100%;
	}
	button {
		background-color: transparent;
	}
	.light-switch {
		@apply rounded-full h-6 self-center;
	}
</style>
