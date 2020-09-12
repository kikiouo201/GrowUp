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
var answer;
if(identifyBtn){
identifyBtn.addEventListener('click',()=>{   
    // ipcRenderer.send('close-mjpg-streamer')

    // ipcRenderer.on('reply-close-mjpg-streamer',(event,data)=>{
        document.getElementById('leadTxt').innerHTML="拍照中。。。";
        // ipcRenderer.send('captrue');
        ipcRenderer.send('vision')
        ShowVisibility.style.display = "none";
        ImgVisibility.style.display = "none";
        stream.style.display="block";
        console.log('ready');
    // })

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
        }
        else if(answer=="蘋果"){
            ShowVisibility.style.display = "block";
            ImgVisibility.style.display = "block";
            stream.style.display="none";
            
            document.getElementById('leadTxt').innerHTML="辨識成功!!";
            document.getElementById('AnsImg').src="./still-image.jpg"
            book_name = "環遊世界做蘋果派"
            bookImg = "https://children.moc.gov.tw/resource/animate_image/6850.jpg"
            bookExplain = "做蘋果派一點也不難，只要到市場買齊材料，混合一下，烤一烤，就可以上桌了。可是市場關門了，買不到材料的小女孩該怎麼辦？沒問題，回家打包行李，搭輪船、坐火車、乘飛機，周遊世界尋找烤派的材料吧。"
            QA_card.innerHTML = createQA(answer,data,book_name,bookImg,bookExplain)
            
        }
        else if(answer=="西瓜"){
            ShowVisibility.style.display = "block";
            ImgVisibility.style.display = "block";
            stream.style.display="none";
            document.getElementById('leadTxt').innerHTML="辨識成功!!";
            document.getElementById('AnsImg').src="./still-image.jpg"
            book_name = "我是西瓜爸爸"
            bookImg = "https://children.moc.gov.tw/resource/book_image/216128.jpg"
            bookExplain = "我一口咬下一大片西瓜，連黑色的西瓜子也吞進肚子裡，我的肚子會不會長出一顆又一顆的小西瓜？那麼，我就是西瓜爸爸囉！"
            QA_card.innerHTML = createQA(answer,data,book_name,bookImg,bookExplain)
            
        }
        else if(answer=="螢幕"){
            ShowVisibility.style.display = "block";
            ImgVisibility.style.display = "block";
            stream.style.display="none";
            document.getElementById('leadTxt').innerHTML="辨識成功!!";
            document.getElementById('AnsImg').src="./still-image.jpg"
            book_name = "查無相關繪本"
            bookImg = ""
            bookExplain = ""
            QA_card.innerHTML = createQA(answer,data,book_name,bookImg,bookExplain)
            
        }
        else if(answer=="椅子"){
           
            ShowVisibility.style.display = "block";
            ImgVisibility.style.display = "block";
            stream.style.display="none";
            document.getElementById('leadTxt').innerHTML="辨識成功!!";
            document.getElementById('AnsImg').src="./still-image.jpg"
            book_name = "椅子樹"
            bookImg = "https://children.moc.gov.tw/resource/book_image/219587.jpg"
            bookExplain = "花園裡有一棵奇怪的樹。為什麼說它奇怪呢？因為它的外形長得像長頸鹿，有長長的脖子哩！其他的樹長滿了葉片，鳥兒在樹上築巢、孵蛋和唱歌，枝葉茂密的樹蔭下，孩子們玩得多愉快。"
            QA_card.innerHTML = createQA(answer,data,book_name,bookImg,bookExplain)
            
        }
        else if(answer=="水壺"){
           
            ShowVisibility.style.display = "block";
            ImgVisibility.style.display = "block";
            stream.style.display="none";
            document.getElementById('leadTxt').innerHTML="辨識成功!!";
            document.getElementById('AnsImg').src="./still-image.jpg"
            book_name = "冒煙的水壺"
            bookImg = "https://children.moc.gov.tw/resource/book_image/230465.png"
            bookExplain = "日本TOP繪本作家加岳井 廣的科學知識繪本反映人們在瞬息萬變的自然環境中，仍然渴求美好的生活，想方設法的解決問題。大地乾裂又出大太陽，沒有水的生活大家都要原地蒸發啦！"
            QA_card.innerHTML = createQA(answer,data,book_name,bookImg,bookExplain)
            
        }
        else if(answer=="剛筆"){
           
            ShowVisibility.style.display = "block";
            ImgVisibility.style.display = "block";
            stream.style.display="none";
            document.getElementById('leadTxt').innerHTML="辨識成功!!";
            document.getElementById('AnsImg').src="./still-image.jpg"
            book_name = "鉛筆"
            bookImg = "https://children.moc.gov.tw/resource/animate_image/6774.jpg"
            bookExplain = "從前這裡有一枝鉛筆，一枝小小的、寂寞的鉛筆。除了他，周圍什麼也沒有。他在這個一點都不特別的地方，躺了很久很久。有一天，這枝鉛筆動了，他輕輕的抖一下，然後真的抖動起來……開始畫了"
            QA_card.innerHTML = createQA(answer,data,book_name,bookImg,bookExplain)
            
        }
        else if(answer=="筆記本"){
           
            ShowVisibility.style.display = "block";
            ImgVisibility.style.display = "block";
            stream.style.display="none";
            document.getElementById('leadTxt').innerHTML="辨識成功!!";
            document.getElementById('AnsImg').src="./still-image.jpg"
            book_name = "地球筆記本"
            bookImg = "https://children.moc.gov.tw/resource/animate_image/6952.png"
            bookExplain = "鑽石級的童詩達人林世仁，運用源源爆發的想像力，化身為地球，用童趣之眼、音樂般的文字，看向地球上的山海風雲、花草蟲魚、人類的生活與發展，並揣想地球的心情與夢想等。"
            QA_card.innerHTML = createQA(answer,data,book_name,bookImg,bookExplain)
            
        }
        else if(answer=="滑鼠"){
           
            ShowVisibility.style.display = "block";
            ImgVisibility.style.display = "block";
            stream.style.display="none";
            document.getElementById('leadTxt').innerHTML="辨識成功!!";
            document.getElementById('AnsImg').src="./still-image.jpg"
            book_name = "查無相關書籍"
            bookImg = ""
            bookExplain = ""
            QA_card.innerHTML = createQA(answer,data,book_name,bookImg,bookExplain)
            
        }
        else if(answer=="手機"){
           
            ShowVisibility.style.display = "block";
            ImgVisibility.style.display = "block";
            stream.style.display="none";
            document.getElementById('leadTxt').innerHTML="辨識成功!!";
            document.getElementById('AnsImg').src="./still-image.jpg"
            book_name = "查無相關書籍"
            bookImg = ""
            bookExplain = ""
            QA_card.innerHTML = createQA(answer,data,book_name,bookImg,bookExplain)
            
        }
        else if(answer=="筆記本電腦"){
           
            ShowVisibility.style.display = "block";
            ImgVisibility.style.display = "block";
            stream.style.display="none";
            document.getElementById('leadTxt').innerHTML="辨識成功!!";
            document.getElementById('AnsImg').src="./still-image.jpg"
            book_name = "喬琪與電腦蟲"
            bookImg = "https://children.moc.gov.tw/resource/book_image/216378.jpg"
            bookExplain = "電腦高手喬琪貝兒，一向對電腦很有辦法，當龍和他的孩子感染了致命的電腦病毒時，只有喬琪能救他們一命…… "
            QA_card.innerHTML = createQA(answer,data,book_name,bookImg,bookExplain)
            
        }
        else if(answer=="眼鏡"){
           
            ShowVisibility.style.display = "block";
            ImgVisibility.style.display = "block";
            stream.style.display="none";
            document.getElementById('leadTxt').innerHTML="辨識成功!!";
            document.getElementById('AnsImg').src="./still-image.jpg"
            book_name = "眼鏡公主"
            bookImg ="https://children.moc.gov.tw/resource/book_image/217505.jpg"
            bookExplain = "◆專家導讀：鄭雪玫（國立臺灣大學圖書資訊學系教授）《眼鏡公主》是作者兼畫者--張蓬潔繼《胖國王》和《瘦皇后》之後的創作。除了故事的主角眼鏡公主是胖國王和瘦皇后的女兒，其圖文呈現的方式也沿襲了前兩本圖..."
            QA_card.innerHTML = createQA(answer,data,book_name,bookImg,bookExplain)
            
        }
    })




    })
}

