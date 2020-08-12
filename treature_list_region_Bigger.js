const iconRegion = document.getElementById("iconDiv")
const iconDiv = document.querySelector('.iconDiv')

function RegionIcon(featureIcon) {

    switch (featureIcon) {
        case "基隆游輪":
            const Klung = document.querySelector('.Keelung_icon_B')
            var picKL = Klung.src;
            console.log("picKL -> " + picKL)
            if (picKL.indexOf('Keelung_dark.png') === -1) { //找不到dark
                console.log("picKL 1 -> " + picKL)
                mapIconDIV.style.display = "none";
                featureDIV.style.display = "block"
                featureDIV.innerHTML = `<img onclick="returnMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
        <img src="./image/icon/oceanliner.png" onclick="featuresText(this)" style="width: 110px; height: auto; margin-right: 10px; cursor: pointer;">
        <a style="display: inline-block; position: absolute; font-size: 20px; font-weight: bold;">遊輪，又稱郵輪，是一種用於娛樂航海的客輪，航程及沿途的目的地(並不包含岸上觀光)與船上的設施，都是提供旅遊及娛樂的一部份。在航空交通已普及的時代，運輸已不是郵輪的主要用途，雖然有的航線是單程的，但是遊輪通常會將乘客送回啟航的地點。兼具交通工具與住宿、餐廳的性質。</a>
        <br><br>`

            } else {
                console.log("picKL 2 -> " + picKL)
                document.location.href = './view/level/keelung.html'

            }
            // if(newTp.src)
            break;

        case "台北101":
            const TP101 = document.querySelector('.Taipei_icon_B')
            var picTP = TP101.src;
            console.log("picTP -> " + picTP)
            if (picTP.indexOf('dark.png') === -1) { //找不到dark
                console.log("picTP 1 -> " + picTP)
                mapIconDIV.style.display = "none";
                featureDIV.style.display = "block"
                featureDIV.innerHTML = `<img onclick="returnMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
        <img src="./image/icon/taipei101.png" onclick="featuresText(this)" style="width: 110px; height: auto; margin-right: 10px; cursor: pointer;">
        <a style="display: inline-block; position: absolute; font-size: 20px; font-weight: bold;">台北101，是位於臺灣臺北市信義區的摩天大樓，最初名稱為臺北國際金融中心。其為台灣第一高樓、以及唯一樓層超過100層的建築物，曾於2004年12月31日至2010年1月4日間擁有世界第一高樓的紀錄，目前為世界第十二高樓（截至2019年）、地震帶最高摩天大廈以及 世界最高的綠建築，完工以來即成為臺北重要地標之一。</a>
        <br><br>`
            } else {
                console.log("picTP 2 -> " + picTP)
                document.location.href = './view/level/taipei.html'
            }
            // if(newTp.src)
            break;

        case "新北鶯歌陶瓷":
            const newTp = document.querySelector('.NewTaipei_icon_B')
            var picNTP = newTp.src;
            console.log("picNTP -> " + picNTP)
            if (picNTP.indexOf('dark.png') === -1) { //找不到dark
                console.log("picNTP 1 -> " + picNTP)
                mapIconDIV.style.display = "none";
                featureDIV.style.display = "block"
                featureDIV.innerHTML = `<img onclick="returnMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
        <img src="./image/icon/NewTaipei_icon.png" onclick="featuresText(this)" style="width: 110px; height: auto; margin-right: 10px; cursor: pointer;">
        <a style="display: inline-block; position: absolute; font-size: 20px; font-weight: bold;">鶯歌陶瓷，鶯歌區最著名的特產即是陶瓷工藝。相傳清朝嘉慶年間吳岸、吳糖、吳曾等人來此，發現鄰近的尖山地區盛產黏土，遂於此設窯製陶。現多已轉向觀光化發展。</a>
        <br><br>`
            } else {
                console.log("picNTP 2 -> " + picNTP)
                document.location.href = './view/level/newTaipei.html'
            }
            // if(newTp.src)
            break;

        case "桃園豆干":
            const taoY = document.querySelector('.Taoyuan_icon_B')
            var picTao = taoY.src;
            console.log("picTao -> " + picTao)
            if (picTao.indexOf('dark.png') === -1) { //找不到dark
                console.log("picTao 1 -> " + picTao)
                mapIconDIV.style.display = "none";
                featureDIV.style.display = "block"
                featureDIV.innerHTML = `<img onclick="returnBMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
        <img src="./image/icon/togan.png" onclick="featuresText(this)" style="width: 110px; height: auto; margin-right: 10px; cursor: pointer;">
        <a style="display: inline-block; position: absolute; font-size: 20px; font-weight: bold;">桃園大溪豆乾，</a>
        <br><br>`
            } else {
                console.log("picTao 2 -> " + picTao)
                document.location.href = './view/level/taoyuan.html'

            }
            // if(newTp.src)
            break;

        case "新竹貢丸":
            const HsinC = document.querySelector('.Hsinchu_icon_icon_B')
            var picHsinC = HsinC.src;
            console.log("picHsinC -> " + picHsinC)
            if (picHsinC.indexOf('dark.png') === -1) { //找不到dark
                console.log("picHsinC 1 -> " + picHsinC)
                mapIconDIV.style.display = "none";
                featureDIV.style.display = "block"
                featureDIV.innerHTML = `<img onclick="returnMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
        <img src="./image/icon/pork_ball.png" onclick="featuresText(this)" style="width: 110px; height: auto; margin-right: 10px; cursor: pointer;">
        <a style="display: inline-block; position: absolute; font-size: 20px; font-weight: bold;">新竹貢丸</a>
        <br><br>`
            } else {
                console.log("picHsinC 2 -> " + picHsinC)
                document.location.href = './view/level/hsinchu.html'
            }
            // if(newTp.src)
            break;

        case "苗栗草莓":
            const MiaoL = document.querySelector('.Miaoli_icon_B')
            var picMiaoL = MiaoL.src;
            console.log("picMiaoL -> " + picMiaoL)
            if (picMiaoL.indexOf('strawberry_dark.png') === -1) { //找不到dark
                console.log("picMiaoL 1 -> " + picMiaoL)
                    // mapIcon.style.visibility = "hidden";
                iconRegion.style.visibility = "visible";
                iconDiv.innerHTML = `<img onclick="returnBMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
                <img src="./image/icon/strawberry.png" onclick="featuresText(this)" style="width: 127px;height: auto;margin: 50px 131px;/* margin-right: 10px; */cursor: pointer;">
                <a style="/* display: inline-block; */position: absolute;font-size: 20px;font-weight: bold;bottom: 0;margin: 20px 20px;right: 0;">大湖草莓，台灣苗栗縣大湖鄉的特產，氣候溫和多雨，以草莓聞名全國，素有臺灣草莓王國雅號。</a>
                <br><br>`

            } else {
                console.log("picMiaoL 2 -> " + picMiaoL)
                document.location.href = './view/level/miaoli.html'

            }
            break;

        case "台中太陽餅":
            const TaiC = document.querySelector('.Taichung_icon_B')
            var picTaiC = TaiC.src;
            console.log("picTaiC -> " + picTaiC)
            if (picTaiC.indexOf('dark.png') === -1) { //找不到dark
                console.log("picTaiC 1 -> " + picTaiC)
                mapIconDIV.style.display = "none";
                featureDIV.style.display = "block"
                featureDIV.innerHTML = `<img onclick="returnMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
        <img src="./image/icon/suncake.png" onclick="featuresText(this)" style="width: 110px; height: auto; margin-right: 10px; cursor: pointer;">
        <a style="display: inline-block; position: absolute; font-size: 20px; font-weight: bold;">太陽餅，是一種甜餡薄餅，一般內餡是麥芽糖，源起於台中市神岡區社口一帶林家崑派的麥芽餅，是台灣台中市的點心，為中臺灣的名產之一。</a>
        <br><br>`
            } else {
                console.log("picTaiC 2 -> " + picTaiC)
                document.location.href = './view/level/taichung.html'

            }
            break;


        case "彰化肉圓":
            const ChangH = document.querySelector('.Changhua_icon_B')
            var picChangH = ChangH.src;
            console.log("picChangH -> " + picChangH)
            if (picChangH.indexOf('dark.png') === -1) { //找不到dark
                console.log("picChangH 1 -> " + picChangH)
                mapIconDIV.style.display = "none";
                featureDIV.style.display = "block"

                featureDIV.innerHTML = `<img onclick="returnMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
        <img src="./image/icon/meat_ball.png" onclick="featuresText(this)" style="width: 110px; height: auto;cursor: pointer;">
        <a style="display: inline-block; position: absolute; font-size: 20px; font-weight: bold;">肉圓，台灣特色小吃。最有名的發源地是：彰化（彰化、北斗、員林）</a>
        <br><br>`
            } else {
                console.log("picChangH 2 -> " + picChangH)
                document.location.href = './view/level/changhua.html'

            }
            break;



        case "雲林西螺醬油":
            const YuLin = document.querySelector('.Yunlin_icon_B')
            var picYuLin = YuLin.src;
            console.log("picYuLin -> " + picYuLin)
            if (picYuLin.indexOf('dark.png') === -1) { //找不到dark
                console.log("picYuLin 1 -> " + picYuLin)
                mapIconDIV.style.display = "none";
                featureDIV.style.display = "block"

                featureDIV.innerHTML = `<img onclick="returnMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
        <img src="./image/icon/soy_sauce.png" onclick="featuresText(this)" style="width: 110px; height: auto; cursor: pointer;">
        <a style="display: inline-block; position: absolute; font-size: 20px; font-weight: bold;">西螺醬油，台灣雲林地區重要一級產業特產，因為水質、溫度和濕度的合宜，雲林西螺號稱臺灣的「醬油王國」。</a>
        <br><br>`
            } else {
                console.log("picYuLin 2 -> " + picYuLin)
                document.location.href = './view/level/yunlin.html'

            }
            break;


        case "南投高山茶":
            const NanT = document.querySelector('.Nantou_icon_B')
            var picNanT = NanT.src;
            console.log("picNanT -> " + picNanT)
            if (picNanT.indexOf('dark.png') === -1) { //找不到dark
                console.log("picNanT 1 -> " + picNanT)
                mapIconDIV.style.display = "none";
                featureDIV.style.display = "block"

                featureDIV.innerHTML = `<img onclick="returnMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
        <img src="./image/icon/herbal_tea.png" onclick="featuresText(this)" style="width: 110px; height: auto; margin-right: 10px; cursor: pointer;">
        <a style="display: inline-block; position: absolute; font-size: 20px; font-weight: bold;">凍頂烏龍茶（舊稱水沙連之茶），生產自臺灣南投縣鹿谷鄉，主要以青心烏龍當作原料製作的烏龍茶，有「北包種、南凍頂」之說。</a>
        <br><br>`
            } else {
                console.log("picNanT 2 -> " + picNanT)
                document.location.href = './view/level/nantou.html'

            }
            break;


        case "嘉義雞肉飯":
            const ChiaY = document.querySelector('.Chiayi_icon_B')
            var picChiaY = ChiaY.src;
            console.log("picChiaY -> " + picChiaY)
            if (picChiaY.indexOf('dark.png') === -1) { //找不到dark
                console.log("picChiaY 1 -> " + picChiaY)
                mapIconDIV.style.display = "none";
                featureDIV.style.display = "block"
                featureDIV.innerHTML = `<img onclick="returnMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
        <img src="./image/icon/meat_rice.png" onclick="featuresText(this)" style="width: 100px; height: auto; margin-right: 10px; cursor: pointer;">
        <a style="display: inline-block; position: absolute; font-size: 20px; font-weight: bold;">嘉義火雞肉飯，台灣嘉義地區知名小吃之一。</a>
        <br><br>`
            } else {
                console.log("picChiaY 2 -> " + picChiaY)
                document.location.href = './view/level/chiayi.html'

            }
            break;


        case "台南赤崁樓":
            const TaiN = document.querySelector('.Tainan_icon_B')
            var picTaiN = TaiN.src;
            console.log("picTaiN -> " + picTaiN)
            if (picTaiN.indexOf('dark.png') === -1) { //找不到dark
                console.log("picTaiN 1 -> " + picTaiN)
                mapIconDIV.style.display = "none";
                featureDIV.style.display = "block"
                featureDIV.innerHTML = `<img onclick="returnMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
        <img src="./image/icon/temple.png" onclick="featuresText(this)" style="width: 100px; height: auto; margin-right: 10px; cursor: pointer;">
        <a style="display: inline-block; position: absolute; font-size: 20px; font-weight: bold;">台南赤崁樓，</a>
        <br><br>`
            } else {
                console.log("picTaiN 2 -> " + picTaiN)
                document.location.href = './view/level/tainan.html'

            }
            break;

        case "高雄85大樓":
            const KaoS = document.querySelector('.Kaohsiung_icon_B')
            var picKaoS = KaoS.src;
            console.log("picKaoS -> " + picKaoS)
            if (picKaoS.indexOf('dark.png') === -1) { //找不到dark
                console.log("picKaoS 1 -> " + picKaoS)
                mapIconDIV.style.display = "none";
                featureDIV.style.display = "block"
                featureDIV.innerHTML = `<img onclick="returnMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
        <img src="./image/icon/85building.png" onclick="featuresText(this)" style="width: 100px; height: auto; margin-right: 10px; cursor: pointer;">
        <a style="display: inline-block; position: absolute; font-size: 20px; font-weight: bold;">高雄85大樓，前稱東帝士85國際廣場、東帝士建台大樓、TC Tower，位於高雄市苓雅區，緊鄰著高雄港和新光碼頭，是85層樓高的摩天大樓，其增加天線為378公尺，為高雄第一高樓，亦為台灣第二高的摩天大樓。</a>
        <br><br>`
            } else {
                console.log("picKaoS 2 -> " + picKaoS)
                document.location.href = './view/level/kaohsiung.html'

            }
            break;

        case "屏東黑鮪魚":
            const PingT = document.querySelector('.Pingtung_icon_B')
            var picPingT = PingT.src;
            console.log("picPingT -> " + picPingT)
            if (picPingT.indexOf('dark.png') === -1) { //找不到dark
                console.log("picPingT 1 -> " + picPingT)
                mapIconDIV.style.display = "none";
                featureDIV.style.display = "block"
                featureDIV.innerHTML = `<img onclick="returnMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
        <img src="./image/icon/black_tuna.png" onclick="featuresText(this)" style="width: 100px; height: auto; margin-right: 10px; cursor: pointer;">
        <a style="display: inline-block; position: absolute; font-size: 20px; font-weight: bold;">屏東黑鮪魚，屏東縣東港是台灣黑鮪魚主要捕獲地，因此也被稱為黑鮪魚的故鄉。全盛時期東港黑鮪魚捕獲量不僅是全台第一，還是全世界第一。一年可創造數十億元的商機。故有人貼切的形容黑鮪魚是東港人的黑金。</a>
        <br><br>`
            } else {
                console.log("picPingT 2 -> " + picPingT)
                document.location.href = './view/level/pingtung.html'

            }
            break;

        case "宜蘭三星蔥":
            const YiL = document.querySelector('.Yilan_icon_B')
            var picYiL = YiL.src;
            console.log("picYiL -> " + picYiL)
            if (picYiL.indexOf('dark.png') === -1) { //找不到dark
                console.log("picYiL 1 -> " + picYiL)
                mapIconDIV.style.display = "none";
                featureDIV.style.display = "block"
                featureDIV.innerHTML = `<img onclick="returnMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
        <img src="./image/icon/Sanxing_green_onion.png" onclick="featuresText(this)" style="width: 100px; height: auto; margin-right: 10px; cursor: pointer;">
        <a style="display: inline-block; position: absolute; font-size: 20px; font-weight: bold;">宜蘭三星蔥</a>
        <br><br>`
            } else {
                console.log("picYiL 2 -> " + picYiL)
                document.location.href = './view/level/yilan.html'

            }
            break;

        case "花蓮西瓜":
            const HuaL = document.querySelector('.Hualien_icon_B')
            var picHuaL = HuaL.src;
            console.log("picHuaL -> " + picHuaL)
            if (picHuaL.indexOf('dark.png') === -1) { //找不到dark
                console.log("picHuaL 1 -> " + picHuaL)
                mapIconDIV.style.display = "none";
                featureDIV.style.display = "block"
                featureDIV.innerHTML = `<img onclick="returnMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
        <img src="./image/icon/watermelon.png" onclick="featuresText(this)" style="width: 100px; height: auto; margin-right: 10px; cursor: pointer;">
        <a style="display: inline-block; position: absolute; font-size: 20px; font-weight: bold;">花蓮大西瓜</a>
        <br><br>`
            } else {
                console.log("picHuaL 2 -> " + picHuaL)
                document.location.href = './view/level/hualien.html'

            }
            break;

        case "台東熱氣球":
            const TaiT = document.querySelector('.Taitung_icon_B')
            var picTaiT = TaiT.src;
            console.log("picTaiT -> " + picTaiT)
            if (picTaiT.indexOf('dark.png') === -1) { //找不到dark
                console.log("picTaiT 1 -> " + picTaiT)
                mapIconDIV.style.display = "none";
                featureDIV.style.display = "block"
                featureDIV.innerHTML = `<img onclick="returnMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
        <img src="./image/icon/hot_air_balloon.png" onclick="featuresText(this)" style="width: 100px; height: auto; margin-right: 10px; cursor: pointer;">
        <a style="display: inline-block; position: absolute; font-size: 20px; font-weight: bold;">台東熱氣球</a>
        <br><br>`
            } else {
                console.log("picTaiT 2 -> " + picTaiT)
                document.location.href = './view/level/taitung.html'

            }
            break;


    }
}

function returnBMap() {
    // const featureDIV = document.getElementById("feature")
    featureDIV.style.display = "none";
    console.log(featureDIV.style.display)
    mapIconDIV.style.display = "block";

    iconRegion.style.visibility = "hidden";

}