const minMap = document.querySelector('.minMap');
let { ipcRenderer } = require('electron');
const bpm = document.querySelectorAll('.bpm')
const abc = document.querySelectorAll('.abc')
const number = document.querySelectorAll('.num')
    // var n = 0;
ipcRenderer.send('callMagicCard');
ipcRenderer.on('replyMagicCard', (event, data) => {
    // console.log("data = " + JSON.stringify(data))
    // magicCard
    for (i = 0; i < 73; i++) {

        // ㄅㄆㄇ
        if (data.content[i].ispass == 0 && i < 37) {
            console.log(data.content[i].id + " name : " + data.content[i].level_name);
            if (data.content[i].level_name == bpm[i].alt) {
                console.log("log:" + bpm[i].alt)
                    // bpm[i].parentNode = "file:///C:/Users/mcuim/Desktop/Raspberry/2020_07_06/GrowUp/view/game/drawzhuyin.html?id=t"
                console.log("img:" + bpm[i].parentNode.getAttribute('alt'))
                bpm[i].src = "./image/magicCard/chineseAlphabet/" + bpm[i].parentNode.getAttribute('alt') + "_lock.png";
                console.log("src:" + bpm[i].src)
            }
        }

        // 012
        if (data.content[i].ispass == 0 && i > 36 && i < 47) {
            console.log(data.content[i].id + " 012 name : " + data.content[i].level_name);
            for (n = 0; n < 10; n++) {
                // console.log("n:" + number[n].alt)
                if (data.content[i].level_name == number[n].alt) {
                    console.log("number level : " + data.content[i].level_name + " card " + number[n].alt);
                    number[n].src = "./image/magicCard/012/" + number[n].parentNode.getAttribute('alt') + "_lock.png"
                    console.log("src:" + number[n].src)
                }
            }
        }

        // abc
        if (data.content[i].ispass == 0 && i > 46 && i < 73) {
            console.log(data.content[i].id + " abc name : " + data.content[i].level_name);
            for (n = 0; n < 26; n++) {
                console.log("n:" + abc[n].alt)
                if (data.content[i].level_name == abc[n].alt) {
                    console.log("abc level : " + data.content[i].level_name + " card " + abc[n].alt);
                    abc[n].src = "./image/magicCard/mixABC/" + abc[n].parentNode.getAttribute('alt') + "_lock.png"
                    console.log("src:" + abc[n].src)
                }
            }
        }

    }
});

// All feature Icon
const newTaipei = document.getElementById("NewTaipei_feature");
const taipei = document.getElementById("Taipei_feature");
const keelung = document.getElementById("Keelung_feature");
const taoyuan = document.getElementById("Taoyuan_feature");
const hsinchu = document.getElementById("Hsinchu_feature");
const miaoli = document.getElementById("Miaoli_feature");
const taichung = document.getElementById("Taichung_feature");
const changhua = document.getElementById("Changhua_feature");
const kaohsiung = document.getElementById("Kaohsiung_feature");
const chiayi = document.getElementById("Chiayi_feature");
const yunlin = document.getElementById("Yunlin_feature");
const nantou = document.getElementById("Nantou_feature");
const yilan = document.getElementById("Yilan_feature");
const taitung = document.getElementById("Taitung_feature");
const hualien = document.getElementById("Hualien_feature");
const tainan = document.getElementById("Tainan_feature");
const pingtung = document.getElementById("Pingtung_feature");

// black and white Region
const newTaipei_B = document.querySelector('.NewTaipei_B')
const Taipei_B = document.querySelector('.Taipei_B')
const Keelung_B = document.querySelector('.Keelung_B')
const Taoyuan_B = document.querySelector('.Taoyuan_B')
const Hsinchu_B = document.querySelector('.Hsinchu_B')
const Miaoli_B = document.querySelector('.Miaoli_B')
const Taichung_B = document.querySelector('.Taichung_B')
const Changhua_B = document.querySelector('.Changhua_B')
const Yunlin_B = document.querySelector('.Yunlin_B')
const Nantou_B = document.querySelector('.Nantou_B')
const Chiayi_B = document.querySelector('.Chiayi_B')
const Tainan_B = document.querySelector('.Tainan_B')
const Kaohsiung_B = document.querySelector('.Kaohsiung_B')
const Yilan_B = document.querySelector('.Yilan_B')
const Taitung_B = document.querySelector('.Taitung_B')
const Hualien_B = document.querySelector('.Hualien_B')
const Pingtung_B = document.querySelector('.Pingtung_B')

