// var zerorpc = require("zerorpc");
// var client = new zerorpc.Client();
// client.connect("tcp://127.0.0.1:4242");

// let name = document.querySelector('#name')
// let result = document.querySelector('#result')
// name.addEventListener('input', () => {
//   client.invoke("hello", name.value, (error, res) => {
//     if(error) {
//       console.error(error)
//     } else {
//       result.textContent = res
//     }
//   })
// })
// name.dispatchEvent(new Event('input'))


// 'use strict';

//> ipc for renderer process
let ipcRenderer = require('electron').ipcRenderer;

//> voice button
let voiceBtn = document.querySelector('#voice')
if(voiceBtn){
    voiceBtn.addEventListener('click', () => {
        //> send a message to voice-require-to-py 傳送到 main.js
        ipcRenderer.send('voice-require-to-py');
    });
}


let identifyBtn = document.querySelector('#identify-js');
if(identifyBtn){
identifyBtn.addEventListener('click',()=>{
    ipcRenderer.send('vision');
    ipcRenderer.send('captrue');
    console.log('ready');

    })
}


ipcRenderer.on('reply-mainjsfunction',(event,data)=>{
    console.log("yo="+data);
    
    // data.forEach(label => all+="\nyo="+label);
    document.getElementById('AnsTxt').innerHTML="Ans:"+" "+data;
})


ipcRenderer.on('reply-mainjsfunction-captrue',(event,data)=>{
    console.log("hihi");
    document.getElementById("AnsImg").src="./still-image.jpg"
})

// const ipc = require('electron').ipcRenderer

// const asyncMsgBtn = document.getElementById('async-msg')

// asyncMsgBtn.addEventListener('click', function () {
//   ipc.send('asynchronous-message', 'ping')
// })

// ipc.on('asynchronous-reply', function (event, arg) {
//   const message = `Asynchronous message reply: ${arg}`
//   document.getElementById('async-reply').innerHTML = message
// })

// function sendToPython() {
//   var { PythonShell } = require('python-shell');

//   let options = {
//     mode: 'text',
//     args: [input.value]
//   };

//   PythonShell.run('./py/calc.py', options, function (err, results) {
//     if (err) throw err;
//     // results is an array consisting of messages collected during execution
//     console.log('results: ', results);
//     result.textContent = results[0];
//   });

// }