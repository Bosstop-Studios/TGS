"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Shop {
    constructor(game, menu) {
        this.game = game;
        this.menu = menu;
        this.createShop();
    }
    createShop() {
        this.menu.innerHTML = "";
        let shopContent = document.createElement("div");
        this.menu.appendChild(shopContent);
        let shopItems = [
            {
                name: "Coins",
                cost: 100,
                type: "Social Credit",
                function: this.buyCoins.bind(this)
            },
            {
                name: "LevelUp Grass",
                cost: this.grassLvlUpCost(),
                type: "Coins",
                function: this.buyLevel.bind(this)
            }
        ];
        for (let i = 0; i < shopItems.length; i++) {
            let shopItem = document.createElement("div");
            shopItem.classList.add("shop-item");
            shopContent.appendChild(shopItem);
            let itemTitle = document.createElement("h3");
            itemTitle.innerHTML = shopItems[i].name;
            shopItem.appendChild(itemTitle);
            let itemCost = document.createElement("p");
            itemCost.innerHTML = shopItems[i].cost.toString() + " " + shopItems[i].type;
            shopItem.appendChild(itemCost);
            let itemFr = document.createElement("div");
            shopItem.appendChild(itemFr);
            let itemBuy = document.createElement("button");
            itemBuy.classList.add("shop-buy-btn");
            itemBuy.innerHTML = "Buy";
            itemBuy.addEventListener("click", () => {
                this.buy(shopItems[i].name, shopItems[i].cost, shopItems[i].type, shopItems[i].function);
            });
            shopItem.appendChild(itemBuy);
        }
    }
    buy(name, cost, type, callback) {
        let purchase = false;
        switch (type) {
            case "Social Credit":
                if (this.game.storage.getExp() < cost) {
                    this.game.alert("You don't have enough Social Credit to buy this item!");
                    return purchase;
                }
                this.game.storage.removeExp(cost), this.game.alert(`You bought ${name} for ${cost} Social Credit!`, 1), purchase = true;
                callback();
                this.game.updateUI();
                return purchase;
            case "Coins":
                if (this.game.storage.getCoins() < cost) {
                    this.game.alert("You don't have enough coins to buy this item!");
                    return purchase;
                }
                this.game.storage.removeCoins(cost), this.game.alert(`You bought ${name} for ${cost} Coins!`, 1), purchase = true;
                callback();
                this.game.updateUI();
                return purchase;
            default:
                this.game.alert("Invalid type!");
                return purchase;
        }
    }
    buyCoins() {
        this.game.storage.addCoins(100);
    }
    buyLevel() {
        let maxhealth = this.game.storage.getLevel() * 10;
        this.game.storage.addLevel(1);
        this.game.storage.setHealth(maxhealth);
    }
    grassLvlUpCost() {
        let levelupCost = 0;
        let level = this.game.storage.getLevel();
        if (level >= 100)
            levelupCost = level * 3500;
        if (level >= 90)
            levelupCost = level * 2750;
        if (level >= 80)
            levelupCost = level * 2050;
        if (level >= 70)
            levelupCost = level * 1750;
        if (level >= 60)
            levelupCost = level * 1550;
        if (level >= 50)
            levelupCost = level * 1250;
        if (level >= 40)
            levelupCost = level * 1050;
        if (level >= 30)
            levelupCost = level * 850;
        if (level >= 20)
            levelupCost = level * 650;
        if (level >= 10)
            levelupCost = level * 450;
        if (level < 10)
            levelupCost = level * 150;
        return levelupCost;
    }
}
exports.default = Shop;
