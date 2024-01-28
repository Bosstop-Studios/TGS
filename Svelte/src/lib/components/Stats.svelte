<script lang="ts">
    import { user, grass } from "$lib/js/stores";
    import { onMount } from "svelte";

    let healthBar: HTMLProgressElement;

    onMount(() => {
        grass.subscribe(() => {
            let healthPrecent = ($grass.health / ($grass.level * 10)) * 100;
            healthBar.classList.forEach((value) => { healthBar.classList.remove(value); });
            if(healthPrecent <= 25) return healthBar.classList.add("progress-red");
            if(healthPrecent < 50) return healthBar.classList.add("progress-orange");
            if(healthPrecent >= 50) return healthBar.classList.add("progress-green");
        });
    });
</script>

<div class="panel">
    <div>
        <span>User: </span>
        <span>{$user.username}</span>
    </div>
    <div>
        <span>Level: </span>
        <span>{$grass.level}</span>
    </div>
    <div>
        <span>Coins: </span>
        <span>{$user.coins}</span>
    </div>
    <div>
        <span>Social Credit: </span>
        <span>{$user.sc}</span>
    </div>
    <progress bind:this={healthBar} value={$grass.health} max={$grass.level * 10}></progress>
</div>

<style>
    .panel {
        background-color: var(--bg-color-dark);
        border-radius: 5px;
        padding: 20px !important;
        top: 60px; 
        position: absolute; 
        right: 25px;
        border-radius: 7.5px;
        z-index: 3;
    }

    .panel span, div {
        margin: 0px;
        margin-top: 5px;
        margin-bottom: 5px;
    }
</style>