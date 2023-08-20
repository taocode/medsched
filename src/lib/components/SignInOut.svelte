<script>
  import { SignedIn, SignedOut, Doc, Collection } from 'sveltefire'
  import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
	const provider = new GoogleAuthProvider()
</script>

<div class="signinout">
	<SignedIn let:user let:signOut>
		<img src={user.photoURL} alt={user.displayName}> <button title="Sign Out" class="signout" on:click={signOut}> <div class="i-fe-logout"></div></button>
	</SignedIn>
	
	<SignedOut let:auth>
			<button on:click={() => signInWithPopup(auth,provider)}><div class="i-fe-login"></div></button>
	</SignedOut>
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