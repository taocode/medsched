<script>
  import * as Pancake from '@sveltejs/pancake'

  import {
    formatTimestampShortDate,
		formatTimestampMedDate,
    formatTimestampLong,
		formatTimestampHourFraction,
	} from '$lib'
  
  export let log
  export let colors
  export let medications
  
  // console.log({log})
  const dispensePoints = log.map((L,i)=>{
    // console.log(c.length,{a})
    return L.map((LE,n)=> {
      const medicationIndex = LE.medicationIndex
      return { 
        medicationIndex,
        summary: `${medications[medicationIndex].displayName} on ${formatTimestampMedDate(LE.dispensed)} at ${formatTimestampLong(LE.dispensed)}`,
        x: i+0.5,
        y: formatTimestampHourFraction(LE.dispensed)}
    })
  })
  const dispenseLines = log.reduce((a,L,i)=>{
    // console.log('dls',{L})
    const doseCounter = {}
    L.forEach(C=>{
      const m = `${C.medicationIndex}`
      const k = `${i},${m}`
      if (isNaN(doseCounter[k])) doseCounter[k] = 0
      doseCounter[k] += 1
      const mc = `${m},${doseCounter[k]}`
      if (!Array.isArray(a[mc])) a[mc] = []
      a[mc].push({
        x: i+0.5,
        y: formatTimestampHourFraction(C.dispensed)
      })
    })
    return a
  },{})
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
<div class="chart bg-surface-200 dark:bg-surface-900">
  <Pancake.Chart x1={0} x2={dispensePoints.length+0.3} y1={25} y2={7}>
    <Pancake.Box x2={dispensePoints.length} y1={7} y2={25}>
      <div class="axes"></div>
    </Pancake.Box>

    <div class="gridx">
      <Pancake.Grid vertical count={dispensePoints.length} let:value>
        <span class="x gridline"></span>
        <span class="x label">{#if log[value] && log[value][0]}{formatTimestampShortDate(log[value][0].dispensed)}{/if}</span>
      </Pancake.Grid>
    </div>

    <Pancake.Grid horizontal count={9} let:value>
      <span class="y gridline"></span>
      <span class="y label">{formatHour(value)}<span class="ampm">{ampm(value)}</span></span>
    </Pancake.Grid>

    <Pancake.Svg>
      {#each Object.keys(dispenseLines) as DL}
      <Pancake.SvgLine data={dispenseLines[DL]} let:d
      >
        <path class="data" {d} 
        style="--c: {colors[DL.split(',')[0]]};
        --offset: {DL.split(',')[0]*0.15}ch;
        "/>
      </Pancake.SvgLine>
      {/each}
      {#each dispensePoints as L,i}
        {#each L as P}
        <Pancake.SvgPoint x={P.x} y={P.y} let:d
        >
        <path class="data point med_{P.medicationIndex}"
          {d} 
          title="{P.summary}"
          style="--c: {colors[P.medicationIndex]}; 
          --offset: {P.medicationIndex*0.15}ch;
          "
           />
        </Pancake.SvgPoint>
        {/each}
      {/each}
    </Pancake.Svg>
  </Pancake.Chart>
</div>

<style>
  .chart {
    height: max(40vh, 270px);
    padding: 2em 2em 2em 3em;
    position: relative;
    --c-grid: 0 0 0;
    --c-shadow: 255 255 255;
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
    left: -2.5em;
    width: 2em;
    text-align: right;
    bottom: -0.5em;
    /* background: var(--color-surface-400,red) / 255; */
  }

  .x.label {
    position: absolute;
    width: 4em;
    left: 0.5ch;
    bottom: -22px;
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
    margin-right: 3ch;
    margin-left: -3ch;
  }
  :global(.gridx div div:first-of-type .x.gridline) {
    border-left: none;
  }
@media (max-width: 500px) {
  :global(.gridx .x.label) {
    display: none;
  }
  :global(.gridx div div:nth-child(3n+1) .x.label) {
    display: inline-block;
    margin-left: -1em;
  }
}
@media (min-width: 501px) and (max-width: 900px) {
  :global(.gridx .x.label) {
    display: none;
    
  }
  :global(.gridx div div:nth-child(2n+1) .x.label) {
    display: inline-block;
    margin-left: -1em;
  }
}
  path.data {
    stroke: var(--c,red);
    stroke-dasharray: 6,6,1,6;
    stroke-linecap: round;
    fill: none;
    stroke-width: 0.2rem;
    transform: translateX(var(--offset,2px));
    filter: drop-shadow(0 0 0.1px rgb(var(--c-shadow) / 0.9)) 
    drop-shadow(0 0 0.2px rgb(var(--c-shadow) / 0.5))
    drop-shadow(0 0 0.5px rgb(var(--c-shadow) / 0.2));
  }
  path.data.point {
    stroke-width: 1.6ch;
  }
  </style>