const { ipcRenderer } = require('electron');
var player = require('play-sound')(opts = {})
const SSU = new SpeechSynthesisUtterance();

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