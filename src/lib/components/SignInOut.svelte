<script>
	import { page } from '$app/stores'
	import { authState, logOut } from 'sveltefirets'
	import { user as userStore } from '$lib/user'
	$: authNotInited = $authState === undefined
	$: userDataFromCookie = $page.data?.user
	$: user = $userStore || (authNotInited && userDataFromCookie) || null
	// only use page data set from the cookie before authState has been inited so that when a user logs out, the user value here doesn't fall back to the page data  value initially set by the cookie. Even though the cookie is cleared on logout, the page data is not updated.
</script>

<div class="signinout">
	{#if user}
		<img src={user.photoURL} alt={user.displayName} />
		<button title="Sign Out" class="signout" on:click={logOut}>
			<div class="i-fe-logout" />
		</button>
	{/if}
</div>

<style lang="postcss">
	.signinout {
		max-width: 6em;
		height: 2em;
		display: flex;
		gap: 0.5em;
	}
	img {
		border-radius: 100%;
	}
</style>
