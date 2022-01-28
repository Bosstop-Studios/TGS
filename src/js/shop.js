function openShop() {
  var modal = document.getElementById("myModal");
  var modalContent = document.getElementById("modal-content");
  
  modal.style.display = "flex";
  modalContent.style.display = "block"
  modalContent.style.backgroundColor = "rgb(16, 121, 241)";
  modalContent.innerHTML = `
    <h1 style="text-align:center;">Welcome to the Shop</h1>
    <br>
    <h2 style="text-align:center;">Social Credit Market</h2>
    <br>
    <div style="margin-top:10px; margin-bottom:10px" class="row">
        <div class="col-sm-4">
          <h4>Coins</h4>
        </div>
        <div class="col-sm-1"></div>
        <div class="col-sm-4">
          <p style="display:inline;">Cost: 100 Social Credit</p>
        </div>
        <div class="col-sm-1">
          <button style="margin-left:50px; right:0px; display:inline;" type="button" onclick="buyCoins()" class="btn btn-success">Buy</button>
        </div>
    </div>  
    <br>
    <h2 style="text-align:center;">Coins Store</h2>
    <br>
    <div style="margin-top:10px; margin-bottom:10px" class="row">
        <div class="col-sm-4">
          <h4>Grass LevelUp</h4>
        </div>
        <div class="col-sm-1"></div>
        <div class="col-sm-4">
          <p style="display:inline;">Cost: <span id="grass-levelup"></span></p>
        </div>
        <div class="col-sm-1">
          <button style="margin-left:50px; right:0px; display:inline;" type="button" onclick="grassLevelup()" class="btn btn-success">Buy</button>
        </div>
    </div>  
  `

  prices();

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

function prices() {
  document.getElementById("grass-levelup").innerHTML = db.grass.level * 150 + " Coins";
}

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

// COINS SHOP 

function grassLevelup() {
  const levelupCost = db.grass.level * 150
  if(db.user.coins > levelupCost || db.user.coins == levelupCost) {
    db.user.coins -= levelupCost;
    db.grass.level += 1;
    db.grass.health = db.grass.level * 10;
    closeShop();
    gameAlert(1, "Grass Leveled Up");
    grassUpdate();
    uiUpdate();
    fs.writeFile("./config.json", JSON.stringify(db, null, 2), (x) => {
      if (x) console.error(x)
    });
  } else {
    closeShop()
    gameAlert(2, "You don't have enough Coins to buy this item.")
  }
}

