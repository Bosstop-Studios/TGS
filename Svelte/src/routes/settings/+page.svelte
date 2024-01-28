<script lang="ts">
    // @ts-nocheck
    import { onMount } from "svelte";
    import { user, grass, game, settings } from "$lib/js/stores";

    let volumeControl: HTMLProgressElement;
    let selectControl: HTMLSelectElement;

    let version = "0.0.0";
    let playTimeHours = 0;
    let playTimeMinutes = 0;

    onMount(async() => {
        version = window.game.getVersion();

        // @ts-ignore
        let gameData = window.game.get();
        user.update((value) => { value = gameData.user; return value; });
        grass.update((value) => { value = gameData.grass; return value; });
        game.update((value) => { value = gameData.game; return value; });
        settings.update((value) => { value = gameData.settings; return value; });

        playTimeHours = Math.floor($game.playTime / 60);
        playTimeMinutes = $game.playTime % 60;
    });

    function changeVolume(event) {
        settings.update((value) => { value.volume = volumeControl.value / 100; return value; });
    }

    function changeHandColor(event) {
        settings.update((value) => { value.hand = selectControl.value; return value; });
    }

</script>


<div class="container">
    <div class="row">
        <div class="col">
            <img src="https://sirblob.bosstop.tech/_app/immutable/assets/logo.e7952277.png" alt="logo" class="logo">
        </div>
    </div>
    <section>
        <h2 class="subtitle">Info</h2>
        <div style="margin-top:10px; margin-bottom:20px;" id="info-box">
            <p>
                Version: <span id="info-version" style="color:rgb(57, 255, 90)">{version}</span><br>
            </p>
            <p>
                PlayTime: <span id="info-playtime-min" style="color:rgb(57, 255, 90)">{`${playTimeHours}h ${playTimeMinutes}m`}</span><br>
            </p>
        </div>
    </section>
    <section>
        <h2 class="subtitle">Game</h2>
        <p>Hand Color</p>
        <div style="margin-top:10px; margin-bottom:20px;">
            <select bind:this={selectControl} on:change={changeHandColor}>
                <option value="1">White</option>
                <option value="2">Indian</option>
                <option value="3">Black</option>
                <option value="4">Dark Skinned</option>
                <option value="5">Blue</option>
                <option value="6">Orange</option>
                <option value="7">Blob</option>
            </select>
        </div>
        <p>Volume</p>
        <div>
            <p id="current-volume" style="float: left;">0</p>
            <p style="float: right;">100</p>
            <input bind:this={volumeControl} type="range" on:change={changeVolume} min="0" max="100" value={$settings.volume*100} />
        </div>
    </section>
    <section>
        <h2 class="subtitle">Credits</h2>
        <p>Manager: <b>Zach</b></p>
        <p>Developer: <b>Sir Blob</b></p>
        <p>Music Producer: <b>ZipIsLive</b></p>
    </section>
</div>