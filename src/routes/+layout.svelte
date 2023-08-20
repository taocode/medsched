<script>
	import Header from '../lib/components/Header.svelte';
	import './styles.css';
	
	import { FirebaseApp } from 'sveltefire';
	import { initializeApp } from 'firebase/app';
	import { getFirestore } from 'firebase/firestore';
	import { getAuth } from 'firebase/auth';
	import SignInOut from '$lib/components/SignInOut.svelte';
	import { getStorage } from 'firebase/storage';

	import 'uno.css'
	
	// Initialize Firebase
	const app = initializeApp({
		apiKey: "AIzaSyC5iP7AMx4IHIv6CcG9nUMdbScwrSM7Qpc",
		authDomain: "medtimelog.firebaseapp.com",
		projectId: "medtimelog",
		storageBucket: "medtimelog.appspot.com",
		messagingSenderId: "331132141308",
		appId: "1:331132141308:web:b29777869ff763fd682179"
	});
	const firestore = getFirestore(app);
	const auth = getAuth(app);
	const storage = getStorage(app)
	// console.log({auth})
</script>


<FirebaseApp {auth} {firestore} {storage}>
<div class="app">
	<Header />
	
		<main>
			<slot />
		</main>
		
		<footer>
			<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
		</footer>
	</div>
</FirebaseApp>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
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
