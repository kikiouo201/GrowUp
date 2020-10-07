const levelName = {
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
    let nameAlt = name.alt;
    let id = levelName[nameAlt];
    if (northAudio.canPlayType("audio/mpeg")) {
        northAudio.setAttribute("src", `../../TTS/mp3/ABC/${id}.mp3`);
        console.log(`id:${id}`)
    }

    northAudio.play();
}

function mute() {
    let northAudio = document.getElementById("northAudio");
    northAudio.pause();
    northAudio.currentTime = 0;
}