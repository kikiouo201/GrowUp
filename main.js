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
            let STT_Q = await callSTT.quickStart(result['Question']);
            result['qVoice'] = await STT_Q;
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

ipcMain.on('close-mjpg-streamer', async(event, arg) => {
    // let command = './mjpg_streamer -i "./input_uvc.so -y -n" -o "./output_http.so -w ./www"';
    let command = 'killall mjpg_streamer'
    shell.exec(command, (code, std, err) => {
        console.log('Exit code:', code);
        console.log('Program output:', std);
        console.log('Program stderr:', err);
    })
    event.sender.send('reply-close-mjpg-streamer')
})

ipcMain.on('captrue', async(event, args) => {
    let command = 'raspistill -t 1000 -o still-image.jpg'
    shell.exec(command, (code, std, err) => {
        console.log('Exit code:', code);
        console.log('Program output:', std);
        console.log('Program stderr:', err);
    })

    console.log("call captrue");
    // const stillCamera = new StillCamera();

    // const image = await stillCamera.takeImage();

    // fs.writeFileSync("still-image.jpg", image);

    event.sender.send('reply-mainjsfunction-captrue')
})



ipcMain.on('vision', (event, args) => {
    event.sender.send('reply-visionready')
})
let visionAnswer;
ipcMain.on('vision-start', async(event, args) => {
    let array = await callVis.start();
    visionAnswer = array
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
        await page.type('body > header > div > div.search_bar > ul > li:nth-child(5) > form > input[type=text]:nth-child(2)', keyword)
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


        event.reply('replyPbook', PBook)

    } catch (e) {
        console.log('an expection on page.evaluate ', e);

    }
})

ipcMain.on('addQAtoServer', async(event, arg) => {
    // api.Question.addQa(1, "", arg, "./still-image.jpg", arg, "影像辨識", (event) => {
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

    page.on('colse', async() => {
        await browser.close();
    });

    page.on('dialog', async dialog => {
        console.log(dialog.message());
        await dialog.dismiss();
        await page.evaluate(() => {
            const full = document.querySelector('.fp-fullscreen');

            full.onclick = null;

            setTimeout(() => {
                document.querySele
                ctor('.fp-ui').click()
            }, 2000);
            setTimeout(() => {
                full.click()
            }, 1000);

            full.onclick = () => window.colseBrowser();

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
    api.Level.showLevel(1, (req) => {
        const data = JSON.parse(JSON.stringify(req));
        // console.log("data = " + JSON.stringify(data))
        event.sender.send('reply-callZhuyindata', data);
    })
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
    api.People.showChildGoodBabyTotalValue(1, (req) => {
        const tot = JSON.parse(JSON.stringify(req));
        // console.log("data = " + JSON.stringify(data))
        var totValue = tot.content[0]["SUM(add_value)"];
        // 目前總值
        // console.log("data event=" + tot.content[0]["SUM(add_value)"]);
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
    });

    // api.People.showChildGoodBabyDayValue(1, (req) => {
    //     const data = JSON.parse(JSON.stringify(req));
    //     // console.log("data = " + JSON.stringify(data))

    //     event.sender.send('replyGoodregardValue', data);
    // });
});




ipcMain.on('call-frequency', (event, arg) => {
    console.log("success call call-frequency")
    api.Question.showPastQuestion(1, (req) => {
        const freq = JSON.parse(JSON.stringify(req));
        var Cameratotalfreq = 0;
        var Speechtotalfreq = 0;
        let dt = new Date();
        console.log("speechdata =>" + (dt.getDate() - 1))
        console.log("speechdata =>" + (Object.keys(freq.content).length - 1))

        for (i = (Object.keys(freq.content).length - 1); i >= 0; i--) {

            if (freq.content[i].created_at.substring(6, 7) == (dt.getMonth() + 1) & freq.content[i].created_at.substring(8, 10) == (dt.getDate() - 1) || freq.content[i].created_at.substring(9, 10) == (dt.getDate() - 1)) {

                if (freq.content[i].category == "語音") {
                    // console.log("speechdata =>"+freq.content[i].created_at.substring(9, 10))
                    Speechtotalfreq++
                }

            }

        }

        for (i = (Object.keys(freq.content).length - 1); i >= 0; i--) {

            if (freq.content[i].created_at.substring(6, 7) == (dt.getMonth() + 1) & freq.content[i].created_at.substring(8, 10) == (dt.getDate() - 1) || freq.content[i].created_at.substring(9, 10) == (dt.getDate() - 1)) {

                if (freq.content[i].category == "影像辨識") {

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
    api.Level.alterLevel(1, arg, (req) => {
        console.log("data = " + JSON.stringify(req))
            //event.sender.send('reply-callZhuyindata', data);
    });
    api.People.AddChildGoodBabyValue(1, 20, (req) => {
        console.log("data = " + JSON.stringify(req))
            //event.sender.send('reply-callZhuyindata', data);
    });

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

    await console.log("Imgsrc:" + ImgSrc)
        // browser.close();
    event.reply('replyImgURL', ImgSrc)

})


ipcMain.on('searchAnswer', async(event, keyword) => {
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
        await console.log(value);
        Ans['ansText'] = await value;
        let STT_A = await callSTT.quickStart(value);
        Ans['ansVoice'] = await STT_A;

        await event.reply('replyAnswer', Ans)
    });
})

ipcMain.on('searchPictureBook', async(event, keyword) => {
    console.log('Catch picturebook');
    const browser = await puppeteer.launch({
        // executablePath: '/usr/bin/chromium-browser',
        executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
        args: ['--disable-infobars', '--no-default-browser-check' /*, '--start-fullscreen', '--start-maximized' ,'--no-startup-window'*/ ],
        ignoreDefaultArgs: ['--enable-automation'],
        headless: true
    });

    try {
        const page = await browser.newPage();
        await page.goto("https://children.moc.gov.tw/index");
        await page.type('body > header > div > div.search_bar > ul > li:nth-child(5) > form > input[type=text]:nth-child(2)', keyword)
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
        let STTbName = await callSTT.quickStart(PBook['bookName']);
        PBook['bNameVoice'] = STTbName;

        let STTbIntro = await callSTT.quickStart(PBook['bookIntro']);
        PBook['bIntroVoice'] = STTbIntro;

        // console.log("PBook['bookName']:" + PBook['bookName'] + " PBook['bookImg']:" + PBook['bookImg'] + " PBook['bookIntro']" + PBook['bookIntro'])

        event.reply('replyPbook', PBook)

    } catch (e) {
        console.log('an expection on page.evaluate ', e);

    }
})

ipcMain.on('uploadAPI', async(event, APIdata) => {
    // api.Question.addQa
    api.Question.addQa(1, APIdata['Question'], APIdata['Answer'], APIdata['Answer_pic'], APIdata['keyWord'].trim(), "語音", (event) => {
        console.log("callback=" + JSON.stringify(event));
    });

})