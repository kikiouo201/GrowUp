let {ipcRenderer }= require('electron');

function checkLevelIsPass(level_icon,counties) {
  const level_name = document.querySelectorAll(".level")
  ipcRenderer.send("callZhuyinCondition")

  ipcRenderer.on("reply-callZhuyindata",(event,data) =>{
    // console.log("zhuyin = >"+zhuyin[0])
    console.log("success call reply-callZhuyindata Condition ~~~~ ")
    let levelSize = data.content.length;
   
    data.content.forEach((level) => {
        for(let i=0;i<level_name.length;i++){
            if(level.level_name == level_name[i].getAttribute('alt') ){
                if(level.level_name !== counties){
                    if(level.ispass == 1 ){
                        level_name[i].src ="../../image/icon/"+level_icon+".png"
                    }else{
                        level_name[i].src ="../../image/icon/"+level_icon+"_dark.png"
                    }
                }else{
                    if(level.ispass == 1 ){
                        level_name[i].src ="../../image/icon/devil.png"
                    }else{
                        level_name[i].src ="../../image/icon/devil_lock.png"
                    }
                }
                
             }
        }     
    });
 
    });
}
