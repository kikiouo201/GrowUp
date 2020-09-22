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
let book_name,bookImg,bookExplain =""
const createQA = (text1,text2,bookName,bookImg,bookExplain) =>`
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
                                                    <p class="book_css">${bookName}</p>
                                                    <img id="bookImg" src="${bookImg}" style="margin-left: 25%; padding: 10px;" width="180" height="153" alt="蘋果甜蜜蜜">
                                                    <p id="bookExplain" style="display: inline-block; margin-left: 20px; margin-right: 40px; font-size: 18pt;">${bookExplain}</p>
                                                </div>
                                            

                                            </div>`


let identifyBtn = document.querySelector('#identify-js');
let reset = document.querySelector('#reset');
if(reset){
    reset.addEventListener('click',()=>{
        ipcRenderer.send('call-reset')
    })
}
var answer,explain;
if(identifyBtn){
identifyBtn.addEventListener('click',()=>{   
    // ipcRenderer.send('close-mjpg-streamer')
    ipcRenderer.send('vision')
    ipcRenderer.on('reply-close-mjpg-streamer',(event,data)=>{
        document.getElementById('leadTxt').innerHTML="拍照中。。。";
        // ipcRenderer.send('captrue');

        // ShowVisibility.style.display = "none";
        // ImgVisibility.style.display = "none";
        // stream.style.display="block";
        console.log('ready');
    })

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
        ipcRenderer.send('camera-searchPictureBook',data)
        answer = data;
        // data.forEach(label => all+="\nyo="+label);
    })

    ipcRenderer.on('reply-webcrawlerfunction',(event,data) =>{
        console.log("addQAtoServer",answer);
        explain = data;
    })

     ipcRenderer.on('replyPbook',(event,pbook) =>{
        // ipcRenderer.send('addQAtoServer')
        if(answer==undefined){
            document.getElementById('leadTxt').innerHTML="辨識失敗!!";
            document.getElementById('explainTxt').innerHTML="";
        }
        else if(answer=="蘋果"){
            ShowVisibility.style.display = "block";
            ImgVisibility.style.display = "block";
            stream.style.display="none";
            
            document.getElementById('leadTxt').innerHTML="辨識成功!!";
            document.getElementById('AnsImg').src="./still-image.jpg"
            QA_card.innerHTML = createQA(answer,explain,pbook['bookName'],pbook['bookImg'],pbook['bookIntro'])
            
        }else if(answer=="西瓜"){
            ShowVisibility.style.display = "block";
            ImgVisibility.style.display = "block";
            stream.style.display="none";
            document.getElementById('leadTxt').innerHTML="辨識成功!!";
            document.getElementById('AnsImg').src="./still-image.jpg"
            QA_card.innerHTML = createQA(answer,explain,pbook['bookName'],pbook['bookImg'],pbook['bookIntro'])
            
        }
        else if(answer=="螢幕"){
            ShowVisibility.style.display = "block";
            ImgVisibility.style.display = "block";
            stream.style.display="none";
            document.getElementById('leadTxt').innerHTML="辨識成功!!";
            document.getElementById('AnsImg').src="./still-image.jpg"
            QA_card.innerHTML = createQA(answer,explain,pbook['bookName'],pbook['bookImg'],pbook['bookIntro'])
            
        }
        else if(answer=="椅子"){
           
            ShowVisibility.style.display = "block";
            ImgVisibility.style.display = "block";
            stream.style.display="none";
            document.getElementById('leadTxt').innerHTML="辨識成功!!";
            document.getElementById('AnsImg').src="./still-image.jpg"
            QA_card.innerHTML = createQA(answer,explain,pbook['bookName'],pbook['bookImg'],pbook['bookIntro'])
            
        }
        else if(answer=="水壺"){
           
            ShowVisibility.style.display = "block";
            ImgVisibility.style.display = "block";
            stream.style.display="none";
            document.getElementById('leadTxt').innerHTML="辨識成功!!";
            document.getElementById('AnsImg').src="./still-image.jpg"
            QA_card.innerHTML = createQA(answer,explain,pbook['bookName'],pbook['bookImg'],pbook['bookIntro'])
            
        }
        else if(answer=="剛筆"){
           
            ShowVisibility.style.display = "block";
            ImgVisibility.style.display = "block";
            stream.style.display="none";
            document.getElementById('leadTxt').innerHTML="辨識成功!!";
            document.getElementById('AnsImg').src="./still-image.jpg"
            QA_card.innerHTML = createQA(answer,explain,pbook['bookName'],pbook['bookImg'],pbook['bookIntro'])
            
        }
        else if(answer=="筆記本"){
           
            ShowVisibility.style.display = "block";
            ImgVisibility.style.display = "block";
            stream.style.display="none";
            document.getElementById('leadTxt').innerHTML="辨識成功!!";
            document.getElementById('AnsImg').src="./still-image.jpg"
            QA_card.innerHTML = createQA(answer,explain,pbook['bookName'],pbook['bookImg'],pbook['bookIntro'])
        }
        else if(answer=="滑鼠"){
           
            ShowVisibility.style.display = "block";
            ImgVisibility.style.display = "block";
            stream.style.display="none";
            document.getElementById('leadTxt').innerHTML="辨識成功!!";
            document.getElementById('AnsImg').src="./still-image.jpg"
            QA_card.innerHTML = createQA(answer,explain,pbook['bookName'],pbook['bookImg'],pbook['bookIntro'])
        }
        else if(answer=="手機"){
           
            ShowVisibility.style.display = "block";
            ImgVisibility.style.display = "block";
            stream.style.display="none";
            document.getElementById('leadTxt').innerHTML="辨識成功!!";
            document.getElementById('AnsImg').src="./still-image.jpg"
            QA_card.innerHTML = createQA(answer,explain,pbook['bookName'],pbook['bookImg'],pbook['bookIntro'])
        }
        else if(answer=="筆記本電腦"){
           
            ShowVisibility.style.display = "block";
            ImgVisibility.style.display = "block";
            stream.style.display="none";
            document.getElementById('leadTxt').innerHTML="辨識成功!!";
            document.getElementById('AnsImg').src="./still-image.jpg"
            QA_card.innerHTML = createQA(answer,explain,pbook['bookName'],pbook['bookImg'],pbook['bookIntro'])
        }
        else if(answer=="眼鏡"){
           
            ShowVisibility.style.display = "block";
            ImgVisibility.style.display = "block";
            stream.style.display="none";
            document.getElementById('leadTxt').innerHTML="辨識成功!!";
            document.getElementById('AnsImg').src="./still-image.jpg"
            QA_card.innerHTML = createQA(answer,explain,pbook['bookName'],pbook['bookImg'],pbook['bookIntro'])
        }
    })
   

    })
}

