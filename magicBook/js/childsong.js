let {ipcRenderer }= require('electron');

function dataCrawler(){
  ipcRenderer.send('childsongCrawler');
  console.log('dataCrawler Going');
}