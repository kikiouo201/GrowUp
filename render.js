let { ipcRenderer } = require('electron');
// const api = require('./node/model/api');
const request = require('request')
const cheerio = require('cheerio')
const encoding = require('encoding');
const iconv = require('iconv-lite');

let ShowVisibility = document.querySelector('.QA_card_area');
let ImgVisibility = document.querySelector('#AnsImg');
let stream = document.querySelector('#stream');
let QA_card = document.getElementById("QA_card")

const createQA = (text1, text2, bookName, bookImg, bookExplain) => `
                                            <div class="card text-white  mb-3" style="background-color: #92337eba;">
                                                <div class="card-body" style="margin-top: 30px;">
                                                <img class="collect_LeftTop" onclick="mute()" src="image/character/muted.png">
                                                    <div style="margin-left: 5px;">
                                                        <img id="AnsImg" src="./still-image.jpg">
                                                    </div>
                                                    <div style="float:left; display: block; text-align: left;">
                                                        <p id="Ans" class="card-text card_A" style="float: left;">答案：</p>
                                                        <p id="AnsTxt" class="card-text card_A" style="margin-left: 0px;margin-bottom: 0px;">${text1}</p>
                                                        <img class="speaker_Que" onclick="cameraPlay(this)" id="AnsVoice" src="icons/speaker.png" />
                                                    </div>

                                                    <div style="float:left; display: block; text-align: left;">
                                                        <p id="explain" class="card-text card_A" style="float: left;">敘述：</p>
                                                        <p id="explainTxt" class="card-text card_A" style="margin-left: 0px;">${text2}</p>
                                                        <img class="speaker_Ans" onclick="cameraPlay(this)" id="ContentVoice" src="icons/speaker.png" />
                                                    </div>
                                                </div>
                                                <div class="card-header contentCss" id="QA_num_" style="background-color: #f8f9fa24; height: auto">
                                                    <p class="contentlink">相關繪本連結：</p>
                                                    <p class="book_css">${bookName}</p>
                                                    <img class="picture_Name" onclick="cameraPlay(this)" id="picture_Name" src="icons/speaker.png" />
                                                    <img id="bookImg" src="${bookImg}" style="margin-left: 25%; padding: 10px;" width="180" height="153" alt="蘋果甜蜜蜜">
                                                    <p id="bookExplain" style="display: inline-block; margin-left: 20px; margin-right: 40px; font-size: 18pt;">${bookExplain}</p>
                                                    <img class="picture_Explain" onclick="cameraPlay(this)" id="picture_Explain" src="icons/speaker.png" />
                                                </div>
                                            

                                            </div>`


let identifyBtn = document.querySelector('#identify');


