let { ipcRenderer:ipcRenderer2 } = require('electron');

function checkAllLevelIsPass(levels){
    ipcRenderer2.send("checkAllLevelIsPass", levels);
    ipcRenderer2.on('AlllevelIsPassResult', (IsPass) => {
        if(IsPass){
            window.location.href = `../../view/game/pickingUpIsALittleRed.html?cardDataSize=${levels.length}&startId=${levels[0]}`;
        }else{
            alert('需要先完成縣市所有關卡！');
        }  
    });
}

function checkLevelIsPass(level_icon,counties) {
    const level_name = document.querySelectorAll(".level")
    ipcRenderer2.send("callZhuyinCondition")
  
    ipcRenderer2.on("reply-callZhuyindata",(event,data) =>{
      // console.log("zhuyin = >"+zhuyin[0])
      console.log("success call reply-callZhuyindata Condition ~~~~ ")
      let levelSize = data.content.length;
     
      data.content.forEach((level) => {
          for(let i=0;i<level_name.length;i++){
              if(level.level_name == level_name[i].getAttribute('alt') ){
                  if(level.level_name !== counties){
                      if(level.ispass == 1 ){
                          level_name[i].src ="../../image/icon/"+level_icon+".png";
                      }else{
                          level_name[i].src ="../../image/icon/"+level_icon+"_dark.png";
                      }
                  }else{
                      if(level.ispass == 1 ){
                          level_name[i].src ="../../image/icon/devil.png";
                          level_name[i].addEventListener('click',() => {
                            window.location.href = `../../view/game/pickingUpIsALittleRed.html?cardDataSize=${level_name.length}&startId=${level_name[0]}`;
                        })
                      }else{
                          level_name[i].src ="../../image/icon/devil_lock.png";
                          level_name[i].addEventListener('click',() => {
                            window.location.href = `../../view/game/pickingUpIsALittleRed.html?cardDataSize=${level_name.length}&startId=${level_name[0]}`;
                            alert('需要先完成縣市所有關卡！');
                        })
                      }
                  }
                  
               }
          }     
      });
   
      });
  }
  