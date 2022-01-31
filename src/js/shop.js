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
    <br>
    <h2 style="text-align:center;">Service Center</h2>
    <br>
    <div style="margin-top:10px; margin-bottom:10px" class="row">
        <div class="col-sm-4">
          <p style="font-size:20px;">Tacos Grass Care</p>
        </div>
        <div class="col-sm-5">
          <p style="display:inline;">Cost: <span>150 per Level of Grass</span></p>
        </div>
        <div class="col-sm-1">
          <button style="margin-left:50px; right:0px; display:inline;" type="button" onclick="" class="btn btn-success">Get</button>
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
  document.getElementById("grass-levelup").innerHTML = grasslvlupCost().toString() + " Coins";
}

// SOCIAL CREDIT SHOP

function buyCoins() {
  if(db.user.xp > 100 || db.user.xp == 100) {
    db.user.xp -= 100;
    db.user.coins += 100;
    gameAlert(3, "100 Coins added.");
    uiUpdate();
    fs.writeFile("./config.json", JSON.stringify(db, null, 2), (x) => {
      if (x) console.error(x)
    });
  } else {
    gameAlert(4, "<b>Alert:</b>&nbsp;You don't have enough Social Credit to buy this item.")
  }
}

// COINS SHOP 

function grasslvlupCost() {
  let levelupCost;
  if(db.grass.level > 100 || db.grass.level == 100) {
    levelupCost = db.grass.level * 3500
  }
  if(db.grass.level > 90 || db.grass.level == 90) {
    levelupCost = db.grass.level * 2750
  }
  if(db.grass.level > 80 || db.grass.level == 80) {
    levelupCost = db.grass.level * 2050
  }
  if(db.grass.level > 70 || db.grass.level == 70) {
    levelupCost = db.grass.level * 1750
  }
  if(db.grass.level > 60 || db.grass.level == 60) {
    levelupCost = db.grass.level * 1550
  }
  if(db.grass.level > 50 || db.grass.level == 50) {
    levelupCost = db.grass.level * 1250
  }
  if(db.grass.level > 40 || db.grass.level == 40) {
    levelupCost = db.grass.level * 1050
  }
  if(db.grass.level > 30 || db.grass.level == 30) {
    levelupCost = db.grass.level * 850
  }
  if(db.grass.level > 20 || db.grass.level == 20) {
    levelupCost = db.grass.level * 650
  }
  if(db.grass.level > 10 || db.grass.level == 10) {
    levelupCost = db.grass.level * 450
  }
  if(db.grass.level < 10) {
    levelupCost = db.grass.level * 150
  }
  return levelupCost;
}

function grassLevelup() {
  let levelupCost = grasslvlupCost();

  if(db.user.coins > levelupCost || db.user.coins == levelupCost) {
    db.user.coins -= levelupCost;
    db.grass.level += 1;
    db.grass.health = db.grass.level * 10;
    gameAlert(3, "<b>Alert:</b>&nbsp;Grass Leveled Up");
    prices();
    grassUpdate();
    uiUpdate();
    fs.writeFile("./config.json", JSON.stringify(db, null, 2), (x) => {
      if (x) console.error(x)
    });
  } else {
    gameAlert(4, "<b>Alert:</b>&nbsp;You don't have enough Coins to buy this item.")
  }
}

