// 'use strict';
const {
    app,
    BrowserWindow,
    ipcMain
} = require('electron')
const path = require('path');
const url = require('url');
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
const puppeteers = require('puppeteer');
// const api = require('./model/api');  //伺服器測試暫關

// let {PythonShell} = require('python-shell')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win = null;




function createWindow() {

    // 创建浏览器窗口。
    win = new BrowserWindow({
        icon: path.join(__dirname, 'icons/raspberry_icon.png'),
        fullscreen: true,
        webSecurity: false,
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
    //   api.Question.showQuizContent(1, (event) => {
    //           const data = JSON.parse(JSON.stringify(event));
    //           const content = data.content;        
    //           console.log("showQuizContent =" + JSON.stringify(content)  );       
    // });

    appCallPython.startSpeak(
        () => {
            event.reply('voice-require-to-py-reply-start')
            console.log('voice-require-to-py-reply-start')
        },
        () => {
            event.reply('voice-require-to-py-anaysis-voice')
            console.log('anaysis-voice')

        },
        // () => {
        //   event.reply('voice-require-to-py-when-ask-what-isThat')
        // },
        (result) => {

            event.reply('voice-require-to-py-reply-result', result)

            console.log("Q=" + result.q)
            console.log("A=" + result.a)
            console.log("url=" + result.url)
            // console.log("QN="+result.QName)
            var x = result.a.toString().trim()
            console.log(typeof x + typeof result.a.toString())
            console.log("Testing Log => " + result.a.toString() + "\r\nTest2=>" + x)
            if (x === 'TurnToOpenCamera') {
                console.log("BinGO!")
            } else {
                console.log("NOOOOOOOO!")
            }
            console.log(" result(?)=" + result.toString())

            //api code
            api.Question.addQa(1, result.q, result.a, "", "知識", (event) => {
                console.log("callback=" + JSON.stringify(event));
            });

        }
    )
});

//     ipcMain.on('AddQA-to-server', (event, data) => {


// })


// ipcMain.handle('voice-require-to-py', async (event, args) => {
//   const result = await somePromise(args)
//   return result
//   console.log(result)
// })

//> ipcMain is ipc of main process
//> ipcMain listen to close-main-window channel here
ipcMain.on('close-main-window', () => {
    console.log('closed by ipc');
    app.quit();
});

ipcMain.on('vision', (event, args) => {
    event.sender.send('reply-visionready')
})

ipcMain.on('vision-start', async (event, args) => {
    let array = await callVis.start();

    //array.forEach(label => console.log("vis="+label.description));
    event.sender.send('reply-mainjsfunction', array)
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


ipcMain.on('captrue', async (event, args) => {

    console.log("call captrue");
    const stillCamera = new StillCamera();

    const image = await stillCamera.takeImage();

    fs.writeFileSync("still-image.jpg", image);

    event.sender.send('reply-mainjsfunction-captrue')
})

// ipcMain.on('invokeAction', function(event, data){
//   var result = processData(data);
//   event.sender.send('actionReply', result);
// });

//addQA
ipcMain.on('getApi-addQuiz', async (event, args) => {
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

ipcMain.on('pictureWeb', async (event, args) => {
    console.log('readyMain');

    const browser = await puppeteers.launch({
        // executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
        headless: false
    });
    const page = await browser.newPage();
    await page.goto(args);
    // videos = await page.$$eval('video', video => video);
    // page.waitFor(10000);
    // const btn = await page.waitForSelector('fp-fullscreen');
    // await btn.click(); // doesn't work
    // await page.$eval('.fp-ui', elem => elem.click());
    await page.click('.fp-fullscreen');
    await page.click('.fp-ui', {
        delay: 2000
    });

    // await page.$eval('.fp-ui', elem => elem.click());

    // console.log(videos);
    // await browser.close();
})
// ipcMain.on('callbookJSON-request',async (event,args)=>{
//     console.log("callbookJSON-request")
//     event.sender.send('bookJSON-response',bookJSON)
// })






// ipcMain.on('fruitcheck-call', (event, data) => {
//     console.log("result");

//     api.Question.addQa(1, "", "西瓜", "./still-image.jpg", "單詞", (event) => {
//         console.log("callback=" + JSON.stringify(event));
//     });

// })