import { writable } from 'svelte/store';

export const user = writable({
    username: "Blob",
    sc: 0,
    coins: 100,
});

export const game = writable({
    playTime: 0,
    achievements: []
});

export const grass = writable({
    level: 1,
    health: 10,
    service: 0
});

export const settings = writable({
    music: true,
    hand: "1",
    volume: 0.5
});