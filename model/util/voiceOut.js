const SSU = new SpeechSynthesisUtterance();

function mouseDown(index) {
    if(index){
        // document.getElementById("SpeechToAskBtn").style.color = "red";
        console.log("index = "+index)
        console.log("click =? " + index.innerHTML)
        SSU.text = index.children[0].alt;
        toggle();
    }
  }

  function mouseDownText(text) {

        console.log("text =? " + text)
        SSU.text = text;
        toggle();

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