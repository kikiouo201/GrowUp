function playCentral(name) {
    let centralAudio = document.getElementById("centralAudio");
    console.log("name:" + name.alt)
    let id = name.alt;
    if (centralAudio.canPlayType("audio/mpeg")) {
        centralAudio.src = `../../TTS/mp3/map/central/${id}.mp3`
        console.log(`id:${id}`)
    }

    centralAudio.play();
}

function playBPM(name) {
    let centralAudio = document.getElementById("centralAudio");

    console.log("name:" + name.alt)
    let id = name.alt;
    if (centralAudio.canPlayType("audio/mpeg")) {
        centralAudio.setAttribute("src", `../../TTS/mp3/bpm/${id}.mp3`);
        console.log(`id:${id}`)
    }

    centralAudio.play();
}

function mute() {
    let centralAudio = document.getElementById("centralAudio");
    centralAudio.pause();
    centralAudio.currentTime = 0;
}