

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
        click_num++;    //計算click次數=問題幾
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

        const createQA = (text, text2, text3, text4) => `<div class="card text-white mb-3" style="background-color: #92337eba;">
                                        
                                            <div class="card-body" style="margin-top: 30px;">
                                            <img class="collect_LeftTop" onclick="collect(this)" id="`+ CardID_Collect + `" src="icons/bookmark.png"/>
                                                <div style="float:left; display: block; text-align: left;">
                                                    <p class="card-title card_Q">Ｑ：</p>
                                                    <p class="card-title card_Q" style="margin-left: 0px;">${text}</p>
                                                    <img class="speaker_Q" onclick="speaker(this)" id="`+ CardID_Q + `" src="icons/speaker.png" onclick=speakerTest(this)>
                                                </div>
                                                <br><br><br><br>
                                                <div>
                                                    <img src="https:${text2}">
                                                    <p style="font-size: 24px;">${text4}</p>
                                                </div>
                                                <br>
                                                <div style="float:left; display: block; text-align: left;">
                                                    <p class="card-text card_A" style="float: left;">Ａ：</p>
                                                    <p class="card-text card_A" style="margin-left: 0px;">${text3}</p>
                                                    <img class="speaker_A" onclick="speaker(this)" id="`+ CardID_A + `" src="icons/speaker.png" />
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
            console.log("url =>"+data.url)
            console.log("QName =>"+data.QName)
            // debugger
            if (data.a.toString().trim() == 'TurnToOpenCamera') {     //如果偵測到「問這是什麼」類型的問題
                SystemVal.innerHTML = '切換至「你拍我答」'
                setTimeout(document.location.href = "result.html", 5000);
                // document.location.href="result.html";   //直接跳轉到camera的html
                console.log("camera true")
            }
            else if (data.a.toString().trim() == 'OpenPickingUpIsALittleRed') {        //玩翻牌
                SystemVal.innerHTML = '開啟小遊戲至「翻牌遊戲」'
                setTimeout(document.location.href = "./view/pickingUpIsALittleRed.html", 5000);
                console.log("picking true")
            }
            else if (data.a.toString().trim() == 'OpenGophers') {      //玩打地鼠
                SystemVal.innerHTML = '開啟小遊戲至「打地鼠遊戲」'
                setTimeout(document.location.href = "./view/gophers.html", 5000);
                console.log("gophers true")
            }
            // messages.innerHTML = messages.innerHTML + createQ(data.q) + createA(data.a);
            QA_card.innerHTML = QA_card.innerHTML + createQA(data.q, data.url, data.a, data.QName);
            // console.log("dataA="+data.a.toString())
            // console.log("test=A? =>"+document.getElementById('Answer01').textContent);

            //傳伺服器
            // ipcRenderer.send('AddQA-to-server');
            // console.log('call Server Success');

            console.log("data=" + data)
            // status.value = '再問一次問題';
            SystemVal.innerHTML = '再問一次問題';


            $(document).ready
                (
                    function () {
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
collection.addEventListener('click', (e) => {
    console.log(dialog)
    dialog.showMessageBox({ message: "Hey:))", title: '測試' }, () => {
        console.log("OK")
    })
});

const stopDOM =document.body;
stopDOM.addEventListener('dblclick', toggle.bind(null, false));


// function collect(select){
//     dialog.showMessageBox({message: "Hey:))", title: '測試'}, () =>{

//     })
// }