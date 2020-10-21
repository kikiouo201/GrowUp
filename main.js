// 'use strict';
const {
    app,
    BrowserWindow,
    ipcMain
} = require('electron')
const path = require('path');
const url = require('url');
const shell = require('shelljs')
const appCallPython = require('./app-call-python-child-process')
const callVis = require('./vision')
const {
    StillCamera
} = require("pi-camera-connect");
const fs = require('fs');
const equals = require('equals');
const {
    type
} = require('process');
const utf8 = require('utf8');
var explainJSON = require('./magicBook/json/explain.json')
const api = require('./node/model/api');
const request = require('request')
const cheerio = require('cheerio')
const encoding = require('encoding');
const iconv = require('iconv-lite');
const puppeteer = require('puppeteer');
// STT
const callSTT = require('./TTS_API_test')
var player = require('play-sound')(opts = {})
    // const fs = require('fs');
    // const util = require('util');

// const api = require('./model/api');  //伺服器測試暫關

// let {PythonShell} = require('python-shell')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win = null;
let IsNetwork = true;
//true 有網路
//false 無網路，資料寫死
let childGoodBabyValue = 220;
//乖寶寶值
let allLevelIsPass = JSON.parse('{"event":"show_level","content":[{"id":1,"child_id":1,"level_name":"ㄅ","ispass":1,"created_at":"2020-08-17 00:59:16","updated_at":"2020-10-15 19:37:38"},{"id":2,"child_id":1,"level_name":"ㄆ","ispass":1,"created_at":"2020-08-17 01:00:46","updated_at":"2020-10-14 01:00:46"},{"id":3,"child_id":1,"level_name":"ㄇ","ispass":1,"created_at":"2020-08-17 01:00:46","updated_at":"2020-10-15 01:00:46"},{"id":4,"child_id":1,"level_name":"ㄈ","ispass":1,"created_at":"2020-08-17 01:01:26","updated_at":"2020-09-25 15:42:19"},{"id":5,"child_id":1,"level_name":"ㄉ","ispass":1,"created_at":"2020-08-17 01:01:26","updated_at":"2020-09-08 19:54:04"},{"id":6,"child_id":1,"level_name":"ㄊ","ispass":1,"created_at":"2020-08-17 01:01:54","updated_at":"2020-09-01 22:32:04"},{"id":7,"child_id":1,"level_name":"ㄋ","ispass":1,"created_at":"2020-08-17 01:01:54","updated_at":"2020-09-01 22:31:59"},{"id":8,"child_id":1,"level_name":"ㄌ","ispass":1,"created_at":"2020-08-17 01:02:36","updated_at":"2020-10-06 22:47:27"},{"id":9,"child_id":1,"level_name":"ㄍ","ispass":1,"created_at":"2020-08-17 01:02:36","updated_at":"2020-10-16 02:47:39"},{"id":10,"child_id":1,"level_name":"ㄎ","ispass":0,"created_at":"2020-08-23 12:20:10","updated_at":"2020-10-16 17:50:48"},{"id":11,"child_id":1,"level_name":"ㄏ","ispass":0,"created_at":"2020-08-24 09:41:00","updated_at":"2020-10-16 17:50:54"},{"id":12,"child_id":1,"level_name":"ㄐ","ispass":0,"created_at":"2020-08-24 09:41:11","updated_at":"2020-10-16 17:50:59"},{"id":13,"child_id":1,"level_name":"ㄑ","ispass":0,"created_at":"2020-08-24 09:41:20","updated_at":"2020-10-16 17:51:05"},{"id":14,"child_id":1,"level_name":"ㄒ","ispass":0,"created_at":"2020-08-24 09:42:33","updated_at":"2020-10-15 19:37:56"},{"id":15,"child_id":1,"level_name":"ㄓ","ispass":0,"created_at":"2020-08-24 09:42:45","updated_at":"2020-10-15 19:37:59"},{"id":16,"child_id":1,"level_name":"ㄔ","ispass":0,"created_at":"2020-08-24 09:42:56","updated_at":"2020-10-15 19:38:03"},{"id":17,"child_id":1,"level_name":"ㄕ","ispass":0,"created_at":"2020-08-24 09:43:05","updated_at":"2020-10-15 19:38:05"},{"id":18,"child_id":1,"level_name":"ㄖ","ispass":0,"created_at":"2020-08-24 09:44:06","updated_at":"2020-10-15 19:38:07"},{"id":19,"child_id":1,"level_name":"ㄗ","ispass":0,"created_at":"2020-08-24 09:44:34","updated_at":"2020-10-15 19:38:14"},{"id":20,"child_id":1,"level_name":"ㄘ","ispass":0,"created_at":"2020-08-24 09:44:46","updated_at":"2020-10-15 20:26:04"},{"id":21,"child_id":1,"level_name":"ㄙ","ispass":0,"created_at":"2020-08-24 09:44:54","updated_at":"2020-10-15 20:26:07"},{"id":22,"child_id":1,"level_name":"ㄧ","ispass":0,"created_at":"2020-08-24 09:45:03","updated_at":"2020-10-15 20:26:10"},{"id":23,"child_id":1,"level_name":"ㄨ","ispass":0,"created_at":"2020-08-24 09:45:34","updated_at":"2020-10-15 20:26:12"},{"id":24,"child_id":1,"level_name":"ㄩ","ispass":0,"created_at":"2020-08-24 09:45:46","updated_at":"2020-10-15 20:26:13"},{"id":25,"child_id":1,"level_name":"ㄚ","ispass":0,"created_at":"2020-08-24 09:45:53","updated_at":"2020-10-16 17:51:22"},{"id":26,"child_id":1,"level_name":"ㄛ","ispass":0,"created_at":"2020-08-24 09:46:06","updated_at":"2020-10-16 17:51:27"},{"id":27,"child_id":1,"level_name":"ㄜ","ispass":0,"created_at":"2020-08-24 09:46:51","updated_at":"2020-10-15 20:26:18"},{"id":28,"child_id":1,"level_name":"ㄝ","ispass":0,"created_at":"2020-08-24 09:47:00","updated_at":"2020-10-15 20:26:16"},{"id":29,"child_id":1,"level_name":"ㄞ","ispass":0,"created_at":"2020-08-24 09:47:07","updated_at":"2020-10-15 20:26:20"},{"id":30,"child_id":1,"level_name":"ㄟ","ispass":0,"created_at":"2020-08-24 09:47:28","updated_at":"2020-10-15 20:26:22"},{"id":31,"child_id":1,"level_name":"ㄠ","ispass":1,"created_at":"2020-08-24 09:47:45","updated_at":"2020-10-16 17:52:01"},{"id":32,"child_id":1,"level_name":"ㄡ","ispass":1,"created_at":"2020-08-24 09:47:54","updated_at":"2020-10-16 17:52:13"},{"id":33,"child_id":1,"level_name":"ㄢ","ispass":1,"created_at":"2020-08-24 09:48:13","updated_at":"2020-10-16 17:52:25"},{"id":34,"child_id":1,"level_name":"ㄣ","ispass":1,"created_at":"2020-08-24 09:54:42","updated_at":"2020-10-16 17:52:39"},{"id":35,"child_id":1,"level_name":"ㄤ","ispass":1,"created_at":"2020-08-24 09:55:19","updated_at":"2020-10-16 17:52:46"},{"id":36,"child_id":1,"level_name":"ㄥ","ispass":1,"created_at":"2020-08-24 09:55:26","updated_at":"2020-10-16 17:51:48"},{"id":37,"child_id":1,"level_name":"ㄦ","ispass":0,"created_at":"2020-08-24 10:00:34","updated_at":"2020-10-16 17:53:12"},{"id":38,"child_id":1,"level_name":"1","ispass":0,"created_at":"2020-08-24 10:00:41","updated_at":"2020-10-16 17:56:12"},{"id":39,"child_id":1,"level_name":"2","ispass":0,"created_at":"2020-08-24 10:00:49","updated_at":"2020-10-15 20:26:36"},{"id":40,"child_id":1,"level_name":"3","ispass":0,"created_at":"2020-08-24 10:00:56","updated_at":"2020-10-15 20:26:38"},{"id":41,"child_id":1,"level_name":"4","ispass":1,"created_at":"2020-08-24 10:01:04","updated_at":"2020-10-16 17:56:24"},{"id":42,"child_id":1,"level_name":"5","ispass":1,"created_at":"2020-08-24 10:01:11","updated_at":"2020-10-16 17:56:34"},{"id":43,"child_id":1,"level_name":"6","ispass":1,"created_at":"2020-08-24 10:01:19","updated_at":"2020-10-16 17:56:51"},{"id":44,"child_id":1,"level_name":"7","ispass":1,"created_at":"2020-08-24 10:01:31","updated_at":"2020-10-16 17:57:14"},{"id":45,"child_id":1,"level_name":"8","ispass":1,"created_at":"2020-08-24 10:01:37","updated_at":"2020-10-16 17:57:24"},{"id":46,"child_id":1,"level_name":"9","ispass":1,"created_at":"2020-08-24 10:01:43","updated_at":"2020-10-16 17:57:34"},{"id":47,"child_id":1,"level_name":"0","ispass":0,"created_at":"2020-08-24 10:02:29","updated_at":"2020-10-15 20:26:50"},{"id":48,"child_id":1,"level_name":"a","ispass":0,"created_at":"2020-08-24 10:16:42","updated_at":"2020-10-15 20:25:49"},{"id":49,"child_id":1,"level_name":"b","ispass":0,"created_at":"2020-08-24 10:16:56","updated_at":"2020-10-16 17:53:47"},{"id":50,"child_id":1,"level_name":"c","ispass":0,"created_at":"2020-08-24 10:17:05","updated_at":"2020-10-15 20:25:52"},{"id":51,"child_id":1,"level_name":"d","ispass":0,"created_at":"2020-08-24 10:17:36","updated_at":"2020-10-16 17:53:57"},{"id":52,"child_id":1,"level_name":"e","ispass":0,"created_at":"2020-08-24 10:17:44","updated_at":"2020-10-15 20:27:04"},{"id":53,"child_id":1,"level_name":"f","ispass":0,"created_at":"2020-08-24 10:18:45","updated_at":"2020-10-15 20:27:02"},{"id":54,"child_id":1,"level_name":"g","ispass":0,"created_at":"2020-08-24 10:18:55","updated_at":"2020-10-15 20:27:07"},{"id":55,"child_id":1,"level_name":"h","ispass":0,"created_at":"2020-08-24 10:19:03","updated_at":"2020-10-15 20:27:06"},{"id":56,"child_id":1,"level_name":"i","ispass":0,"created_at":"2020-08-24 10:19:17","updated_at":"2020-10-16 17:54:44"},{"id":57,"child_id":1,"level_name":"j","ispass":1,"created_at":"2020-08-24 10:19:27","updated_at":"2020-10-16 17:54:17"},{"id":58,"child_id":1,"level_name":"k","ispass":1,"created_at":"2020-08-24 10:19:41","updated_at":"2020-10-16 17:54:31"},{"id":59,"child_id":1,"level_name":"l","ispass":1,"created_at":"2020-08-24 10:20:53","updated_at":"2020-10-15 13:47:35"},{"id":60,"child_id":1,"level_name":"m","ispass":1,"created_at":"2020-08-24 10:21:01","updated_at":"2020-10-16 17:55:17"},{"id":61,"child_id":1,"level_name":"n","ispass":1,"created_at":"2020-08-24 10:21:08","updated_at":"2020-10-16 17:55:05"},{"id":62,"child_id":1,"level_name":"o","ispass":0,"created_at":"2020-08-24 10:21:20","updated_at":"2020-10-15 20:27:20"},{"id":63,"child_id":1,"level_name":"p","ispass":0,"created_at":"2020-08-24 10:21:28","updated_at":"2020-10-15 20:27:18"},{"id":64,"child_id":1,"level_name":"q","ispass":0,"created_at":"2020-08-24 10:21:39","updated_at":"2020-10-16 17:55:31"},{"id":65,"child_id":1,"level_name":"r","ispass":0,"created_at":"2020-08-24 10:21:46","updated_at":"2020-10-16 17:55:39"},{"id":66,"child_id":1,"level_name":"s","ispass":0,"created_at":"2020-08-24 10:21:53","updated_at":"2020-10-15 20:27:29"},{"id":67,"child_id":1,"level_name":"t","ispass":0,"created_at":"2020-08-24 10:22:01","updated_at":"2020-10-15 20:27:27"},{"id":68,"child_id":1,"level_name":"u","ispass":0,"created_at":"2020-08-24 10:22:09","updated_at":"2020-10-15 20:27:26"},{"id":69,"child_id":1,"level_name":"v","ispass":0,"created_at":"2020-08-24 10:22:18","updated_at":"2020-10-15 20:27:22"},{"id":70,"child_id":1,"level_name":"w","ispass":0,"created_at":"2020-08-24 10:22:25","updated_at":"2020-10-15 20:27:24"},{"id":71,"child_id":1,"level_name":"x","ispass":0,"created_at":"2020-08-24 10:22:33","updated_at":"2020-10-15 20:27:31"},{"id":72,"child_id":1,"level_name":"y","ispass":0,"created_at":"2020-08-24 10:22:40","updated_at":"2020-10-15 20:27:32"},{"id":73,"child_id":1,"level_name":"z","ispass":0,"created_at":"2020-08-24 10:22:47","updated_at":"2020-10-15 20:27:34"},{"id":74,"child_id":1,"level_name":"changhua","ispass":0,"created_at":"2020-08-27 16:45:35","updated_at":"2020-10-15 13:48:30"},{"id":75,"child_id":1,"level_name":"chiayi","ispass":0,"created_at":"2020-08-27 16:45:59","updated_at":"2020-10-15 13:48:39"},{"id":76,"child_id":1,"level_name":"hsinchu","ispass":0,"created_at":"2020-08-27 16:46:26","updated_at":"2020-10-15 13:48:55"},{"id":77,"child_id":1,"level_name":"plus","ispass":0,"created_at":"2020-08-27 16:46:40","updated_at":"2020-10-16 17:57:58"},{"id":78,"child_id":1,"level_name":"kaohsiung","ispass":0,"created_at":"2020-08-27 16:47:18","updated_at":"2020-10-15 13:49:03"},{"id":79,"child_id":1,"level_name":"keelung","ispass":0,"created_at":"2020-08-27 16:47:30","updated_at":"2020-10-16 17:58:07"},{"id":80,"child_id":1,"level_name":"miaoli","ispass":0,"created_at":"2020-08-27 16:47:43","updated_at":"2020-10-16 17:58:19"},{"id":81,"child_id":1,"level_name":"nantou","ispass":0,"created_at":"2020-08-27 16:47:57","updated_at":"2020-10-16 17:59:10"},{"id":82,"child_id":1,"level_name":"newTaipei","ispass":0,"created_at":"2020-08-27 16:48:09","updated_at":"2020-10-16 17:59:10"},{"id":83,"child_id":1,"level_name":"minus","ispass":0,"created_at":"2020-08-27 16:48:23","updated_at":"2020-10-16 17:59:10"},{"id":84,"child_id":1,"level_name":"taichung","ispass":0,"created_at":"2020-08-27 16:48:39","updated_at":"2020-10-16 17:59:10"},{"id":85,"child_id":1,"level_name":"tainan","ispass":0,"created_at":"2020-08-27 16:48:53","updated_at":"2020-10-16 17:59:10"},{"id":86,"child_id":1,"level_name":"taipei","ispass":0,"created_at":"2020-08-27 16:50:40","updated_at":"2020-10-16 17:59:10"},{"id":87,"child_id":1,"level_name":"yo","ispass":0,"created_at":"2020-10-15 21:23:07","updated_at":"2020-10-15 21:23:07"},{"id":88,"child_id":1,"level_name":"taoyuan","ispass":0,"created_at":"2020-08-27 16:52:05","updated_at":"2020-10-16 17:59:10"},{"id":89,"child_id":1,"level_name":"yilan","ispass":0,"created_at":"2020-08-27 16:52:18","updated_at":"2020-10-16 17:59:10"},{"id":90,"child_id":1,"level_name":"yunlin","ispass":0,"created_at":"2020-08-27 16:52:34","updated_at":"2020-10-16 17:59:10"},{"id":91,"child_id":1,"level_name":"findBallast","ispass":1,"created_at":"2020-09-03 10:59:05","updated_at":"2020-10-16 17:59:51"},{"id":92,"child_id":1,"level_name":"gophers","ispass":1,"created_at":"2020-09-03 10:59:17","updated_at":"2020-10-16 17:59:44"},{"id":93,"child_id":1,"level_name":"pickingUpIsALittleRed","ispass":1,"created_at":"2020-09-03 10:59:39","updated_at":"2020-10-16 17:59:38"},{"id":94,"child_id":1,"level_name":"puzzle","ispass":1,"created_at":"2020-09-03 10:59:51","updated_at":"2020-10-16 17:59:57"},{"id":95,"child_id":1,"level_name":"hualien","ispass":0,"created_at":"2020-09-05 23:57:38","updated_at":"2020-10-16 17:59:10"},{"id":96,"child_id":1,"level_name":"pingtung","ispass":0,"created_at":"2020-09-05 23:57:50","updated_at":"2020-10-16 17:59:10"},{"id":97,"child_id":1,"level_name":"taitung","ispass":0,"created_at":"2020-10-15 14:50:40","updated_at":"2020-10-16 17:59:10"}]}');

