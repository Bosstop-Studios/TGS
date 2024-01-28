<script lang="ts">
    import { onMount } from "svelte";
    import SideBar from "$lib/components/shop/SideBar.svelte";
    import GrassShop from "$lib/components/shop/GrassShop.svelte";

    import { user, grass, game, settings } from "$lib/js/stores";

    onMount(async() => {
        // @ts-ignore
        let gameData = window.game.get();
        user.update((value) => { value = gameData.user; return value; });
        grass.update((value) => { value = gameData.grass; return value; });
        game.update((value) => { value = gameData.game; return value; });
        settings.update((value) => { value = gameData.settings; return value; });

        console.log($user);
    });

</script>

<div class="content">
    <div class="sidebar" style="">
        <SideBar />
    </div>
    <div class="stuff" style="">
        <GrassShop />
    </div>
</div>

<style>
    .content {
        position: fixed;
        height: 100%;
        width: 100%;
        margin-top: 30px;
        display: flex !important;
    }

    .content .sidebar {
        width: 15%;
    }

    .content .stuff  {
        flex: 1 !important;
        padding: 25px;
        overflow: auto;
    }
</style>