const WebSocket = require('ws');
const ReconnectingWebSocket = require('reconnecting-websocket');



function Exsocket() {

//let ws = new WebSocket('ws://localhost:2000');
//let ws = new WebSocket('ws://growup.mcu.yokikiyo.space');

const options = {
  WebSocket: WebSocket, // custom WebSocket constructor
  connectionTimeout: 1000,
  maxRetries: 10,
};
let ws = new ReconnectingWebSocket('ws://growup.mcu.yokikiyo.space', [], options);

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
let rws;
//關閉後執行的動作，指定一個 function 會在連結中斷後執行
ws.onclose = () => {
    console.log('close connection');
     rws = new ReconnectingWebSocket('ws://growup.mcu.yokikiyo.space', [], options);
     rws.onopen= (req) => {

      console.log('open connection rws');
    
      sendMes();
    }
    rws.onmessage = event => {
      console.log('onmessage');
  
      const data = JSON.parse(event.data);
      const workQueu = workQueues.get(data.event);
      workQueu(data);
      sendMes();
      
  }
}


function sendMes(){

    console.log(`sendQueue.size = ${sendQueues.size}`);

    try {
      if (sendQueues.size > 0) {
        sendQueues.forEach((event, json)  => {
             ws.send(JSON.stringify(json));
             sendQueues.delete(json);
 
        });
      
     }
    } catch (error) {
      console.log(error);
      console.log('here error');
      if (sendQueues.size > 0) {
        sendQueues.forEach((event, json)  => {
             rws.send(JSON.stringify(json));
             sendQueues.delete(json);
    
        });
      
     }
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