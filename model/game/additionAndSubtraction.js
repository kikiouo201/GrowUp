let { ipcRenderer:ipcRenderer2  } = require('electron');
function judgment(number,levelId){

  const status = document.querySelector('.status');
  const props = document.querySelector('.props');

    if(number==5){
        
      status.innerHTML = '<img src="../../image/drawZhuyin/good.png" width="200px"/>你好棒';
      props.style.visibility = "visible";
      ipcRenderer2.send("levelIsPass", levelId);
    }
    else{
      status.innerHTML = '<img src="../../image/drawZhuyin/tryAgain.png" width="200px"/>失敗';
      props.style.visibility = "hidden";
      //alert("不對喔!");
    }
    const black_overlay = document.querySelector('.black_overlay');
    black_overlay.style.visibility = "visible";
  }

  function challengeAgain() {
    let counties = (new URLSearchParams(location.search)).get("counties");
    window.location.href = `../../view/game/additionAndSubtraction.html?id=${levelId}`;
}






