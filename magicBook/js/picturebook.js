let {ipcRenderer }= require('electron');

function GoWeb(url){
  ipcRenderer.send('crawlerShowWeb',url);
  console.log('Ready_GoWeb');

}