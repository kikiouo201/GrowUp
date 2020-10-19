const { ipcRenderer } = require('electron');
var player = require('play-sound')(opts = {})
const nextLevelEx = document.getElementById("nextLevelEx");
const currentEx = document.getElementById("currentEx");


ipcRenderer.send('call-frequency')
    // ipcRenderer.send('call-speechfrequency')
ipcRenderer.send('callGoodRegard');

ipcRenderer.on('replyGoodregardTot', (event, data) => {
    console.log("data = " + JSON.stringify(data))
        // console.log("dataContent=" + data.content);
        // console.log("data event=" + data.content[0]["SUM(add_value)"]);
        // var totValue = data.content[0]["SUM(add_value)"];
    console.log(data);

    // 等級
    // level.innerText = data['level'];

    // 目前ex/滿級Ex
    currentEx.innerHTML = data['exValue'] + "/" + data['levelFull'];

    // Ex進度條
    document.querySelector(".goodBaby_regard_value").style.width = data['percentColor'] + "%";

    // nextLevelEx
    nextLevelEx.innerText = data['nextLevelEx'];
    console.log(data['nextLevelEx']);

});


ipcRenderer.on('reply-frequency', (event, data) => {
    console.log("data =>" + data.Cameratotalfreq)
    if (data['Cameratotalfreq'] >= 3) {
        document.querySelector("#camera_success_icon").style.visibility = "visible";
        document.querySelector("#camerafreq").innerHTML = "完成";
        document.querySelector(".CameracardStatus").style.width = data.CamerapercentColor + "%";
        document.querySelector(".CameracardStatus").style.borderRadius = "40px 40px 40px 40px";
        // document.querySelector("#speechfreq").innerHTML = data.Speechtotalfreq+"/3";
        // document.querySelector(".SpeechcardStatus").style.width = data.SpeechpercentColor+"%";

    }
    else if (data['Speechtotalfreq'] >= 3) {
        document.querySelector("#speech_success_icon").style.visibility = "visible";
        document.querySelector("#speechfreq").innerHTML = "完成";
        document.querySelector(".SpeechcardStatus").style.width = data.SpeechpercentColor + "%";
        document.querySelector(".SpeechcardStatus").style.borderRadius = "40px 40px 40px 40px";
        // document.querySelector("#camerafreq").innerHTML = data.Cameratotalfreq+"/3";
        // document.querySelector(".CameracardStatus").style.width = data.CamerapercentColor+"%";
    }
    else if (data['Speechtotalfreq'] >= 3 && data['Cameratotalfreq'] >= 3) {
        document.querySelector("#speech_success_icon").style.visibility = "visible";
        document.querySelector("#camera_success_icon").style.visibility = "visible";
        document.querySelector("#speechfreq").innerHTML = "完成";
        document.querySelector("#camerafreq").innerHTML = "完成";
        document.querySelector(".SpeechcardStatus").style.width = data.SpeechpercentColor + "%";
        document.querySelector(".SpeechcardStatus").style.borderRadius = "40px 40px 40px 40px";
        document.querySelector(".CameracardStatus").style.width = data.CamerapercentColor + "%";
        document.querySelector(".CameracardStatus").style.borderRadius = "40px 40px 40px 40px";
    }
     else {
        document.querySelector("#speechfreq").innerHTML = data.Speechtotalfreq + "/3";
        document.querySelector(".SpeechcardStatus").style.width = data.SpeechpercentColor + "%";
        document.querySelector("#camerafreq").innerHTML = data.Cameratotalfreq + "/3";
        document.querySelector(".CameracardStatus").style.width = data.CamerapercentColor + "%";
    }

})

function playVoiceAndCapture(name) {
    var audioCreate = document.getElementById("AUDIO");
    // console.log("name:" + name.alt)
    if (audioCreate.canPlayType("audio/mpeg")) {
        audioCreate.setAttribute("src", `./TTS/mp3/questionMW/${name}.mp3`);
        // console.log(`id:${id}`)
    }
    audioCreate.play();
}

function goHome(name) {
    var audioCreate = document.getElementById("AUDIO");
    // console.log("name:" + name.alt)
    if (audioCreate.canPlayType("audio/mpeg")) {
        audioCreate.setAttribute("src", `./TTS/mp3/${name}.mp3`);
        // console.log(`id:${id}`)
    }
    audioCreate.play();
}
// ipcRenderer.on('reply-camerafrequency',(event,data) =>{

//     if(data['totalfreq'] > 3){
//         document.querySelector("#camera_success_icon").style.visibility = visible;
//         document.querySelector("#camerafreq").innerHTML = data['totalfreq']+"/3";
//         document.querySelector(".CameracardStatus").style.width = data['percentColor']+"%";
//     }else{
//         document.querySelector("#camerafreq").innerHTML = data['totalfreq']+"/3";
//         document.querySelector(".CameracardStatus").style.width = data['percentColor']+"%";
//     }

// })