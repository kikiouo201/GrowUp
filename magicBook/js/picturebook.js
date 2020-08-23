let {ipcRenderer }= require('electron');

function GoWeb(url){
  ipcRenderer.send('pictureWeb',url);
  console.log('Ready_GoWeb');

}