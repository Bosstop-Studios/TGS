"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Music {
    constructor(audio, volume = 0.5) {
        this.audio = audio || new Audio();
        this.audio.src = "../assets/music/music.wav";
        this.audio.loop = true;
        this.audio.volume = volume;
    }
    play() {
        this.audio.play();
    }
    pause() {
        this.audio.pause();
    }
}
exports.default = Music;
