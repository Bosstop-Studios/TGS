function openShop() {
    var modal = document.getElementById("myModal");
    var modalContent = document.getElementById("modal-content");
  
    modal.style.display = "flex";
    modalContent.style.backgroundColor = "rgb(16, 121, 241)";
    modalContent.innerHTML = `
    <h1 style="text-align:center;">Welcome to the Shop</h1>
    <br>
    <h2 style="text-align:center;">Social Credit Market</h2>
    <br>
    <div style="margin-top:10px; margin-bottom:10px" class="row">
        <div class="col-sm-4">
          <h4>Item: Coins</h4>
        </div>
        <div class="col-sm-1"></div>
        <div class="col-sm-4">
          <p style="display:inline;">Cost: 100 Social Credit</p>
        </div>
        <div class="col-sm-1">
          <button style="margin-left:50px; right:0px; display:inline;" type="button" onclick="buyCoins()" class="btn btn-success">Buy</button>
        </div>
    </div>  
    <div style="margin-top:10px; margin-bottom:10px" class="row">
        <div class="col-sm-4">
          <h4>Item: Balls</h4>
        </div>
        <div class="col-sm-1"></div>
        <div class="col-sm-4">
          <p style="display:inline;">Cost: 100 Social Credit</p>
        </div>
        <div class="col-sm-1">
          <button style="margin-left:50px; right:0px; display:inline;" type="button" class="btn btn-success">Buy</button>
        </div>
    </div> 
    `
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() { 
        modal.style.display = "none";
    }
}

function closeShop() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

// SHOP FUNCTIONS 

// SOCIAL CREDIT SHOP

function buyCoins() {
    if(db.user.xp > 100 || db.user.xp == 100) {
        db.user.xp -= 100;
        db.user.coins += 100;
        closeShop();
        gameAlert(1, "100 Coins added.");
        uiUpdate();
        fs.writeFile("./config.json", JSON.stringify(db, null, 2), (x) => {
            if (x) console.error(x)
        });
    } else {
        closeShop()
        gameAlert(2, "You don't have enough Social Credit to buy this item.")
    }
}