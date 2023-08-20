const { Storage } = require('../lib/index');

const EazCanvas = require('../lib/dist/index.js');

let storage = new Storage();

let eaz = new EazCanvas["default"]({
    canvas: document.getElementById('canvas'),
    width: window.innerWidth,
    height: window.innerHeight,
    background: '#42a1f5',
});

eaz.Image(0, 0, window.innerWidth, window.innerHeight-10, '../assets/images/house.png');

storage.setCheckpoint('intro', true);
storage.save();