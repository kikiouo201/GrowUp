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
    document.querySelector(".fullContent").style.display='block'

    switch (type) {
        case 0:
            picture.src= "https://upload.wikimedia.org/wikipedia/commons/e/ea/Pingtung_labelled_map2.png";
            intro.textContent = "屏東地區位於臺灣西南部最南端，也是臺灣西部南北最狹長的縣份，地處熱帶地區，富有熱帶風情。"
            speaker.alt = "pingtungRegion"
            break;
        case 1:
            picture.src = "https://pic.17qq.com/uploads/dlcpdkldpv.jpeg";
            intro.textContent = "黑鮪魚因其體背色黑如墨，身型大如甕，所以一向俗稱『黑甕串』，再因其經濟價值極高，亦有『海中黑金』之稱謂。"
            speaker.alt = "pingtung_f1"
            break;
        case 2:
            picture.src = "https://thcdc.hakka.gov.tw/wSite/public/Data/f1504074653401.jpg";
            intro.textContent = "國立海洋生物博物館位於屏東縣車城鄉，簡稱海生館。是全台灣規模最大的，館內魚類種類豐富。"
            speaker.alt = "pingtung_f2"
            break;
        case 3:
            picture.src = "https://www.dbnsa.gov.tw/att/pic/b_11005457.JPG";
            intro.textContent = "大鵬灣跨海大橋，位於屏東縣的大鵬灣灣口。全長約195公尺，為台灣唯一的開啟橋"
            speaker.alt = "pingtung_f3"
            break;
    }
}

