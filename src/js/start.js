const fs = require("fs");

let db = JSON.parse(fs.readFileSync("./storage.json", "utf8"));

let form, gui;

function createForm() {

    form.style.display = "block";

    let labelUsername = document.createElement("label");
    labelUsername.setAttribute("for", "username");
    labelUsername.innerHTML = "Username";

    let inputUsername = document.createElement("input");
    inputUsername.setAttribute("type", "text");
    inputUsername.setAttribute("name", "username");
    inputUsername.setAttribute("id", "username");

    let submit = document.createElement("button");
    submit.setAttribute("type", "submit");
    submit.innerHTML = "Submit";

    form.appendChild(labelUsername);
    form.appendChild(inputUsername);
    form.appendChild(submit);

}

function createStartGUI() {

    gui.style.display = "block";

    let username = document.createElement("h3");
    username.innerHTML = db.user.username;

    let play = document.createElement("button");
    play.setAttribute("id", "play");
    play.innerHTML = "Play";

    let reset = document.createElement("button");
    reset.setAttribute("id", "reset");
    reset.classList.add("reset-btn");
    reset.innerHTML = "Reset";

    gui.appendChild(username);
    gui.appendChild(play);
    gui.appendChild(reset);


    play.addEventListener("click", () => {
        ipcRenderer.send('open-game');
    });

    reset.addEventListener("click", () => {
        const json = {
            user: {
                username: "",
                level: 1,
                exp: 0,
                coins: 100,
            },
            grass: {
                level: 1,
                health: 10,
                service: 0
            },
            game: {
                playTime: 0,
                achievements: [],
                music: true,
                checkpoints: {
                    intro: false
                }
            },
            settings: {
                hand: "1",
                volume: 0.5,
            }
        }
        let data = JSON.stringify(json, null, 4);
        fs.writeFile("storage.json", data, function(err) { if(err) { return console.log(err) } console.log("The file was saved!") }); 
        location.reload();
    });
    
}

window.onload = () => {
    form = document.getElementById("form");
    gui = document.getElementById("gui");
    if(!db.user.username) {
        createForm();
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            db.user.username = document.getElementById("username").value;
            fs.writeFileSync("./storage.json", JSON.stringify(db, null, 4));
            ipcRenderer.send('open-game');
        });
    } else {
        createStartGUI();
    }
};