function createWindow() {

    // 创建浏览器窗口。
    win = new BrowserWindow({
        icon: path.join(__dirname, 'icons/raspberry_icon.png'),
        fullscreen: false,
        webSecurity: false,
        blinkFeatures: 'Touch',
        webPreferences: {
            nodeIntegration: true, //如果出bug改回true看看
            width: 1200,
            height: 1000
        }
    })

    // 然后加载应用的 index.html。
    win.loadFile('game_home.html')

    //到app資料夾執行index.html
    // win.loadURL(url.format({
    //     protocol: 'file',
    //     slashes: true,
    //     pathname: path.join(__dirname, 'app/index.html')
    // }));


    // start時直接跳出chrome檢查的開發者介面
    // win.webContents.openDevTools()

    // 当 window 被关闭，这个事件会被触发。
    win.on('closed', () => {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 与此同时，你应该删除相应的元素。
        win = null
    })
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow)
app.commandLine.appendSwitch('--enable-touch-events')
    // 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (win === null) {
        createWindow()
    }
})

//> This method will be called when Electron has finished
//> initialization and is ready to create browser windows.
//> Some APIs can only be used after this event occurs.




//> ipcMain is ipc of main process
//> ipcMain listen to voice-require-to-py channel here 是否有被按下去
ipcMain.on('voice-require-to-py', (event, arg) => {

    appCallPython.startSpeak(
        // callbackWhenCanSpeak
        () => {
            event.reply('reply-start')
            console.log('reply-start')
        },

        // callbackWhenAnaysisVoice
        () => {
            event.reply('anaysis-voice')
            console.log('anaysis-voice')

        },

        // callbackWhenSuccess
        async(result) => {
            // let STT_Q = await callSTT.quickStart('crawler', 1, result['Question']);
            // result['qVoice'] = await STT_Q;
            event.reply('reply-result', result);

            // api.Question.addQa
            // api.Question.addQa(1, result['Question'], result['Answer'], "https:" + "//upload.wikimedia.org/wikipedia/commons/thumb/9/99/Apples_in_basket_2018_G2.jpg/250px-Apples_in_basket_2018_G2.jpg", result['keyWord'].trim(), "語音", (event) => {
            //     console.log("callback=" + JSON.stringify(event));
            // });

        }
    )
});


