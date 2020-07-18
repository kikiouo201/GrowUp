const WebSocket = require('ws');




function Exsocket() {

//let ws = new WebSocket('ws://localhost:2000');
let ws = new WebSocket('ws://growup.mcu.yokikiyo.space');

const workQueues= new Map();
const sendQueues = new Map();
const app = {
    use(router) {

      router.workQueues.forEach((event, callback) => {
       // if (workQueues.has(event)) throw new Error('Regist duplicate event in this application.');
        workQueues.set(event, callback);
      });
      router.sendQueues.forEach((event, json) => {
       // if (sendQueues.has(event)) throw new Error('Regist duplicate event in this application.');
        sendQueues.set(event, json);
      });
    
      sendMes();
   
    },
  };

ws.onopen = (req) => {

    console.log('open connection');

    sendMes();
}
//接收 Server 發送的訊息
ws.onmessage = event => {
    console.log('onmessage');

    const data = JSON.parse(event.data);

    const workQueu = workQueues.get(data.event);
    workQueu(data);
    sendMes();
    
}

//關閉後執行的動作，指定一個 function 會在連結中斷後執行
ws.onclose = () => {
    console.log('close connection')
}


function sendMes(){

    console.log(`sendQueue.size = ${sendQueues.size}`);

    if (sendQueues.size > 0) {
       sendQueues.forEach((event, json)  => {
            ws.send(JSON.stringify(json));
            sendQueues.delete(json);

       });
     
    }
    return '';
}

return app;


}

Exsocket.createRouter = () => {

   const workQueues = new Map();
   const sendQueues = new Map();
   
  return {
    on(event, content, callback) {
     if (workQueues.has(event)) throw new Error('Regist duplicate event in this router.');

      let json = {};
      json.event = event;
      json.content = content;
  
      workQueues.set(
        callback,  
        event,
          
      );
      sendQueues.set(
        event, 
        json,
         
      );
      // console.log("sendQueues=");
      // console.log(sendQueues);
    },
    workQueues,
    sendQueues,

  };
}


module.exports = Exsocket;