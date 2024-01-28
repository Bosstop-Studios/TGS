<script>
    // @ts-nocheck
    import "../css/navbar.css";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    import { user, grass, game, settings as Settings } from "$lib/js/stores";

    let version = "0.0.0";
    onMount(() => {
        version = window.game.getVersion();
    });

    function close(event) {
        event.preventDefault();
        window.game.save($user, $grass, $game, $Settings);
        window.electron.close();
    }

    function minimize(event) {
        event.preventDefault()
        window.electron.minimize();
    }

    function maximize(event) {
        event.preventDefault()
        window.electron.maximize();
    }

    function settings(event) {
        event.preventDefault()
        window.game.save($user, $grass, $game, $Settings)
        if(window.location.pathname.includes("settings")) {
            goto("./game.html", { replaceState: true });
        } else {
            goto("./settings.html", { replaceState: true });
        }
    }

</script>

<div id="nav-grid">
    <div class="success" id="name">TGS</div>
    <div id="version">{version}</div>
    <div id="drag"></div>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={settings} id="settings">
        <!-- svelte-ignore a11y-missing-attribute -->
        <img height="20" width="20" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC20lEQVR4nO2av2sUQRTHN+QwaLwTwWjhD4QENBExRtGIpdhor5YG/QMisYsKElA06F+glZ1BLGwVLDRiEW0tRDGHwsVKiyTeJfeRgRdYxs3u/MrtXswXrrq3b+azO2/m7XsbRRv6DwTcA5b5Vw1gLGoXAVVW14eoHQRUgGYKyCJQioouYJhsHcxzgvuAa0BPht2IAciFDB89wCiwNzTEfuCrTKIGnE+xnTQAuZ1y/Rngu9ipWOsLBdGXELwqBh4AXZrtduCNAcgroKxdu0lugh5fs0DvWkDE9REYkLh4DvzBXPPAE+AwcACYSbF1hwH2ZECsqI6f1BNYMLCbBXa7gJgEbat12QVkC/CJ4ugzsNUaRGCOBVg6IdQATjpBxGBu5U0B3PCCEJASMJ0jxFug0xsktg3nscTmvc8QDeQU+WgZOBQS5IXlBFQaMw4MAt3yO6rWuvxno0ehIHbKrmGqp3r6ofkrA1MW/n4Bm13fJ1TKcVXyqfeWEB0GY3RYwrwG7sshfSLtRinndyUNcFUtdYDkGzbnMd43Neckx0v4adwUIjbmTc8xl5Kcpr2emuiIA4jaAHzUXAsQ6zxIAr9wIGUHkEoRQQaLsrTqrU7sAiSk9SSn11XxTOpOrdh+twE/HcdalLmOZWW76j38InDHsJiwoimLA/GZhd+XwIQqIwH9TgU+hxRFwVQynoQNxG+nFCVQ0jgnh92Q2pblNyQxYbucHgeByDmNb4ZO4wcsl1coLaiaVyiILinE5aUZVYUMAfKQ/DXpC3E2wIkfQk3gnCvEDuAHxVEN2OUConohRdOoa2PHpIhtU4H3KWJX1ZysQQzbCu/EZlhOa9e2Qm9GEbDq3fBZBaYhp3QpodEzbVhM0Bs9nVIu0rPwoF2reOvtC3Dac7ueSLn+eKwLEA5Ca/yockx3ht0VA5BLBi2NEafGTovzsv6o6GK9fDCwbj7hiFUt2/+jmg1F7voLIPGx/CY2I0YAAAAASUVORK5CYII=">
    </div>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={minimize} id="mini">
        <!-- svelte-ignore a11y-missing-attribute -->
        <img height="20" width="20" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAALUlEQVR4nO3RsQkAAAgEsd9/aa3tBUGSDY5LAAAAAGCqY9kiZEkcAQAAAOCpBi/1/hCBX+p4AAAAAElFTkSuQmCC">
    </div>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={maximize} id="maxi">
        <!-- svelte-ignore a11y-missing-attribute -->
        <img height="20" width="20" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAdUlEQVR4nO2UsQnAIBBFHchpXCatpRNklDQ2FkKmcAgneEFIOiXFXSHih9feg1ecMcsMcMClhOsJElCBW0htt0aCpFAirS0owCGkjAQnkIEgJLdbPYFvKCTy3Ttb8G0n+t1ONH+iqPDs4khgFR5deLHSEvPsARU9c/1t2k0fAAAAAElFTkSuQmCC">
    </div>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={close} >
        <!-- svelte-ignore a11y-missing-attribute -->
        <img height="20" width="20" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAtUlEQVR4nO2WSwqEMBBEvYSi9z9OXI0Lj/NkUJDJwv6kBmHGgqy0eN1tUqbrHv2lgAGYjzU0+IvbD/TAi1MrMAWgOT97pbUWT+VHp+93a5Us2IRfQN3gvhoV1tgcntEER+EyaAQuhzq/22I8Cx/DDxldaTttgOugAbgeGgC7E+4bo9bAyW2uNjh3HCcc4ZCJ10tFEkkGJxGDEjg3/hbnKNQBL9mrizuRmvzslZfQZU3of/Qb2gDIApP3EFwGCQAAAABJRU5ErkJggg==">
    </div>
</div>