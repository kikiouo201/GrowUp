const {ipcRenderer }= require('electron');

function showWeb(url,ele){
  console.log('ShowWeb&Ele =>' +ele);
  ele.style.display='block'

  ipcRenderer.send('crawlerShowWeb',url);
}
function songGetDate(){
  ipcRenderer.send('crawlerGetDate');
  console.log('SongData Geting');
}
