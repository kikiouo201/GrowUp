//> ipc for renderer process
let { ipcRenderer } = require('electron');
let remote = require('electron').remote;
let dialog = remote.dialog;
const { text } = require('express');
const messageSystem = document.getElementById('messageSystem')
const SSU = new SpeechSynthesisUtterance();
let click_num = 0;

//> voice button
let voiceBtn = document.querySelector('#voice')
if (voiceBtn) {
    voiceBtn.addEventListener('click', (event) => {
        click_num++; //計算click次數=問題幾
        console.log("click #" + click_num)
        const status = document.querySelector('#messageSystem')
        const SystemVal = document.querySelector('#voice h2')
        SystemVal.innerHTML = '開啟語音模組'
            // status.value= '開啟語音模組'
        ipcRenderer.send('voice-require-to-py');

        ipcRenderer.once('voice-require-to-py-reply-start', () => {
            // status.value = '系統提示：  請開始說話！';
            SystemVal.innerHTML = '系統提示：請開始說話！';
        });

        ipcRenderer.once('voice-require-to-py-anaysis-voice', () => {
            SystemVal.innerHTML = '系統分析你的問題中...請稍後...'
        });

        // ipcRenderer.once('voice-require-to-py-when-ask-what-isThat', () => {

        // });
        const createQ = (text) => `<div class="q">${text}</div>`;
        const createA = (text) => `<div class="a">${text}</div>`;

        var countCardNum = 0
        countCardNum++
        var CardID_Collect = 'collect_select_' + countCardNum
        console.log("collect " + 'collect_select_' + countCardNum)
        var CardID_Q = 'speaker_Q_' + countCardNum
        console.log("Q= " + 'speaker_Q_' + countCardNum)
        var CardID_A = 'speaker_A_' + countCardNum
        console.log("A= " + 'speaker_A_' + countCardNum)

        const createQA = (text, text2, text3) => `<div id="pictureText" class="card text-white mb-3" style="background-color: #92337eba;">
                                        
                                            <div class="card-body" style="margin-top: 30px;">
                                                <img class="collect_LeftTop" onclick="collect(this)" id="` + CardID_Collect + `" src="icons/bookmark.png"/>
                                                    <div style="float:left; display: block; text-align: left;">
                                                        <p class="card-title card_Q">問題：</p>
                                                        <p class="card-title card_Q" style="margin-left: 0px;">${text}</p>
                                                        <img class="speaker_Q" onclick="speaker(this)" id="` + CardID_Q + `" src="icons/speaker.png" onclick=speakerTest(this)>
                                                    </div>
                                                    <br><br><br><br>
                                                    <div>
                                                        <img src="https:${text2}">
                                                    </div>
                                                    <br>
                                                    <div style="float:left; display: block; text-align: left;">
                                                        <p class="card-text card_A" style="float: left;">敘述：</p>
                                                        <p class="card-text card_A" style="margin-left: 0px;">${text3}</p>
                                                        <img class="speaker_A" onclick="speaker(this)" id="` + CardID_A + `" src="icons/speaker.png" />
                                                    </div>

                                            </div>

                                        </div>`;



        // const createQA = function (t1, t2) {
        //     `<h5 class="card-title">Q:${t1}</h5> <p class="card-text">A:${t2}</p>`                       
        // }

        // function collect() {
        //     $(document).ready(function () {
        //         $('.card-header').each(function (i) {
        //             $(this).attr('id', 'QA_num_' + click_num);
        //         });

        //         $(".collect_rightTop").click(function (value) {                                 //click事件
        //             $("#heart_collect").attr("src", "icons/heart.png");      //要更換的圖片位置

        //         });
        //     });
        // }


        const messages = document.querySelector('#messages');
        const QA_card = document.querySelector('#QA_card');
        console.log("Q:" + createQA)
        ipcRenderer.once('voice-require-to-py-reply-result', (event, data) => {
            console.log("q =>" + data.q + " a =>" + data.a + " url =>" + data.url + " keyword=>" + data.keyWord)
            console.log("url =>" + data.url)
            console.log("data obj:" + JSON.stringify(data))
                // console.log("QName =>" + data.QName)
                // debugger
            QA_card.innerHTML = QA_card.innerHTML + createQA(data.q, data.url, data.a);

            if (data.a.toString().trim() == 'TurnToOpenCamera') { //如果偵測到「問這是什麼」類型的問題
                SystemVal.innerHTML = '切換至「你拍我答」'
                setTimeout(document.location.href = "result.html", 5000);
                // document.location.href="result.html";   //直接跳轉到camera的html
                console.log("camera true")
            } else if (data.a.toString().trim() == 'OpenPickingUpIsALittleRed') { //玩翻牌
                SystemVal.innerHTML = '開啟小遊戲至「翻牌遊戲」'
                setTimeout(document.location.href = "./view/pickingUpIsALittleRed.html", 5000);
                console.log("picking true")
            } else if (data.a.toString().trim() == 'OpenGophers') { //玩打地鼠
                SystemVal.innerHTML = '開啟小遊戲至「打地鼠遊戲」'
                setTimeout(document.location.href = "./view/gophers.html", 5000);
                console.log("gophers true")
            } else if (data.q.toString().trim() == '蘋果是什麼') {
                console.log()
                let pictureBook = document.querySelector('#pictureText');

                // data.book_name = "蘋果甜蜜蜜";
                // data.book_img = "https://children.moc.gov.tw/resource/animate_image/6892.jpg";
                // data.book_introduction = "嫁接的蜜蘋果要先習慣這塊土地，接受泥土的養分之後，才能慢慢慢慢的發芽開花。在這塊土地上接受多元文化洗禮、共同生活的人，不也像蜜蘋果一樣嗎？願藉此，獻上我們最深的祝福！";

                // console.log("bookName ==" + book_name);
                if (pictureBook) {
                    pictureBook.innerHTML += `<div class="card-header contentCss" id="QA_num_" style="background-color: #f8f9fa24; padding-bottom: 40px;">
                    <p class="contentlink">相關繪本連結：</p>
                    <p class="book_css">蘋果甜蜜蜜</p>
                    <img class="speaker_A" onclick="speakerBookName(this)" id="speaker_A" src="icons/speaker.png" style="margin-top: -55px" />
    
                    <img src="https://children.moc.gov.tw/resource/animate_image/6892.jpg" style="margin-left: 20px; display: inline;" width="180" height="153" alt="蘋果甜蜜蜜">
                    <p style="display: inline; margin-left: 20px; margin-top: -10px; position: absolute; margin-right: 40px;">
                        嫁接的蜜蘋果要先習慣這塊土地，接受泥土的養分之後，才能慢慢慢慢的發芽開花。在這塊土地上接受多元文化洗禮、共同生活的人，不也像蜜蘋果一樣嗎？願藉此，獻上我們最深的祝福！</p>
                    <img class="speaker_A" onclick="speakerBook(this)" id="speaker_A" src="icons/speaker.png" style="margin-top: 131px; display: inline; bottom: 31px;" />
    
                </div>
                <div class="card-header" id="QA_num_">
                
                </div>`

                }
            } else if (data.q.toString().trim() == '香蕉是什麼') {
                console.log()
                let pictureBook = document.querySelector('#pictureText');

                if (pictureBook) {
                    pictureBook.innerHTML += `<div class="card-header contentCss" id="QA_num_" style="background-color: #f8f9fa24; padding-bottom: 40px;">
                    <p class="contentlink">相關繪本連結：</p>
                    <p class="book_css">香蕉的秘密</p>
                    <img class="speaker_A" onclick="speakerBookName(this)" id="speaker_A" src="icons/speaker.png" style="margin-top: -55px" />
    
                    <img src="https://children.moc.gov.tw/resource/animate_image/6924.jpg" style="margin-left: 20px; display: inline;" width="180" height="153" alt="蘋果甜蜜蜜">
                    <p style="display: inline; margin-left: 20px; margin-top: -5px; position: absolute; margin-right: 40px;">
                    從日本回到台灣的小表妹，第一次吃到不用沾蜂蜜就又香又甜的香蕉。但是過了幾天，香蕉皮上長出了黑點，是已經壞掉不能吃了嗎？這你就搞錯囉，香蕉皮上的黑點可是香蕉成熟的暗號呢！\r\n內容介紹香蕉的生長過程、香蕉的採收、產銷過程，為你完整解開香蕉的祕密。</p>
                    <img class="speaker_A" onclick="speakerBook(this)" id="speaker_A" src="icons/speaker.png" style="margin-top: 131px; display: inline; bottom: 31px;" />
    
                </div>
                <div class="card-header" id="QA_num_">
                
                </div>`

                }
            }
            // messages.innerHTML = messages.innerHTML + createQ(data.q) + createA(data.a);
            // console.log("dataA="+data.a.toString())
            // console.log("test=A? =>"+document.getElementById('Answer01').textContent);

            //傳伺服器
            // ipcRenderer.send('AddQA-to-server');
            // console.log('call Server Success');

            console.log("data=" + data)
                // status.value = '再問一次問題';
            SystemVal.innerHTML = '再問一次問題';


            $(document).ready(
                function() {
                    $("html").scrollTop($(document).height() + 100);
                }
            );
        });

    });
}

