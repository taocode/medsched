<script>
import * as Pancake from '@sveltejs/pancake'

export let medications
export let timeLog

$: points = timeLog.reduce(L => {
	x: L.dispensed?
},[])
</script>

