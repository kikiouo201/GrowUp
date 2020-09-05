const {ipcRenderer }= require('electron');

function showWeb(url){
  console.log('ShowWeb');
  ipcRenderer.send('crawlerShowWeb',url);
}
function songGetDate(){
  ipcRenderer.send('crawlerGetDate');
  console.log('SongData Geting');

}
