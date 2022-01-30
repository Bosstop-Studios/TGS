const fs = require('fs');

let db = JSON.parse(fs.readFileSync("./config.json", "utf8"));

function onLoad() {
    if(db.user.username.length < 1) {
        document.getElementById("start-gui").innerHTML +=`
        <br><br>
        <p style="font-size:25px">Enter Your Username:</p>
        <br>
        <div class="form-group">
            <input style="max-width:500px" type="text" class="form-control" id="usr" maxlength="10" required>
        </div>
        <br><br><br>
        <button type="button" class="btn btn-primary" style="text-align:center; font-size:30px;" id="start-btn">Start</button>
        `
    } else {
        document.getElementById("start-gui").innerHTML +=`
        <p style="font-size:25px">User: ${db.user.username}</p>
        <br><br><br>
        <button type="button" class="btn btn-primary" style="text-align:center; font-size:30px;" id="start-btn">Start</button>
        `
    }

    var startButton = document.getElementById("start-btn");
    startButton.addEventListener("click", function (e) {
        if(db.user.username.length < 1) {
            if(document.getElementById("usr").value.length < 1) {
                alert("Please enter a username!")
            } else {
                db.user.username = document.getElementById("usr").value;
                fs.writeFile("./config.json", JSON.stringify(db, null, 2), (x) => {
                    if (x) console.error(x)
                });
                ipcRenderer.send('open-game');
            }
        } else {
            ipcRenderer.send('open-game');
        }
    }); 
}

onLoad();