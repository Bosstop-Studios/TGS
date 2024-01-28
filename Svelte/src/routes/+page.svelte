<script>
    import { goto } from "$app/navigation";

    function gotoStart() { goto("./start.html", { replaceState: true }); }
</script>

<div style="padding: 20px;">
    <h1 class="warning-title">Warning</h1>
    <p class="warning-text">
        Effects and Actions in this game are not real and don't accommodate for experiences that happen IRL.<br>
        This game is also very addictive and may cause you to lose track of time.<br>
    </p>
    <p class="warning-text">Continue with Caution</p>
    <button class="btn continue-btn bg-dark" on:click={gotoStart}>Continue</button>
</div>

<style>
    .warning-title {
        font-size: 100px;
        text-align: center;
        color: red;
        font-family: 'Syne Mono' !important;
        margin: 20px;
    }

    .warning-text {
        font-size: 40px;
        text-align: center;
        font-family: 'Syne Mono' !important;
    }

    .continue-btn {
        position: absolute;
        top: 85%;
        left: 50%;
        width: 75%;
        transform: translate(-50%, -50%);
        font-size: 18px;
    }

    .continue-btn:hover {
        background-color: brown !important;
    }

</style>