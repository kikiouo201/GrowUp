function playCentral(name) {
    var audioCreate = document.createElement("AUDIO");
    console.log("name:" + name.alt)
    let id = name.alt;
    if (audioCreate.canPlayType("audio/mpeg")) {
        audioCreate.setAttribute("src", `../../TTS/mp3/map/central/${id}.mp3`);
        console.log(`id:${id}`)
    }

    // x.setAttribute("controls", "controls");
    document.body.appendChild(audioCreate);
    // console.log("OK " + `${id} ` + aaauu.children[0].src)
    // aaauu.children[0].src = "../../TTS/mp3/bpm/" + `${id}` + ".mp3"
    audioCreate.play();
}

function playBPM(name) {
    var audioCreate = document.createElement("AUDIO");
    console.log("name:" + name.alt)
    let id = name.alt;
    if (audioCreate.canPlayType("audio/mpeg")) {
        audioCreate.setAttribute("src", `../../TTS/mp3/bpm/${id}.mp3`);
        console.log(`id:${id}`)
    }

    // x.setAttribute("controls", "controls");
    document.body.appendChild(audioCreate);
    // console.log("OK " + `${id} ` + aaauu.children[0].src)
    // aaauu.children[0].src = "../../TTS/mp3/bpm/" + `${id}` + ".mp3"
    audioCreate.play();
}
