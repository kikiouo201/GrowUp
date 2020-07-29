let { ipcRenderer } = require('electron');
const SSU = new SpeechSynthesisUtterance();

function mouseDown(index) {
    if(index){
        // document.getElementById("SpeechToAskBtn").style.color = "red";
        console.log("index = "+index)
        console.log("click =? " + index.children[2].childNodes[0].nodeValue)
        SSU.text = index.children[2].childNodes[0].nodeValue;
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

const stopDOM =document.body;
stopDOM.addEventListener('dblclick', toggle.bind(null, false));

