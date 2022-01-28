

function achievement(name, iconPath) {
  var modal = document.getElementById("myModal");
  var modalContent = document.getElementById("modal-content");
  var modalAchievement = document.getElementById("modal-achievement");
    
  modal.style.display = "flex";
  modalContent.style.display = "none"
  modalAchievement.style.display = "block";
  modalAchievement.innerHTML = `
  <h1 style="text-align:center;">${name}</h1>
  `

  if(iconPath) {
    modalAchievement.innerHTML += `
    <br>
    <img style="height:250px;left:30%;position:absolute;" src="../assets/${iconPath}">
    `
  }
  
  var span = document.getElementsByClassName("close")[0];
  span.onclick = function() { 
    modalAchievement.style.display = "none";
    modal.style.display = "none";
  }
}

function FirstTouch() {
  db.game.firstTouch = 1;
  fs.writeFile("./config.json", JSON.stringify(db, null, 2), (x) => {
    if (x) console.error(x)
  });
}