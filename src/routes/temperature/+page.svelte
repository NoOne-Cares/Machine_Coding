<script lang="ts">
	class Temperature {
		#c = $state(0);
		#f = $state(0);

		get c() {
			return this.#c;
		}
		get f() {
			return this.#f;
		}
		set f(f) {
			this.#f = f;
			this.#c = (f - 32) * (5 / 9);
		}
		set c(c) {
			this.#c = c;
			this.#f = c * (9 / 5) + 32;
		}
	}
	const temperature = new Temperature();
</script>

<div>
	<input type="number" bind:value={temperature.c} />Celsius: {temperature.c} =
	<input type="number" bind:value={temperature.f} /> Fahrenheit:{temperature.f}
</div>
