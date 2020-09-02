const SSU = new SpeechSynthesisUtterance();
let { ipcRenderer } = require('electron');
var player = require('play-sound')(opts = {})
var nantouBPM = {
    "ㄅ": "b",
    "ㄆ": "p",
    "ㄇ": "m",
    "ㄈ": "f"
}

function mouseDown(index) {
    if (index) {
        // document.getElementById("SpeechToAskBtn").style.color = "red";
        console.log("index = " + index)
        console.log("click =? " + index.innerHTML)
        SSU.text = index.children[0].alt;
        var md_index = index.children[0].alt;
        toggle();

        if (md_index.toString().trim() == 'ㄅ') {
            console.log("ㄅ")

            var audio = player.play('../../TTS/mp3/bpm/b.mp3', function(err) {
                if (err) throw err
            })
            audio.kill()
        }
    }
}

function mouseDownText(text) {

    console.log("text =? " + text)
    SSU.text = text;
    toggle();
    // ipcRenderer.send('callSTT-start', text);
    // if (nantou[text].trim() == "b") {
    player.play('../../TTS/mp3/bpm/' + nantouBPM[text] + '.mp3', function(err) {
        if (err) throw err

    })
    console.log("call " + nantouBPM[text])

    // }
    console.log("call main STT")
        // if (text.toString().trim() == 'ㄅ') {
        // console.log("ㄅ")
        // var audio = player.play('../../TTS/mp3/bpm/b.mp3', function(err) {
        //     if (err) throw err
        // })
        // audio.kill()
        // }

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