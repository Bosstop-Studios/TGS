
const delay = ms => new Promise(res => setTimeout(res, ms));

var hand = document.getElementById("hand")

hand.addEventListener("click", async function(){
    hand.classList.add('handanimated');
    await delay(500); 
    hand.classList.remove('handanimated');
});

