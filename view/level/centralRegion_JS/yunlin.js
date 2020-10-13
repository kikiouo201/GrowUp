let { ipcRenderer } = require('electron');

function checkZhuyin() {
    const zhuyin = document.querySelectorAll("#zhuyin")
    ipcRenderer.send("callZhuyinCondition")

    ipcRenderer.on("reply-callZhuyindata", (event, data) => {
        // console.log("zhuyin = >"+zhuyin[0])
        console.log("success call reply-callZhuyindata Condition ~~~~ ")
        for (i = 9; i < 17; i++) {
            for (z = 0; z < 7; z++) {

                if (data.content[i].ispass == 1) {

                    if (data.content[i].level_name == zhuyin[z].getAttribute('alt')) {

                        zhuyin[z].src = "../../image/icon/soy_sauce.png"

                    }

                }
                if (data.content[i].ispass == 0) {

                    if (data.content[i].level_name == zhuyin[z].getAttribute('alt')) {

                        zhuyin[z].src = "../../image/icon/soy_sauce_dark.png"

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
            picture.src = "https://www.ylhpb.gov.tw/df_ufiles/df_pics/Images/map_ch.png"
            intro.textContent = "位於臺灣中部，地形平坦，氣候溫和。主要農產品有稻米、甘蔗、甘藷、玉蜀黍、落花生等，因此雲林帶給人們的印象通常為「臺灣的糧倉」。"
            speaker.alt = "yunlinRegion"
            break;
        case 1:
            picture.src = "http://4.bp.blogspot.com/-wCqi3g4nycM/UlwFKUJ5DRI/AAAAAAAAJyk/U4QGoS8a1BM/s1600/DSC00309.JPG";
            intro.textContent = "是雲林重要的特產，因為水質、溫度和濕度的合適，雲林西螺號稱臺灣的「醬油王國」。"
            speaker.alt = "yunlin_f1"
            break;
        case 2:
            picture.src = "http://fancyworld.janfusun.com.tw/images/about/about_img01.jpg";
            intro.textContent = "是臺灣最有人氣的主題樂園之一，有著最新鮮的玩樂設施，綜合「休閒、遊樂、文化、科技」四大功能，讓參與的遊客不由得大聲高喊！"
            speaker.alt = "yunlin_f2"
            break;
        case 3:
            picture.src = "https://tour.yunlin.gov.tw/upload/shopInfo/20180911112832.jpg";
            intro.textContent = "俗稱北港媽祖廟。北港朝天宮終年香火鼎盛，每年最熱鬧的祭典分別是元宵節和媽祖誕辰。"
            speaker.alt = "yunlin_f3"
            break;
        case 4:
            picture.src = "https://cdn.walkerland.com.tw/images/upload/poi/p90461/m36804/c49311271890bf8af8237e7c901d63b42c710866.jpg";
            intro.textContent = "有2000捆的稻草捲，每綑稻草重達210公斤，堆積成金字塔型的稻草山。"
            speaker.alt = "yunlin_f4"
            break;
    }
}