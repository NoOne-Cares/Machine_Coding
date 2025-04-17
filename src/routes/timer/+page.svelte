<script lang="ts">
	let elapsed = $state(0);
	let duration = $state(0);
	let interval: number;
	function start() {
		interval = setInterval(() => {
			if (elapsed > duration) {
				elapsed = duration;
				clearInterval(interval);
			} else {
				elapsed += 0.1;
			}
		}, 100);
	}
	$effect(() => {
		if (!duration) return;
		start();
		return () => {
			clearInterval(interval);
		};
	});
	function reset() {
		elapsed = 0;
		start();
	}
</script>

<div>
	<div>
		<label>
			<span>Elapsed time</span>
			<progress max={duration} value={elapsed}></progress>
		</label>
		<div>
			{elapsed.toFixed(1)}s
		</div>
		<label>
			<span>Duration</span>
			<input type="range" bind:value={duration} min="1" max="10" />
		</label>
	</div>
	<button onsubmit={reset}>Reset</button>
</div>
