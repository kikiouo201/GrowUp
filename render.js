let {ipcRenderer }= require('electron');
const api = require('./node/model/api');
const request = require('request')
const cheerio = require('cheerio')
const encoding = require('encoding');
const iconv = require('iconv-lite');

let ShowVisibility = document.querySelector('.QA_card_area');
let ImgVisibility = document.querySelector('img#AnsImg');
let stream = document.querySelector('#stream');
let QA_card = document.getElementById("QA_card")
const createQA = (text1,text2) =>`
                                            <div class="card text-white  mb-3" style="background-color: #92337eba;">

                                                <div class="card-body" style="margin-top: 30px;">
                                                    <div style="float:left; display: block; text-align: left;">
                                                        <p id="Ans" class="card-text card_A" style="float: left;">答案：</p>
                                                        <p id="AnsTxt" class="card-text card_A" style="margin-left: 0px;">${text1}</p>
                                                        <img class="speaker_A" onclick="speaker(this)" id="speaker_A" src="icons/speaker.png" />
                                                    </div>

                                                    <div style="float:left; display: block; text-align: left;">
                                                        <p id="explain" class="card-text card_A" style="float: left;">敘述：</p>
                                                        <p id="explainTxt" class="card-text card_A" style="margin-left: 0px;">${text2}</p>
                                                        <img class="speaker_A" onclick="speaker(this)" id="speaker_A" src="icons/speaker.png" />
                                                    </div>
                                                </div>
                                                <div class="card-header contentCss" id="QA_num_" style="background-color: #f8f9fa24; height: auto">
                                                    <p class="contentlink">相關繪本連結：</p>
                                                    <p class="book_css">環遊世界做蘋果派</p>
                                                    <img src="https://children.moc.gov.tw/resource/animate_image/6850.jpg" style="margin-left: 25%; padding: 10px;" width="180" height="153" alt="蘋果甜蜜蜜">
                                                    <p style="display: inline-block; margin-left: 20px; margin-right: 40px; font-size: 18pt;">
                                                    做蘋果派一點也不難，只要到市場買齊材料，混合一下，烤一烤，就可以上桌了。可是市場關門了，買不到材料的小女孩該怎麼辦？沒問題，回家打包行李，搭輪船、坐火車、乘飛機，周遊世界尋找烤派的材料吧。</p>
                                                </div>
                                            

                                            </div>`

let identifyBtn = document.querySelector('#identify-js');
var answer;
if(identifyBtn){
identifyBtn.addEventListener('click',()=>{   
    ipcRenderer.send('captrue');
    ShowVisibility.style.display = "none";
    ImgVisibility.style.display = "none";
    stream.style.display="block";
    // ipcRenderer.send('vision-start');
    document.getElementById('leadTxt').innerHTML="拍照中。。。";
    console.log('ready');

    ipcRenderer.on('reply-mainjsfunction-captrue',(event,data)=>{
        console.log("hihi");
        stream.style.display="none";
        document.getElementById('leadTxt').innerHTML="讀取照片。。。";
        ipcRenderer.send('vision');
    })
    

    ipcRenderer.on('reply-visionready',(event,data)=>{
        document.getElementById('leadTxt').innerHTML="辨識中。。。";
        ipcRenderer.send('vision-start');
    })

    ipcRenderer.on('reply-mainjsfunction',(event,data)=>{
        ipcRenderer.send('crawler',data)
        answer = data
        // data.forEach(label => all+="\nyo="+label);
    })

    ipcRenderer.on('reply-webcrawlerfunction',(event,data) =>{
        console.log("addQAtoServer",answer);
        ipcRenderer.send('addQAtoServer')
        if(data==undefined){
            document.getElementById('leadTxt').innerHTML="辨識失敗!!";
            document.getElementById('explainTxt').innerHTML="";
        }else{
           
            ShowVisibility.style.display = "block";
            ImgVisibility.style.display = "block";
            stream.style.display="none";
            document.getElementById('leadTxt').innerHTML="辨識成功!!";
            document.getElementById('AnsImg').src="./still-image.jpg"
            QA_card.innerHTML = createQA(answer,data)
            
        }
        
    })




    })
}

