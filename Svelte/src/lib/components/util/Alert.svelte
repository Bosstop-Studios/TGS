<script lang="ts">

    let alertElement: HTMLDivElement;
    let alertText = "";
    let timeoutTick: NodeJS.Timeout;

    export function showAlert(type: string, text: string) {
        alertText = text;
        alertElement.style.display = "block";
        alertElement.style.backgroundColor = type === "success" ? "#4CAF50" : "#f44336";
        alertElement.style.color = "white";

        timeoutTick = setTimeout(() => {
            alertElement.style.display = "none";
        }, 3000);
    }

    function closeAlert() {
        clearTimeout(timeoutTick);
        alertElement.style.display = "none";
    }

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div bind:this={alertElement} class="alert" id="alert" style="width: 60%; left:125px; top:55px; position:absolute; font-size:20px; display: none;">
    <strong>Alert! - </strong> 
    <span style="margin-left: 15px;" id="alert-text">{alertText}</span>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <span on:click={closeAlert} class="closebtn" style="right: 10px; position: absolute; font-size: 25px;">&times;</span>
</div>