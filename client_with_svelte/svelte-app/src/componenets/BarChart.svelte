<script>
	import { scaleLinear } from 'd3-scale';

	export let data = [];

	const padding = { top: 20, right: 15, bottom: 20, left: 25 };
	let width = 500;
	let height = 200;

	$: points = data.reduce((acc, spending) => {
		if (spending.type && typeof spending.count === 'number') {
			const existing = acc.find(point => point.type === spending.type);
			if (existing) {
				existing.amount += spending.count;
			} else {
				acc.push({ type: spending.type, amount: spending.count });
			}
		}
		return acc;
	}, []);

	$: xTicks = points.map((point, i) => point.type);
	$: yMax = Math.max(...points.map(point => point.amount || 0), 0);
	$: yTicks = Array.from({ length: 5 }, (_, i) => (yMax / 5) * i);

	$: xScale = scaleLinear()
		.domain([0, xTicks.length])
		.range([padding.left, width - padding.right]);

	$: yScale = scaleLinear()
		.domain([0, yMax])
		.range([height - padding.bottom, padding.top]);

	$: innerWidth = width - (padding.left + padding.right);
	$: barWidth = innerWidth / xTicks.length;
</script>

<h2> Filtred Spendings by Type and COUNT</h2>

<div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
	<svg>
		<!-- y axis -->
		<g class="axis y-axis">
			{#each yTicks as tick}
				<g class="tick tick-{tick}" transform="translate(0, {yScale(tick)})">
					<line x2="100%" />
					<text y="-4">{tick} {tick === yMax ? ' units' : ''}</text>
				</g>
			{/each}
		</g>

		<!-- x axis -->
		<g class="axis x-axis">
			{#each points as point, i}
				<g class="tick" transform="translate({xScale(i)},{height})">
					<text x={barWidth / 2} y="-4">{point.type}</text>
				</g>
			{/each}
		</g>

		<g class="bars">
			{#if points.length > 0}
				{#each points as point, i}
					<rect
						x={xScale(i) + 2}
						y={yScale(point.amount)}
						width={barWidth - 4}
						height={yScale(0) - yScale(point.amount)}
					/>
				{/each}
			{/if}
		</g>
	</svg>
</div>

<style>
	h2 {
		text-align: center;
	}

	.chart {
		width: 100%;
		max-width: 500px;
		margin: 0 auto;
	}

	svg {
		position: relative;
		width: 100%;
		height: 200px;
	}

	.tick {
		font-family: Helvetica, Arial;
		font-size: 0.725em;
		font-weight: 200;
	}

	.tick line {
		stroke: #e2e2e2;
		stroke-dasharray: 2;
	}

	.tick text {
		fill: #ccc;
		text-anchor: start;
	}

	.x-axis .tick text {
		text-anchor: middle;
	}

	.bars rect {
		fill: #a11;
		stroke: none;
		opacity: 0.65;
	}
</style>