ipcMain.on('close-main-window', () => {
    console.log('closed by ipc');
    app.quit();
});
ipcMain.on('open-mjpg-streamer', async(event, arg) => {
        shell.cd('mjpg-streamer');
        let command = './mjpg_streamer -i "./input_uvc.so -y -n" -o "./output_http.so -w ./www"';
        // let command = 'killall mjpg_streamer'
        shell.exec(command, (code, std, err) => {
            console.log('Exit code:', code);
            console.log('Program output:', std);
            console.log('Program stderr:', err);
        })
        shell.cd('..');
    })
    ipcMain.on('close-mjpg-streamer', async(event, arg) => {
        // let command = './mjpg_streamer -i "./input_uvc.so -y -n" -o "./output_http.so -w ./www"';
        let command = 'killall mjpg_streamer'
        shell.exec(command, (code, std, err) => {
            console.log('Exit code:', code);
            console.log('Program output:', std);
            console.log('Program stderr:', err);
        })
        setTimeout(() => {
            event.sender.send('reply-close-mjpg-streamer')
        }, 2000);
    
})

ipcMain.on('captrue', async(event, args) => {
    // shell.cd('..');
    // let command = 'raspistill -t 1000 -o still-image.jpg'
    // shell.exec(command, (code, std, err) => {
    //     console.log('Exit code:', code);
    //     console.log('Program output:', std);
    //     console.log('Program stderr:', err);
    // })

    console.log("call captrue");
    const stillCamera = new StillCamera();

    const image = await stillCamera.takeImage();

    fs.writeFileSync("still-image.jpg", image);

    event.sender.send('reply-mainjsfunction-captrue')
})

