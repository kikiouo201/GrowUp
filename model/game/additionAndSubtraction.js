let { ipcRenderer:ipcRenderer2  } = require('electron');
function judgment(number,levelId){
    if(number==5){
        alert("答對喔!");
        ipcRenderer2.send("levelIsPass", levelId);
    }
    else{
      alert("不對喔!");
    }
  }