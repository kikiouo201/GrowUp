// let {ipcRenderer }= require('electron');

function checkZhuyin() {
    const zhuyin = document.querySelectorAll("#zhuyin")
    ipcRenderer.send("callZhuyinCondition")

    ipcRenderer.on("reply-callZhuyindata", (event, data) => {
        // console.log("zhuyin = >"+zhuyin[0])
        console.log("success call reply-callZhuyindata Condition ~~~~ ")
        for (i = 0; i < 9; i++) {
            for (z = 0; z < 9; z++) {

                if (data.content[i].ispass == 1) {

                    if (data.content[i].level_name == zhuyin[z].getAttribute('alt')) {

                        zhuyin[i].src = "../../image/icon/black_tuna.png"

                    }

                }
                if (data.content[i].ispass == 0) {

                    if (data.content[i].level_name == zhuyin[z].getAttribute('alt')) {

                        zhuyin[i].src = "../../image/icon/black_tuna_dark.png"

                    }

                }
            }
        }
    })
}


function changeInfor(type) {
    const picture = document.querySelector("#picture");
    const speaker = document.querySelector("#speaker");
    const intro = document.querySelector("#intro");
    document.querySelector(".fullContent").style.display = 'block'

    switch (type) {
        case 0:
            picture.src = "https://upload.wikimedia.org/wikipedia/commons/e/ea/Pingtung_labelled_map2.png";
            intro.textContent = "位於臺灣西南部最南端，也是臺灣西部南北最狹長的縣份，地處熱帶地區，富有熱帶風情，農漁業發達。"
            speaker.alt = "pingtungRegion"
            title.textContent = "屏東地區";
            title.style.left = "33%"
            title.style.width = "220px"
            picture.style.height = "90%"
            intro.style.margin = "10% 3% 0 3%";

            break;
        case 1:
            picture.src = "https://pic.17qq.com/uploads/dlcpdkldpv.jpeg";
            intro.textContent = "運動量大，肉質結實鮮美，營養豐富，經濟價值極高，有『海中黑金』之稱謂。背部顏色黑如墨，身型大如甕，也俗稱『黑甕串』。"
            speaker.alt = "pingtung_f1"
            title.textContent = "黑鮪魚";
            title.style.left = "33%"
            title.style.width = "220px"
            picture.style.height = "86%"
            intro.style.margin = "9% 3% 0 3%";
            break;
        case 2:
            picture.src = "https://thcdc.hakka.gov.tw/wSite/public/Data/f1504074653401.jpg";
            intro.textContent = "簡稱海生館。是全台灣規模最大的，館內魚類種類豐富，分成台灣水域館、珊瑚王國館和世界水域館。"
            speaker.alt = "pingtung_f2"
            title.textContent = "國立海洋生物博物館";
            title.style.left = "21%"
            title.style.width = "365px"
            picture.style.height = "90%"
            intro.style.margin = "10% 3% 0 3%";
            break;
        case 3:
            picture.src = "https://www.dbnsa.gov.tw/att/pic/b_11005457.JPG";
            intro.textContent = "全長約195公尺，是台灣唯一的開啟橋。每週六、日和國定假日有開橋秀可觀賞，共約耗時五分鐘。"
            speaker.alt = "pingtung_f3"
            title.textContent = "大鵬灣跨海大橋";
            title.style.left = "26%"
            title.style.width = "300px"
            picture.style.height = "90%"
            intro.style.margin = "10% 3% 0 3%";
            break;
    }
}