const SSU = new SpeechSynthesisUtterance();

function mouseDown(index) {
    if (index) {
        // document.getElementById("SpeechToAskBtn").style.color = "red";
        console.log("index = " + index)
            // console.log("click =? " + index.children[0].alt)
        SSU.text = index;
        toggle();
        console.log("SSU=?" + SSU.volume)
    }
}

//   function mouseUp(index) {
//     document.getElementById("SpeechToAskBtn").style.color = "green";
//   }

function toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
        speechSynthesis.voice = "Google 國語（臺灣）";
        speechSynthesis.speak(SSU);
    }

}

const stop = document.getElementById("stopVoice")
const stopDOM = document.body;
stopDOM.addEventListener('dblclick', toggle.bind(null, false));
if (toggle() != null) {
    stop.addEventListener('dblclick', toggle.bind(null, false));

}

function playBPM(name) {
    let centralAudio = document.getElementById("Audio");

    console.log("name:" + name.alt)
    let id = name.alt;
    if (centralAudio.canPlayType("audio/mpeg")) {
        centralAudio.setAttribute("src", `./TTS/mp3/bpm/${id}.mp3`);
        console.log(`id:${id}`)
    }

    centralAudio.play();
}

function playABC(name) {
    let northAudio = document.getElementById("Audio");
    // var audioCreate = document.createElement("AUDIO");
    console.log("name:" + name.alt)
    let id = name.alt;
    if (northAudio.canPlayType("audio/mpeg")) {
        northAudio.setAttribute("src", `./TTS/mp3/ABC/${id}.mp3`);
        console.log(`id:${id}`)
    }

    northAudio.play();
}

function play012(name) {
    let southAudio = document.getElementById("Audio");
    console.log("name:" + name.alt)
    let id = name.alt;
    if (southAudio.canPlayType("audio/mpeg")) {
        southAudio.setAttribute("src", `./TTS/mp3/012/${id}.mp3`);
        console.log(`id:${id}`)
    }
    southAudio.play();
}

function playCentral(name) {
    let centralAudio = document.getElementById("Audio");
    console.log("name:" + name.alt)
    let id = name.alt;
    if (centralAudio.canPlayType("audio/mpeg")) {
        centralAudio.src = `./TTS/mp3/map/central/${id}.mp3`
        console.log(`id:${id}`)
    }

    centralAudio.play();
}

function playEast(name) {
    let eastAudio = document.getElementById("Audio");
    console.log("name:" + name.alt)
    let id = name.alt;
    if (eastAudio.canPlayType("audio/mpeg")) {
        eastAudio.setAttribute("src", `./TTS/mp3/map/east/${id}.mp3`);
        console.log(`id:${id}`)
    }

    eastAudio.play();
}

function playNorth(name) {
    let northAudio = document.getElementById("Audio");
    console.log("name:" + name.alt)
    let id = name.alt;
    if (northAudio.canPlayType("audio/mpeg")) {
        northAudio.src = `./TTS/mp3/map/north/${id}.mp3`;
        console.log(`id:${id}`)
    }

    northAudio.play();
}

function playSouth(name) {
    let southAudio = document.getElementById("Audio");
    console.log("name:" + name.alt)
    let id = name.alt;
    if (southAudio.canPlayType("audio/mpeg")) {
        southAudio.setAttribute("src", `./TTS/mp3/map/south/${id}.mp3`);
        console.log(`id:${id}`)
    }
    southAudio.play();
}