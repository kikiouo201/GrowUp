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
            picture.src= "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Tainan_map.png/350px-Tainan_map.png";
            intro.textContent = "位於臺灣西南部，為六都之一。耕地面積全臺第一，盛產豐富的農產品。擁有許多歷史建築、古蹟、廟宇、等得天獨厚的觀光資源。素有台灣歷史文化古都之稱。"
            speaker.alt = "tainanRegion"
            break;
        case 1:
            picture.src = "https://www.taiwan.net.tw/pic.ashx?qp=1/big_scenic_spots/pic_10889_20.jpg&sizetype=3";
            intro.textContent = "又作赤崁樓。前身為1653年荷治時期於赤崁行省興建之歐式城塞，又稱「普羅民遮城」，在地人稱為「番仔樓」，曾為全台灣島的商業中心。"
            speaker.alt = "tainan_f1"
            break;
        case 2:
            picture.src = "https://www.dacin.com.tw/upload/catalog_b/e2276642a23c6c4a88740ec84c76f2eb.jpg";
            intro.textContent = "是臺灣館藏最豐富的私人博物館、美術館。以典藏西洋藝術品為主，展出藝術、樂器、兵器與自然史四大領域。"
            speaker.alt = "tainan_f2"
            break;
        case 3:
            picture.src = "https://www.taiwan.net.tw/pic.ashx?qp=1/big_scenic_spots/pic_10352_12.jpg&sizetype=3";
            intro.textContent = "是臺灣面積最大、最晚發展的七股鹽場遺蹟之一。鹽山如白雪耀眼，像長年堆雪的長白山，也稱作「南台的長白山」，來臺觀光的日本人則戲稱是「台灣的富士山」。"
            speaker.alt = "tainan_f3"
            break;
        case 4:
            picture.src = "https://www.taiwan.net.tw/pic.ashx?qp=1/big_scenic_spots/pic_2_7.jpg&sizetype=3";
            intro.textContent = "為台灣最大的水庫與湖泊，興建之目的主要為提供嘉南地區灌溉用水，另具發電、防洪和觀光的功能，是個多目標利用的水庫。"
            speaker.alt = "tainan_f4"
            break;
    }
}