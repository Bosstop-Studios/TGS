<script lang="ts">
    import { onMount } from "svelte";

    import { settings } from "$lib/js/stores";

    let musicElement: HTMLAudioElement;

    onMount(() => {
        musicElement.loop = true;
        musicElement.src = `./music/music.wav`;

        settings.subscribe((value) => {
            if ($settings.music) {
                musicElement.play();
            } else {
                musicElement.pause();
            }
            musicElement.volume = $settings.volume;
        });

    });

    export function play() {
        musicElement.play();
    }

    export function pause() {
        musicElement.pause();
    }
</script>

<audio bind:this={musicElement}></audio>