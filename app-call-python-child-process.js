const express = require('express')
const app = express()
const es = require('event-stream')
const { spawn, spawnSync } = require("child_process");
const { Question } = require('./node/model/api');

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

    const process = spawn('python', ["./dialogFlow-perfect.py"]); //之後會放到py_STT，要改路徑

    process.stdout.on('data', (data) => {
        // const parsedString = data.toString()
        // JSON  = json_encode(array($data),JSON_UNESCAPED_UNICODE);
        const parsedString = (JSON.stringify(data)) // JSON.stringify 轉成字串 {"type":"Buffer","data":[87,97,105,116,46,46,46,99,111,114,97,112,111,114,97,116,101,32,77,105,99,114,111,112,104,111,110,101,46,46,46,13,10,83,112,101,97,107,32,78,111,119,33,13,10,89,111,117,32,115,97,105,100,62,62,32]}
        console.log("data=" + parsedString);
        // const parsedString = JSON.parse(data)
        // let bufferOriginal = Buffer.from(JSON.parse(parsedString).data);
        //const readJson = JSON.parse(data)               // JSON.parse(req) 解析JSON

        // let jsonn = JSON.stringify(parsedString);
        // console.log("string="+jsonn);

        var jsonA = eval('(' + parsedString + ')');　
        console.log("jsonA=" + jsonA.data)


        // let bufferJ = Buffer.from((jsonA).data);
        // console.log("加了utf8="+bufferJ.toString('utf8'));

        // let bufferOriginal = Buffer.from(JSON.parse(parsedString).data);
        // console.log("WT...="+bufferOriginal);

        console.log("res?=" + data['Question'])

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
    })


}

function startSpeak(
    callbackWhenCanSpeak,
    callbackWhenAnaysisVoice,
    callbackWhenSuccess
) {
    const process = spawn('python', ["-u", "./dialogFlow-perfect.py"]);

    let q = null;
    let a = null;
    let url = null;
    let keyWord = null;

    //stdout 輸出 stdin 輸入
    process.stdout.on('data', (data) => {
        // console.log("python data => "+data)
        const result = data.toString('utf8')
            // console.log("python result => " + result)
        if (result.includes('Speak Now!')) {
            // setTimeout(function() {callbackWhenCanSpeak()}, 2000)
            callbackWhenCanSpeak()
            console.log("python result 3 => " + result)
        }
        if (result.includes('Google Speech Recognition thinks you said:')) {

            // setTimeout(function() {callbackWhenAnaysisVoice()}, 3000)
            callbackWhenAnaysisVoice()
            console.log("python result 4 => " + result)
        }

        if (result.includes("Question")) {
            console.log("Json No3 :" + typeof(result))
            callbackWhenSuccess(JSON.parse(result))
            process.kill()
        }
    })
}

function isJsonString(str) {
    try {
        if (typeof JSON.parse(str) == "object") {
            return true;
        }
    } catch (e) {}
    return false;
}

module.exports = {
    callPythonProcess,
    startSpeak
}