ipcMain.on('call-writeDead', (event, arg) => {
    event.sender.send('reply-writeDead')
})

ipcMain.on('vision', (event, args) => {
    event.sender.send('reply-visionready')
})
let visionAnswer;
ipcMain.on('vision-start', async(event, args) => {
    let array = await callVis.start();
    let cameraSTT_Ans = await callSTT.cameraTTS('crawler', 1, array);

    visionAnswer = array
        //array.forEach(label => console.log("vis="+label.description));
    event.sender.send('reply-mainjsfunction', array, cameraSTT_Ans)
})



ipcMain.on('crawler', (event, args) => {
    // let webcrawler = await callCrawler.webcrawler();
    //  console.log(`webcrawler=${webcrawler}`)


    if (explainJSON[0][args] == undefined) {
        const data = encodeURI(args)
        console.log(data)
        const url = 'https://www.moedict.tw/' + data + '#gsc.tab=0'

        console.log(url)
        request(url, (err, res, body) => {

            if (!err && res.statusCode == 200) {
                const $ = cheerio.load(body);
                let def = $('.def')
                output = def.find('a').text()
            }
            //console.log(output);
            event.sender.send('reply-webcrawlerfunction', output);
            console.log(output);

        })
    } else {
        event.sender.send('reply-webcrawlerfunction', explainJSON[0][args]);
    }



    //  event.sender.send('reply-webcrawlerfunction',webcrawler);

})

ipcMain.on('camera-searchPictureBook', async(event, keyword) => {
    console.log('Catch picturebook');
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser',
        // executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
        args: ['--disable-infobars', '--no-default-browser-check' /*, '--start-fullscreen', '--start-maximized' ,'--no-startup-window'*/ ],
        ignoreDefaultArgs: ['--enable-automation'],
        headless: true
    });

    try {
        const page = await browser.newPage();
        await page.goto("https://children.moc.gov.tw/index");
        await page.waitForSelector('body > header > div > div.search_bar > ul > li:nth-child(5) > form > input[type=text]:nth-child(2)')
        await page.type('body > header > div > div.search_bar > ul > li:nth-child(5) > form > input[type=text]:nth-child(2)', keyword)
        await page.waitForSelector('body > header > div > div.search_bar > ul > li:nth-child(5) > form > input.search_btn')
        await page.click('body > header > div > div.search_bar > ul > li:nth-child(5) > form > input.search_btn')
            // const findFBook = await page.$('#main > div > div.row > div > div.wood_bg > div > article > div:nth-child(6) > div:nth-child(1) > div > section > h2 > a')
        await page.waitFor(1000);

        let PBook = { "bookName": "", "bookImg": "", "bookIntro": "", "bNameVoice": "", "bIntroVoice": "" };


        // 動畫類的第一本書，之後判斷沒有的話，無書目
        const findFBookDIV = await page.waitForSelector('#main > div > div.row > div > div.wood_bg > div > article > div:nth-child(4) > div:nth-child(1) > div > section')

        const findFBookName = await page.$('#main > div > div.row > div > div.wood_bg > div > article > div:nth-child(4) > div:nth-child(1) > div > section > h2 > a')
            // await findFBook.setDefaultNavigationTimeout(10000);
        await findFBookName.evaluate(node => node.innerText).then((value) => {
            Answer = value;
            console.log(value);
        });
        const findFBookPic = await page.$('.pic')
        const picURL = await findFBookPic.$eval('img', src => src.getAttribute('src'))
        await console.log("picURL:" + picURL)

        // 動畫第一本絕對位置
        // const findBookIntro = await page.$eval('#main > div > div.row > div > div.wood_bg > div > article > div:nth-child(4) > div:nth-child(1) > div > section > a > p', a => a.textContent.trim())
        const findBookIntro = await page.$eval('p', al => al.textContent.trim())
        await console.log("findBookIntro:" + findBookIntro)
        PBook['bookName'] = Answer;
        PBook['bookImg'] = picURL;
        PBook['bookIntro'] = findBookIntro;


        event.reply('cameraReplyPbook', PBook)

    } catch (e) {
        console.log('an expection on page.evaluate ', e);

    }
})

