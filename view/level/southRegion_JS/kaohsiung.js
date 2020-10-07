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
    document.querySelector(".fullContent").style.display='block'

    switch (type) {
        case 0:
            picture.src= "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/%E9%AB%98%E9%9B%84%E5%B8%82%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83_%282015%29.png/600px-%E9%AB%98%E9%9B%84%E5%B8%82%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83_%282015%29.png";
            intro.textContent = "高雄地區昔稱為「打狗」。是臺灣最大工業區。又因有優越的港口，近海漁業發達，亦為重要遠洋漁業基地之一。"
            speaker.alt = "kaohsiungRegion"
            break;
        case 1:
            picture.src = "https://www.mirrormedia.com.tw/assets/images/20191111101130-6370e05220c60aa958e72e912d406d3e-tablet.jpg";
            intro.textContent = "85大樓位於高雄市苓雅區。外觀如同高字，是高雄第一高樓，且有世界第三的高速電梯，為台灣第二高的摩天大樓。"
            speaker.alt = "kaohsiung_f1"
            break;
        case 2:
            picture.src = "https://www.dacin.com.tw/upload/catalog_b/e2276642a23c6c4a88740ec84c76f2eb.jpg";
            intro.textContent = "義大遊樂世界位於高雄市大樹區。是南臺灣規模最大的主題遊樂園區，也是台灣首創古希臘情境主題的主題樂園。"
            speaker.alt = "kaohsiung_f2"
            break;
        case 3:
            picture.src = "https://www.taiwan.net.tw/pic.ashx?qp=1/big_scenic_spots/pic_10352_12.jpg&sizetype=3";
            intro.textContent = "早先在荖濃溪上有一條支流小溪，由於終年冒出自地層內的熱水，對皮膚病有神奇的功效，村民稱此為「熱水溪」。現在改名為 「不老溪」。"
            speaker.alt = "kaohsiung_f3"
            break;
    }
}