<script>
export let displayName
export let fullName
export const schedule = []
</script>

<div class="edit-recipient-medication">
<form>
	<input name="medDisplayName" bind:value={displayName}>
	<input name="medFullName" bind:value={fullName}>
	
</form>

</div>

<style>

</style>