//> close button
let closeBtn = document.querySelector('#close');
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        //> send a message to close-main-window channel without args
        ipcRenderer.send('close-main-window');
    });
}


//語音唸出來
let voices = [];
// const speaker_Q_btn = document.querySelector('.speaker_Q');

// Demo
function speakerDemo(index) {
    if (index) {
        // speechSynthesis.addEventListener('voiceschanged', populateVoices);

        console.log("text =? " + index)
        SSU.text = index;
        toggle();

        // console.log("click =? " + index.parentNode.childNodes[2].nodeName)
        // console.log("click =? " + index.parentNode.childNodes[2].innerHTML)
        // console.log("click =? " + index.parentNode.children[0].childNodes[0].nodeValue)

        // SSU.text = index.parentNode.children[0].childNodes[0].nodeValue;
        // toggle();
    }
}

function speakerTest(index) {
    if (index) {
        // speechSynthesis.addEventListener('voiceschanged', populateVoices);

        console.log("click =? " + index.parentNode.childNodes[2].nodeName)
        console.log("click =? " + index.parentNode.childNodes[2].innerHTML)
        console.log("click =? " + index.parentNode.children[0].childNodes[0].nodeValue)

        SSU.text = index.parentNode.children[0].childNodes[0].nodeValue;
        toggle();
    }
}

