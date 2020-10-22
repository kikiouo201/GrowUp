const parent_recommend = document.querySelector("#parent_recommend");
const machine_recommend = document.querySelector("#machine_recommend");
const else_book = document.querySelector("#else_book");

const parent_tab = document.querySelector("#parent_tab");
const machine_tab = document.querySelector("#machine_tab");
const else_tab = document.querySelector("#else_tab");


const fullscr = document.querySelector("#allFull");
let par_book;

ipcRenderer.send('picturebook_IsNetwork');

ipcRenderer.once('picturebook_IsNetworkStatus', (event, data) => {
    if (data) {
        ipcRenderer.send('getPictureData', 1);
        ipcRenderer.send('getMachineData', 1);
    } else {

        parent_recommend.innerHTML =
            ` 
<div class="book">

    <div class="bookname-div">
        <h2>環遊世界做蘋果派</h2>
        <img class="voice" src=" ../icons/speaker.png" />

    </div>
    <div class="activity-div">
        <img src="https://children.moc.gov.tw/resource/animate_image/6850.jpg">
        <button onclick='showWeb("https://children.moc.gov.tw/book/215552", fullscr)'>
            <img src="./image/icon_watchVideo.png" />
            <h2>觀看繪本</h2>
        </button>
    </div>
</div> 

<div class="book">

    <div class="bookname-div">
        <h2>蘋果甜蜜蜜</h2>
        <img class="voice" src=" ../icons/speaker.png" />

    </div>
    <div class="activity-div">
        <img src="https://children.moc.gov.tw/resource/animate_image/6892.jpg">
        <button onclick='showWeb("https://children.moc.gov.tw/book/218424", fullscr)'>
            <img src="./image/icon_watchVideo.png" />
            <h2>觀看繪本</h2>
        </button>
    </div>
</div> 
<div class="book">

    <div class="bookname-div">
        <h2>小獅子多多</h2>
        <img class="voice" src=" ../icons/speaker.png" />

    </div>
    <div class="activity-div">
        <img src="https://children.moc.gov.tw/resource/animate_image/6737.jpg">
        <button onclick='showWeb("https://children.moc.gov.tw/book/218108", fullscr)'>
            <img src="./image/icon_watchVideo.png" />
            <h2>觀看繪本</h2>
        </button>
    </div>
</div> 
<div class="book">

    <div class="bookname-div">
        <h2>獅子燙頭髮</h2>
        <img class="voice" src=" ../icons/speaker.png" />

    </div>
    <div class="activity-div">
    <img src="https://children.moc.gov.tw/resource/animate_image/6666.jpg">
    <button onclick='showWeb("https://children.moc.gov.tw/book/214778", fullscr)'>

            <img src="./image/icon_watchVideo.png" />
            <h2>觀看繪本</h2>
        </button>
    </div>
</div> 
<div class="book">
    <div class="bookname-div">
        <h2>想讀書的熊</h2>
        <img class="voice" src=" ../icons/speaker.png" />

    </div>
    <div class="activity-div">
        <img src="https://children.moc.gov.tw/resource/animate_image/6961.png">
        <button onclick='showWeb("https://children.moc.gov.tw/book/219672", fullscr)'>
            <img src="./image/icon_watchVideo.png" />
            <h2>觀看繪本</h2>
        </button>
    </div>
</div> 
<div class="book">

    <div class="bookname-div">
        <h2>小熊包力刷牙記</h2>
        <img class="voice" src=" ../icons/speaker.png" />

    </div>
    <div class="activity-div">
        <img src="https://children.moc.gov.tw/resource/animate_image/6624.jpg">
        <button onclick='showWeb("https://children.moc.gov.tw/book/214856", fullscr)'>
            <img src="./image/icon_watchVideo.png" />
            <h2>觀看繪本</h2>
        </button>
    </div>
</div> 

`

machine_recommend.innerHTML=`
<div class="book">

    <div class="bookname-div">
        <h2>獅子大開口</h2>
        <img class="voice" src=" ../icons/speaker.png" />

    </div>
    <div class="activity-div">
        <img src="https://children.moc.gov.tw/resource/animate_image/6683.jpg">
        <button onclick='showWeb("https://children.moc.gov.tw/book/214781", fullscr)'>
            <img src="./image/icon_watchVideo.png" />
            <h2>觀看繪本</h2>
        </button>
    </div>
</div> 

<div class="book">

    <div class="bookname-div">
        <h2>不會寫字的獅子</h2>
        <img class="voice" src=" ../icons/speaker.png" />

    </div>
    <div class="activity-div">
        <img src="https://children.moc.gov.tw/resource/animate_image/6724.jpg">
        <button onclick='showWeb("https://children.moc.gov.tw/book/216226", fullscr)'>
            <img src="./image/icon_watchVideo.png" />
            <h2>觀看繪本</h2>
        </button>
    </div>
</div> 
<div class="book">

    <div class="bookname-div">
        <h2>拉奇和小獅子</h2>
        <img class="voice" src=" ../icons/speaker.png" />

    </div>
    <div class="activity-div">
        <img src="https://children.moc.gov.tw/resource/animate_image/6772.jpg">
        <button onclick='showWeb("https://children.moc.gov.tw/book/218645", fullscr)'>
            <img src="./image/icon_watchVideo.png" />
            <h2>觀看繪本</h2>
        </button>
    </div>
</div> 
<div class="book">

    <div class="bookname-div">
        <h2>三隻熊</h2>
        <img class="voice" src=" ../icons/speaker.png" />

    </div>
    <div class="activity-div">
    <img src="https://children.moc.gov.tw/resource/animate_image/6743.jpg">
    <button onclick='showWeb("https://children.moc.gov.tw/book/218124", fullscr)'>

            <img src="./image/icon_watchVideo.png" />
            <h2>觀看繪本</h2>
        </button>
    </div>
</div> 
<div class="book">
    <div class="bookname-div">
        <h2>浮冰上的小熊</h2>
        <img class="voice" src=" ../icons/speaker.png" />

    </div>
    <div class="activity-div">
        <img src="https://children.moc.gov.tw/resource/animate_image/6761.jpg">
        <button onclick='showWeb("https://children.moc.gov.tw/book/218363", fullscr)'>
            <img src="./image/icon_watchVideo.png" />
            <h2>觀看繪本</h2>
        </button>
    </div>
</div> 
<div class="book">

    <div class="bookname-div">
        <h2>雲豹與黑熊</h2>
        <img class="voice" src=" ../icons/speaker.png" />

    </div>
    <div class="activity-div">
        <img src="https://children.moc.gov.tw/resource/animate_image/6879.jpg">
        <button onclick='showWeb("https://children.moc.gov.tw/book/218152", fullscr)'>
            <img src="./image/icon_watchVideo.png" />
            <h2>觀看繪本</h2>
        </button>
    </div>
</div> 

`
    }
})