ipcMain.on('addQAtoServer', async(event, arg) => {
    api.Question.addQa(1, "", arg, "./still-image.jpg", arg, "影像辨識", (event) => {
        console.log("callback=" + JSON.stringify(event));
    });
})

ipcMain.on('sendWriteDeadtoServer', async(event, arg) => {
    console.log("no!!!!!!")
        // api.Question.addQa(1, "蘋果", "落業喬木。葉軟形，邊緣有細尖鋸齒。果實球形，味美，可食，也可製酒。", "./still-image.jpg", "蘋果", "影像辨識", (event) => {
        //     console.log("callback=" + JSON.stringify(event));
        // });
})


// ipcMain.on('invokeAction', function(event, data){
//   var result = processData(data);
//   event.sender.send('actionReply', result);
// });

//addQA
ipcMain.on('getApi-addQuiz', async(event, args) => {
    api.Question.addQuiz(5, (req) => {
        // console.log("addQuiz=" + JSON.stringify(event));
        const data = JSON.parse(JSON.stringify(req));
        const contents = data.content;
        //  contents.forEach(content => {
        //    content.choose = content.options2;
        //  });
        let text = JSON.stringify(contents);
        console.log("contents=" + text);
        event.sender.send('replyApi-addQuiz', text);
    });

})

ipcMain.on('getPictureData', (event, arg) => {
    console.log("Success get Picturebook Data")

    api.Question.showPictureBook(arg, (req) => {
        const data = JSON.parse(JSON.stringify(req));
        event.sender.send('retruePictureData', data);
    });

});

ipcMain.on('getMachineData', (event, arg) => {
    console.log("Success get Picturebook Data")

    api.Question.showPastQuestion(arg, (req) => {
        const data = JSON.parse(JSON.stringify(req));
        event.sender.send('retrueMachineData', data);
    });

});

ipcMain.on('crawlerShowWeb', async(event, args) => {
    console.log('Catch ShowWeb');


    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser',
        // executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',

        args: ['--disable-infobars', '--no-default-browser-check', '--start-fullscreen', '--start-maximized' /*,'--no-startup-window'*/ ],
        ignoreDefaultArgs: ['--enable-automation'],
        headless: false
    });
    const page = await browser.newPage();
    event.reply('colseLoading');

    page.on('colse', async() => {
        await browser.close();
    });
    await page.exposeFunction('colseBrowser', () => {
        page.emit('colse');

    });
    page.on('dialog', async dialog => {
        console.log(dialog.message());
        await dialog.dismiss();
        await page.evaluate(() => {
            const full = document.querySelector('.fp-fullscreen');

            // full.onclick = null;

            // setTimeout(() => {
            //     document.querySelector('.fp-ui').click()
            // }, 2000);
            // setTimeout(() => {
            //     full.click()
            // }, 1000);

            // full.onclick = () => window.colseBrowser();

        })
    });


    await page.exposeFunction('colseBrowser', () => {
        page.emit('colse');
    });
    let currentScreen = await page.evaluate(() => {
        return {
            width: window.screen.availWidth,
            height: window.screen.availHeight,
        };
    });
    //設定預設網頁頁面大小
    await page.setViewport(currentScreen);
    await page.goto(args);
    await page.evaluate(() => {
        document.querySelector('.fp-fullscreen').click();

        setTimeout(() => {
            document.querySelector('.fp-ui').click()
        }, 2000);

        // document.querySelector('.fp-fullscreen').onclick = () => window.colseBrowser();

        function css(el, styles) {
            for (var property in styles)
                el.style[property] = styles[property];
        }
    });
})

ipcMain.on('crawlerGetDate', async(event, args) => {
    let browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser',
        // executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
        headless: true
    });

    const page = await browser.newPage();
    await page.goto(`https://children.moc.gov.tw/song_list?page=2&language=0`);
    try {
        for (let i = 2; i <= 10; i++) {
            const songbox = await page.$$('.songbox')
            const next = await page.$('.next')
            for (let j = 0; j < songbox.length; j++) {


                const Data = {
                    href: await (songbox[j].$eval('a', al => al.getAttribute('href'))),
                    src: await (songbox[j].$eval('img', al => al.getAttribute('src'))),
                    name: await (songbox[j].$eval('h2', al => al.textContent.trim()))
                }

                event.sender.send('songCreating', JSON.parse(JSON.stringify(Data)));
            }
            await (next.$eval('a', al => al.click()))

        }
    } catch (error) {
        await browser.close();

    }

    await browser.close();
})



ipcMain.on('callSTT-start', async(event, args) => {
    // let STTtext = await callSTT.quickStart();
    if (args.toString().trim() == 'ㄅ') {
        console.log("ㄅ")
        var audio = player.play('./TTS/mp3/bpm/b.mp3', function(err) {
            if (err) throw err;
            console.log("Audio finished");
        })
        audio.kill()
    }
    console.log("success call STT-API =) " + args.toString())
        //array.forEach(label => console.log("vis="+label.description));
        // event.sender.send('reply-mainjsfunction', array)
})


ipcMain.on('callMagicCard', (event, arg) => {
    console.log("success call Magic Card")
    api.Level.showLevel(1, (req) => {
        const data = JSON.parse(JSON.stringify(req));
        // console.log("data = " + JSON.stringify(data))
        event.sender.send('replyMagicCard', data);
    });
});


ipcMain.on('callZhuyinCondition', (event, arg) => {
    console.log("success call Zhuyin Condition ~~~~ ")
    if (IsNetwork) {
        api.Level.showLevel(1, (req) => {
            const data = JSON.parse(JSON.stringify(req));
            // console.log("data = " + JSON.stringify(data))
            event.sender.send('reply-callZhuyindata', data);
        })
    } else {
        event.sender.send('reply-callZhuyindata', allLevelIsPass);
    }

})