var answer, explain;
if (identifyBtn) {
    identifyBtn.addEventListener('click', () => {
        ipcRenderer.send('close-mjpg-streamer')
        // ipcRenderer.send('vision')
            // ipcRenderer.send('captrue');
            // ipcRenderer.send('call-writeDead')
        ipcRenderer.on('reply-close-mjpg-streamer', (event, data) => {
            document.getElementById('leadTxt').innerHTML = "拍照中。。。";

            console.log('ready');
            ipcRenderer.send('captrue');
        })

        ipcRenderer.on('reply-mainjsfunction-captrue', (event, data) => {
            console.log("hihi");
            stream.style.display = "none";
            document.getElementById('leadTxt').innerHTML = "讀取照片。。。";
            ipcRenderer.send('vision');
            
            // ipcRenderer.send('call-writeDead')
        })


        ipcRenderer.on('reply-visionready', (event, data) => {
            document.getElementById('leadTxt').innerHTML = "辨識中。。。";
            ipcRenderer.send('vision-start');
        })

        ipcRenderer.on('reply-mainjsfunction', (event, data, TTS) => {
            let voiceAns = document.getElementById('AnsVoice');
            voiceAns.alt = TTS;
            console.log('ans voice name:' + TTS);

            ipcRenderer.send('crawler', data)
                // ipcRenderer.send('camera-searchPictureBook', data)
            answer = data;
            // data.forEach(label => all+="\nyo="+label);
        })
        ipcRenderer.on('reply-writeDead', (event, data) => {
            console.log("writeDead");
            ipcRenderer.send('sendWriteDeadtoServer')
            ShowVisibility.style.display = "block";
            ImgVisibility.style.display = "block";
            stream.style.display = "none";

            document.getElementById('leadTxt').innerHTML = "辨識成功!!";
            document.getElementById('AnsImg').src = "./still-image.jpg"
            QA_card.innerHTML = createQA("蘋果", "落業喬木。葉軟形，邊緣有細尖鋸齒。果實球形，味美，可食，也可製酒。", "環遊世界做蘋果派", "https://children.moc.gov.tw/resource/animate_image/6850.jpg", "要怎樣認識「國家」呢？每一個國家總有不同的、具代表性的文物、景物、建築或美食，在環遊世界一周後，可以帶回的東西，會是不同的明信片、紀念品，還有好吃特產呢")
            let cameraPreset = {
                'ans': '蘋果',
                'content': '落業喬木。葉軟形，邊緣有細尖鋸齒。果實球形，味美，可食，也可製酒。',
                'picName_camera': '環遊世界做蘋果派',
                'picIntro_camera': '要怎樣認識「國家」呢？每一個國家總有不同的、具代表性的文物、景物、建築或美食，在環遊世界一周後，可以帶回的東西，會是不同的明信片、紀念品，還有好吃特產呢',
                'ansV': '',
                'contentV': '',
                'picName_cameraV': '',
                'picIntro_cameraV': '',
            }
            ipcRenderer.send('cameraPreset', cameraPreset);
            ipcRenderer.once('replyPresetCamera', (event, cameraPre) => {
                console.log('cameraPre:' + cameraPre['ans'])
                let voiceAns = document.getElementById('AnsVoice');
                voiceAns.alt = cameraPre['ansV'];
                let voiceCon = document.getElementById('ContentVoice');
                voiceCon.alt = cameraPre['contentV'];
                let voicePicName = document.getElementById('picture_Name');
                voicePicName.alt = cameraPre['picName_cameraV'];
                let voicePicExplain = document.getElementById('picture_Explain');
                voicePicExplain.alt = cameraPre['picIntro_cameraV'];
            })
        })


        ipcRenderer.on('reply-webcrawlerfunction', (event, data) => {
            console.log("addQAtoServer", answer);
            explain = data;
            let cameraWebcrawler = {
                'ans': answer,
                'content': data,
                'picName_camera': '',
                'picIntro_camera': '',
                'ansV': '',
                'contentV': '',
                'picName_cameraV': '',
                'picIntro_cameraV': '',
            }
            if (answer == undefined) {
                document.getElementById('leadTxt').innerHTML = "辨識失敗!!";
                document.getElementById('explainTxt').innerHTML = "";
            } else if (answer == "蘋果") {
                ShowVisibility.style.display = "block";
                ImgVisibility.style.display = "block";
                stream.style.display = "none";

                document.getElementById('leadTxt').innerHTML = "辨識成功!!";
                document.getElementById('AnsImg').src = "./still-image.jpg"
                QA_card.innerHTML = createQA(answer, explain, "環遊世界做蘋果派", "https://children.moc.gov.tw/resource/animate_image/6850.jpg", "要怎樣認識「國家」呢？每一個國家總有不同的、具代表性的文物、景物、建築或美食，在環遊世界一周後，可以帶回的東西，會是不同的明信片、紀念品，還有好吃特產呢")


                ipcRenderer.send('cameraWebcrawler', cameraWebcrawler);
                ipcRenderer.once('replyCameraWebC', (event, cameraCraw) => {
                    console.log('cameraCraw:' + cameraCraw['ans'])
                    let voiceAns = document.getElementById('AnsVoice');
                    voiceAns.alt = cameraCraw['ansV'];
                    let voiceCon = document.getElementById('ContentVoice');
                    voiceCon.alt = cameraCraw['contentV'];
                })

            } else if (answer == "西瓜") {
                ShowVisibility.style.display = "block";
                ImgVisibility.style.display = "block";
                stream.style.display = "none";
                document.getElementById('leadTxt').innerHTML = "辨識成功!!";
                document.getElementById('AnsImg').src = "./still-image.jpg"
                QA_card.innerHTML = createQA(answer, explain, "我是西瓜爸爸", "https://children.moc.gov.tw/resource/book_image/216128.jpg", "我一口咬下一大片西瓜，連黑色的西瓜子也吞進肚子裡，我的肚子會不會長出一顆又一顆的小西瓜？那麼，我就是西瓜爸爸囉！ ◆專家導讀：林文寶(國立台東師院兒童文學研究所所長)蕭蕭的詩早已獲得普遍的肯定，新作...")

            } else if (answer == "螢幕") {
                ShowVisibility.style.display = "block";
                ImgVisibility.style.display = "block";
                stream.style.display = "none";
                document.getElementById('leadTxt').innerHTML = "辨識成功!!";
                document.getElementById('AnsImg').src = "./still-image.jpg"
                QA_card.innerHTML = createQA(answer, explain, "查無此書目", "查無此書目", "查無此書目")

            } else if (answer == "椅子") {

                ShowVisibility.style.display = "block";
                ImgVisibility.style.display = "block";
                stream.style.display = "none";
                document.getElementById('leadTxt').innerHTML = "辨識成功!!";
                document.getElementById('AnsImg').src = "./still-image.jpg"
                QA_card.innerHTML = createQA(answer, explain, "當幸福來臨時：端張椅子給它坐", "https://children.moc.gov.tw/resource/book_image/216457.jpg", "十二歲的漢琳卡住在孤兒院裡，她從不向人提起自己的事，也沒有朋友。她最喜歡獨自躲在行李儲藏室裡，在記事本上寫下她想到的人生格言。為了不被欺負，她把自己武裝得很強悍、很乖僻、很冷漠，其實她渴望朋友、渴望...")

            } else if (answer == "水壺") {

                ShowVisibility.style.display = "block";
                ImgVisibility.style.display = "block";
                stream.style.display = "none";
                document.getElementById('leadTxt').innerHTML = "辨識成功!!";
                document.getElementById('AnsImg').src = "./still-image.jpg"
                QA_card.innerHTML = createQA(answer, explain, "冒煙的水壺   もくもくやかん", "https://children.moc.gov.tw/resource/book_image/230465.png", "日本TOP繪本作家加岳井 廣的科學知識繪本反映人們在瞬息萬變的自然環境中，仍然渴求美好的生活，想方設法的解決問題。大地乾裂又出大太陽，沒有水的生活大家都要原地蒸發啦！水壺、茶壺、紅色水壺、灑水壺和小...")

            } else if (answer == "剛筆") {

                ShowVisibility.style.display = "block";
                ImgVisibility.style.display = "block";
                stream.style.display = "none";
                document.getElementById('leadTxt').innerHTML = "辨識成功!!";
                document.getElementById('AnsImg').src = "./still-image.jpg"
                QA_card.innerHTML = createQA(answer, explain, "查無此書目", "查無此書目", "查無此書目")

            } else if (answer == "筆記本") {

                ShowVisibility.style.display = "block";
                ImgVisibility.style.display = "block";
                stream.style.display = "none";
                document.getElementById('leadTxt').innerHTML = "辨識成功!!";
                document.getElementById('AnsImg').src = "./still-image.jpg"
                QA_card.innerHTML = createQA(answer, explain, "地球筆記本", "https://children.moc.gov.tw/resource/animate_image/6952.png", "「地球號」列車上的小乘客，很幸運，拿的是童心票，坐的是自由座。喜歡聽列車長說的悄悄話，祈盼陽光、空氣、花和水都能長長久久，豐盈美好")
            } else if (answer == "滑鼠") {

                ShowVisibility.style.display = "block";
                ImgVisibility.style.display = "block";
                stream.style.display = "none";
                document.getElementById('leadTxt').innerHTML = "辨識成功!!";
                document.getElementById('AnsImg').src = "./still-image.jpg"
                QA_card.innerHTML = createQA(answer, explain, "查無此書目", "查無此書目", "查無此書目")
            } else if (answer == "手機") {

                ShowVisibility.style.display = "block";
                ImgVisibility.style.display = "block";
                stream.style.display = "none";
                document.getElementById('leadTxt').innerHTML = "辨識成功!!";
                document.getElementById('AnsImg').src = "./still-image.jpg"
                QA_card.innerHTML = createQA(answer, explain, pbook['bookName'], pbook['bookImg'], pbook['bookIntro'])
            } else if (answer == "筆記本電腦") {

                ShowVisibility.style.display = "block";
                ImgVisibility.style.display = "block";
                stream.style.display = "none";
                document.getElementById('leadTxt').innerHTML = "辨識成功!!";
                document.getElementById('AnsImg').src = "./still-image.jpg"
                QA_card.innerHTML = createQA(answer, explain, "查無此書目", "查無此書目", "查無此書目")
            } else if (answer == "眼鏡") {
                ShowVisibility.style.display = "block";
                ImgVisibility.style.display = "block";
                stream.style.display = "none";
                document.getElementById('leadTxt').innerHTML = "辨識成功!!";
                document.getElementById('AnsImg').src = "./still-image.jpg"
                QA_card.innerHTML = createQA(answer, explain, "查無此書目", "查無此書目", "查無此書目")
            } else if (answer == "香蕉") {
                ShowVisibility.style.display = "block";
                ImgVisibility.style.display = "block";
                stream.style.display = "none";
                document.getElementById('leadTxt').innerHTML = "辨識成功!!";
                document.getElementById('AnsImg').src = "./still-image.jpg"
                QA_card.innerHTML = createQA(answer, explain, "香蕉的秘密", "https://children.moc.gov.tw/resource/animate_image/6924.jpg", "從日本回到台灣的小表妹，第一次吃到不用沾蜂蜜就又香又甜的香蕉。但是過了幾天，香蕉皮上長出了黑點，是已經壞掉不能吃了嗎？這你就搞錯囉，香蕉皮上的黑點可是香蕉成熟的暗號呢！內容介紹香蕉的生長過程、香蕉的...")
            } else {
                ShowVisibility.style.display = "block";
                ImgVisibility.style.display = "block";
                stream.style.display = "none";
                document.getElementById('leadTxt').innerHTML = "辨識成功!!";
                document.getElementById('AnsImg').src = "./still-image.jpg"
                QA_card.innerHTML = createQA(answer, explain, pbook['bookName'], pbook['bookImg'], pbook['bookIntro'])

                ipcRenderer.send('cameraWebcrawler', cameraWebcrawler);
                ipcRenderer.once('replyCameraWebC', (event, cameraCraw) => {
                    console.log('cameraCraw:' + cameraCraw['ans'])
                    let voiceAns = document.getElementById('AnsVoice');
                    voiceAns.alt = cameraCraw['ansV'];
                    let voiceCon = document.getElementById('ContentVoice');
                    voiceCon.alt = cameraCraw['contentV'];
                })
            }
        })

        ipcRenderer.on('cameraReplyPbook', (event, pbook) => {
            // ipcRenderer.send('addQAtoServer')

        })


    })
}

function goHome(name) {
    var audioCreate = document.getElementById("AUDIO");
    audioCreate.setAttribute("src", `./TTS/mp3/${name}.mp3`);
    audioCreate.play();
}

function cameraPlay(cAlt) {
    var audioCreate = document.getElementById("AUDIO");
    let name = cAlt.alt
    audioCreate.setAttribute("src", `./TTS/mp3/STTpictureBook/${name}.mp3`);
    audioCreate.play();
}

function mute() {
    let mute = document.getElementById("AUDIO");
    mute.pause();
    mute.currentTime = 0;
}