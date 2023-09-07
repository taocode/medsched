<script lang="ts">
	import { FirebaseUiAuth, saveUserData } from 'sveltefirets'
</script>

<FirebaseUiAuth
	languageCode={'en'}
	signInWith={{ google: true }}
	on:authresult={e => saveUserData(e.detail)} />
