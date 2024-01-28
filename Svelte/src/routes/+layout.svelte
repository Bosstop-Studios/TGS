<script>
	import "$lib/css/style.css";
	import NavBar from "$lib/components/NavBar.svelte";
</script>


<main>
	<NavBar />
	<slot></slot>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}
</style>