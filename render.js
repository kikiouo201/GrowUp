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

const createQA = (text1, text2,bookName,bookImg,bookExplain) => `
                                            <div class="card text-white" style="background-color: #92337eba;">
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
                                                    <img class="picture_Name" onclick="cameraPlay(this)" id="picName" src="icons/speaker.png"/>
                                                    <img id="bookImg" src="${bookImg}" style="margin-left: 25%; padding: 10px;" width="180" height="153">
                                                    <p id="bookExplain" style="display: inline-block; margin-left: 20px; margin-right: 40px; font-size: 18pt;">${bookExplain}</p>
                                                    <img class="picture_Explain" onclick="cameraPlay(this)" id="picExplain" src="icons/speaker.png" />
                                                </div>
                                            

                                            </div>`
const createQA2 = (text1, text2) => ` <div class="card text-white" style="background-color: #92337eba; margin-bottom: 0px">
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

                                            </div>`
const createPbook = (bookName,bookImg,bookExplain) =>`<div class="card-header contentCss" id="QA_num_" style="background-color: #92337eba; height: auto">
                                                        <p class="contentlink" style="color: white;">相關繪本連結：</p>
                                                        <p class="book_css" >${bookName}</p>
                                                        <img class="picture_Name" onclick="cameraPlay(this)" id="picName" src="icons/speaker.png"/>
                                                        <img id="bookImg" src="${bookImg}" style="margin-left: 25%; padding: 10px;" width="180" height="153">
                                                        <p id="bookExplain" style="display: inline-block; margin-left: 20px; margin-right: 40px; font-size: 18pt; color: white;">${bookExplain}</p>
                                                        <img class="picture_Explain" onclick="cameraPlay(this)" id="picExplain" src="icons/speaker.png" />
                                                      </div>`

const createdeadPbook = (bookName) =>`<div class="card-header contentCss" id="QA_num_" style="background-color: #92337eba; height: auto">
                        <p class="contentlink">相關繪本連結：</p>
                        <p class="book_css">${bookName}</p>
                        <img class="picture_Name" onclick="cameraPlay(this)" id="picName" src="icons/speaker.png"/>
                    </div>`


let identifyBtn = document.querySelector('#identify');