var regionFeature = [newTaipei.alt, taipei.alt, keelung.alt, taoyuan.alt, hsinchu.alt, miaoli.alt, taichung.alt, changhua.alt, kaohsiung.alt, chiayi.alt, yunlin.alt, nantou.alt, yilan.alt, taitung.alt, hualien.alt, tainan.alt, pingtung.alt];
// var NoPassRegion = [newTaipei_B]
minMap.addEventListener('click', () => {
    console.log('minMap onclick');

    const black_overlay = document.querySelector('.black_overlay');
    black_overlay.style.visibility = "visible";

    ipcRenderer.send('callMapCondition');
    ipcRenderer.on('selectJsonOnTL', (event, data) => {
        console.log("sucess reply on TL")
            // console.log(data);
        data.content.forEach(dataID => {
            // console.log(dataID);
        });
        // console.log("data = " + dataID)
        for (i = 73; i < 90; i++) {
            for (k = 0; k < 17; k++) {
                if (data.content[i].ispass == 1 && regionFeature[k] == data.content[i].level_name) {
                    data.content[i].level_name;
                    // console.log(regionFeature[k] + " name : " + data.content[i].level_name);
                    switch (data.content[i].level_name) {

                        case "newTaipei":
                            newTaipei_B.style.display = "none";
                            newTaipei.src = "./image/icon/NewTaipei_icon.png";
                            // console.log("newTaipei Pass")
                            break;

                        case "newTaipei":
                            Taipei_B.style.display = "none";
                            taipei.src = "./image/icon/taipei101.png";
                            // console.log("taipei Pass")
                            break;

                        case "keelung":
                            Keelung_B.style.display = "none";
                            keelung.src = "./image/icon/oceanliner.png";
                            // console.log("keelung Pass")
                            break;

                        case "taoyuan":
                            Taoyuan_B.style.display = "none";
                            taoyuan.src = "./image/icon/togan.png";
                            // console.log("taoyuan Pass")
                            break;

                        case "hsinchu":
                            Hsinchu_B.style.display = "none";
                            hsinchu.src = "./image/icon/pork_ball.png";
                            // console.log("hsinchu Pass")
                            break;

                        case "miaoli":
                            Miaoli_B.style.display = "none";
                            miaoli.src = "./image/icon/strawberry.png";
                            // console.log("miaoli Pass")
                            break;

                        case "taichung":
                            Taichung_B.style.display = "none";
                            taichung.src = "./image/icon/suncake.png";
                            // console.log("taichung Pass")
                            break;

                        case "changhua":
                            Changhua_B.style.display = "none";
                            changhua.src = "./image/icon/meat_ball.png";
                            // console.log("changhua Pass")
                            break;

                        case "yunlin":
                            Yunlin_B.style.display = "none";
                            yunlin.src = "./image/icon/soy_sauce.png";
                            // console.log("yunlin Pass")
                            break;

                        case "nantou":
                            Nantou_B.style.display = "none";
                            nantou.src = "./image/icon/herbal_tea.png";
                            // console.log("nantou Pass")
                            break;

                        case "chiayi":
                            Chiayi_B.style.display = "none";
                            chiayi.src = "./image/icon/meat_rice.png";
                            // console.log("chiayi Pass")
                            break;

                        case "tainan":
                            Tainan_B.style.display = "none";
                            tainan.src = "./image/icon/temple.png";
                            // console.log("tainan Pass")
                            break;

                        case "kaohsiung":
                            Kaohsiung_B.style.display = "none";
                            kaohsiung.src = "./image/icon/85building.png";
                            // console.log("kaohsiung Pass")
                            break;

                        case "yilan":
                            Yilan_B.style.display = "none";
                            yilan.src = "./image/icon/Sanxing_green_onion.png";
                            // console.log("yilan Pass")
                            break;

                        case "taitung":
                            Taitung_B.style.display = "none";
                            taitung.src = "./image/icon/hot_air_balloon.png";
                            // console.log("taitung Pass")
                            break;

                        case "hualien":
                            Hualien_B.style.display = "none";
                            hualien.src = "./image/icon/watermelon.png";
                            // console.log("hualien Pass")
                            break;

                        case "pingtung":
                            Pingtung_B.style.display = "none";
                            pingtung.src = "./image/icon/watermelon.png";
                            // console.log("pingtung Pass")
                            break;
                    }

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