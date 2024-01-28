<script>
    import { user } from "$lib/js/stores";

    export let image = "https://via.placeholder.com/150";
    export let name = "IDK";
    export let description = "Something Useful . . Maybe?";
    export let price = 0;
    export let creditType = "coins";
    export let onClick = () => {};

</script>

<div class="card">
    <img class="thumbnail" src={image} alt="Avatar" style="width:100%">
    <div class="card-content">
        <h4><b>{name}</b></h4>
        <p>{description}</p>
        {#if creditType == "coins" && $user.coins >= price }
            <p class="price" style="color: rgb(67, 255, 60);">{price} {creditType}</p>
        {:else if creditType == "sc" && $user.sc >= price }
            <p class="price" style="color: rgb(67, 255, 60);">{price} {creditType}</p>
        {:else}
            <p class="price" style="color: red;">{price} {creditType}</p>
        {/if}
    </div>
    {#if creditType == "coins" && $user.coins >= price }
        <button on:click={onClick} class="button">Buy</button>
    {:else if creditType == "sc" && $user.sc >= price }
        <button on:click={onClick} class="button">Buy</button>
    {:else}
        <button on:click={onClick} class="button" disabled>Buy</button>
    {/if}
</div>

<style>
    .card {
        background-color: rgb(44, 52, 53);
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        text-align: center;
        font-family: arial;
        max-height: 500px;
        border-radius: 7.5px;
        margin: 20px;
    }

    .card-content {
        padding: 2px 16px;
    }

    .thumbnail {
        height: 200px;
        width: 100%;
        border-top-left-radius: 7.5px;
        border-top-right-radius: 7.5px;
    }

    .button {
        border: none;
        outline: 0;
        display: inline-block;
        padding: 8px;
        color: white;
        background-color: #1ec442;
        text-align: center;
        cursor: pointer;
        width: 100%;
        font-size: 18px;
        border-bottom-left-radius: 7.5px;
        border-bottom-right-radius: 7.5px;
    }

    b {
        text-decoration: none;
        font-size: 22px;
        color: black;
    }

    button:hover,
    b:hover {
        opacity: 0.7;
    }

    .price {
        font-size: 22px;
        font-weight: bold;
    }
    
</style>
