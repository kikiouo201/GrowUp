let {ipcRenderer }= require('electron');

function addGoodBabyValue(){
    ipcRenderer.send("levelIsPass","gophers");
}