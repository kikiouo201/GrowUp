function playEast(name) {
    let eastAudio = document.getElementById("eastAudio");
    console.log("name:" + name.alt)
    let id = name.alt;
    if (eastAudio.canPlayType("audio/mpeg")) {
        eastAudio.setAttribute("src", `../../TTS/mp3/map/east/${id}.mp3`);
        console.log(`id:${id}`)
    }

    eastAudio.play();
}

function playGame(name) {
    let eastAudio = document.getElementById("eastAudio");
    console.log("name:" + name.alt)
    let id = name.alt;
    if (eastAudio.canPlayType("audio/mpeg")) {
        eastAudio.setAttribute("src", `../../TTS/mp3/games/${id}.mp3`);
        console.log(`id:${id}`)
    }
    eastAudio.play();
}