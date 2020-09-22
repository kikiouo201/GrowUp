let {ipcRenderer }= require('electron');

function checkZhuyin() {
  const zhuyin = document.querySelectorAll("#zhuyin")
  ipcRenderer.send("callZhuyinCondition")

  ipcRenderer.on("reply-callZhuyindata",(event,data) =>{
    // console.log("zhuyin = >"+zhuyin[0])
    console.log("success call reply-callZhuyindata Condition ~~~~ ")
    for( i = 10; i < 17; i++){
      for( z = 0; z < 7; z++){

        if(data.content[i].ispass == 1 ){
          
          if(data.content[i].level_name == zhuyin[z].getAttribute('alt')){

            zhuyin[z].src ="../../image/icon/meat_ball.png"

          }

        }
        if(data.content[i].ispass == 0){

          if(data.content[i].level_name == zhuyin[z].getAttribute('alt')){

            zhuyin[z].src ="../../image/icon/meat_ball_dark.png"

          }

        }
      }  
    }
  })
}