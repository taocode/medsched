<script>
export let recipients = []
</script>

{#each recipients as r}
<a href={`/recipient/${r.id}`}>{r.displayName}</a>
{/each}

