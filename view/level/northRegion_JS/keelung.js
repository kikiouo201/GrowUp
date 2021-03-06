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

                        zhuyin[i].src = "../../image/icon/oceanliner.png"

                    }

                }
                if (data.content[i].ispass == 0) {

                    if (data.content[i].level_name == zhuyin[z].getAttribute('alt')) {

                        zhuyin[i].src = "../../image/icon/oceanliner_dark.png"

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
            picture.src= "https://care-old.org/keelung/wp-content/uploads/2018/05/%E5%9F%BA%E9%9A%86.png";
            intro.textContent = "位於臺灣東北部，為臺灣北部第一大港，全臺第二大港，水產產業發達，以多雨著名，故有「雨港」之稱。"
            speaker.alt = "keelungRegion"
            title.textContent = "基隆地區";
            title.style.left = "33%"
            title.style.width = "220px"
            break;
        case 1:
            picture.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Explorer_of_the_Seas%2C_Fremantle%2C_2015_%2803%29.JPG/1920px-Explorer_of_the_Seas%2C_Fremantle%2C_2015_%2803%29.JPG";
            intro.textContent = "又稱郵輪，特色在於悠閒浪漫，且提供旅遊及娛樂，像是一艘航行在海上的五星級大型度假飯店。"
            speaker.alt = "keelung_f1"
            title.textContent = "遊輪";
            title.style.left = "33%"
            title.style.width = "220px"
            break;
        case 2:
            picture.src = "https://d2j3coy501s4ze.cloudfront.net/images/23079/700/db884329acc7422db0d5866c8683fbc82ef462b2_58c174855f6cc.jpeg";
            intro.textContent = "是全臺灣最著名的夜市之一。小吃種類眾多，全天24小時皆有店家在此營業，每到晚間夜市時段時更為熱鬧，所以也稱為廟口夜市。"
            speaker.alt = "keelung_f2"
            title.textContent = "基隆廟口夜市";
            title.style.left = "33%"
            title.style.width = "220px"
            break;
        case 3:
            picture.src = "https://tour.klcg.gov.tw/media/1012/%E4%BA%8C%E6%B2%99%E7%81%A3%E7%A0%B2%E5%8F%B01.jpg?anchor=center&mode=crop&width=600&height=350&rnd=131909152500000000";
            intro.textContent = "又稱為海門天險，於戰爭時，為防止敵人入侵而建立，因位處於二沙灣一帶的山路上，也有「二沙灣砲臺」的別稱。"
            speaker.alt = "keelung_f3"
            title.textContent = "大武崙砲台";
            title.style.left = "33%"
            title.style.width = "220px"
            break;
    }
}