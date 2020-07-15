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
    ipcRenderer.send('captrue');
    ipcRenderer.send('vision');
    document.getElementById('leadTxt').innerHTML="辨識中。。。";
    console.log('ready');

    })
}

let fruitcheck = document.querySelector("#fruitchk")
// var resultdata = ["西瓜","果肉通常為紅色或黃色，水分多，味甜。"];

if(fruitcheck){
    fruitcheck.addEventListener('change',()=>{
        ipcRenderer.send('fruitcheck-change');
         console.log("change");
    });
}


ipcRenderer.on('reply-mainjsfunction',(event,data)=>{
    console.log("yo="+data);
    
    // data.forEach(label => all+="\nyo="+label);
    document.getElementById('Ans').innerHTML="答案:";
    document.getElementById('AnsTxt').innerHTML=" "+data;
    document.getElementById('explain').innerHTML="敘述:";
    document.getElementById('explainTxt').innerHTML=" "+"果肉通常為紅色或黃色，水分多，味甜。";
    document.getElementById('leadTxt').innerHTML="辨識成功!!";
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