const minMap = document.querySelector('.minMap');
let { ipcRenderer } = require('electron');
const bpm = document.querySelectorAll('.bpm');
const abc = document.querySelectorAll('.abc');
const number = document.querySelectorAll('.num');
const city = document.querySelectorAll('.city');
const cityBG = document.querySelectorAll('.cityBG');

// var n = 0;
ipcRenderer.send('callMagicCard');
ipcRenderer.on('replyMagicCard', (event, data) => {
    // console.log("data = " + JSON.stringify(data))
    // magicCard
    for (i = 0; i < 73; i++) {

        // ㄅㄆㄇ
        if (data.content[i].ispass == 0 && i < 37) {
            // console.log(data.content[i].id + " name : " + data.content[i].level_name);
            if (data.content[i].level_name == bpm[i].alt) {
                // console.log("log:" + bpm[i].alt)
                // bpm[i].parentNode = "file:///C:/Users/mcuim/Desktop/Raspberry/2020_07_06/GrowUp/view/game/drawzhuyin.html?id=t"
                // console.log("img:" + bpm[i].parentNode.getAttribute('alt'))
                let lockBPM = bpm[i].alt;
                let bpmAlt = levelName[lockBPM];
                bpm[i].src = `./image/magicCard/chineseAlphabet/${bpmAlt}_lock.png`;
                // console.log("src:" + bpm[i].src)
            }
        }

        // 012
        if (data.content[i].ispass == 0 && i > 36 && i < 47) {
            // console.log(data.content[i].id + " 012 name : " + data.content[i].level_name);
            for (n = 0; n < 10; n++) {
                // console.log("n:" + number[n].alt)
                if (data.content[i].level_name == number[n].alt) {
                    // console.log("number level : " + data.content[i].level_name + " card " + number[n].alt);
                    let lock012 = number[n].alt;
                    let numAlt = levelName[lock012];
                    number[n].src = `./image/magicCard/012/${lock012}_lock.png`
                        // console.log("src:" + number[n].src)
                }
            }
        }

        // abc
        if (data.content[i].ispass == 0 && i > 46 && i < 73) {
            // console.log(data.content[i].id + " abc name : " + data.content[i].level_name);
            for (n = 0; n < 26; n++) {
                // console.log("n:" + abc[n].alt)
                if (data.content[i].level_name == abc[n].alt) {
                    // console.log("abc level : " + data.content[i].level_name + " card " + abc[n].alt);
                    let lockABC = abc[n].alt;
                    // console.log("abc[n].parentNode.getAttribute('alt')=" + lockABC);
                    let abcAlt = levelName[lockABC];
                    abc[n].src = `./image/magicCard/mixABC/${abcAlt}_lock.png`;
                    // console.log("src:" + abc[n].src)
                }
            }
        }
    }
});

minMap.addEventListener('click', () => {
    // console.log('minMap onclick');

    const black_overlay = document.querySelector('.black_overlay');
    black_overlay.style.visibility = "visible";

    ipcRenderer.send('callMapCondition');
    ipcRenderer.on('selectJsonOnTL', (event, data) => {
        console.log("sucess reply on TL")
            // console.log("data = " + dataID)
        for (i = 73; i < 97; i++) {
            // console.log(data.content[i].id + " city name : " + data.content[i].level_name);
            for (k = 0; k < 17; k++) {
                if (data.content[i].ispass == 1 && data.content[i].level_name == city[k].alt) {
                    data.content[i].level_name;
                    // console.log("no pass city " + city[k].id + " and fit server " + data.content[i].level_name)
                    city[k].src = "./image/icon/" + city[k].id + ".png"
                    cityBG[k].style.display = "none";
                }

            }


        }

    });


});

const close = document.querySelector('.closeMap');
close.addEventListener('click', () => {
    const black_overlay = document.querySelector('.black_overlay');
    black_overlay.style.visibility = "hidden";
});