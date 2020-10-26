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

                        zhuyin[i].src = "../../image/icon/meat_rice.png"

                    }

                }
                if (data.content[i].ispass == 0) {

                    if (data.content[i].level_name == zhuyin[z].getAttribute('alt')) {

                        zhuyin[i].src = "../../image/icon/meat_rice_dark.png"

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
            picture.src = "https://www.cyepb.com/upload/templateCode/fe5c1db0de60314a66ac8082f938eb15.png";
            intro.textContent = "位於臺灣西南部，舊稱為「諸羅」。倚山面海，是臺灣所有縣市中，唯一擁有三大國家風景區的縣份，坐擁山色、平原、海景等不同的壯麗與遼闊。"
            speaker.alt = "chiayiRegion"
            title.textContent = "嘉義地區";
            title.style.left = "33%"
            title.style.width = "220px"
            break;
        case 1:
            picture.src = "https://margaret.tw/wp-content/uploads/nEO_IMG_DSC00343-4.jpg";
            intro.textContent = "是嘉義地區知名小吃之一。選用火雞肉當作素材，而雞汁是以全雞蒸煮所熬成的醬汁，加上酥炸過紅蔥頭的豬油，混合雞肉和白飯攪拌。"
            speaker.alt = "chiayi_f1"
            title.textContent = "嘉義火雞肉飯";
            title.style.left = "28%"
            title.style.width = "280px"
            break;
        case 2:
            picture.src = "https://www.tbocc.gov.tw/SightLib/Files/d1cd2c0b-51be-e511-80c8-0894ef01c9ca/Title/Title201806050927401.jpg";
            intro.textContent = "又稱玻璃高跟鞋教堂，外觀為藍色透明玻璃高跟鞋造型，象徵著「每個小女孩都曾夢想有雙漂亮的高跟鞋，伴著自己走出美麗優雅的人生。」"
            speaker.alt = "chiayi_f2"
            title.textContent = "高跟鞋教堂";
            title.style.left = "33%"
            title.style.width = "220px"
            break;
        case 3:
            picture.src = "https://afrch.forest.gov.tw/Attachments/ArticleBanner/13/202001/20200106164842455023.jpg";
            intro.textContent = "是臺灣仍在營運的高山林業鐵路系統，亦是臺灣第一個國家級重要文化景觀，與大吉嶺喜馬拉雅鐵路、安地斯山鐵路，稱世界上僅存的三條登山鐵路。"
            speaker.alt = "chiayi_f3"
            title.textContent = "阿里山森林鐵路";
            title.style.left = "24.5%"
            title.style.width = "320px"
            break;
        case 4:
            picture.src = "https://www.eastcoast-nsa.gov.tw/image/28952/1024x768";
            intro.textContent = "是世界首座於回歸線上設置的標誌物；1995年興建科學教育設施「北回歸線太陽館」。"
            speaker.alt = "chiayi_f4"
            title.textContent = "嘉義北回歸線標誌";
            title.style.left = "22%"
            title.style.width = "350px"
            break;
    }
}