function tabClick(temp) {
    var audioCreate = document.getElementById("AUDIO");
    if (temp == 1) {
        audioCreate.setAttribute("src", `../TTS/mp3/magicBook/pictureBook/parent_tab.mp3`);
        audioCreate.play();
        parent_recommend.style.display = "block";
        parent_tab.style.boxShadow = "15px 30px 20px #342727";
        parent_tab.style.backgroundColor = 'rgb(223, 192, 140)';

        machine_recommend.style.display = "none"
        machine_tab.style.boxShadow = ""
        machine_tab.style.backgroundColor = 'rgb(255, 182, 160)';


        else_book.style.display = "none"
        else_tab.style.boxShadow = ""
        else_tab.style.backgroundColor = 'rgb(206, 255, 160)';


    } else if (temp == 2) {
        audioCreate.setAttribute("src", `../TTS/mp3/magicBook/pictureBook/machine_tab.mp3`);
        audioCreate.play();
        parent_recommend.style.display = "none"
        parent_tab.style.boxShadow = ""
        parent_tab.style.backgroundColor = 'rgb(255, 220, 160)';

        machine_recommend.style.display = "block"
        machine_tab.style.boxShadow = "15px 30px 20px #342727"
        machine_tab.style.backgroundColor = 'rgb(209, 149, 131)';

        else_book.style.display = "none"
        else_tab.style.boxShadow = ""
        else_tab.style.backgroundColor = 'rgb(206, 255, 160)';
    } else {
        audioCreate.setAttribute("src", `../TTS/mp3/magicBook/pictureBook/else_tab.mp3`);
        audioCreate.play();
        parent_recommend.style.display = "none"
        parent_tab.style.boxShadow = ""
        parent_tab.style.backgroundColor = 'rgb(255, 220, 160)';

        machine_recommend.style.display = "none"
        machine_tab.style.boxShadow = ""
        machine_tab.style.backgroundColor = 'rgb(255, 182, 160)';

        else_book.style.display = "block"
        else_tab.style.boxShadow = "15px 30px 20px #342727"
        else_tab.style.backgroundColor = 'rgb(173, 214, 134)';

    }
}

