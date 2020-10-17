function playDevilBPM() {
    let devil = document.getElementById("AUDIO");
    devil.setAttribute("src", `../../TTS/mp3/devil.mp3`);
    devil.play();
}

function goHome() {
    var audioCreate = document.getElementById("AUDIO");
    audioCreate.setAttribute("src", `../../TTS/mp3/home.mp3`);
    audioCreate.play();
}

function mute() {
    let mute = document.getElementById("AUDIO");
    mute.pause();
    mute.currentTime = 0;
}

function magicBook(mainId) {
    var audioCreate = document.getElementById("AUDIO");
    var mb = mainId.id;
    audioCreate.setAttribute("src", `../TTS/mp3/magicBook/${mb}.mp3`);
    audioCreate.play();
}

module.exports = {
    mute,
    goHome,
    playDevilBPM,
    magicBook
}