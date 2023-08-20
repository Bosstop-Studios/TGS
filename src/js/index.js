const { Game } = require('../lib/index');
const ms = require('ms');

const game = new Game({
    grass: document.getElementById('grass'),
    hand: document.getElementById('hand'), 
    panel: {
        username: document.getElementById('panel-name'),
        level: document.getElementById('panel-level'),
        coins: document.getElementById('panel-coins'),
        xp: document.getElementById('panel-xp'),
        healthBar: document.getElementById('health'),
    },
    alert: {
        root: document.getElementById('alert'),
        content: document.getElementById('alert-text'),
    },
    reviveBtn: document.getElementById('revive-btn'),
    menuBtn: document.getElementById('menu-btn'),
    model: {
        root: document.getElementById('model'),
        title: document.getElementById('model-header'),
        content: document.getElementById('model-body'),
    },
    menu: document.getElementById('menu'),
    music: document.getElementById('music'),
});

game.start();

setInterval(() => {
    game.storage.addPlayTime(1);
    game.saveGame();
}, ms('1m'));

shortcut.add(`ctrl+r`, function() {
    game.reviveClick();
});

