const SSU = new SpeechSynthesisUtterance();

function mouseDown(index) {
    if(index){
        // document.getElementById("SpeechToAskBtn").style.color = "red";
        console.log("index = "+index)
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