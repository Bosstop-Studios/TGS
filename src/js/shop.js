

function openShop() {
    var modal = document.getElementById("myModal");
    var modalContent = document.getElementById("modal-content");

    modal.style.display = "flex";
    modalContent.style.backgroundColor = "rgb(16, 121, 241)";
    modalContent.innerHTML = `
    <h1 style="text-align:center;">Welcome to the Shop</h1>
    <br>
    <p style="font-size:20px;">Item 1: Balls</p>
    `
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() { 
      modal.style.display = "none";
    }
}