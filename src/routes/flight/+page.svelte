<script lang="ts">
	const getDate = () => {
		const date = new Date();
		const [month, day, year] = date
			.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
			.split('/');
		return `${year}-${month}-${day}`;
	};

	type Options = 'one-way' | 'return';

	let selected = $state<Options>('one-way');
	let startDate = $state(getDate());
	let returnDate = $state(getDate());

	const handleSubmit = (e: Event) => {
		e.preventDefault();
		alert(`You  have booked a ${selected} flight on ${startDate}`);
	};
</script>

<form onsubmit={handleSubmit}>
	<select bind:value={selected}>
		<option value="one-way">one-way</option>
		<option value="return">return</option>
	</select>
	<label>
		<span>Select a start date</span>
		<input type="date" bind:value={startDate} />
	</label>
	<label>
		<span>Select a return date</span>
		<input type="date" disabled={selected !== 'return'} bind:value={returnDate} />
	</label>
	<button type="submit" disabled={!startDate || (selected === 'return' && startDate < returnDate)}>
		Book</button
	>
</form>
