const SSU = new SpeechSynthesisUtterance();
const levelName = {
    'ㄅ': 'b',
    'ㄆ': 'p',
    'ㄇ': 'm',
    'ㄈ': 'f',
    'ㄉ': 'd',
    'ㄊ': 't',
    'ㄋ': 'n',
    'ㄌ': 'l',
    'ㄍ': 'g',
    'ㄎ': 'k',
    'ㄏ': 'h',
    'ㄐ': 'j',
    'ㄑ': 'q',
    'ㄒ': 'x',
    'ㄓ': 'zhi',
    'ㄔ': 'chi',
    'ㄕ': 'shi',
    'ㄖ': 'ri',
    'ㄗ': 'zi',
    'ㄘ': 'ci',
    'ㄙ': 'si',
    'ㄧ': 'yi',
    'ㄨ': 'wu',
    'ㄩ': 'yu',
    'ㄚ': 'a',
    'ㄛ': 'o',
    'ㄜ': 'e',
    'ㄝ': 'ae',
    'ㄞ': 'ai',
    'ㄟ': 'ei',
    'ㄠ': 'ao',
    'ㄡ': 'ou',
    'ㄢ': 'an',
    'ㄣ': 'en',
    'ㄤ': 'ang',
    'ㄥ': 'eng',
    'ㄦ': 'er',
    'a': 'a1',
    'b': 'b1',
    'c': 'c1',
    'd': 'd1',
    'e': 'e1',
    'f': 'f1',
    'g': 'g1',
    'h': 'h1',
    'i': 'i1',
    'j': 'j1',
    'k': 'k1',
    'l': 'l1',
    'm': 'm1',
    'n': 'n1',
    'o': 'o1',
    'p': 'p1',
    'q': 'q1',
    'r': 'r1',
    's': 's1',
    't': 't1',
    'u': 'u1',
    'v': 'v1',
    'w': 'w1',
    'y': 'y1',
    'x': 'x1',
    'z': 'z1',
}

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
    let nameAlt = name.alt;
    let id = levelName[nameAlt];
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
    let nameAlt = name.alt;
    let id = levelName[nameAlt];
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

function playTagName(name) {
    let TagName = document.getElementById("Audio");
    if (TagName.canPlayType("audio/mpeg")) {
        TagName.setAttribute("src", `./TTS/mp3/${name}.mp3`);
        console.log(`id:${name}`)
    }
    TagName.play();
}

function goHome(name) {
    var audioCreate = document.getElementById("Audio");
    audioCreate.setAttribute("src", `./TTS/mp3/${name}.mp3`);
    audioCreate.play();
}

function mute() {
    let mute = document.getElementById("Audio");
    mute.pause();
    mute.currentTime = 0;
}