ipcMain.on('callMapCondition', (event, arg) => {
    console.log("success call Map Condition =) ")
    api.Level.showLevel(1, (req) => {
        const data = JSON.parse(JSON.stringify(req));
        event.sender.send('selectJsonOnTL', data);
    });
});


ipcMain.on('callGoodRegard', (event, arg) => {
    console.log("success call GoodRegard value =) ")
    if (IsNetwork) {
        api.People.showChildGoodBabyTotalValue(1, (req) => {
            const tot = JSON.parse(JSON.stringify(req));
            // console.log("data = " + JSON.stringify(data))
            var totValue = tot.content[0]["SUM(add_value)"];
            // 目前總值
            // console.log("data event=" + tot.content[0]["SUM(add_value)"]);
            goodConvert(event, totValue);
        });

    } else {
        goodConvert(event, childGoodBabyValue);
    }

    // api.People.showChildGoodBabyDayValue(1, (req) => {
    //     const data = JSON.parse(JSON.stringify(req));
    //     // console.log("data = " + JSON.stringify(data))

    //     event.sender.send('replyGoodregardValue', data);
    // });
});


function goodConvert(event, totValue) {
    for (i = 1; i < 100; i++) {
        var RangeMax = (1 + i) * i * 10;
        var RangeMin = i * (i - 1) * 10;
        if (totValue < RangeMax && totValue > RangeMin) {
            console.log("level : " + i);
            var level = i;
            // console.log("max:" + RangeMax + " min:" + RangeMin)
            var levelFull = RangeMax - RangeMin;
            var exValue = totValue - RangeMin;
            // console.log("Full ex: " + levelFull + "Ex value: " + exValue);

            // level.innerText = i;
            // currentEx.innerHTML = exValue + "/" + levelFull;
            var downValueColor = Math.floor(exValue / levelFull * 100);
            // console.log("downValueColor:" + downValueColor)
            var percentColor = Math.round(exValue / levelFull * 100);
            // document.querySelector(".good-regard-value").style.width = percentColor + "%";

            // 距離nextLevel
            var nextLevelEx = levelFull - exValue;
            console.log("nextLevelEx:" + nextLevelEx)
            var AllExData = {
                "level": level,
                "exValue": exValue,
                "levelFull": levelFull,
                "nextLevelEx": nextLevelEx,
                "percentColor": percentColor
            }

            event.sender.send('replyGoodregardTot', AllExData);

        }
    }
}


ipcMain.on('call-frequency', (event, arg) => {
    console.log("success call call-frequency")
    api.Question.showPastQuestion(1, (req) => {
        const freq = JSON.parse(JSON.stringify(req));
        var Cameratotalfreq = 0;
        var Speechtotalfreq = 0;
        let dt = new Date();
        console.log("Date =>" + dt.getDate())
        console.log("month =>" + dt.getMonth() + 1)
        console.log("speechlength =>" + (Object.keys(freq.content).length - 1))
            // console.log("speechmonth =>" + freq.content[90].created_at.substring(5, 7))
        for (i = (Object.keys(freq.content).length - 1); i >= 0; i--) {

            if (freq.content[i].created_at.substring(6, 7) == (dt.getMonth() + 1) || freq.content[i].created_at.substring(5, 7) == (dt.getMonth() + 1) & freq.content[i].created_at.substring(8, 10) == dt.getDate() || freq.content[i].created_at.substring(9, 10) == dt.getDate()) {

                if (freq.content[i].category == "語音") {
                    // console.log("speechdata =>"+freq.content[i].created_at.substring(9, 10))
                    Speechtotalfreq++
                } else {

                    Cameratotalfreq++
                }

            }

        }



        var CamerapercentColor = Math.round(Cameratotalfreq / 3 * 100);
        if (CamerapercentColor > 100) {
            CamerapercentColor = 100;
        }


        var SpeechpercentColor = Math.round(Speechtotalfreq / 3 * 100);
        if (SpeechpercentColor > 100) {
            SpeechpercentColor = 100;
        }

        console.log("Speechtotalfreq =>" + Speechtotalfreq)
        console.log("Cameratotalfreq =>" + Cameratotalfreq)
        let AllData = {
            "Cameratotalfreq": Cameratotalfreq,
            "CamerapercentColor": CamerapercentColor,
            "Speechtotalfreq": Speechtotalfreq,
            "SpeechpercentColor": SpeechpercentColor,
        }
        event.sender.send('reply-frequency', AllData);
        // console.log("data =>"+ Object.keys(freq.content).length)
    })

})

ipcMain.on('levelIsPass', (event, arg) => {
    if (IsNetwork) {
        api.Level.alterLevel(1, arg, (req) => {
            console.log("data = " + JSON.stringify(req))
                //event.sender.send('reply-callZhuyindata', data);
        });
        api.People.AddChildGoodBabyValue(1, 20, arg, (req) => {
            console.log("data = " + JSON.stringify(req))
                //event.sender.send('reply-callZhuyindata', data);
        });
    } else {
        childGoodBabyValue += 20;
    }
})

// ipcMain.on('call-speechfrequency',(event,arg) =>{
//     console.log("success call call-speechfrequency")
//     api.Question.showPastQuestion(1,(req)=>{
//         const speechfreq = JSON.parse(JSON.stringify(req));
//         let totalfreq =0;
//         let dt = new Date();
//         // console.log("data =>"+JSON.stringify(req))
//         for( i = (Object.keys(speechfreq.content).length-1); i >=0; i--){

//             if( speechfreq.content[i].created_at.substring(7, 7) == dt.getMonth() && speechfreq.content[i].created_at.substring(10, 10) == dt.getDate()){

//                 if(speechfreq.content[i].category == "語音"){
//                     totalfreq++
//                 }

//             }

//         }
//         let percentColor = Math.round(totalfreq / 3 * 100);
//        if(percentColor>100){
//             percentColor = 100;
//        }else{
//             percentColor = Math.round(totalfreq / 3 * 100);
//        }
//         console.log("total =>"+totalfreq)
//         console.log("percentColor =>"+percentColor)
//         let speechAllData = {
//             "totalfreq": totalfreq,
//             "percentColor": percentColor
//         }
//         event.sender.send('reply-speechfrequency', speechAllData);
//         // console.log("data =>"+ Object.keys(freq.content).length)
//     })
// })
ipcMain.on('STT_Question', async(event, q_text, click_num) => {
    let STT_Q = await callSTT.quickStart('crawler', 1, q_text, click_num);

    // let QueVoice = STT_Q
    event.reply('replySTT_Q', STT_Q)
})