var answer, explain;
if (identifyBtn) {
    identifyBtn.addEventListener('click', () => {
        // ipcRenderer.send('close-mjpg-streamer')
            ipcRenderer.send('vision')
            // ipcRenderer.send('captrue');
            // ipcRenderer.send('call-writeDead')
        ipcRenderer.on('reply-close-mjpg-streamer', (event, data) => {
            document.getElementById('leadTxt').innerHTML = "拍照中。。。";
            ShowVisibility.style.display = "none";
            ImgVisibility.style.display = "none";
            stream.style.display = "block";
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
            // stream.style.display = "none";
            document.getElementById('leadTxt').innerHTML = "辨識中。。。";
            ipcRenderer.send('vision-start');
        })

        ipcRenderer.on('reply-mainjsfunction', (event, data, TTS) => {
            let voiceAns = document.getElementById('AnsVoice');
            voiceAns.alt = TTS;
            console.log('ans voice name:' + TTS);

            ipcRenderer.send('crawler', data)
            ipcRenderer.send('camera-searchPictureBook', data)
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
            QA_card.innerHTML = createQA("蘋果", "植物名。薔薇科蘋果屬，落葉小喬木。葉卵形或橢圓形，先端尖或短，邊緣有細銳鋸齒。花淡紅色，萼有細毛。", "環遊世界做蘋果派", "https://children.moc.gov.tw/resource/animate_image/6850.jpg", "要怎樣認識「國家」呢？每一個國家總有不同的、具代表性的文物、景物、建築或美食，在環遊世界一周後，可以帶回的東西，會是不同的明信片、紀念品，還有好吃特產呢")
            let cameraPreset = {
                'ans': '蘋果',
                'content': '植物名。薔薇科蘋果屬，落葉小喬木。葉卵形或橢圓形，先端尖或短，邊緣有細銳鋸齒。花淡紅色，萼有細毛。',
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
                let voicePicName = document.getElementById('picName');
                voicePicName.alt = cameraPre['picName_cameraV'];
                let voicePicExplain = document.getElementById('picExplain');
                voicePicExplain.alt = cameraPre['picIntro_cameraV'];
            })
        })


        ipcRenderer.on('reply-webcrawlerfunction', (event, data) => {
            console.log("webcrawlerfunction", data);
            ShowVisibility.style.display = "block";
            ImgVisibility.style.display = "block";
            stream.style.display = "none";
            document.getElementById('AnsImg').src = "./still-image.jpg"
            explain = data;
            let QAjson = {
                'answer':answer,
                'content': explain
            }
            QA_card.innerHTML = createQA2(answer, explain)
            document.getElementById('leadTxt').innerHTML = "辨識成功!!";
            ipcRenderer.send('addQAtoServer',QAjson);
        })

        ipcRenderer.on('cameraReplyPbook', (event, cameraPB) => {
              
            let cameraWebcrawler = {
                'ans': answer,
                'content': explain,
                'picName_camera': cameraPB['bookName'],
                'picIntro_camera': cameraPB['bookIntro'],
                'ansV': '',
                'contentV': '',
                'picName_cameraV': '',
                'picIntro_cameraV': '',
            }
            console.log("picName_camera =>"+cameraWebcrawler['picName_camera'])
            console.log("picIntro_camera =>"+cameraWebcrawler['picIntro_camera'])
           
            ipcRenderer.send('cameraWebcrawler', cameraWebcrawler);
                ipcRenderer.once('replyCameraWebC', (event, cameraCraw) => {
                    console.log('cameraCraw:' + cameraCraw['picName_cameraV'])
                    let voiceAns = document.getElementById('AnsVoice');
                    voiceAns.alt = cameraCraw['ansV'];
                    let voiceCon = document.getElementById('ContentVoice');
                    voiceCon.alt = cameraCraw['contentV'];
                    let voicePicName = document.getElementById('picName');
                    voicePicName.alt = cameraCraw['picName_cameraV']
                    let voicePicExplain = document.getElementById('picExplain');
                    voicePicExplain.alt = cameraCraw['picIntro_cameraV'];
                })

            if (answer == undefined) {
                document.getElementById('leadTxt').innerHTML = "辨識失敗!!";
                document.getElementById('explainTxt').innerHTML = "";
            } else if (answer == "蘋果") {

                QA_card.innerHTML += createPbook(cameraPB['bookName'], cameraPB['bookImg'], cameraPB['bookIntro'])   

            } else if (answer == "西瓜") {

                QA_card.innerHTML += createPbook(cameraPB['bookName'], cameraPB['bookImg'], cameraPB['bookIntro'])

            }  else if (answer == "椅子") {

                QA_card.innerHTML += createPbook(cameraPB['bookName'], cameraPB['bookImg'], cameraPB['bookIntro'])

            } else if (answer == "水壺") {

                QA_card.innerHTML += createPbook(cameraPB['bookName'], cameraPB['bookImg'], cameraPB['bookIntro'])

            }  else if (answer == "筆記本") {

                QA_card.innerHTML += createPbook(cameraPB['bookName'], cameraPB['bookImg'], cameraPB['bookIntro'])

            }  else if (answer == "手機") {

                QA_card.innerHTML += createPbook(cameraPB['bookName'], cameraPB['bookImg'], cameraPB['bookIntro'])

            } else if (answer == "香蕉") {

                QA_card.innerHTML += createPbook(cameraPB['bookName'], cameraPB['bookImg'], cameraPB['bookIntro'])

            } else {

                QA_card.innerHTML += createPbook(cameraPB['bookName'], cameraPB['bookImg'], cameraPB['bookIntro'])

            }
        })

        ipcRenderer.on('cameraReplynoPbook',(event,cameraPB) =>{
                ShowVisibility.style.display = "block";
                ImgVisibility.style.display = "block";
                stream.style.display = "none";
                document.getElementById('leadTxt').innerHTML = "辨識成功!!";
                document.getElementById('AnsImg').src = "./still-image.jpg"
                QA_card.innerHTML += createdeadPbook(cameraPB['bookName'])
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