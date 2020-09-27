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

                        zhuyin[i].src = "../../image/icon/herbal_tea.png"

                    }

                }
                if (data.content[i].ispass == 0) {

                    if (data.content[i].level_name == zhuyin[z].getAttribute('alt')) {

                        zhuyin[i].src = "../../image/icon/herbal_tea_dark.png"

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
            picture.src= "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/%E5%8D%97%E6%8A%95%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83.png/350px-%E5%8D%97%E6%8A%95%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83.png";
            intro.textContent = "南投地區，是唯一不靠海的縣市，而南投的地名由來，是因為平埔族阿立昆族的族語「Ramtau」，臺語就是音譯為「南投」。"
            speaker.alt = "nantouRegion"
            break;
        case 1:
            picture.src = "https://s.yimg.com/os/zh-Hant-TW/homerun/tw-travel.travelweb.com.tw/71e4ae358ca78944aaec7b6a4320bd07";
            intro.textContent = "高山茶，是指在海拔1000公尺以上茶園，所摘取製作的茶葉。"
            speaker.alt = "nantou_f1"
            break;
        case 2:
            picture.src = "https://www.funtime.com.tw/blog/wp-content/uploads/2020/04/25.jpg";
            intro.textContent = "日月潭，東邊的形狀像「日」，而西邊的形狀像「月」，所以稱做日月潭，是一座美麗的高山湖泊。"
            speaker.alt = "nantou_f2"
            break;
    }
}