ipcMain.on('serchImgURL', async(event, keyword) => {
    console.log('Catch ImgURL');

    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser',
        // executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
        args: ['--disable-infobars', '--no-default-browser-check', '--start-fullscreen', '--start-maximized' /*,'--no-startup-window'*/ ],
        ignoreDefaultArgs: ['--enable-automation'],
        headless: true
    });
    const page = await browser.newPage();

    await page.goto("https:\/\/www.google.com.tw/search?q=" + keyword + "&tbm=isch&ved=2ahUKEwj2p87NgdDrAhXOzIsBHc45DzQQ2-cCegQIABAA&oq=ppo;l&gs_lcp=CgNpbWcQAzoFCAAQsQM6AggAOgQIABATUMj_AViuhwJg_YwCaABwAHgAgAGBAYgBtAaSAQM1LjSYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=nXdSX7blMM6Zr7wPzvO8oAM&bih=577&biw=1034&hl=zh-TW");

    const ImgSrc = await page.$eval('.rg_i', imgs => imgs.getAttribute('src'));

    // await console.log("Imgsrc:" + ImgSrc)
    // browser.close();
    event.reply('replyImgURL', ImgSrc)

})


ipcMain.on('searchAnswer', async(event, keyword, click_num) => {
    console.log('Catch Answer');
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser',
        // executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
        args: ['--disable-infobars', '--no-default-browser-check', '--start-fullscreen', '--start-maximized' /*,'--no-startup-window'*/ ],
        ignoreDefaultArgs: ['--enable-automation'],
        headless: true
    });
    const page = await browser.newPage();
    if (keyword.toString().trim().includes('子')) {
        // await console.log("kw:" + keyword.substring(0, keyword.toString().trim().length - 1))
        keyword = keyword.substring(0, keyword.toString().trim().length - 1);
        await page.goto("https://www.moedict.tw/" + keyword);
    }
    if (keyword.toString().trim().includes('陶瓷')) {
        await page.goto("https://www.moedict.tw/" + keyword + "器");
    } else {
        await page.goto("https://www.moedict.tw/" + keyword);
        // await console.log("kw:" + keyword.substring(0, 1))
    }
    let Ans = await { "ansText": "", "ansVoice": "" };
    const def = await page.$$('.def')
        // await console.log("def:" + def[0]);
    const test = await def[0].evaluate(node => node.innerText).then(async(value) => {
        // await console.log(value);
        Ans['ansText'] = await value;
        let STT_A = await callSTT.quickStart('crawler', 2, value, click_num);
        Ans['ansVoice'] = await STT_A;

        await event.reply('replyAnswer', Ans)
    });
})

ipcMain.on('searchPictureBook', async(event, keyword, click_num) => {
    console.log('Catch picturebook');
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser',
        // executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
        args: ['--disable-infobars', '--no-default-browser-check' /*, '--start-fullscreen', '--start-maximized' ,'--no-startup-window'*/ ],
        ignoreDefaultArgs: ['--enable-automation'],
        headless: true
    });

    let PBook = { "bookName": "", "bookImg": "", "bookIntro": "", "bNameVoice": "", "bIntroVoice": "" };

    try {
        // 每進入頁面reload
        // const navigationPromise = page.waitForNavigation({ waitUntil: "domcontentloaded" });

        const page = await browser.newPage();
        await page.goto("https://children.moc.gov.tw/index");
        // await navigationPromise;
        await page.waitForSelector('body > header > div > div.search_bar > ul > li:nth-child(5) > form > input[type=text]:nth-child(2)')
        await page.type('body > header > div > div.search_bar > ul > li:nth-child(5) > form > input[type=text]:nth-child(2)', keyword)
        await page.waitForSelector('body > header > div > div.search_bar > ul > li:nth-child(5) > form > input.search_btn')
        await page.click('body > header > div > div.search_bar > ul > li:nth-child(5) > form > input.search_btn')
            // const findFBook = await page.$('#main > div > div.row > div > div.wood_bg > div > article > div:nth-child(6) > div:nth-child(1) > div > section > h2 > a')


        // 動畫類的第一本書，之後判斷沒有的話，無書目
        const findFBookDIV = await page.waitForSelector('#main > div > div.row > div > div.wood_bg > div > article > div:nth-child(4) > div:nth-child(1) > div > section', { timeout: 1000 })

        const findFBookName = await page.$('#main > div > div.row > div > div.wood_bg > div > article > div:nth-child(4) > div:nth-child(1) > div > section > h2 > a')
            // await findFBook.setDefaultNavigationTimeout(10000);
        await findFBookName.evaluate(node => node.innerText).then((value) => {
            Answer = value;
            console.log(value);
        });
        const findFBookPic = await page.$('.pic')
        const picURL = await findFBookPic.$eval('img', src => src.getAttribute('src'))
        await console.log("picURL:" + picURL)

        // 動畫第一本絕對位置
        // const findBookIntro = await page.$eval('#main > div > div.row > div > div.wood_bg > div > article > div:nth-child(4) > div:nth-child(1) > div > section > a > p', a => a.textContent.trim())
        const findBookIntro = await page.$eval('p', al => al.textContent.trim())
        await console.log("findBookIntro:" + findBookIntro)
        PBook['bookName'] = Answer;
        PBook['bookImg'] = picURL;
        PBook['bookIntro'] = findBookIntro;
        let STTbName = await callSTT.quickStart('crawler', 3, PBook['bookName'], click_num);
        PBook['bNameVoice'] = STTbName;

        let STTbIntro = await callSTT.quickStart('crawler', 4, PBook['bookIntro'], click_num);
        PBook['bIntroVoice'] = STTbIntro;

        // console.log("PBook['bookName']:" + PBook['bookName'] + " PBook['bookImg']:" + PBook['bookImg'] + " PBook['bookIntro']" + PBook['bookIntro'])

        event.reply('replyPbook', PBook)

    } catch (e) {
        console.log('an expection on page.evaluate ', e);
        PBook['bookName'] = '查無此書目';
        let STTbName = await callSTT.quickStart('crawlerNoBook', 3, PBook['bookName'], click_num);
        PBook['bNameVoice'] = STTbName;

        event.reply('replyNoPbook', 'error', PBook)
    }
})

