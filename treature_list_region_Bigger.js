const iconRegion = document.getElementById("iconDiv")
const iconDiv = document.querySelector('.iconDiv')

function RegionIcon(featureIcon) {

    switch (featureIcon) {
        case "基隆游輪":
            const Klung = document.querySelector('.Keelung_icon_B')
            var picKL = Klung.src;
            console.log("picKL -> " + picKL)
            if (picKL.indexOf('dark.png') === -1) { //找不到dark
                console.log("picKL 1 -> " + picKL)
                iconRegion.style.visibility = "visible";
                iconDiv.innerHTML = `<img onclick="returnBMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
                    <img src="./image/icon/oceanliner.png" onclick="featuresText(this)" style="width: 147px;height: auto;margin: 8% 33%;/* margin-right: 10px; */cursor: pointer;">
                    <a style="/* display: inline-block; */position: absolute;font-size: 20px;font-weight: bold;bottom: 0;margin: 12px 20px;right: 0;">遊輪，又稱郵輪，特色在於悠閒浪漫，且提供旅遊及娛樂，像是一艘航行在海上的五星級大型度假飯店，兼具交通工具與住宿、餐廳的性質。</a>
                    <a style="position: absolute;font-size: 20px;font-weight: bold;top: 0;margin: 24px 29px;right: 0;z-index: 10;background-color: #f90b898f;border-radius: 20px;padding-left: 20px;padding-right: 20px;padding-bottom: 5px;padding-top: 5px;">基隆地區</a>
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
                iconRegion.style.visibility = "visible";
                iconDiv.innerHTML = `<img onclick="returnBMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
                <img src="./image/icon/taipei101.png" onclick="featuresText(this)" style="width: 147px;height: auto;margin: 8% 33%;/* margin-right: 10px; */cursor: pointer;">
                <a style="/* display: inline-block; */position: absolute;font-size: 20px;font-weight: bold;bottom: 0;margin: 12px 20px;right: 0;">台北101，位於臺北市信義區，為台灣第一高樓以及唯一樓層超過100層的建築物，目前為世界第十二高樓，是臺北重要地標之一。</a>
                <a style="position: absolute;font-size: 20px;font-weight: bold;top: 0;margin: 24px 29px;right: 0;z-index: 10;background-color: #f90b898f;border-radius: 20px;padding-left: 20px;padding-right: 20px;padding-bottom: 5px;padding-top: 5px;">台北地區</a>
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
                iconRegion.style.visibility = "visible";
                iconDiv.innerHTML = `<img onclick="returnBMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
                <img src="./image/icon/NewTaipei_icon.png" onclick="featuresText(this)" style="width: 120px;height: auto;margin: 8% 36%;/* margin-right: 10px; */cursor: pointer;">
                <a style="/* display: inline-block; */position: absolute;font-size: 20px;font-weight: bold;bottom: 0;margin: 12px 20px;right: 0;">陶瓷，是新北市鶯歌區最著名的特產。相傳清朝嘉慶年間發現鄰近的尖山地區盛產黏土，遂於此設窯製陶。現多已轉向觀光化發展。</a>
                <a style="position: absolute;font-size: 20px;font-weight: bold;top: 0;margin: 24px 29px;right: 0;z-index: 10;background-color: #f90b898f;border-radius: 20px;padding-left: 20px;padding-right: 20px;padding-bottom: 5px;padding-top: 5px;">新北地區</a>
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
                iconRegion.style.visibility = "visible";
                iconDiv.innerHTML = `<img onclick="returnBMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
                <img src="./image/icon/togan.png" onclick="featuresText(this)" style="width: 155px;height: auto;margin: 7% 32%;/* margin-right: 10px; */cursor: pointer;">
                <a style="/* display: inline-block; */position: absolute;font-size: 20px;font-weight: bold;bottom: 0;margin: 12px 20px;right: 0;">大溪豆乾，是桃園市大溪區知名的地方特產。大溪豆乾的特色是黑豆干，外皮厚而黑，整體口感較白豆乾更加硬實，味道也更加重。</a>
                <a style="position: absolute;font-size: 20px;font-weight: bold;top: 0;margin: 24px 29px;right: 0;z-index: 10;background-color: #f90b898f;border-radius: 20px;padding-left: 20px;padding-right: 20px;padding-bottom: 5px;padding-top: 5px;">桃園地區</a>
                <br><br>`
            } else {
                console.log("picTao 2 -> " + picTao)
                document.location.href = './view/level/taoyuan.html'

            }
            // if(newTp.src)
            break;

        case "新竹貢丸":
            const HsinC = document.querySelector('.Hsinchu_icon_B')
            var picHsinC = HsinC.src;
            console.log("picHsinC -> " + picHsinC)
            if (picHsinC.indexOf('dark.png') === -1) { //找不到dark
                console.log("picHsinC 1 -> " + picHsinC)
                iconRegion.style.visibility = "visible";
                iconDiv.innerHTML = `<img onclick="returnBMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
                <img src="./image/icon/pork_ball.png" onclick="featuresText(this)" style="width: 131px;height: auto;margin: 17% 34%;/* margin-right: 10px; */cursor: pointer;">
                <a style="/* display: inline-block; */position: absolute;font-size: 20px;font-weight: bold;bottom: 0;margin: 12px 20px;right: 0;">貢丸，為豬肉製作的一種肉丸。新竹的貢丸特別有名，主要科技上的貢獻是運用機器，令貢丸可大量生產。而新竹貢丸的材料必須用新鮮溫體豬肉製作。</a>
                <a style="position: absolute;font-size: 20px;font-weight: bold;top: 0;margin: 24px 29px;right: 0;z-index: 10;background-color: #f90b898f;border-radius: 20px;padding-left: 20px;padding-right: 20px;padding-bottom: 5px;padding-top: 5px;">新竹地區</a>
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
                <img src="./image/icon/strawberry.png" onclick="featuresText(this)" style="width: 127px;height: auto;margin: 50px 34%;/* margin-right: 10px; */cursor: pointer;">
                <a style="/* display: inline-block; */position: absolute;font-size: 20px;font-weight: bold;bottom: 0;margin: 20px 20px;right: 0;">草莓，是苗栗縣大湖鄉的特產，氣候溫和多雨，以草莓聞名全國，素有臺灣草莓王國雅號。</a>
                <a style="position: absolute;font-size: 20px;font-weight: bold;top: 0;margin: 24px 29px;right: 0;z-index: 10;background-color: #3fcd96c2;border-radius: 20px;padding-left: 20px;padding-right: 20px;padding-bottom: 5px;padding-top: 5px;">苗栗地區</a>
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
                iconRegion.style.visibility = "visible";
                iconDiv.innerHTML = `<img onclick="returnBMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
                <img src="./image/icon/suncake.png" onclick="featuresText(this)" style="width: 180px;height: auto;margin: 14% 28%;/* margin-right: 10px; */cursor: pointer;">
                <a style="/* display: inline-block; */position: absolute;font-size: 20px;font-weight: bold;bottom: 0;margin: 20px 20px;right: 0;">太陽餅，是一種甜餡薄餅，一般內餡是麥芽糖，源起於台中市神岡區社口一帶林家崑派的麥芽餅，為中臺灣的名產之一。</a>
                <a style="position: absolute;font-size: 20px;font-weight: bold;top: 0;margin: 24px 29px;right: 0;z-index: 10;background-color: #3fcd96c2;border-radius: 20px;padding-left: 20px;padding-right: 20px;padding-bottom: 5px;padding-top: 5px;">台中地區</a>
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
                iconRegion.style.visibility = "visible";
                iconDiv.innerHTML = `<img onclick="returnBMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
                <img src="./image/icon/meat_ball_B.png" onclick="featuresText(this)" style="width: 180px;height: auto;margin: 20% 29%;/* margin-right: 10px; */cursor: pointer;">
                <a style="/* display: inline-block; */position: absolute;font-size: 20px;font-weight: bold;bottom: 0;margin: 20px 20px;right: 0;">彰化肉圓，台灣特色小吃。當地特色為涼式的吃法，將蒸好的肉圓放冷後，再放到冰涼的湯水內，夏天吃極為清爽。</a>
                <a style="position: absolute;font-size: 20px;font-weight: bold;top: 0;margin: 24px 29px;right: 0;z-index: 10;background-color: #3fcd96c2;border-radius: 20px;padding-left: 20px;padding-right: 20px;padding-bottom: 5px;padding-top: 5px;">彰化地區</a>
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
                iconRegion.style.visibility = "visible";
                iconDiv.innerHTML = `<img onclick="returnBMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
                <img src="./image/icon/soy_sauce.png" onclick="featuresText(this)" style="width: 98px;height: auto;margin: 13% 42%;/* margin-right: 10px; */cursor: pointer;">
                <a style="/* display: inline-block; */position: absolute;font-size: 20px;font-weight: bold;bottom: 0;margin: 20px 20px;right: 0;">西螺醬油，台灣雲林地區重要一級產業特產，因為水質、溫度和濕度的合宜，雲林西螺號稱臺灣的「醬油王國」。</a>
                <a style="position: absolute;font-size: 20px;font-weight: bold;top: 0;margin: 24px 29px;right: 0;z-index: 10;background-color: #3fcd96c2;border-radius: 20px;padding-left: 20px;padding-right: 20px;padding-bottom: 5px;padding-top: 5px;">雲林地區</a>
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
                iconRegion.style.visibility = "visible";
                iconDiv.innerHTML = `<img onclick="returnBMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
                <img src="./image/icon/herbal_tea.png" onclick="featuresText(this)" style="width: 114px;height: auto;margin: 13% 38%;/* margin-right: 10px; */cursor: pointer;">
                <a style="/* display: inline-block; */position: absolute;font-size: 20px;font-weight: bold;bottom: 0;margin: 12px 20px;right: 0;">高山茶，是指在海拔1000公尺以上茶園，所摘取製作的茶葉。高山茶由於生長高度高、採收慢，因此茶葉苦澀度較低。近年來成為台灣最具知名度茶品，可見其品質優良。</a>
                <a style="position: absolute;font-size: 20px;font-weight: bold;top: 0;margin: 24px 29px;right: 0;z-index: 10;background-color: #3fcd96c2;border-radius: 20px;padding-left: 20px;padding-right: 20px;padding-bottom: 5px;padding-top: 5px;">南投地區</a>
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
                iconRegion.style.visibility = "visible";
                iconDiv.innerHTML = `<img onclick="returnBMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
                <img src="./image/icon/meat_rice.png" onclick="featuresText(this)" style="width: 114px;height: auto;margin: 13% 38%;/* margin-right: 10px; */cursor: pointer;">
                <a style="/* display: inline-block; */position: absolute;font-size: 20px;font-weight: bold;bottom: 0;margin: 12px 20px;right: 0;">嘉義火雞肉飯，是嘉義地區知名小吃之一。選用火雞肉當作素材，而雞汁是以全雞蒸煮所熬成的醬汁，加上酥炸過紅蔥頭的豬油，混合雞肉和白飯攪拌，味道香而不膩。</a>
                <a style="position: absolute;font-size: 20px;font-weight: bold;top: 0;margin: 24px 29px;right: 0;z-index: 10;background-color: #f9530bc2;border-radius: 20px;padding-left: 20px;padding-right: 20px;padding-bottom: 5px;padding-top: 5px;">嘉義地區</a>
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
                iconRegion.style.visibility = "visible";
                iconDiv.innerHTML = `<img onclick="returnBMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
                <img src="./image/icon/temple.png" onclick="featuresText(this)" style="width: 114px;height: auto;margin: 10% 38%;/* margin-right: 10px; */cursor: pointer;">
                <a style="/* display: inline-block; */position: absolute;font-size: 20px;font-weight: bold;bottom: 0;margin: 12px 20px;right: 0;">赤崁樓又作赤崁樓，位於臺南市的中西區。前身為1653年荷治時期於赤崁行省興建之歐式城塞，又稱「普羅民遮城」，在地人稱為「番仔樓」，曾為全台灣島的商業中心。</a>
                <a style="position: absolute;font-size: 20px;font-weight: bold;top: 0;margin: 24px 29px;right: 0;z-index: 10;background-color: #f9530bc2;border-radius: 20px;padding-left: 20px;padding-right: 20px;padding-bottom: 5px;padding-top: 5px;">台南地區</a>
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
                iconRegion.style.visibility = "visible";
                iconDiv.innerHTML = `<img onclick="returnBMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
                <img src="./image/icon/85building.png" onclick="featuresText(this)" style="width: 77px;height: auto;margin: 9% 43%;/* margin-right: 10px; */cursor: pointer;">
                <a style="/* display: inline-block; */position: absolute;font-size: 20px;font-weight: bold;bottom: 0;margin: 12px 20px;right: 0;">85大樓，位於高雄市苓雅區，外觀如同高字，為高雄第一高樓，且有世界第三的高速電梯，為台灣第二高的摩天大樓。</a>
                <a style="position: absolute;font-size: 20px;font-weight: bold;top: 0;margin: 24px 29px;right: 0;z-index: 10;background-color: #f9530bc2;border-radius: 20px;padding-left: 20px;padding-right: 20px;padding-bottom: 5px;padding-top: 5px;">高雄地區</a>
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
                iconRegion.style.visibility = "visible";
                iconDiv.innerHTML = `<img onclick="returnBMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
                <img src="./image/icon/black_tuna.png" onclick="featuresText(this)" style="width: 131px;height: auto;margin: 17% 34%;/* margin-right: 10px; */cursor: pointer;">
                <a style="/* display: inline-block; */position: absolute;font-size: 20px;font-weight: bold;bottom: 0;margin: 12px 20px;right: 0;">黑鮪魚因其體背色黑如墨，身型大如甕，所以一向俗稱『黑甕串』，再因其經濟價值極高，亦有『海中黑金』之稱謂。</a>
                <a style="position: absolute;font-size: 20px;font-weight: bold;top: 0;margin: 24px 29px;right: 0;z-index: 10;background-color: #f9530bc2;border-radius: 20px;padding-left: 20px;padding-right: 20px;padding-bottom: 5px;padding-top: 5px;">屏東地區</a>
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
                iconRegion.style.visibility = "visible";
                iconDiv.innerHTML = `<img onclick="returnBMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
                <img src="./image/icon/Sanxing_green_onion.png" onclick="featuresText(this)" style="width: 131px;height: auto;margin: 17% 34%;/* margin-right: 10px; */cursor: pointer;">
                <a style="/* display: inline-block; */position: absolute;font-size: 20px;font-weight: bold;bottom: 0;margin: 12px 20px;right: 0;">三星蔥，也稱青蔥。蔥白長、質地細緻、蔥味香濃，名列『三星四寶』之一，品質更是全台之冠。</a>
                <a style="position: absolute;font-size: 20px;font-weight: bold;top: 0;margin: 24px 29px;right: 0;z-index: 10;background-color: #f90b898f;border-radius: 20px;padding-left: 20px;padding-right: 20px;padding-bottom: 5px;padding-top: 5px;">宜蘭地區</a>
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
                iconRegion.style.visibility = "visible";
                iconDiv.innerHTML = `<img onclick="returnBMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
                <img src="./image/icon/watermelon.png" onclick="featuresText(this)" style="width: 109px;height: auto;margin: 15% 38%;/* margin-right: 10px; */cursor: pointer;">
                <a style="/* display: inline-block; */position: absolute;font-size: 20px;font-weight: bold;bottom: 0;margin: 12px 20px;right: 0;">大西瓜，主要分布種植在秀姑巒溪、萬里溪、壽豐溪等流域河床地區，環境自然潔淨，並富含養分，讓西瓜的口感「沙甜」且「清脆」!</a>
                <a style="position: absolute;font-size: 20px;font-weight: bold;top: 0;margin: 24px 29px;right: 0;z-index: 10;background-color: #00c9ffad;border-radius: 20px;padding-left: 20px;padding-right: 20px;padding-bottom: 5px;padding-top: 5px;">花蓮地區</a>
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
                iconRegion.style.visibility = "visible";
                // 改iconDiv變寬
                iconDiv.style.width = "450px"
                iconDiv.style.margin = "10% 25%"

                iconDiv.innerHTML = `<img onclick="returnBMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
                <img src="./image/icon/hot_air_balloon.png" onclick="featuresText(this)" style="width: 145px;height: auto;margin: 7% 35%;/* margin-right: 10px; */cursor: pointer;">
                <a style="/* display: inline-block; */position: absolute;font-size: 20px;font-weight: bold;bottom: 0;margin: 12px 20px;right: 0;">熱氣球，是將氣球內的氣體用瓦斯加熱，使氣球往高空飄浮。每年6月至8月，台東縣鹿野鄉所舉辦的臺灣國際熱氣球嘉年華，可以坐在熱氣球上觀賞花東縱谷的美景。</a>
                <a style="position: absolute;font-size: 20px;font-weight: bold;top: 0;margin: 24px 29px;right: 0;z-index: 10;background-color: #00c9ffad;border-radius: 20px;padding-left: 20px;padding-right: 20px;padding-bottom: 5px;padding-top: 5px;">台東地區</a>
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