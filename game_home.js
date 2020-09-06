const { ipcRenderer } = require('electron');
var player = require('play-sound')(opts = {})
const level = document.getElementById("level");
const currentEx = document.getElementById("currentEx");

const SSU = new SpeechSynthesisUtterance();

ipcRenderer.send('callGoodRegard');
// ipcRenderer.on('replyGoodregardValue', (event, data) => {
//     console.log("data = " + JSON.stringify(data))

// });

ipcRenderer.on('replyGoodregardTot', (event, data) => {
    console.log("data = " + JSON.stringify(data))
        // console.log("dataContent=" + data.content);
        // console.log("data event=" + data.content[0]["SUM(add_value)"]);
        // var totValue = data.content[0]["SUM(add_value)"];
    console.log(data);

    // 等級
    level.innerText = data['level'];
    // 目前ex/滿級Ex
    currentEx.innerHTML = data['exValue'] + "/" + data['levelFull'];
    // Ex進度條
    document.querySelector(".good-regard-value").style.width = data['percentColor'] + "%";

});

function mouseDown(index) {
    if (index) {
        // document.getElementById("SpeechToAskBtn").style.color = "red";
        console.log("index = " + index)
        console.log("click =? " + index.children[0].alt)
        SSU.text = index.children[0].alt;
        var SSTtext = index.children[0].alt;
        var ttt = "treatureList";
        if (SSTtext.toString().trim() == '寶物清單') {
            console.log("寶物清單OK")
            player.play('./TTS/mp3/' + ttt + '.mp3', function(err) {
                if (err) throw err
            })
        }
        if (SSTtext.toString().trim() == '魔法寶典') {
            console.log("魔法寶典OK")
                // player.play('output.mp3', function(err) {
                //     if (err) throw err
                // })
        } else {
            console.log("NO")
        }
        toggle();


        // $ mplayer output.mp3 
        // player.play('output.mp3', function(err) {
        //     if (err) throw err
        // })
    }
}

function btnClickEven(index) {
    if (index) {
        // document.getElementById("SpeechToAskBtn").style.color = "red";
        console.log("index = " + index)
        console.log("click =? " + index.children[0].alt)
        SSU.text = index.children[0].alt;
        toggle();
    }
}
//   function mouseUp(index) {
//     document.getElementById("SpeechToAskBtn").style.color = "green";
//   }

function toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
        speechSynthesis.voice = "Google 國語（臺灣）";
        speechSynthesis.speak(SSU);
    }
}

const stopDOM = document.body;
stopDOM.addEventListener('dblclick', toggle.bind(null, false));

function playAudio(name) {
    var audioCreate = document.createElement("AUDIO");
    console.log("name:" + name.alt)
    let id = name.alt;
    if (audioCreate.canPlayType("audio/mpeg")) {
        audioCreate.setAttribute("src", `./TTS/mp3/${id}.mp3`);
        console.log(`id:${id}`)
    }

    // x.setAttribute("controls", "controls");
    document.body.appendChild(audioCreate);
    // console.log("OK " + `${id} ` + aaauu.children[0].src)
    // aaauu.children[0].src = "../../TTS/mp3/bpm/" + `${id}` + ".mp3"
    audioCreate.play();
}