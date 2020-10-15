let { ipcRenderer: ipcRenderer2 } = require('electron');
let voiceOut = require('../../view/level/centralRegion_JS/central.js');

let levelNameConversion = {
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

function checkLevelIsPass(level_icon, counties) {
    const level_name = document.querySelectorAll(".level")
    ipcRenderer2.send("callZhuyinCondition")

    ipcRenderer2.on("reply-callZhuyindata", (event, data) => {
        // console.log("zhuyin = >"+zhuyin[0])
        console.log("success call reply-callZhuyindata Condition ~~~~ ")
        let levelSize = data.content.length;
        let levelIsPassSize = 0;

        data.content.forEach((level) => {
            for (let i = 0; i < level_name.length; i++) {
                if (level.level_name == level_name[i].getAttribute('alt')) {
                    if (level.level_name !== counties) {
                        if (level.ispass == 1) {
                            level_name[i].src = "../../image/icon/" + level_icon + ".png";
                            levelIsPassSize++;
                        } else {
                            level_name[i].src = "../../image/icon/" + level_icon + "_dark.png";
                        }
                    } else {
                        console.log(`levelIsPassSize=${levelIsPassSize},level_name.length=${level_name.length}`);
                        if (level.ispass == 1 && levelIsPassSize == (level_name.length - 1)) {
                            level_name[i].src = "../../image/icon/devil.png";
                            level_name[i].addEventListener('click', () => {
                                const centralAudio = document.querySelector("#AUDIO");
                                setTimeout(() => location.href = `../../view/game/pickingUpIsALittleRed.html?cardDataSize=${level_name.length-1}&startId=${levelNameConversion[level_name[0].getAttribute('alt')]}&counties=${counties}`, 800);
                                voiceOut.playDevilBPM();
                            })
                        } else if (levelIsPassSize == (level_name.length - 1)) {
                            level_name[i].src = "../../image/icon/devil.png";
                            level_name[i].addEventListener('click', () => {
                                const centralAudio = document.querySelector("#AUDIO");
                                setTimeout(() => location.href = `../../view/game/pickingUpIsALittleRed.html?cardDataSize=${level_name.length-1}&startId=${levelNameConversion[level_name[0].getAttribute('alt')]}&counties=${counties}`, 800);
                                voiceOut.playDevilBPM();

                            })
                        } else {
                            level_name[i].src = "../../image/icon/devil_lock.png";
                            level_name[i].addEventListener('click', () => {
                                alert('需要先完成縣市所有關卡！');
                            })
                        }
                    }

                }
            }
        });

    });
}