// ipcMain.on('presetAnswer', async(event, preAns) => {
//     let preQ = await callSTT.quickStart(5, preAns['Question']);
//     preAns['qVoice'] = preQ;
//     let preA = await callSTT.quickStart(6, preAns['Answer']);
//     preAns['aVoice'] = preA;
//     event.reply('replyPreQA', preAns);

// })

// ipcMain.on('presetPicturebook', async(event, prePic) => {
//     let prePicBook = { 'bookName': '', 'bookIntro': '' };
//     let prePicName = await callSTT.quickStart(7, prePic['bookName']);
//     prePicBook['bookName'] = prePicName;
//     let prePicIntro = await callSTT.quickStart(8, prePic['bookIntro']);
//     prePicBook['bookIntro'] = prePicIntro;
//     event.reply('replyPrePicBook', prePicBook);


// })

ipcMain.on('presetAnsPBook', async(event, prePic) => {
    console.log("prePic[Question]" + prePic['data']['Question'] + ",prePic[i] " + prePic['i'])
    let preset = [{
            'Question': prePic['data']['Question'],
            'Answer': "動物名。哺乳綱食肉目貓科。多分布於印度及非洲一帶。身長約二、三公尺，頭圓肩闊，四肢強健，有鉤爪，尾細長。雄獅頭至頸部有鬣，雌獅體型較小，無鬣。營社會生活。以大型草食性動物為主食。",
            'pbookName': "小獅子多多",
            'pbookIntro': "有一天，森林裡突然發生大火，小獅子多多奮不顧身的搶救同伴。但是多多美麗的鬃毛，卻被燒毀…他很難過，很傷心，他覺得自己的樣子變得很醜，一定沒有人會喜歡他。真的會這樣嗎？",
            'Q_voice': "",
            'A_voice': "",
            'pbName_voice': "",
            'pbIntro_voice': "",
            'Answer_pic': "data:image/jpeg;base64,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",
            'bookImg': 'https://children.moc.gov.tw/resource/animate_image/6737.jpg',
        },
        {
            'Question': prePic['data']['Question'],
            'Answer': "植物名。薔薇科蘋果屬，落葉小喬木。葉卵形或橢圓形，先端尖或短，邊緣有細銳鋸齒。花淡紅色，萼有細毛。果實也稱為「蘋果」，近於圓形，顏色繁多，有黃色、紅色、青綠色等，味略酸甜，果梗常較果徑短。可供食用，亦可造酒等。",
            'pbookName': "蘋果甜蜜蜜",
            'pbookIntro': "嫁接的蜜蘋果要先習慣這塊土地，接受泥土的養分之後，才能慢慢慢慢的發芽開花。在這塊土地上接受多元文化洗禮、共同生活的人，不也像蜜蘋果一樣嗎？願藉此，獻上我們最深的祝福",
            'Q_voice': "",
            'A_voice': "",
            'pbName_voice': "",
            'pbIntro_voice': "",
            'Answer_pic': "data:image/jpeg;base64,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",
            'bookImg': 'https://children.moc.gov.tw/resource/animate_image/6892.jpg',
        },
    ]
    let Qvoice = await callSTT.quickStart('pre', 1, preset[prePic['i']]['Question'], prePic['click_num']);
    preset[prePic['i']]['Q_voice'] = Qvoice;
    let Avoice = await callSTT.quickStart('pre', 2, preset[prePic['i']]['Answer'], prePic['click_num']);
    preset[prePic['i']]['A_voice'] = Avoice;
    let pbNamevoice = await callSTT.quickStart('pre', 3, preset[prePic['i']]['pbookName'], prePic['click_num']);
    preset[prePic['i']]['pbName_voice'] = pbNamevoice;
    let pbIntrovoice = await callSTT.quickStart('pre', 4, preset[prePic['i']]['pbookIntro'], prePic['click_num']);
    preset[prePic['i']]['pbIntro_voice'] = pbIntrovoice;

    event.reply('replyPresetAnsPBook', preset[prePic['i']]);
})

ipcMain.on('cameraPreset', async(event, cameraPreset) => {
    console.log("cameraPreset['ans']:" + cameraPreset['ans'] + ",cameraPreset['content'] " + cameraPreset['picName_camera'])

    let C_voiceAns = await callSTT.cameraTTS('pre', 1, cameraPreset['ans']);
    cameraPreset['ansV'] = C_voiceAns;

    let C_voiceContent = await callSTT.cameraTTS('pre', 2, cameraPreset['content']);
    cameraPreset['contentV'] = C_voiceContent;

    let C_voicePicName = await callSTT.cameraTTS('pre', 3, cameraPreset['picName_camera']);
    cameraPreset['picName_cameraV'] = C_voicePicName;

    let C_voicePicIntro = await callSTT.cameraTTS('pre', 4, cameraPreset['picIntro_camera']);
    cameraPreset['picIntro_cameraV'] = C_voicePicIntro;

    event.reply('replyPresetCamera', cameraPreset);
})


ipcMain.on('cameraWebcrawler', async(event, cameraWebC) => {
    // console.log("cameraWebC['ans']:" + cameraWebC['ans'] + ",cameraWebC['content'] " + cameraWebC['picName_camera'])

    let C_voiceAns = await callSTT.cameraTTS('crawler', 1, cameraWebC['ans']);
    cameraWebC['ansV'] = C_voiceAns;

    let C_voiceContent = await callSTT.cameraTTS('crawler', 2, cameraWebC['content']);
    cameraWebC['contentV'] = C_voiceContent;

    // let C_voicePicName = await callSTT.cameraTTS('pre', 3, cameraWebC['picName_camera']);
    // cameraWebC['picName_cameraV'] = C_voicePicName;

    // let C_voicePicIntro = await callSTT.cameraTTS('pre', 4, cameraWebC['picIntro_camera']);
    // cameraWebC['picIntro_cameraV'] = C_voicePicIntro;

    event.reply('replyCameraWebC', cameraWebC);
})

ipcMain.on('uploadAPI', async(event, APIdata) => {
    // api.Question.addQa
    api.Question.addQa(1, APIdata['Question'], APIdata['Answer'], APIdata['Answer_pic'], APIdata['keyWord'].trim(), "語音", (event) => {
        console.log("callback=" + JSON.stringify(event));
    });

})