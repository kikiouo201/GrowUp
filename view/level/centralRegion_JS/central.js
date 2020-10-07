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
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    0: 0,
}

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

    let nameAlt = name.alt;
    let id = levelName[nameAlt];
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