function speaker(QA) {
    SSU.text = QA.parentNode.childNodes[3].childNodes[0].nodeValue;
    toggle();
}

function speakerBookName(bookName) {
    SSU.text = bookName.parentNode.childNodes[3].childNodes[0].nodeValue;
    toggle();
}

function speakerBook(book) {
    SSU.text = book.parentNode.childNodes[9].childNodes[0].nodeValue;
    console.log(SSU.text)
    toggle();
}

function toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
        speechSynthesis.voice = "Google 國語（臺灣）";
        speechSynthesis.speak(SSU);
    }
}
// function populateVoices() {
//     voices = this.getVoices();
//     voicesDropdown.innerHTML = voices
//         .map(voice => `<option value="Google 國語（臺灣）">Google 國語（臺灣） (zh-TW)</option>`)
//         .join('');
// }

// console.log(callpy);

let collection = document.getElementById('Collection')
if (collection) {
    collection.addEventListener('click', (e) => {
        console.log(dialog)
        dialog.showMessageBox({ message: "Hey:))", title: '測試' }, () => {
            console.log("OK")
        })
    });
}


const stopDOM = document.body;
stopDOM.addEventListener('dblclick', toggle.bind(null, false));


// function collect(select){
//     dialog.showMessageBox({message: "Hey:))", title: '測試'}, () =>{

//     })
// }