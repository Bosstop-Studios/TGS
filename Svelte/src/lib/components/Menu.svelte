<script lang="ts">
    import { goto } from "$app/navigation";
    import Model from "./util/Model.svelte";

    let menuModel: Model;

    function click() {
        console.log("click");
    }

    export const show = () => {
        menuModel.show();
    }

    function gotoProfile() {
        // goto("/game/profile");
    }

    function gotoShop() {
        goto("./shop.html", { replaceState: true });
    }

    function gotoAchievements() {
        // goto("/game/achievements");
    }

    function gotoSettings() {
        goto("./settings.html", { replaceState: true });
    }

</script>


<Model bind:this={menuModel}>
    <div class="row">
        <div class="col">
            <button class="btn bg-primary" on:click={click}>PROFILE</button>
        </div>
        <div class="col">
            <button class="btn bg-warning" on:click={gotoShop}>SHOP</button>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <button class="btn bg-success" on:click={click}>ACHIEVEMENTS</button>
        </div>
        <div class="col">
            <button class="btn bg-light" on:click={gotoSettings}>SETTINGS</button>
        </div>
    </div>
</Model>

<style>
    .row {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    .col {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 20px;
    }

    button {
        font-size: 30px !important;
        font-weight: bold !important;
        width: 300px !important;
        height: 100px !important;
    }
</style>

