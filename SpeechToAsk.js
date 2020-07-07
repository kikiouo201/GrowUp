

//> ipc for renderer process
let { ipcRenderer } = require('electron');
const { text } = require('express');
// const callVi = require('./vision')
const messageSystem = document.getElementById('messageSystem')

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

        const createQA = (text, text2) => `<div class="card text-white mb-3" style="background-color: #92337eba;">
                                        
                                            <div class="card-body" style="margin-top: 30px;">
                                            <img class="collect_rightTop" onclick="collect()" id="heart_collect" src="icons/bookmark.png"
                                                title="" />
                                            <div>
                                                <h5 class="card-title card_Q" style="float: left;text-align:left ; display: inline;">Q:${text}</h5>
                                                <img class="speaker_Q" id="speaker_Q" src="icons/speaker.png" />
                                            </div>
                                            <div>
                                                <p class="card-text card_A" style="float:left ; display: inline;">
                                                    A:${text2}</p>
                                                <img class="speaker_A" id="speaker_Q" src="icons/speaker.png" />
                                            </div>
                                        </div>
                                    </div>`;
                                    

        // const createQA = function (t1, t2) {
        //     `<h5 class="card-title">Q:${t1}</h5> <p class="card-text">A:${t2}</p>`                       
        // }

        function collect() {
            $(document).ready(function () {
                $('.card-header').each(function(i) { 
                    $(this).attr('id', 'QA_num_'+click_num); 
                });

                $(".collect_rightTop").click(function (value) {                                 //click事件
                    $("#heart_collect").attr("src", "icons/heart.png");      //要更換的圖片位置
                    
                });
            });
        }


        const messages = document.querySelector('#messages');
        const QA_card = document.querySelector('#QA_card');
        console.log("Q:" + createQA)
        ipcRenderer.once('voice-require-to-py-reply-result', (event, data) => {

            if(data.a.toString().trim() == 'TurnToOpenCamera'){     //如果偵測到「問這是什麼」類型的問題
                SystemVal.innerHTML = '切換至「你拍我答」'
                setTimeout(document.location.href="result.html",5000);
                // document.location.href="result.html";   //直接跳轉到camera的html
                console.log("camera true")
            }
            else if(data.a.toString().trim() == 'OpenPickingUpIsALittleRed'){        //玩翻牌
                SystemVal.innerHTML = '開啟小遊戲至「翻牌遊戲」'
                setTimeout(document.location.href="./view/pickingUpIsALittleRed.html",5000);
                console.log("picking true")
            }
            else if(data.a.toString().trim() == 'OpenGophers'){      //玩打地鼠
                SystemVal.innerHTML = '開啟小遊戲至「打地鼠遊戲」'
                setTimeout(document.location.href="./view/gophers.html",5000);
                console.log("gophers true")
            }
            // messages.innerHTML = messages.innerHTML + createQ(data.q) + createA(data.a);
            QA_card.innerHTML = QA_card.innerHTML + createQA(data.q, data.a);
            // console.log("dataA="+data.a.toString())
            // console.log("test=A? =>"+document.getElementById('Answer01').textContent);
            
            
            console.log("data=" + data )
            // status.value = '再問一次問題';
            SystemVal.innerHTML = '再問一次問題';
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

// let collectLove = document.querySelector('#heart_collect');
// if(collectLove) {
//     collectLove.addEventListener
// }
// document.addEventListener('click', () => {
//     let collectLove = document.getElementById('heart_collect')
//     if()
// })


// console.log(callpy);
