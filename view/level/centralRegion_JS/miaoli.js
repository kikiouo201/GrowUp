// let {ipcRenderer }= require('electron');

function checkZhuyin() {
    const zhuyin = document.querySelectorAll("#zhuyin")
    ipcRenderer.send("callZhuyinCondition")

    ipcRenderer.on("reply-callZhuyindata", (event, data) => {
        // console.log("zhuyin = >"+zhuyin[0])
        console.log("success call reply-callZhuyindata Condition ~~~~ ")
        for (i = 31; i < 39; i++) {
            for (z = 0; z < 7; z++) {

                if (data.content[i].ispass == 1) {

                    if (data.content[i].level_name == zhuyin[z].getAttribute('alt')) {

                        zhuyin[z].src = "../../image/icon/strawberry.png"

                    }

                }
                if (data.content[i].ispass == 0) {

                    if (data.content[i].level_name == zhuyin[z].getAttribute('alt')) {

                        zhuyin[z].src = "../../image/icon/strawberry_dark.png"

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
            picture.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/%E8%8B%97%E6%A0%97%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83.png/600px-%E8%8B%97%E6%A0%97%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83.png";
            intro.textContent = "位於臺灣西北部，是臺灣西部最適合旅遊及渡假的旅遊勝地。街道狹長，縱貫鐵路山線經此，並為公路交通中心。"
            speaker.alt = "miaoliRegion"
            title.textContent = "苗栗地區";
            title.style.left = "33%"
            title.style.width = "220px"
            break;
        case 1:
            picture.src = "https://ezgo.coa.gov.tw/ViewNews.27800/20191203-01.jpg";
            intro.textContent = "是苗栗縣大湖鄉的特產，每年的11月至隔年4月，是草莓盛產季節，並以草莓聞名全國，有臺灣草莓王國雅號。"
            speaker.alt = "miaoli_f1"
            title.textContent = "大湖草莓";
            title.style.left = "33%"
            title.style.width = "220px"
            break;
        case 2:
            picture.src = "https://www.taiwan.net.tw/pic.ashx?qp=1/big_scenic_spots/pic_A12-00261.jpg&sizetype=3";
            intro.textContent = "彰顯苗栗在地客家文化特質外，更結合親水廊道的美麗景觀，打造苗栗亮麗的門面，呈現在地藝文特色。"
            speaker.alt = "miaoli_f2"
            title.textContent = "客家圓樓";
            title.style.left = "33%"
            title.style.width = "220px"
            break;
        case 3:
            picture.src = "https://www.taiwan.net.tw/pic.ashx?qp=1/big_scenic_spots/pic_C100_342_8.jpg&sizetype=3";
            intro.textContent = "舊稱「魚藤坪」。相傳於開墾初時，有鯉魚精危害。因此鄉民在龍騰山區遍植魚藤，將東面的高山稱為關刀山，以克制魚怪。"
            speaker.alt = "miaoli_f3"
            title.textContent = "龍騰斷橋";
            title.style.left = "33%"
            title.style.width = "220px"
            break;
    }
}