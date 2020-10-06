const {ipcRenderer }= require('electron');
let full ;

function showWeb(url,ele){
  console.log('ShowWeb&Ele =>' +ele);
  full = ele;
  ele.style.display='block'

  ipcRenderer.send('crawlerShowWeb',url);
}

function songGetDate(){
  ipcRenderer.send('crawlerGetDate');
  console.log('SongData Geting');
}

ipcRenderer.on('colseLoading', (event, url) => {
  console.log("close LodaingView")
  full.style.display='none'
})