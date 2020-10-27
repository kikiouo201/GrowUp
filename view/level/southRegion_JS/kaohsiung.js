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

                        zhuyin[i].src = "../../image/icon/temple.png"

                    }

                }
                if (data.content[i].ispass == 0) {

                    if (data.content[i].level_name == zhuyin[z].getAttribute('alt')) {

                        zhuyin[i].src = "../../image/icon/temple_dark.png"

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
    const title = document.querySelector('#title');
    document.querySelector(".fullContent").style.display = 'block'

    switch (type) {
        case 0:
            picture.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/%E9%AB%98%E9%9B%84%E5%B8%82%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83_%282015%29.png/600px-%E9%AB%98%E9%9B%84%E5%B8%82%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83_%282015%29.png";
            intro.textContent = "位於臺灣西南部，為六都之一，昔稱為「打狗」。是臺灣最大工業區。又因有優越的港口，近海漁業發達，亦為重要遠洋漁業基地之一。"
            speaker.alt = "kaohsiungRegion"
            title.textContent = "高雄地區";
            title.style.left = "33%"
            title.style.width = "220px"
            break;
        case 1:
            picture.src = "https://www.mirrormedia.com.tw/assets/images/20191111101130-6370e05220c60aa958e72e912d406d3e-tablet.jpg";
            intro.textContent = "是高雄第一高樓，外觀如同高字，且有世界第三的高速電梯，為台灣第二高的摩天大樓。"
            speaker.alt = "kaohsiung_f1"
            title.textContent = "85大樓";
            title.style.left = "33%"
            title.style.width = "220px"
            break;
        case 2:
            picture.src = "https://static01-ipass.cdn.hinet.net/ipassweb/iPassWebV2/Preferential/1255/edaevengpage_1.png";
            intro.textContent = "是南臺灣規模最大的主題遊樂園區，以古希臘神殿為建築藍本，首創古希臘情境主題的主題樂園。"
            speaker.alt = "kaohsiung_f2"
            title.textContent = "義大遊樂世界";
            title.style.left = "26%"
            title.style.width = "305px"
            break;
        case 3:
            picture.src = "http://www.pu-lao.com.tw/assets/img/services/1.jpg";
            intro.textContent = "早先在荖濃溪上有一條支流小溪，由於冒出地層內的熱水，村民皆扶老攜幼去沐浴，對皮膚病有神奇的功效，村民稱此為 「熱水溪」。現在改名為 「不老溪」。"
            speaker.alt = "kaohsiung_f3"
            title.textContent = "不老溫泉";
            title.style.left = "33%"
            title.style.width = "220px"
            break;
    }
}