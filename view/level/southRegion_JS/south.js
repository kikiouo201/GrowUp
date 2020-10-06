function playSouth(name) {
    let southAudio = document.getElementById("southAudio");
    console.log("name:" + name.alt)
    let id = name.alt;
    if (southAudio.canPlayType("audio/mpeg")) {
        southAudio.setAttribute("src", `../../TTS/mp3/map/south/${id}.mp3`);
        console.log(`id:${id}`)
    }
    southAudio.play();
}

function play012(name) {
    let southAudio = document.getElementById("southAudio");
    console.log("name:" + name.alt)
    let id = name.alt;
    if (southAudio.canPlayType("audio/mpeg")) {
        southAudio.setAttribute("src", `../../TTS/mp3/012/${id}.mp3`);
        console.log(`id:${id}`)
    }
    southAudio.play();
}

function mute() {
    let southAudio = document.getElementById("southAudio");
    southAudio.pause();
    southAudio.currentTime = 0;
}