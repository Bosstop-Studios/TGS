<script lang="ts">
    // @ts-nocheck
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { user } from "$lib/js/stores";

    let formElement: HTMLFormElement;

    onMount(async() => {
        let gameData = window.game.get();
        user.update((value) => { value = gameData.user; return value; });
    });

    function onSubmit(event) {
        if (formElement.value.length > 0) {
            user.update((value) => { value.username = formElement.value; return value; });
            window.game.save($user, null, null, null);
            goto("./game.html", { replaceState: true });
        }
    }

    function gotoGame() { goto("./game.html", { replaceState: true }); }

</script>

<div class="start-bg">
    <h1 class="start-title">Touch Grass Simulator</h1>
    {#if $user.username.length > 0 }
        <div class="form">
            <h2 style="color: black; font-size:35px;">{$user.username}</h2>
            <button class="btn continue-btn bg-dark" on:click={gotoGame}>Continue</button>
        </div>
    {:else}
        <div class="form">
            <input bind:this={formElement} type="text" id="username" placeholder="Username" class="form-control" style="width: 50%; margin: auto; margin-bottom: 10px;">
            <button class="btn continue-btn bg-dark" on:click={onSubmit}>Start</button>
        </div>
    {/if}
</div>

<style>
    .start-bg {
        background-image: url("../../../static/scenes/tgs-start.jpeg");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        height: 100vh;
        width: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 1;
    }

    .start-title {
        color: rgb(0, 65, 119);
        font-size: 75px;
        text-align: center;
        margin: auto;
        margin-top: 8%;
    }


    .form {
        text-align: center;
        margin: auto;
        margin-top: 10%;
        background-color: rgba(0, 65, 119, 0.60);
        width: 50%;
        padding: 10px;
        border-radius: 7.5px;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
    }

    .form-control {
        border-radius: 7.5px;
        border: none;
        padding: 10px;
        margin-bottom: 10px;
        font-size: 20px;
        text-align: center;
    }

    .continue-btn {
        border-radius: 7.5px;
        border: none;
        padding: 10px;
        margin-bottom: 10px;
        font-size: 20px;
        text-align: center;
        width: 50%;
        margin: auto;
        display: block;
    }

    .continue-btn:hover {
        background-color: rgb(0, 65, 119);
        color: white;
    }

    .continue-btn:active {
        background-color: rgb(0, 65, 119);
        color: white;
    }

</style>