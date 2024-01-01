<script>
	import { page } from '$app/stores'
</script>

<h1>{$page.status}: {$page.error?.message}</h1>

<p class="uppercase text-2xl text-center my-12"><a href="/">home</a></p>
