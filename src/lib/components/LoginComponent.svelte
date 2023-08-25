<script lang="ts">
  import { FirebaseUiAuth, saveUserData } from 'sveltefirets'
</script>

<FirebaseUiAuth
  signInWith={{ google: true }}
  on:authresult={(e) => saveUserData(e.detail)} />