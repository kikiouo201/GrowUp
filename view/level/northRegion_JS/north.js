function playNorth(name) {
    let northAudio = document.getElementById("northAudio");
    console.log("name:" + name.alt)
    let id = name.alt;
    if (northAudio.canPlayType("audio/mpeg")) {
        northAudio.src = `../../TTS/mp3/map/north/${id}.mp3`;
        console.log(`id:${id}`)
    }

    northAudio.play();
}

function playABC(name) {
    let northAudio = document.getElementById("northAudio");
    // var audioCreate = document.createElement("AUDIO");
    console.log("name:" + name.alt)
    let id = name.alt;
    if (northAudio.canPlayType("audio/mpeg")) {
        northAudio.setAttribute("src", `../../TTS/mp3/ABC/${id}.mp3`);
        console.log(`id:${id}`)
    }

    northAudio.play();
}