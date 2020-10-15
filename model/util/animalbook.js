let { ipcRenderer } = require('electron');
// var player = require('play-sound')(opts = {})

function playAnimal(animal) {
    let animalAudio = document.getElementById("AUDIO");
    animalAudio.setAttribute("src", `../TTS/mp3/magicBook/animalBook/${animal}.mp3`);

    animalAudio.play();
}

// module.exports={
//     playDevilBPM
// }