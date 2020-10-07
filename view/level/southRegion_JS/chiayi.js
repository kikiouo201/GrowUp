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
    document.querySelector(".fullContent").style.display='block'

    switch (type) {
        case 0:
            picture.src= "https://www.cyepb.com/upload/templateCode/fe5c1db0de60314a66ac8082f938eb15.png";
            intro.textContent = "嘉義地區倚山面海，是臺灣所有縣市中，擁有 阿里山、雲嘉南濱海及西拉雅三大國家風景區，坐擁山色、平原、海景等不同的壯麗與遼闊。"
            speaker.alt = "chiayiRegion"
            break;
        case 1:
            picture.src = "https://margaret.tw/wp-content/uploads/nEO_IMG_DSC00343-4.jpg";
            intro.textContent = "嘉義火雞肉飯是嘉義地區知名小吃之一。選用火雞肉當作素材，而雞汁是以全雞蒸煮所熬成的醬汁，加上酥炸過紅蔥頭的豬油，混合雞肉和白飯攪拌。"
            speaker.alt = "chiayi_f1"
            break;
        case 2:
            picture.src = "https://www.tbocc.gov.tw/SightLib/Files/d1cd2c0b-51be-e511-80c8-0894ef01c9ca/Title/Title201806050927401.jpg";
            intro.textContent = "高跟鞋教堂外觀為藍色透明玻璃高跟鞋造型，造型亮麗美觀，象徵著「每個小女孩都曾夢想有雙漂亮的高跟鞋，伴著自己走出美麗優雅的人生。」"
            speaker.alt = "chiayi_f2"
            break;
        case 3:
            picture.src = "https://afrch.forest.gov.tw/Attachments/ArticleBanner/13/202001/20200106164842455023.jpg";
            intro.textContent = "阿里山森林鐵路，是臺灣仍在營運的高山林業鐵路系統，也是臺灣第一個國家級重要文化景觀。"
            speaker.alt = "chiayi_f3"
            break;
        case 4:
            picture.src = "https://www.eastcoast-nsa.gov.tw/image/28952/1024x768";
            intro.textContent = "北回歸線標誌位於嘉義縣水上機場附近的一系列北回歸線標誌物。是世界首座於回歸線上設置的標誌物。"
            speaker.alt = "chiayi_f4"
            break;
    }
}