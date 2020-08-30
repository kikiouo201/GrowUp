const { ipcRenderer } = require('electron');
var player = require('play-sound')(opts = {})
const nextLevelEx = document.getElementById("nextLevelEx");
const currentEx = document.getElementById("currentEx");

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