let { ipcRenderer }= require('electron');
// const callpy = require('./app-call-python-child-process')
const messageSystem = document.getElementById('messageSystem')

const express = require('express')
const app = express()
const es = require('event-stream')
const { spawn } = require("child_process")

//> voice button
let voiceBtn = document.querySelector('#voice')
if (voiceBtn) {
    voiceBtn.addEventListener('click', () => {
        console.log(messageSystem.value)
        //> send a message to voice-require-to-py 傳送到 main.js
        // ipcRenderer.on('voice-require-to-py',(event, arg) => {
        //     console.log(arg, ' born')
        // });
        ipcRenderer.send('voice-require-to-py', callpy.callPythonProcess());
        console.log('voice can call py.js')
        
        
    });
}


function callPythonProcess(req, res) {

    const process = spawn('python', ["./dialogFlow-perfect.py"]); //之後會放到py_STT，要改路徑
  
  
    process.stdout.on('data', (data) => {
      // const parsedString = data.toString()
      // JSON  = json_encode(array($data),JSON_UNESCAPED_UNICODE);
      const parsedString = (JSON.stringify(data))     // JSON.stringify 轉成字串 {"type":"Buffer","data":[87,97,105,116,46,46,46,99,111,114,97,112,111,114,97,116,101,32,77,105,99,114,111,112,104,111,110,101,46,46,46,13,10,83,112,101,97,107,32,78,111,119,33,13,10,89,111,117,32,115,97,105,100,62,62,32]}
      console.log("data="+parsedString);
      // const parsedString = JSON.parse(data)
      // let bufferOriginal = Buffer.from(JSON.parse(parsedString).data);
      //const readJson = JSON.parse(data)               // JSON.parse(req) 解析JSON
  
      // let jsonn = JSON.stringify(parsedString);
      // console.log("string="+jsonn);
  
      var jsonA = eval('('+parsedString+')');　
      console.log("jsonA="+jsonA.data)
  
  
      let bufferJ = Buffer.from((jsonA).data);
      console.log("加了utf8="+bufferJ.toString('utf8'));
  
      // let bufferOriginal = Buffer.from(JSON.parse(parsedString).data);
      // console.log("WT...="+bufferOriginal);
  
      
      // var str = iconv.decode(parsedString, 'gbk');
      // res.json(parsedString)
      console.log("---------我是分隔線1---------");
  
    //   document.getElementById('yourQuestion').innerHTML

      let bufferOne = Buffer.from(data);
      let jsonCatch = JSON.stringify(bufferOne);
      let bufferOriginal = Buffer.from(JSON.parse(jsonCatch).data);
      // console.log(bufferOriginal);
      console.log(bufferOriginal.toString());
      // bufferHelper.concat(data);
  
      console.log("---------我是分隔線2---------");
      // iconv.encodingExists("gbk")
  
      
      // console.log(str == data);
        // parsedString.Question()
      // console.log(data);
      // console.log("問題QQ"+res.Question.toString()+"\n");
      // res.write(data);
      // console.log(data);
      // res.end('end');
      // res.endCallback();
      // console.log(`question: ${req.query.question}, answer: ${req.query.answer}`)
    })
  
  
  
  } 
  
  module.exports ={
    callPythonProcess
  }