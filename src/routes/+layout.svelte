<script>
	import { firebaseConfig } from '$lib/firebase'
	import { initializeApp } from 'firebase/app'
	import { getFirestore } from 'firebase/firestore'
	import { getAuth } from 'firebase/auth'
	import { getStorage } from 'firebase/storage'

	import Header from '../lib/components/Header.svelte'
	import { FirebaseApp } from 'sveltefire'
	import { getApp, setApp } from '$lib/firebase'
	import './styles.css'
	
	import 'uno.css'

  import { SignedIn, SignedOut } from 'sveltefire'
  import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
	const provider = new GoogleAuthProvider()
	
	// Initialize Firebase
	// console.log()
	if (getApp() === undefined) {
		// app 
		setApp( initializeApp(firebaseConfig) )
		console.log('getapp init')
	} else {
		console.log('getApp exists')
	}

	const firestore = getFirestore(getApp())
	const auth = getAuth(getApp())
	const storage = getStorage(getApp())
	// console.log({auth})
</script>


<FirebaseApp {auth} {firestore} {storage}>
<div class="app">
	<Header />
	
		<SignedOut let:auth>
			<div class="mustlogin">
				<h2>Login Required</h2>
				<p></p>
				<button on:click={() => signInWithPopup(auth,provider)}><div class="i-fe-login"></div> Login</button>
			</div>
``	</SignedOut>


<SignedIn let:user let:signOut>
	<main>
		<slot />
	</main>
</SignedIn>
		
		<footer>
			<p>A work in progress...</p>
		</footer>
	</div>
</FirebaseApp>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
	.mustlogin {
		text-align: center;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
