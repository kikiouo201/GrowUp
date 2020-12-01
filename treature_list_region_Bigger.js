const iconRegion = document.querySelector('#iconDiv')
const iconDiv = document.querySelector('.iconDiv')
const featureDIV = document.querySelector("#FeatureIcon")
const mapIconDIV = document.querySelector("#MapIcon")

function RegionIcon(featureIcon) {

    switch (featureIcon) {
        case "基隆游輪":
            const Klung = document.querySelector('.Keelung_icon_B')
            var picKL = Klung.src;
            console.log("picKL -> " + picKL)
            if (picKL.indexOf('dark.png') === -1) { //找不到dark
                console.log("picKL 1 -> " + picKL)
                iconRegion.style.visibility = "visible";
                iconDiv.style.height = '260px';
                playNorth(Klung);
                iconDiv.innerHTML = `<img onclick="returnBMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
                    <img src="./image/icon/oceanliner.png" style="width: 147px;height: auto;margin: 8% 33%;/* margin-right: 10px; */cursor: pointer;">
                    <img style='position: absolute; top: 70px; left: 20px;  height: 50px' src="./image/character/muted.png" onclick="mute()" />
                    <img style='position: absolute; top: 70px; right: 20px;  height: 45px' src="./icons/speaker.png" alt="keelung_f1" onclick="playNorth(this)" />                        
                    <a style="/* display: inline-block; */position: absolute;font-size: 20px;font-weight: bold;bottom: 0;margin: 12px 20px;right: 0;">遊輪，又稱郵輪，特色在於悠閒浪漫，且提供旅遊及娛樂，像是一艘航行在海上的五星級大型度假飯店。</a>
                    <a style="position: absolute;font-size: 20px;font-weight: bold;top: 0;margin: 24px 29px;right: 0;z-index: 10;background-color: #f90b898f;border-radius: 20px;padding-left: 20px;padding-right: 20px;padding-bottom: 5px;padding-top: 5px;">基隆地區</a>
                    <br><br>`

            } else {
                console.log("picKL 2 -> " + picKL)
                playNorth(Klung);
                setTimeout(() => {
                    document.location.href = './view/level/keelung.html'
                }, 1000)
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
                iconDiv.style.height = '280px';
                playNorth(TP101);
                iconDiv.innerHTML = `<img onclick="returnBMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
                <img src="./image/icon/taipei101.png" style="width: 147px;height: auto;margin: 8% 33%;/* margin-right: 10px; */cursor: pointer;">
                <img style='position: absolute; top: 70px; left: 20px;  height: 50px' src="./image/character/muted.png" onclick="mute()" />
                <img style='position: absolute; top: 70px; right: 20px;  height: 45px' src="./icons/speaker.png" alt="taipei_f1" onclick="playNorth(this)" />
                <a style="/* display: inline-block; */position: absolute;font-size: 20px;font-weight: bold;bottom: 0;margin: 12px 20px;right: 0;">台北101大樓，位於臺北市信義區，是台灣第一高樓以及唯一樓層超過100層的建築物，是臺北重要地標之一。</a>
                <a style="position: absolute;font-size: 20px;font-weight: bold;top: 0;margin: 24px 29px;right: 0;z-index: 10;background-color: #f90b898f;border-radius: 20px;padding-left: 20px;padding-right: 20px;padding-bottom: 5px;padding-top: 5px;">台北地區</a>
                <br><br>`
            } else {
                console.log("picTP 2 -> " + picTP)
                playNorth(TP101);
                setTimeout(() => {
                    document.location.href = './view/level/taipei.html'
                }, 1000)
            }

            break;

        case "新北鶯歌陶瓷":
            const newTp = document.querySelector('.NewTaipei_icon_B')
            var picNTP = newTp.src;
            console.log("picNTP -> " + picNTP)
            if (picNTP.indexOf('dark.png') === -1) { //找不到dark
                console.log("picNTP 1 -> " + picNTP)
                iconRegion.style.visibility = "visible";
                iconDiv.style.height = '310px';
                playNorth(newTp);
                iconDiv.innerHTML = `<img onclick="returnBMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
                <img src="./image/icon/NewTaipei_icon.png" style="width: 120px;height: auto;margin: 8% 36%;/* margin-right: 10px; */cursor: pointer;">
                <img style='position: absolute; top: 70px; left: 20px;  height: 50px' src="./image/character/muted.png" onclick="mute()" />
                <img style='position: absolute; top: 70px; right: 20px;  height: 45px' src="./icons/speaker.png" alt="newTaipei_f1" onclick="playNorth(this)" />
                <a style="/* display: inline-block; */position: absolute;font-size: 20px;font-weight: bold;bottom: 0;margin: 12px 20px;right: 0;">陶瓷，是新北市鶯歌區最著名的特產。相傳清朝嘉慶年間發現尖山地區盛產黏土，於是就設窯製陶。現多已轉向觀光化發展。</a>
                <a style="position: absolute;font-size: 20px;font-weight: bold;top: 0;margin: 24px 29px;right: 0;z-index: 10;background-color: #f90b898f;border-radius: 20px;padding-left: 20px;padding-right: 20px;padding-bottom: 5px;padding-top: 5px;">新北地區</a>
                <br><br>`
            } else {
                console.log("picNTP 2 -> " + picNTP)
                playNorth(newTp);
                setTimeout(() => {
                    document.location.href = './view/level/newTaipei.html'
                }, 1000)
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
                iconDiv.style.height = '285px';
                playNorth(taoY);
                iconDiv.innerHTML = `<img onclick="returnBMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
                <img src="./image/icon/togan.png" style="width: 155px;height: auto;margin: 7% 32%;/* margin-right: 10px; */cursor: pointer;">
                <img style='position: absolute; top: 70px; left: 20px;  height: 50px' src="./image/character/muted.png" onclick="mute()" />
                <img style='position: absolute; top: 70px; right: 20px;  height: 45px' src="./icons/speaker.png" alt="taoyuan_f1" onclick="playNorth(this)" />
                <a style="/* display: inline-block; */position: absolute;font-size: 20px;font-weight: bold;bottom: 0;margin: 12px 20px;right: 0;">大溪豆乾，是桃園市大溪區知名的地方特產。特色是黑豆干，外皮厚而黑，整體口感較白豆乾更加硬實，味道也更加重。</a>
                <a style="position: absolute;font-size: 20px;font-weight: bold;top: 0;margin: 24px 29px;right: 0;z-index: 10;background-color: #f90b898f;border-radius: 20px;padding-left: 20px;padding-right: 20px;padding-bottom: 5px;padding-top: 5px;">桃園地區</a>
                <br><br>`
            } else {
                console.log("picTao 2 -> " + picTao)
                playNorth(taoY);
                setTimeout(() => {
                    document.location.href = './view/level/taoyuan.html'
                }, 1000)

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
                iconDiv.style.height = '285px';
                playNorth(HsinC);
                iconDiv.innerHTML = `<img onclick="returnBMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
                <img src="./image/icon/pork_ball.png" style="width: 131px;height: auto;margin: 17% 34%;/* margin-right: 10px; */cursor: pointer;">
                <img style='position: absolute; top: 70px; left: 20px;  height: 50px' src="./image/character/muted.png" onclick="mute()" />
                <img style='position: absolute; top: 70px; right: 20px;  height: 45px' src="./icons/speaker.png" alt="hsinchu_f1" onclick="playNorth(this)" />
                <a style="/* display: inline-block; */position: absolute;font-size: 20px;font-weight: bold;bottom: 0;margin: 12px 20px;right: 0;">貢丸，為豬肉製作的種肉丸。新竹的貢丸特別有名，而新竹貢丸的材料必須用新鮮溫體豬肉製作。</a>
                <a style="position: absolute;font-size: 20px;font-weight: bold;top: 0;margin: 24px 29px;right: 0;z-index: 10;background-color: #f90b898f;border-radius: 20px;padding-left: 20px;padding-right: 20px;padding-bottom: 5px;padding-top: 5px;">新竹地區</a>
                <br><br>`

            } else {
                console.log("picHsinC 2 -> " + picHsinC)
                playNorth(HsinC);
                setTimeout(() => {
                    document.location.href = './view/level/hsinchu.html'
                }, 1000)
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
                iconDiv.style.height = '300px';
                playCentral(MiaoL);
                iconDiv.innerHTML = `<img onclick="returnBMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
                <img src="./image/icon/strawberry.png" style="width: 127px;height: auto;margin: 55px 34%;/* margin-right: 10px; */cursor: pointer;">
                <img style='position: absolute; top: 70px; left: 20px;  height: 50px' src="./image/character/muted.png" onclick="mute()" />
                <img style='position: absolute; top: 70px; right: 20px;  height: 45px' src="./icons/speaker.png" alt="miaoli_f1" onclick="playCentral(this)" />
                <a style="/* display: inline-block; */position: absolute;font-size: 20px;font-weight: bold;bottom: 0;margin: 20px 20px;right: 0;">大湖草莓，是苗栗縣大湖鄉的特產，氣候溫和多雨，以草莓聞名全國，具有臺灣草莓王國雅號。</a>
                <a style="position: absolute;font-size: 20px;font-weight: bold;top: 0;margin: 24px 29px;right: 0;z-index: 10;background-color: #3fcd96c2;border-radius: 20px;padding-left: 20px;padding-right: 20px;padding-bottom: 5px;padding-top: 5px;">苗栗地區</a>
                <br><br>`

            } else {
                console.log("picMiaoL 2 -> " + picMiaoL)
                playCentral(MiaoL);
                setTimeout(() => {
                    document.location.href = './view/level/miaoli.html'
                }, 1000)

            }
            break;

        case "台中太陽餅":
            const TaiC = document.querySelector('.Taichung_icon_B')
            var picTaiC = TaiC.src;
            console.log("picTaiC -> " + picTaiC)
            if (picTaiC.indexOf('dark.png') === -1) { //找不到dark
                console.log("picTaiC 1 -> " + picTaiC)
                iconRegion.style.visibility = "visible";
                iconDiv.style.height = '280px'
                playCentral(TaiC);
                iconDiv.innerHTML = `<img onclick="returnBMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
                <img src="./image/icon/suncake.png" style="width: 180px;height: auto;margin: 14% 28%;/* margin-right: 10px; */cursor: pointer;">
                <img style='position: absolute; top: 70px; left: 20px;  height: 50px' src="./image/character/muted.png" onclick="mute()" />
                <img style='position: absolute; top: 70px; right: 20px;  height: 45px' src="./icons/speaker.png" alt="taichung_f1" onclick="playCentral(this)" />
                <a style="/* display: inline-block; */position: absolute;font-size: 20px;font-weight: bold;bottom: 0;margin: 20px 20px;right: 0;">太陽餅，一種甜餡薄餅，通常內餡是麥芽糖，為中臺灣的名產之一。</a>
                <a style="position: absolute;font-size: 20px;font-weight: bold;top: 0;margin: 24px 29px;right: 0;z-index: 10;background-color: #3fcd96c2;border-radius: 20px;padding-left: 20px;padding-right: 20px;padding-bottom: 5px;padding-top: 5px;">台中地區</a>
                <br><br>`
            } else {
                console.log("picTaiC 2 -> " + picTaiC)
                playCentral(TaiC);
                setTimeout(() => {
                    document.location.href = './view/level/taichung.html'
                }, 1000)
            }
            break;


        case "彰化肉圓":
            const ChangH = document.querySelector('.Changhua_icon_B')
            var picChangH = ChangH.src;
            console.log("picChangH -> " + picChangH)
            if (picChangH.indexOf('dark.png') === -1) { //找不到dark
                console.log("picChangH 1 -> " + picChangH)
                iconRegion.style.visibility = "visible";
                iconDiv.style.width = '420px';
                iconDiv.style.height = '290px';
                playCentral(ChangH);
                iconDiv.innerHTML = `<img onclick="returnBMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
                <img src="./image/icon/meat_ball_B.png" style="width: 180px;height: auto;margin: 17% 29%;/* margin-right: 10px; */cursor: pointer;">
                <img style='position: absolute; top: 70px; left: 20px;  height: 50px' src="./image/character/muted.png" onclick="mute()" />
                <img style='position: absolute; top: 70px; right: 20px;  height: 45px' src="./icons/speaker.png" alt="changhua_f1" onclick="playCentral(this)"/>
                <a style="/* display: inline-block; */position: absolute;font-size: 20px;font-weight: bold;bottom: 0;margin: 20px 20px;right: 0;">彰化肉圓，彰化特色小吃。當地特色為涼式的吃法，將蒸好的肉圓放冷後，再放到冰涼的湯水裡面，夏天吃的時候極為清爽。</a>
                <a style="position: absolute;font-size: 20px;font-weight: bold;top: 0;margin: 24px 29px;right: 0;z-index: 10;background-color: #3fcd96c2;border-radius: 20px;padding-left: 20px;padding-right: 20px;padding-bottom: 5px;padding-top: 5px;">彰化地區</a>
                <br><br>`
            } else {
                console.log("picChangH 2 -> " + picChangH)
                playCentral(ChangH);
                setTimeout(() => {
                    document.location.href = './view/level/changhua.html'
                }, 1000)

            }
            break;



        case "雲林西螺醬油":
            const YuLin = document.querySelector('.Yunlin_icon_B')
            var picYuLin = YuLin.src;
            console.log("picYuLin -> " + picYuLin)
            if (picYuLin.indexOf('dark.png') === -1) { //找不到dark
                console.log("picYuLin 1 -> " + picYuLin)
                iconRegion.style.visibility = "visible";
                playCentral(YuLin);
                iconDiv.innerHTML = `<img onclick="returnBMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
                <img src="./image/icon/soy_sauce.png" style="width: 98px;height: auto;margin: 13% 42%;/* margin-right: 10px; */cursor: pointer;">
                <img style='position: absolute; top: 70px; left: 20px;  height: 50px' src="./image/character/muted.png" onclick="mute()" />
                <img style='position: absolute; top: 70px; right: 20px;  height: 45px' src="./icons/speaker.png" alt="yunlin_f1" onclick="playCentral(this)" />
                <a style="/* display: inline-block; */position: absolute;font-size: 20px;font-weight: bold;bottom: 0;margin: 20px 20px;right: 0;">西螺醬油，是雲林重要的特產，因為水質、溫度和濕度的合適，雲林西螺號稱臺灣的「醬油王國」。</a>
                <a style="position: absolute;font-size: 20px;font-weight: bold;top: 0;margin: 24px 29px;right: 0;z-index: 10;background-color: #3fcd96c2;border-radius: 20px;padding-left: 20px;padding-right: 20px;padding-bottom: 5px;padding-top: 5px;">雲林地區</a>
                <br><br>`
            } else {
                console.log("picYuLin 2 -> " + picYuLin)
                playCentral(YuLin);
                setTimeout(() => {
                    document.location.href = './view/level/yunlin.html'
                }, 1000)

            }
            break;


        case "南投高山茶":
            const NanT = document.querySelector('.Nantou_icon_B')
            var picNanT = NanT.src;
            console.log("picNanT -> " + picNanT)
            if (picNanT.indexOf('dark.png') === -1) { //找不到dark
                console.log("picNanT 1 -> " + picNanT)
                iconRegion.style.visibility = "visible";
                iconDiv.style.height = '240px';
                playCentral(NanT);
                iconDiv.innerHTML = `<img onclick="returnBMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
                <img src="./image/icon/herbal_tea.png" style="width: 114px;height: auto;margin: 13% 38%;/* margin-right: 10px; */cursor: pointer;">
                <img style='position: absolute; top: 70px; left: 20px;  height: 50px' src="./image/character/muted.png" onclick="mute()" />
                <img style='position: absolute; top: 70px; right: 20px;  height: 45px' src="./icons/speaker.png" alt="nantou_f1" onclick="playCentral(this)" />
                <a style="/* display: inline-block; */position: absolute;font-size: 20px;font-weight: bold;bottom: 0;margin: 12px 20px;right: 0;">高山茶，是指在海拔1000公尺以上茶園，所摘取製作的茶葉。</a>
                <a style="position: absolute;font-size: 20px;font-weight: bold;top: 0;margin: 24px 29px;right: 0;z-index: 10;background-color: #3fcd96c2;border-radius: 20px;padding-left: 20px;padding-right: 20px;padding-bottom: 5px;padding-top: 5px;">南投地區</a>
                <br><br>`
            } else {
                console.log("picNanT 2 -> " + picNanT)
                playCentral(NanT);
                setTimeout(() => {
                    document.location.href = './view/level/nantou.html'
                }, 1000)

            }
            break;


        case "嘉義雞肉飯":
            const ChiaY = document.querySelector('.Chiayi_icon_B')
            var picChiaY = ChiaY.src;
            console.log("picChiaY -> " + picChiaY)
            if (picChiaY.indexOf('dark.png') === -1) { //找不到dark
                console.log("picChiaY 1 -> " + picChiaY)
                iconRegion.style.visibility = "visible";
                playSouth(ChiaY);
                iconDiv.innerHTML = `<img onclick="returnBMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
                <img src="./image/icon/meat_rice.png" style="width: 114px;height: auto;margin: 17% 38%;/* margin-right: 10px; */cursor: pointer;">
                <img style='position: absolute; top: 70px; left: 20px;  height: 50px' src="./image/character/muted.png" onclick="mute()" />
                <img style='position: absolute; top: 70px; right: 20px;  height: 45px' src="./icons/speaker.png" alt="chiayi_f1" onclick="playSouth(this)" />
                <a style="/* display: inline-block; */position: absolute;font-size: 20px;font-weight: bold;bottom: 0;margin: 12px 20px;right: 0;">嘉義火雞肉飯，是嘉義地區知名小吃之一。選用火雞肉當作素材，而雞汁是以全雞蒸煮所熬成的醬汁，加上酥炸過紅蔥頭的豬油，混合雞肉和白飯攪拌。</a>
                <a style="position: absolute;font-size: 20px;font-weight: bold;top: 0;margin: 24px 29px;right: 0;z-index: 10;background-color: #f9530bc2;border-radius: 20px;padding-left: 20px;padding-right: 20px;padding-bottom: 5px;padding-top: 5px;">嘉義地區</a>
                <br><br>`
            } else {
                console.log("picChiaY 2 -> " + picChiaY)
                playSouth(ChiaY);
                setTimeout(() => {
                    document.location.href = './view/level/chiayi.html'
                }, 1000)

            }
            break;


        case "台南赤崁樓":
            const TaiN = document.querySelector('.Tainan_icon_B')
            var picTaiN = TaiN.src;
            console.log("picTaiN -> " + picTaiN)
            if (picTaiN.indexOf('dark.png') === -1) { //找不到dark
                console.log("picTaiN 1 -> " + picTaiN)
                iconRegion.style.visibility = "visible";
                iconDiv.style.height = '265px';
                playSouth(TaiN);
                iconDiv.innerHTML = `<img onclick="returnBMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
                <img src="./image/icon/temple.png" style="width: 114px;height: auto;margin: 10% 38%;/* margin-right: 10px; */cursor: pointer;">
                <img style='position: absolute; top: 70px; left: 20px;  height: 50px' src="./image/character/muted.png" onclick="mute()" />
                <img style='position: absolute; top: 70px; right: 20px;  height: 45px' src="./icons/speaker.png" alt="tainan_f1" onclick="playSouth(this)" />
                <a style="/* display: inline-block; */position: absolute;font-size: 20px;font-weight: bold;bottom: 0;margin: 12px 20px;right: 0;">赤崁樓，位於臺南市的中西區，又作赤崁樓，又稱「普羅民遮城」，在地人稱為「番仔樓」，曾為全台灣島的商業中心。</a>
                <a style="position: absolute;font-size: 20px;font-weight: bold;top: 0;margin: 24px 29px;right: 0;z-index: 10;background-color: #f9530bc2;border-radius: 20px;padding-left: 20px;padding-right: 20px;padding-bottom: 5px;padding-top: 5px;">台南地區</a>
                <br><br>`
            } else {
                console.log("picTaiN 2 -> " + picTaiN)
                playSouth(TaiN);
                setTimeout(() => {
                    document.location.href = './view/level/tainan.html'
                }, 1000)

            }
            break;

        case "高雄85大樓":
            const KaoS = document.querySelector('.Kaohsiung_icon_B')
            var picKaoS = KaoS.src;
            console.log("picKaoS -> " + picKaoS)
            if (picKaoS.indexOf('dark.png') === -1) { //找不到dark
                console.log("picKaoS 1 -> " + picKaoS)
                iconRegion.style.visibility = "visible";
                iconDiv.style.height = '300px'
                playSouth(KaoS);
                iconDiv.innerHTML = `<img onclick="returnBMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
                <img src="./image/icon/85building.png" style="width: 77px;height: auto;margin: 9% 43%;/* margin-right: 10px; */cursor: pointer;">
                <img style='position: absolute; top: 70px; left: 20px;  height: 50px' src="./image/character/muted.png" onclick="mute()" />
                <img style='position: absolute; top: 70px; right: 20px;  height: 45px' src="./icons/speaker.png" alt="kaohsiung_f1" onclick="playSouth(this)" />
                <a style="/* display: inline-block; */position: absolute;font-size: 20px;font-weight: bold;bottom: 0;margin: 12px 20px;right: 0;">85大樓，位於高雄市苓雅區，外觀如同高字，為高雄第一高樓，且有世界第三的高速電梯，為台灣第二高的摩天大樓。</a>
                <a style="position: absolute;font-size: 20px;font-weight: bold;top: 0;margin: 24px 29px;right: 0;z-index: 10;background-color: #f9530bc2;border-radius: 20px;padding-left: 20px;padding-right: 20px;padding-bottom: 5px;padding-top: 5px;">高雄地區</a>
                <br><br>`
            } else {
                console.log("picKaoS 2 -> " + picKaoS)
                playSouth(KaoS);
                setTimeout(() => {
                    document.location.href = './view/level/kaohsiung.html'
                }, 1000)

            }
            break;

        case "屏東黑鮪魚":
            const PingT = document.querySelector('.Pingtung_icon_B')
            var picPingT = PingT.src;
            console.log("picPingT -> " + picPingT)
            if (picPingT.indexOf('dark.png') === -1) { //找不到dark
                console.log("picPingT 1 -> " + picPingT)
                iconRegion.style.visibility = "visible";
                // iconDiv.style.margin = "10% 34%";
                iconDiv.style.height = '260px';
                playSouth(PingT);
                iconDiv.innerHTML = `<img onclick="returnBMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
                <img src="./image/icon/black_tuna.png" style="width: 131px;height: auto;margin: 13% 34%;/* margin-right: 10px; */cursor: pointer;">
                <img style='position: absolute; top: 70px; left: 20px;  height: 50px' src="./image/character/muted.png" onclick="mute()" />
                <img style='position: absolute; top: 70px; right: 20px;  height: 45px' src="./icons/speaker.png" alt="pingtung_f1" onclick="playSouth(this)" />
                <a style="/* display: inline-block; */position: absolute;font-size: 20px;font-weight: bold;bottom: 0;margin: 12px 20px;right: 0;">黑鮪魚因其體背色黑如墨，身型大如甕，所以一向俗稱『黑甕串』，再因其經濟價值極高，亦有『海中黑金』之稱謂。</a>
                <a style="position: absolute;font-size: 20px;font-weight: bold;top: 0;margin: 24px 29px;right: 0;z-index: 10;background-color: #f9530bc2;border-radius: 20px;padding-left: 20px;padding-right: 20px;padding-bottom: 5px;padding-top: 5px;">屏東地區</a>
                <br><br>`
            } else {
                console.log("picPingT 2 -> " + picPingT)
                playSouth(PingT);
                setTimeout(() => {
                    document.location.href = './view/level/pingtung.html'
                }, 1000)

            }
            break;

        case "宜蘭三星蔥":
            const YiL = document.querySelector('.Yilan_icon_B')
            var picYiL = YiL.src;
            console.log("picYiL -> " + picYiL)
            if (picYiL.indexOf('dark.png') === -1) { //找不到dark
                console.log("picYiL 1 -> " + picYiL)
                iconRegion.style.visibility = "visible";
                iconDiv.style.height = '300px';
                playNorth(YiL);
                iconDiv.innerHTML = `<img onclick="returnBMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
                <img src="./image/icon/Sanxing_green_onion.png" style="width: 131px;height: auto;margin: 17% 34%;/* margin-right: 10px; */cursor: pointer;">
                <img style='position: absolute; top: 70px; left: 20px;  height: 50px' src="./image/character/muted.png" onclick="mute()" />
                <img style='position: absolute; top: 70px; right: 20px;  height: 45px' src="./icons/speaker.png" alt="yilan_f1" onclick="playNorth(this)" />
                <a style="/* display: inline-block; */position: absolute;font-size: 20px;font-weight: bold;bottom: 0;margin: 12px 20px;right: 0;">三星蔥，白又長、質地細緻、蔥味香濃，名列『三星四寶』之一，品質更是全台之冠。</a>
                <a style="position: absolute;font-size: 20px;font-weight: bold;top: 0;margin: 24px 29px;right: 0;z-index: 10;background-color: #f90b898f;border-radius: 20px;padding-left: 20px;padding-right: 20px;padding-bottom: 5px;padding-top: 5px;">宜蘭地區</a>
                <br><br>`
            } else {
                console.log("picYiL 2 -> " + picYiL)
                playNorth(YiL);
                setTimeout(() => {
                    document.location.href = './view/level/yilan.html'
                }, 1000)

            }
            break;

        case "花蓮西瓜":
            const HuaL = document.querySelector('.Hualien_icon_B')
            var picHuaL = HuaL.src;
            console.log("picHuaL -> " + picHuaL)
            if (picHuaL.indexOf('dark.png') === -1) { //找不到dark
                console.log("picHuaL 1 -> " + picHuaL)
                iconRegion.style.visibility = "visible";
                iconDiv.style.height = '260px';
                playEast(HuaL);
                iconDiv.innerHTML = `<img onclick="returnBMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
                <img src="./image/icon/watermelon.png" style="width: 109px;height: auto;margin: 15% 38%;/* margin-right: 10px; */cursor: pointer;">
                <img style='position: absolute; top: 70px; left: 20px;  height: 50px' src="./image/character/muted.png" onclick="mute()" />
                <img style='position: absolute; top: 70px; right: 20px;  height: 45px' src="./icons/speaker.png" alt="hualien_f1" onclick="playEast(this)" />
                <a style="/* display: inline-block; */position: absolute;font-size: 20px;font-weight: bold;bottom: 0;margin: 12px 20px;right: 0;">花蓮大西瓜，讓西瓜的口感「沙甜」且「清脆」!</a>
                <a style="position: absolute;font-size: 20px;font-weight: bold;top: 0;margin: 24px 29px;right: 0;z-index: 10;background-color: #00c9ffad;border-radius: 20px;padding-left: 20px;padding-right: 20px;padding-bottom: 5px;padding-top: 5px;">花蓮地區</a>
                <br><br>`
            } else {
                console.log("picHuaL 2 -> " + picHuaL)
                playEast(HuaL);
                setTimeout(() => {
                    document.location.href = './view/level/hualien.html'
                }, 1000)

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
                iconDiv.style.height = '310px';
                playEast(TaiT);
                iconDiv.innerHTML = `<img onclick="returnBMap()" src="./icons/return.png" style="width: 40px; position: absolute; top: 0px; padding-top: 20px; padding-left: 20px; cursor:pointer;">
                <img src="./image/icon/hot_air_balloon.png" style="width: 145px;height: auto;margin: 7% 35%;/* margin-right: 10px; */cursor: pointer;">
                <img style='position: absolute; top: 70px; left: 20px;  height: 50px' src="./image/character/muted.png" onclick="mute()" />
                <img style='position: absolute; top: 70px; right: 20px;  height: 45px' src="./icons/speaker.png" alt="taitung_f1" onclick="playEast(this)" />
                <a style="/* display: inline-block; */position: absolute;font-size: 20px;font-weight: bold;bottom: 0;margin: 12px 20px;right: 0;">熱氣球，是將氣球內的空氣用加熱，使氣球往高空飄浮。每年6月至8月，台東縣鹿野鄉舉辦的臺灣國際熱氣球嘉年華，可以坐在熱氣球上觀賞花東縱谷的美景。</a>
                <a style="position: absolute;font-size: 20px;font-weight: bold;top: 0;margin: 24px 29px;right: 0;z-index: 10;background-color: #00c9ffad;border-radius: 20px;padding-left: 20px;padding-right: 20px;padding-bottom: 5px;padding-top: 5px;">台東地區</a>
                <br><br>`
            } else {
                console.log("picTaiT 2 -> " + picTaiT)
                playEast(TaiT);
                setTimeout(() => {
                    document.location.href = './view/level/taitung.html'
                }, 1000)

            }
            break;


    }
}

function returnBMap() {
    console.log(featureDIV)
    featureDIV.style.display = "none";
    console.log(featureDIV.style.display)
    mapIconDIV.style.display = "block";

    iconRegion.style.visibility = "hidden";

}