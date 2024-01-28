<script lang="ts">
    import { goto } from "$app/navigation";

    import { user, grass, game, settings } from "../../js/stores";

    function gotoGame() {
        // @ts-ignore
        window.game.save($user, $grass, $game, $settings);
        goto("./game.html", { replaceState: true });
    }

</script>

<div class="sidebar">
    <ul>
        <li>
            <b>Grass</b>
        </li>
        <li>
            <b>Services</b>
        </li>
        <li>
            <b>Cosmetics</b>
        </li>
        <li>
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <b on:click={gotoGame}>Back to Game</b>
        </li>
    </ul>
</div>

<style>
    .sidebar {
        background-color: #27a096;
        z-index: 1;
        top: 0;
        left: 0;
        overflow-x: hidden;
        padding-top: 20px;
        color: #000000;
        height: 100%;
    }

    .sidebar ul {
        list-style-type: none;
        margin-top: 50px !important;
        margin: 0;
        padding: 0;
    }

    .sidebar li b {
        display: block;
        color: #000;
        padding: 8px 16px;
        text-decoration: none;
        text-align: center;
        font-size: 18px;
    }

    .sidebar li b:hover {
        background-color: #555;
        color: white;
    }
</style>