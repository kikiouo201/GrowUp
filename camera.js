let { ipcRenderer } = require('electron');

function open_mjpgstreamer() {
    ipcRenderer.send('open-mjpg-streamer')
}

function playVoiceAndCapture(name) {
    var audioCreate = document.getElementById("AUDIO");
    // console.log("name:" + name.alt)

    if (audioCreate.canPlayType("audio/mpeg")) {
        audioCreate.setAttribute("src", `./TTS/mp3/questionMW/${name}.mp3`);
        // console.log(`id:${id}`)
    }
    audioCreate.play();
}

function goHome(name) {
    var audioCreate = document.getElementById("AUDIO");
    audioCreate.setAttribute("src", `./TTS/mp3/${name}.mp3`);
    audioCreate.play();
}