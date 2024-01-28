<script lang="ts">
    import { onMount } from "svelte";
    import { grass, user, game, settings } from "$lib/js/stores";

    import Stats from "$lib/components/Stats.svelte";
    import Audio from "$lib/components/util/Audio.svelte";
    import Alert from "$lib/components/util/Alert.svelte";
    import Menu from "$lib/components/Menu.svelte";

    let grassElement: any;
    let handElement: any;
    let audioElement: Audio;
    let AlertElement: Alert;
    let menu: Menu;

    onMount(() => {
        // @ts-ignore
        let gameData = window.game.get();
        user.update((value) => { value = gameData.user; return value; });
        grass.update((value) => { value = gameData.grass; return value; });
        game.update((value) => { value = gameData.game; return value; });
        settings.update((value) => { value = gameData.settings; return value; });

        handElement.style.backgroundImage = `url('./hands/hand${$settings.hand}.jpeg')`;
        grass.subscribe(() => {
            let maxhealth = $grass.level * 10;
            let healthleft = $grass.health / maxhealth;
            if(healthleft <= 0) {
                grassElement.style.backgroundImage  = "url('./grass/dirt.jpeg')";
            } else if(healthleft <= 0.2) { 
                grassElement.style.backgroundImage  = "url('./grass/grass5.jpeg')";
            } else if(healthleft <= 0.4) { 
                grassElement.style.backgroundImage  = "url('./grass/grass4.jpeg')"
            } else if(healthleft <= 0.6) { 
                grassElement.style.backgroundImage  = "url('./grass/grass3.jpeg')"
            } else if(healthleft <= 0.8) { 
                grassElement.style.backgroundImage  = "url('./grass/grass2.jpeg')"
            } else {
                grassElement.style.backgroundImage  = "url('./grass/grass1.jpeg')"
            }
        });
        audioElement.play();

        // @ts-ignore
        // window.electron.rpcOpen($grass.level);
    });

    function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function click() {
        if($grass.health <= 0) return AlertElement.showAlert("error", "Grass is dead!");
        handElement.classList.add('handanimated');
        user.update((value) => { value.coins += $grass.level; value.sc += 2; return value; });
        grass.update((value) => {value.health--; return value; });
        await delay(500);
        handElement.classList.remove('handanimated');
    }

    function revive() {
        if($grass.health > 0) return AlertElement.showAlert("error", "Grass is not dead yet!");
        let finalCost = ($grass.level * 25) - ($grass.level * 10);
        if($user.coins < finalCost) return AlertElement.showAlert("error", "You don't have enough coins!");
        user.update((value) => { value.coins -= finalCost; return value; });
        grass.update((value) => { value.health = value.level * 10; return value; });
    }

    setInterval(() => { 
        game.update((value) => { value.playTime++; return value; });
    }, 60000); // 60000
</script>

<svelte:head>
    <!--PRELOADS-->
    <link rel="preload" as="image" type="image/jpeg" href="./grass/dirt.jpeg">
    <link rel="preload" as="image" type="image/jpeg" href="./grass/grass5.jpeg">
    <link rel="preload" as="image" type="image/jpeg" href="./grass/grass4.jpeg">
    <link rel="preload" as="image" type="image/jpeg" href="./grass/grass3.jpeg">
    <link rel="preload" as="image" type="image/jpeg" href="./grass/grass2.jpeg">
    <link rel="preload" as="image" type="image/jpeg" href="./grass/grass1.jpeg">
</svelte:head>

<div>
    <Audio bind:this={audioElement} />
    <Stats />
    <Alert bind:this={AlertElement} />
    <div>
        <button on:click={menu.show} style="left:10px; top:55px; position:absolute; font-size:20px; z-index: 2;" id="menu-btn" type="button" class="btn bg-dark">Menu&nbsp;&#9776;</button>
        <button on:click={revive} style="left:10px; top:105px; position:absolute; font-size:20px; z-index: 2;" id="revive-btn" type="button" class="btn bg-dark">Revive</button>
    </div>
    <div bind:this={grassElement} class="grass">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div on:click={click} bind:this={handElement} class="hand"></div>
    </div>
    <Menu bind:this={menu}>
        <div class="row">
            <div class="col">
                <h3>Grass</h3>
                <p>Level: {$grass.level}</p>
                <p>Health: {$grass.health}</p>
            </div>
            <div class="col">
                <h3>User</h3>
                <p>Coins: {$user.coins}</p>
                <p>SC: {$user.sc}</p>
            </div>
            <div class="col">
                <h3>Game</h3>
                <p>Play Time: {$game.playTime}</p>
            </div>
            <div class="col">
                <h3>Settings</h3>
                <p>Hand: {$settings.hand}</p>
            </div>
        </div>
    </Menu>
</div>

<style>
    .grass {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100vh;
        background-size: cover;
        background-repeat: no-repeat;
    }

    .hand {
        background-repeat: no-repeat;
        background-size: cover;
        width: 450px;
        height: 500px;
        position: absolute;
        left: 35%;
        bottom: -28px;
        z-index: 1 !important;
        border: 0px black solid !important;
        -webkit-user-drag: none;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
    }
</style>