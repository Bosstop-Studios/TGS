<script lang="ts">
    import { onMount } from "svelte";

    export let title = "";

    let modelElement: HTMLDivElement;

    onMount(() => {
        modelElement.style.display = "none";
    });

    export function show() {
        modelElement.style.display = "block";
    }

    export function hide() {
        modelElement.style.display = "none";
    }
</script>


<div bind:this={modelElement} class="model">
    <div class="model-header">
        <h2 class="model-title">{title}</h2>
    </div>
    <div class="model-body">
        <slot></slot>
    </div>
    <div class="model-footer">
        <button class="btn" on:click={hide}>Close</button>
    </div>
</div>

<style>
    .model {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 3;
        width: 65%;
        height: 600px;
        background-color: var(--bg-color-dark);
        border-radius: 10px;
        display: none;
    }

    .model-header {
        margin: auto;
        text-align: center;
        padding: 20px;
        font-size: 30px;
        font-weight: 600;
    }

    .model-body {
        margin: auto;
    }

    .model-footer {
        position: absolute;
        bottom: 5px;
        width: 95%;
    }

    .model .btn {
        margin: auto;
        width: 75%;
        font-size: 25px;
    }

    .model .btn:hover {
        background-color: var(--bg-color-dark);
        color: var(--text-color-dark);
    }

</style>