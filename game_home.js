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
    console.log("data event=" + data.content[0]["SUM(add_value)"]);
    var totValue = data.content[0]["SUM(add_value)"];

    for (i = 1; i < 10; i++) {
        var RangeMax = (1 + i) * i * 10;
        var RangeMin = i * (i - 1) * 10;
        if (totValue < RangeMax && totValue > RangeMin) {
            console.log("level : " + i);
            // console.log("max:" + RangeMax + " min:" + RangeMin)
            var levelFull = RangeMax - RangeMin;
            var exValue = totValue - RangeMin;
            console.log("Full ex: " + levelFull + "Ex value: " + exValue);
            level.innerText = i;
            currentEx.innerHTML = exValue + "/" + levelFull;
            var downValueColor = Math.floor(exValue / levelFull * 100);
            // console.log("downValueColor:" + downValueColor)
            var percentColor = Math.round(exValue / levelFull * 100);
            document.querySelector(".good-regard-value").style.width = percentColor + "%";
            // 距離nextLevel
            var nextLevelEx = levelFull - exValue;
            console.log("nextLevelEx:" + nextLevelEx)
        }
    }
});

function mouseDown(index) {
    if (index) {
        // document.getElementById("SpeechToAskBtn").style.color = "red";
        console.log("index = " + index)
        console.log("click =? " + index.children[0].alt)
        SSU.text = index.children[0].alt;
        var SSTtext = index.children[0].alt;
        if (SSTtext.toString().trim() == '寶物清單') {
            console.log("寶物清單OK")
            player.play('./TTS/mp3/treatureList.mp3', function(err) {
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