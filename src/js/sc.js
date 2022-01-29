
var modal = document.getElementById("myModal");
var modalContent = document.getElementById("modal-content");

function openLife() {

    modal.style.display = "flex";
    modalContent.style.display = "block"
    modalContent.style.backgroundColor = "rgb(23, 165, 153)";
    modalContent.innerHTML = `
    <h2 style="text-align:center;">Journey</h2>
    <br>
    <div style="margin-top:10px; margin-bottom:10px" id="bff-box"></div>
    <div style="margin-top:10px; margin-bottom:10px" id="gf-box"></div>
    `

    checkBFF()
    checkGF()
  
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() { 
      modal.style.display = "none";
    }
  
}

function checkBFF() {
    var bffbox = document.getElementById("bff-box")

    bffbox.innerHTML = `
    <div class="row">
        <div class="col-sm-3">
            <h4>Find BFF</h4>
        </div>
        <div class="col-sm-5">
            <p style="display:inline;">Cost: 1000 Social Credit</p>
        </div>
        <div class="col-sm-1">
            <button style="margin-left:50px; right:0px; display:inline;" type="button" onclick="buyCoins()" class="btn btn-success">Start</button>
        </div>
    </div>
    `
}

function checkGF() {
    var gfbox = document.getElementById("gf-box")

    gfbox.innerHTML = `
    <div class="row">
        <div class="col-sm-3">
            <h4>Find GF</h4>
        </div>
        <div class="col-sm-5">
            <p style="display:inline;">Cost: 1500 Social Credit</p>
        </div>
        <div class="col-sm-1">
            <button style="margin-left:50px; right:0px; display:inline;" type="button" onclick="buyCoins()" class="btn btn-success">Start</button>
        </div>
    </div>
    `
}