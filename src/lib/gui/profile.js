"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Profile {
    constructor(game, menu) {
        this.game = game;
        this.menu = menu;
        this.createProfile();
    }
    createProfile() {
        this.menu.innerHTML = "";
        let profileContent = document.createElement("div");
        this.menu.appendChild(profileContent);
        let row = document.createElement("div");
        row.classList.add("row");
        profileContent.appendChild(row);
        let col = document.createElement("div");
        col.classList.add("col");
        row.appendChild(col);
        let username = document.createElement("p");
        username.innerHTML = "Username: " + `<code>${this.game.storage.getUsername()}</code>`;
        username.style.fontSize = "16px";
        col.appendChild(username);
        let coins = document.createElement("p");
        coins.innerHTML = "Coins: " + `<code>${this.game.storage.getCoins()}</code>`;
        coins.style.fontSize = "16px";
        col.appendChild(coins);
        let xp = document.createElement("p");
        xp.innerHTML = "XP: " + `<code>${this.game.storage.getExp()}</code>`;
        xp.style.fontSize = "16px";
        col.appendChild(xp);
        let col2 = document.createElement("div");
        col2.classList.add("col");
        row.appendChild(col2);
        let pfp = document.createElement("img");
        pfp.src = "../assets/images/tgs-chad.png";
        pfp.style.width = "250px";
        col2.appendChild(pfp);
    }
}
exports.default = Profile;
