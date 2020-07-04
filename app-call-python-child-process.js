const express = require('express')
const app = express()
const es = require('event-stream')
const { spawn } = require("child_process")

// const api = require('./model/api'); api
// const iconv = require('iconv-lite')
// const BufferHelper = require('bufferhelper')

// const JSON = require('json');

// let { PythonShell } = require('python-shell')

// app.listen(3000, () => {
//   console.log('server running on port 3000')
// })

// app.get('/call/python', callPythonProcess)

// callPythonProcess()          //如果開了他 一跑會直接開始執行child-process XDD，要跑Electron要註解掉
function callPythonProcess(req, res) {

  // console.log(`question: ${req.query.question}, answer: ${req.query.answer}`)

  // let spawn = require("child_process").spawn
  

  // let process = spawn('python', [
  //   "./dialogFlow-perfect.py",
  //   req.query.question,
  //   req.query.answer,
  //   console.log(req.query.question)
  // ])
  const process = spawn('python', ["./dialogFlow-perfect.py"]); //之後會放到py_STT，要改路徑

  // process.stdout
  //         .pipe(es.split('\n')
  //         .pipe(es.through(function(line) {
  //             if(codition){
  //               process.kill()
  //               this.queue(null)
  //             }

  //             const parsedString = JSON.parse(data)
  //             res.json(parsedString)

  //             console.log(line.toString());
  //             res.write(line);
  //             // res.end('end');
  //             // res.endCallback();
  //             console.log(`question: ${req.query.question}, answer: ${req.query.answer}`)

  //         })))

  // var bufferHelper = new BufferHelper();

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


    // let bufferJ = Buffer.from((jsonA).data);
    // console.log("加了utf8="+bufferJ.toString('utf8'));

    // let bufferOriginal = Buffer.from(JSON.parse(parsedString).data);
    // console.log("WT...="+bufferOriginal);

    console.log("res?="+data['Question'])

    // var str = iconv.decode(parsedString, 'gbk');
    // res.json(parsedString)
    console.log("---------我是分隔線1---------");

    let bufferOne = Buffer.from(data);
    let jsonCatch = JSON.stringify(bufferOne);
    let bufferOriginal = Buffer.from(JSON.parse(jsonCatch).data);
    // console.log(bufferOriginal);
    console.log(bufferOriginal.toString());
    // bufferHelper.concat(data);

    console.log("---------我是分隔線2---------");
    // iconv.encodingExists("gbk")

    document.getElementById('yourQuestion').innerHTML.value = bufferOriginal.toString();
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


  // process.stdout.on('end',function(){
  //   var str = iconv.decode(bufferHelper.toBuffer(),'gbk');
  //   callback(null,str);
  // }); 



  //   req.query.question,
  //   req.query.answer,
  //   console.log(req.query.question)
  // ])

  // process.stdout.on('data', (data) => {
  //   const parsedString = JSON.parse(data)
  //   res.json(parsedString)
  // })

}

function startSpeak(
  callbackWhenCanSpeak,
  callbackWhenAnaysisVoice,
  // callbackWhenAskWhatIsThat,
  callbackWhenSuccess
) {
  const process = spawn('python', ["-u", "./dialogFlow-perfect.py"]);
  
  //stdout 輸出 stdin 輸入
  process.stdout.on('data', (data) => {
    const result = data.toString('utf8')

    if (result.includes('Speak Now!')) {
      callbackWhenCanSpeak()
    }

    if(result.includes('Google Speech Recognition thinks you said:')){
      callbackWhenAnaysisVoice()
    }

    if (result.includes('data[Q]')) {
      const [q, a] = result.split('\n').map((el) => el.split('=')[1])

      // if(a=='TurnToOpenCamera'){
      //   callbackWhenAskWhatIsThat()
      // }
    //   api.Question.addQa(1, q, a, "", "知識", (event) => {
    //     console.log("callback=" + JSON.stringify(event));
    // });
      process.kill()

      callbackWhenSuccess({ q, a })
    }
  })
}

module.exports ={
  callPythonProcess,
  startSpeak
}