ipcRenderer.once('retruePictureData', (event, data) => {
    console.log("Success catch Picturebook Data")
    console.log("Success catch Picturebook Data" + data.toString())

    par_book = new Array(data['content'].length);

    for (i = 0; i < data['content'].length; i++) {
        // console.log(data['content'].length + data['content'][i]['name']);

        let bookdiv = document.createElement("div");
        bookdiv.className = 'book';

        let bookname = document.createElement("div");
        bookname.className = 'bookname-div'

        let name = document.createElement("h2");
        name.append(data['content'][i]['name']);
        par_book[i] = data['content'][i]['name'];

<<<<<<< Updated upstream
            let voice_ic = document.createElement('img');
            voice_ic.src = "../icons/speaker.png";
            voice_ic.className = "crawlerPic voice"
                // voice_ic.addEventListener('click', () => crawlerParent(this));
            voice_ic.onclick = () => {
                crawlerParent();
            }
=======
        let voice_ic = document.createElement('img');
        voice_ic.src = "../icons/speaker.png";
        voice_ic.className = "voice"
>>>>>>> Stashed changes

        bookname.append(name);
        bookname.append(voice_ic);
        bookdiv.append(bookname);

        let activity_div = document.createElement("div");
        activity_div.className = 'activity-div';

        let bookimg = document.createElement('img');
        bookimg.src = data['content'][i]['image']
        activity_div.append(bookimg);

        let watch_btn = document.createElement('button');

        let web_url = data['content'][i]['introduction']
        watch_btn.onclick = () => {
            showWeb(web_url, fullscr);
        }

        let watch_ic = document.createElement('img');
        watch_ic.src = "./image/icon_watchVideo.png";
        let watch_h2 = document.createElement('h2');
        watch_h2.append("觀看繪本");

        watch_btn.append(watch_ic, watch_h2);

        activity_div.append(watch_btn);
        bookdiv.append(activity_div);

        parent_recommend.append(bookdiv);

    }
})
// onclick="window.location.hash = '#else_book'"
ipcRenderer.once('retrueMachineData', (event, data) => {
    // console.log(par_book);

    const dataurl = "https://children.moc.gov.tw/opendata/2";
    const request = new XMLHttpRequest();
    request.open('GET', dataurl);
    request.responseType = 'json';
    request.send();
    // let jsontext;

    request.onreadystatechange = function (evt) {
        if (request.readyState !== 4) {
            return;
        }
        recommendListbook(request.response);
    }

    function recommendListbook(jsons, keyword) {
        let request = new XMLHttpRequest();
        let imgurltemp = 6805;
        let Pushing = true;
        for (let i = 1; i < jsons.length; i++) {
            for (let k = data['content'].length - 1; k > data['content'].length - 3; k--) {

                // console.log(data['content'][k])

                if (jsons[i]['name'].includes(data['content'][k]['keyword']) || jsons[i]['intro'].includes(data['content'][k]['keyword']) || jsons[i]['name'].includes('水果')) {
                    let imgurl = 'https://children.moc.gov.tw/resource/animate_image/' + imgurltemp + '.jpg';

                    for (let j = 0; j < par_book.length; j++) {
                        // console.log(jsons[i]['name'] + "&&" + par_book[j])
                        if (jsons[i]['name'].includes(par_book[j])) {
                            break;
                        } else if (j == par_book.length - 1 && Pushing) {
                            // if (i > 0 && i < 6) {
                            //     ipcRenderer.send('pictureBookTTS', jsons[i]['name']);
                            //     ipcRenderer.on('replyPbTTS', (event, TTS) => {

                            Pushing = false;
                            console.log(jsons[i]['name'] + "&&" + par_book[j] + "&&" + j + "&&" + k)
                            let bookdiv = document.createElement("div");
                            bookdiv.className = 'book';

                            let bookname = document.createElement("div");
                            bookname.className = 'bookname-div'

                            let name = document.createElement("h2");

                            name.append(document.createTextNode(jsons[i]['name']));


                            let voice_ic = document.createElement('img');
                            voice_ic.src = "../icons/speaker.png";
                            voice_ic.className = "voice"
                                // voice_ic.alt = TTS;

                            bookname.append(name);
                            bookname.append(voice_ic);

                            bookdiv.append(bookname);
                            if (jsons[i]['name'] == "我的水果寶寶")
                                getimg(7008, bookdiv, jsons[i]['url']);
                            else
                                getimg(imgurltemp, bookdiv, jsons[i]['url']);

                            //     })
                            // }
                        }
                    }
                }
            }
            Pushing = true;
            imgurltemp++;
            if (imgurltemp == 6909)
                imgurltemp = 6910
        }
    }

    function getimg(imgurltemp, bookdiv, url) {
        let request = new XMLHttpRequest();
        let imgurl = 'https://children.moc.gov.tw/resource/animate_image/' + imgurltemp + '.jpg';
        if (imgurltemp == 7008)
            imgurl = 'https://children.moc.gov.tw/resource/animate_image/' + imgurltemp + '.png';
        request.open('GET', imgurl);
        request.send()
        request.onreadystatechange = function (evt) {
            if (request.readyState !== 4)
                return;
            if (request.status != 404) {
                let activity_div = document.createElement("div");
                activity_div.className = 'activity-div';

                let bookimg = document.createElement('img');
                bookimg.src = imgurl
                activity_div.append(bookimg);

                let watch_btn = document.createElement('button');
                watch_btn.onclick = () => {
                    showWeb(url, fullscr);
                }
                let watch_ic = document.createElement('img');
                watch_ic.src = "./image/icon_watchVideo.png";
                let watch_h2 = document.createElement('h2');
                watch_h2.append("觀看繪本");
                watch_btn.append(watch_ic, watch_h2);

                activity_div.append(watch_btn);
                bookdiv.append(activity_div);
                machine_recommend.append(bookdiv);

            } else {
                // console.log(imgurltemp);
                let activity_div = document.createElement("div");
                activity_div.className = 'image-div';
                let bookimg = document.createElement('img');
                bookimg.src = 'https://children.moc.gov.tw/resource/animate_image/6805.jpg';
                activity_div.append(bookimg);
                bookdiv.append(activity_div);
                machine_recommend.append(bookdiv);
            }
            return imgurltemp;
        }
        return imgurltemp;
    }
})


let bookNum = document.querySelectorAll('.bookname-div')
let crawNum = document.querySelectorAll('.crawlerPic voice')

function selectParent() {
    var audioCreate = document.getElementById("AUDIO");
    for (let j = 0; j < 6; j++)
        bookNum[j].onclick = () => {
            audioCreate.setAttribute("src", `../TTS/mp3/magicBook/pictureBook/parent_${j}.mp3`);
            audioCreate.play();
        }
}

function crawlerParent() {
    var audioCreate = document.getElementById("AUDIO");
    // console.log('data.parentNode:' + data['src'])
    for (let j = 0; j < 6; j++)
        crawNum[j].onclick = () => {
            audioCreate.setAttribute("src", `../TTS/mp3/magicBook/pictureBook/parent_${j}.mp3`);
            audioCreate.play();
        }
}

function selectElse() {
    let elseNum = document.querySelectorAll('#else_book > div > div.bookname-div > img')
    var audioCreate = document.getElementById("AUDIO");
    for (let j = 0; j < 6; j++)
        elseNum[j].onclick = () => {
            audioCreate.setAttribute("src", `../TTS/mp3/magicBook/pictureBook/parent_${j}.mp3`);
            audioCreate.play();
        }
}