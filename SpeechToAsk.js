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

        ipcRenderer.once('reply-start', () => {
            // status.value = '系統提示：  請開始說話！';
            SystemVal.innerHTML = '系統提示：請開始說話！';
        });

        ipcRenderer.once('anaysis-voice', () => {
            SystemVal.innerHTML = '系統分析你的問題中...請稍後...'
        });

        // ipcRenderer.once('voice-require-to-py-when-ask-what-isThat', () => {

        // });
        const createQ = (text) => `<div class="q">${text}</div>`;
        const createA = (text) => `<div class="a">${text}</div>`;

        var countCardNum = 0
        countCardNum++
        var CardID_Collect = 'collect_select_' + click_num
        console.log("collect " + 'collect_select_' + click_num)
        var CardID_Q = 'speaker_Q_' + click_num
        console.log("Q= " + 'speaker_Q_' + click_num)
        var CardID_A = 'speaker_A_' + click_num
        console.log("A= " + 'speaker_A_' + click_num)

        var createQA = (question, url, answer) => `<div id="pictureText_` + click_num + `" class="card text-white mb-3" style="background-color: #92337eba;">
                                        
                                            <div class="card-body" style="margin-top: 30px;">
                                                <img class="collect_LeftTop" onclick="collect(this)" id="` + CardID_Collect + `" src="icons/bookmark.png"/>
                                                    <div style="float:left; display: block; text-align: left;">
                                                        <p class="card-title card_Q">問題：</p>
                                                        <p class="card-title card_Q" style="margin-left: 0px;">${question}</p>
                                                        <img class="speaker_Q" onclick="playAudio(this)" id="` + CardID_Q + `" src="icons/speaker.png" onclick=speakerTest(this) alt="">
                                                    </div>
                                                    <br><br><br><br>
                                                    <div>
                                                        <img class="img_` + click_num + `" src="${url}">
                                                    </div>
                                                    <br>
                                                    <div style="float:left; display: block; text-align: left;">
                                                        <p class="card-text card_A" style="float: left;">敘述：</p>
                                                        <p class="answer_` + click_num + ` card-text card_A" style="margin-left: 0px;">${answer}</p>
                                                        <img class="speaker_A" onclick="playAudio(this)" id="` + CardID_A + `" src="icons/speaker.png" alt=""/>
                                                    </div>
                                            </div>

                                    </div>`;

        var createPBook = (bookName, bookImg, bookIntro) => `<div class="card-header contentCss" id="QA_num_` + click_num + `" style="background-color: #f8f9fa24; padding-bottom: 40px;">
                                    <p class="contentlink">相關繪本連結：</p>
                                    <p class="book_css">${bookName}</p>
                                    <img class="speaker_A" onclick="playAudio(this)" id="speaker_pbName_` + click_num + `" src="icons/speaker.png" style="margin-top: -55px" alt=""/>

                                    <img src="${bookImg}" style="margin-left: 20px; display: inline;" width="180" height="153" alt="${bookName}">
                                    <p style="display: inline; margin-left: 20px; margin-top: -5px; position: absolute; margin-right: 40px;">${bookIntro}</p>
                                    <img class="speaker_A" onclick="playAudio(this)" id="speaker_pbIntro_` + click_num + `" src="icons/speaker.png" style="margin-top: 131px; display: inline; bottom: 31px;" alt=""/>
                                </div>`


        const messages = document.querySelector('#messages');
        const QA_card = document.querySelector('#QA_card');

        ipcRenderer.once('reply-result', (event, data) => {

            ipcRenderer.send('serchImgURL', data['keyWord']);
            ipcRenderer.once('replyImgURL', (event, url) => {

                window.onload = () => {
                    var img = document.querySelector('.img_' + click_num);
                    var src = img.getAttribute('src');
                    img.setAttribute('src', '');
                    img.onload = function() { alert(1); };
                }
                const imgURL = document.querySelector('.img_' + click_num);
                data['Answer_pic'] = url;
                console.log("data" + url)
                console.log("URLLLL:" + imgURL);
                console.log("data:" + data + " url:" + url);
                imgURL.src = url;

                onImageLoaded(url, function(icon) {
                    console.log('img載入完成啦！')
                    data['Answer_pic'] = url;
                    // ipcRenderer.send('uploadAPI', data);
                })
            })

            ipcRenderer.send('searchAnswer', data['keyWord']);
            ipcRenderer.once('replyAnswer', (event, answer) => {
                let voiceA = document.getElementById(`speaker_A_${click_num}`);
                // window.onload = () => {
                var ans = document.querySelector('.answer_' + click_num);
                // var src = ans.textContent.trim();
                ans.innerText = answer['ansText'];
                console.log("ans:" + answer['ansText'])
                data['Answer'] = answer['ansText'];
                console.log("answer['ansVoice']:" + answer['ansVoice'])
                voiceA.alt = answer['ansVoice'];

            })

            ipcRenderer.send('searchPictureBook', data['keyWord']);
            ipcRenderer.once('replyPbook', (event, pbook) => {
                const pictureBook = document.querySelector('#pictureText_' + click_num);

                // QA_card.innerHTML = QA_card.innerHTML + createQA(data['Question'], data['Answer_pic'], data['Answer'], pbook['bookName'], pbook['bookImg'], pbook['bookIntro']);

                // var newDiv = document.createElement("div");
                // newDiv.className = "card-header contentCss";
                // newDiv.style.background = "#f8f9fa24";
                // newDiv.style.padding = "12px 20px 40px 20px";
                console.log("pictureBook" + pictureBook)

                pictureBook.innerHTML += createPBook(pbook['bookName'], pbook['bookImg'], pbook['bookIntro'])
                let voiceQ = document.getElementById(`speaker_Q_${click_num}`);
                voiceQ.alt = data['qVoice'];

                let voiceName = document.getElementById(`speaker_pbName_${click_num}`);
                let voiceIntro = document.getElementById(`speaker_pbIntro_${click_num}`);
                voiceName.alt = pbook['bNameVoice'];
                voiceIntro.alt = pbook['bIntroVoice'];
                ipcRenderer.send('uploadAPI', data);

            })

            QA_card.innerHTML = QA_card.innerHTML + createQA(data['Question'], "./image/character/200.gif", "查詢中...");

            console.log("data=" + JSON.stringify(data))
            SystemVal.innerHTML = '再問一次問題';

            // 設定滾輪置底
            // $(document).ready(
            //     function() {
            //         $("html").scrollTop($(document).height() + 100);
            //     }
            // );
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

function isJsonString(str) {
    try {
        if (typeof JSON.parse(str) == "object") {
            return true;
        }
    } catch (e) {}
    return false;
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

function myStop() {
    snd.pause();
    snd.currentTime = 0;
}

const stopDOM = document.body;
// var snd = new Audio(`${id}.mp3`);
// stopDOM.addEventListener('dblclick', myStop());


// function collect(select){
//     dialog.showMessageBox({message: "Hey:))", title: '測試'}, () =>{

//     })
// }


const puppeteer = require('puppeteer');

function searchAnswer(keyword) {
    (async() => {
        console.log('Catch Answer');
        const browser = await puppeteer.launch({
            // executablePath: '/usr/bin/chromium-browser',
            executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
            args: ['--disable-infobars', '--no-default-browser-check', '--start-fullscreen', '--start-maximized' /*,'--no-startup-window'*/ ],
            ignoreDefaultArgs: ['--enable-automation'],
            headless: true
        });
        const page = await browser.newPage();
        if (keyword.toString().trim().includes('子')) {
            // await console.log("kw:" + keyword.substring(0, keyword.toString().trim().length - 1))
            keyword = keyword.substring(0, keyword.toString().trim().length - 1);
            await page.goto("https://www.moedict.tw/" + keyword);
        } else {
            await page.goto("https://www.moedict.tw/" + keyword);
            // await console.log("kw:" + keyword.substring(0, 1))
        }

        const def = await page.$$('.def')
        let Answer;
        // await console.log("def:" + def[0]);
        const test = await def[0].evaluate(node => node.innerText).then((value) => {
            Answer = value;
            console.log(value);
            // expected output: "foo"
            // event.reply('replyAnswer', test)
        });
        // await console.log("Answer:" + test);
    })();
}

function searchPBook(keyword) {
    (async() => {
        console.log('Catch picturebook');
        const browser = await puppeteer.launch({
            // executablePath: '/usr/bin/chromium-browser',
            executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
            args: ['--disable-infobars', '--no-default-browser-check' /*, '--start-fullscreen', '--start-maximized' ,'--no-startup-window'*/ ],
            ignoreDefaultArgs: ['--enable-automation'],
            headless: true
        });
        const page = await browser.newPage();
        await page.goto("https://children.moc.gov.tw/index");
        await page.type('body > header > div > div.search_bar > ul > li:nth-child(5) > form > input[type=text]:nth-child(2)', keyword)
        await page.click('body > header > div > div.search_bar > ul > li:nth-child(5) > form > input.search_btn')
            // const findFBook = await page.$('#main > div > div.row > div > div.wood_bg > div > article > div:nth-child(6) > div:nth-child(1) > div > section > h2 > a')
        await page.waitFor(1000);

        try {
            // 動畫類的第一本書，之後判斷沒有的話，無書目
            const findFBookDIV = await page.waitForSelector('#main > div > div.row > div > div.wood_bg > div > article > div:nth-child(4) > div:nth-child(1) > div > section')

            const findFBookName = await page.$('#main > div > div.row > div > div.wood_bg > div > article > div:nth-child(4) > div:nth-child(1) > div > section > h2 > a')
                // await findFBook.setDefaultNavigationTimeout(10000);
            await findFBookName.evaluate(node => node.innerText).then((value) => {
                Answer = value;
                console.log(value);
            });

            let PBook = { "bookName": "獅子1", "bookImg": "獅子2", "bookIntro": "獅子3" };

            const findFBookPic = await page.$('.pic')
            const picURL = await findFBookPic.$eval('img', src => src.getAttribute('src'))
            await console.log("picURL:" + picURL)

            // 動畫第一本絕對位置
            // const findBookIntro = await page.$eval('#main > div > div.row > div > div.wood_bg > div > article > div:nth-child(4) > div:nth-child(1) > div > section > a > p', a => a.textContent.trim())
            const findBookIntro = await page.$eval('p', al => al.textContent.trim())
            await console.log("findBookIntro:" + findBookIntro)

            PBook['bookName'] = Answer;
            PBook['bookImg'] = picURL;
            PBook['bookIntro'] = findBookIntro;
            console.log("PBook['bookName']:" + PBook['bookName'] + " PBook['bookImg']:" + PBook['bookImg'] + " PBook['bookIntro']" + PBook['bookIntro'])

        } catch (e) {
            console.log('an expection on page.evaluate ', e);

        }
        // throw {

        // }


    })();
}

function playAudio(name) {
    var audioCreate = document.createElement("AUDIO");
    console.log("name:" + name.alt)
    let id = name.alt;
    if (audioCreate.canPlayType("audio/mpeg")) {
        audioCreate.setAttribute("src", `./TTS/mp3/pictureBook/${id}.mp3`);
        console.log(`id:${id}`)
    }

    // x.setAttribute("controls", "controls");
    document.body.appendChild(audioCreate);
    // console.log("OK " + `${id} ` + aaauu.children[0].src)
    // aaauu.children[0].src = "../../TTS/mp3/bpm/" + `${id}` + ".mp3"
    audioCreate.play();
}

function onImageLoaded(url, cb) {
    var image = new Image()
    image.src = url

    if (image.complete) {
        // 圖片已經被載入
        cb(image)
    } else {
        // 如果圖片未被載入，則設定載入時的回調
        image.onload = function() {
            cb(image)
        }
    }
}