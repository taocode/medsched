<script>
	import * as Pancake from '@sveltejs/pancake'

	import {
		formatTimestampShortDate,
		formatTimestampMedDate,
		formatTimestampLong,
		formatTimestampHourFraction,
	} from '$lib'

	import { readableColor } from 'color2k'

	export let log
	export let colors
	export let medications

	$: minHour = log.reduce((a, LD) => {
		const Dm = LD.reduce((m, LE) => {
			const cH = LE.dispensed.toDate().getHours()
			return cH < m ? cH : m
		}, a)
		return Dm < a ? Dm : a
	}, 25)
	$: maxHour = log.reduce((a, LD) => {
		const Dm = LD.reduce((m, LE) => {
			const cH = LE.dispensed.toDate().getHours()
			return cH > m ? cH : m
		}, a)
		return Dm > a ? Dm : a
	}, 0)
	$: lastHour = maxHour + 2.5
	$: firstHour = minHour - 1.5
	$: hoursDiff = maxHour - minHour
	// $: console.log({minHour})

	// console.log({log})
	$: dispensePoints = log.map((L, i) => {
		// console.log(c.length,{a})
		return L.map((LE, n) => {
			const medicationIndex = LE.medicationIndex
			return {
				medicationIndex,
				summary: `${
					medications[medicationIndex].displayName
				} on ${formatTimestampMedDate(
					LE.dispensed
				)} at ${formatTimestampLong(LE.dispensed)}`,
				x: i + 0.5,
				y: formatTimestampHourFraction(LE.dispensed),
			}
		})
	})
	$: dispenseLines = log.reduce((a, L, i) => {
		// console.log('dls',{L})
		const doseCounter = {}
		L.forEach(C => {
			const m = `${C.medicationIndex}`
			const k = `${i},${m}`
			if (isNaN(doseCounter[k])) doseCounter[k] = 0
			doseCounter[k] += 1
			const mc = `${m},${doseCounter[k]}`
			if (!Array.isArray(a[mc])) a[mc] = []
			a[mc].push({
				x: i + 0.5,
				y: formatTimestampHourFraction(C.dispensed),
			})
		})
		return a
	}, {})
	// console.log({colors,medications,dispensePoints})
	function formatHour(hour) {
		return hour === 12 || hour === 24 ? 12 : hour % 12
		// {#if value  23}12a{:else if value === 12}12p{:else if value < 12}{value}a{:else}{value % 12}p{/if}
	}
	function ampm(hour) {
		return hour === 24 || hour < 12 ? 'a' : 'p'
	}
</script>

<h3>{dispensePoints.length} Day Chart</h3>
<div class="chart-wrap">
	<div
		class="chart bg-surface-200 dark:bg-surface-900"
		style="--h: {hoursDiff * 1.25}em;">
		<Pancake.Chart
			x1={0}
			x2={dispensePoints.length + 0.3}
			y1={lastHour}
			y2={firstHour}>
			<Pancake.Box
				x2={dispensePoints.length}
				y1={firstHour}
				y2={lastHour}>
				<div class="axes"></div>
			</Pancake.Box>

			<div class="gridx">
				<Pancake.Grid vertical count={dispensePoints.length} let:value>
					<span class="x gridline"></span>
					<span class="x label"
						>{#if log[value] && log[value][0]}{formatTimestampShortDate(
								log[value][0].dispensed
							)}{/if}</span>
				</Pancake.Grid>
			</div>

			<Pancake.Grid horizontal count={8} let:value>
				<span class="y gridline"></span>
				<span class="y label"
					>{formatHour(value)}<span class="ampm">{ampm(value)}</span
					></span>
			</Pancake.Grid>

			<Pancake.Svg>
				{#each Object.keys(dispenseLines) as DL}
					<Pancake.SvgLine data={dispenseLines[DL]} let:d>
						<path
							class="data"
							{d}
							style="--c: {colors[DL.split(',')[0]]};
							--c-shadow: {readableColor(colors[DL.split(',')[0]])}5;
          --offset: {DL.split(',')[0] * 0.15}ch;
          " />
					</Pancake.SvgLine>
				{/each}
				{#each dispensePoints as L, i}
					{#each L as P}
						<Pancake.SvgPoint x={P.x} y={P.y} let:d>
							<path
								class="data point med_{P.medicationIndex}"
								{d}
								title={P.summary}
								style="--c: {colors[P.medicationIndex]};
								--c-shadow: {readableColor(colors[P.medicationIndex])}5;
            --offset: {P.medicationIndex * 0.15}ch;
            " />
						</Pancake.SvgPoint>
					{/each}
				{/each}
			</Pancake.Svg>
		</Pancake.Chart>
	</div>
</div>

<style lang="postcss">
	.chart {
		height: var(--h);
		min-width: 620px;
		overflow: hidden;
		padding: 0.5em 0.5em 2.25em 2em;
		position: relative;
		--c-grid: 0 0 0;
		--c-shadow: 255 255 255;
	}
	.chart-wrap {
		@apply overflow-auto;
	}
	:global(.dark .chart) {
		--c-grid: 255 255 255;
		--c-shadow: 0 0 0;
	}
	.axes {
		width: 100%;
		height: 100%;
		border-left: 1px solid rgb(var(--c-grid));
		border-bottom: 1px solid rgb(var(--c-grid));
	}

	.y.label {
		position: absolute;
		left: -3.5ch;
		width: 3ch;
		text-align: right;
		bottom: -0.5em;
		/* background: var(--color-surface-400,red) / 255; */
	}

	.x.label {
		position: absolute;
		width: 4em;
		left: -0.2em;
		bottom: -1.7em;
		font-family: sans-serif;
		text-align: center;
	}
	.ampm {
		font-size: 0.75em;
	}
	.y.gridline {
		display: block;
		border-top: 2px dashed #7774;
	}

	.x.gridline {
		display: block;
		border-left: 2px dashed #7774;
		height: 100%;
		margin-right: -3.3ch;
		margin-left: 3.3ch;
	}
	:global(.pancake-grid-item:last-of-type .x.gridline) {
		display: none;
	}
	@media (max-width: 786px) {
		:global(.gridx .x.label) {
			display: none;
		}
		:global(.gridx div div:nth-child(odd) .x.label) {
			display: inline-block;
		}
	}
	path.data {
		stroke: var(--c, red);
		stroke-opacity: 0.5;
		mix-blend-mode: multiply;
		stroke-dasharray: 7, 5, 2, 5;
		stroke-linecap: round;
		fill: none;
		stroke-width: 0.125rem;
		transform: translateX(var(--offset, 2px));
		/* filter: drop-shadow(0 0 0.01px var(--c-shadow)); */
		/* drop-shadow(0 0 0.1px var(--c-shadow)); */
		/* drop-shadow(0 0 0.5px var(--c-shadow)); */
	}
	:global(.dark path.data) {
		mix-blend-mode: screen;
	}
	path.data.point {
		stroke-width: 0.6rem;
		stroke-opacity: 1;
		mix-blend-mode: normal;
		filter: 
			drop-shadow(0 0 0.3px var(--c-shadow))
			drop-shadow(0 1px 0.3px var(--c-shadow))
			drop-shadow(0 -1px 0.3px var(--c-shadow));
	}
</style>
