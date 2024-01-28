<script lang="ts">
    // @ts-nocheck
    import { user } from "../../js/stores";
    import Item from "./Item.svelte";
    import Alert from "../util/Alert.svelte";

    let alertElement: Alert;

    function buyCoins() {
        $user.coins += 100;
        $user.sc -= 100;
        alertElement.showAlert("success", "Bought 100 Coins!");
        console.log($user);
    }

</script>

<Alert bind:this={alertElement} />
<div class="shop-grid">
    <Item name="Coins" description="Convert Social Credit to Coins" price={100} creditType="sc" onClick={buyCoins} />
    <Item />
    <Item />
</div>

<style>
    .shop-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 10px;
    }
</style>

