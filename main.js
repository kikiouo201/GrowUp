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
// const callSTT = require('./TTS_API_test')
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
        (result) => {

            event.reply('reply-result', result)

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

// ipcMain.on('close-mjpg-streamer',async(event,arg) =>{
//     // let command = './mjpg_streamer -i "./input_uvc.so -y -n" -o "./output_http.so -w ./www"';
//     let command = 'killall mjpg_streamer'
//     shell.exec(command, (code, std, err) => {
//         console.log('Exit code:', code);
//         console.log('Program output:', std);
//         console.log('Program stderr:', err);
//     })
//     event.sender.send('reply-close-mjpg-streamer')
// })

ipcMain.on('captrue', async(event, args) => {
    let command = 'killall mjpg_streamer'
    shell.exec(command, (code, std, err) => {
        console.log('Exit code:', code);
        console.log('Program output:', std);
        console.log('Program stderr:', err);
    })
    event.sender.send('reply-close-mjpg-streamer')

    console.log("call captrue");
    const stillCamera = new StillCamera();

    const image = await stillCamera.takeImage();

    fs.writeFileSync("still-image.jpg", image);

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
        // executablePath: '/usr/bin/chromium-browser',
        executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',

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
            const full =  document.querySelector('.fp-fullscreen');

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
    // 套件名稱 puppeteer
    // https://wcc723.github.io/development/2020/03/01/puppeteer/ 教學網址

    const browser = await puppeteer.launch({

        executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', // 運行的瀏覽器

        // '/usr/bin/chromium-browser' 這是樹梅派 chromium 位置
        // 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', 這是我電腦 chrome 的位置 

        args: ['--disable-infobars', '--no-default-browser-check'], // 設定參數，不用在意
        ignoreDefaultArgs: ['--enable-automation'],
        headless: false //headless:false代表虛擬瀏覽器會呈現出來 headless:true等於虛擬瀏覽器不會呈現，不管怎樣都會執行下面程式碼
    });

    const page = await browser.newPage();
    await page.goto("https://children.moc.gov.tw/song_list"); // 前往 XXX 網址

    //EX：page.evaluate可以相當於直接進入網頁用js
    // await page.evaluate(() => {
    //     document.querySelector('.row');
    //     setTimeout(() => {
    //         document.querySelector('.prev').click()
    //     }, 2000);
    // });

    // EX：page.waitForSelector('你想搜尋的元素') 這等於等頁面跑出這個元素然後抓取 || 等待頁面上的特定元素出現，在非同步的過程中很實用。
    // const PrevBtn = await page.waitForSelector('.prev'); PrevBtn = class 等於 prev 的元素

    // page.click('你想搜尋的元素') 等於直接 點擊 你搜尋的元素
    // await page.click('.prev'); => 點擊 class = prev 的元素
    // await page.click('#button'); 點擊網頁中 id 為 button 的元素

    // page.type(selector, text[, options])：在特定的元素上輸入文字內容，通常是 input 上輸入
    // page.type('.keyword', "蘋果")：在  class 等於 keyword 元素上輸入 蘋果

    // await page.$eval(selector, pageFunction[, ...args]); 對於選取的元素進行特定行為，例如取出元素的 HTML 屬性值。
    // await page.$eval('.fp-ui', elem => elem.click());

    // await 是 非同步過程 || 等待程序(進程) 的概念 很重要基本上都要加


    await browser.close(); //關閉瀏覽器
})





// ipcMain.on('fruitcheck-call', (event, data) => {
//     console.log("result");

//     api.Question.addQa(1, "", "西瓜", "./still-image.jpg", "單詞", (event) => {
//         console.log("callback=" + JSON.stringify(event));
//     });

// })


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
        // console.log("speechdata =>"+JSON.stringify(req))
        console.log("speechdata =>" + freq.content[(Object.keys(freq.content).length - 1)].created_at.substring(9, 10))

        for (i = (Object.keys(freq.content).length - 1); i >= 0; i--) {

            if (freq.content[i].created_at.substring(6, 7) == (dt.getMonth() + 1) & freq.content[i].created_at.substring(9, 10) == (dt.getDate() - 1)) {

                if (freq.content[i].category == "語音") {
                    // console.log("speechdata =>"+freq.content[i].created_at.substring(9, 10))
                    Speechtotalfreq++
                }

            }

        }

        for (i = (Object.keys(freq.content).length - 1); i >= 0; i--) {

            if (freq.content[i].created_at.substring(6, 7) == (dt.getMonth() + 1) & freq.content[i].created_at.substring(9, 10) == (dt.getDate() - 1)) {

                if (freq.content[i].category == "影像辨識") {

                    Cameratotalfreq++
                }

            }

        }

        var CamerapercentColor = Math.round(Cameratotalfreq / 3 * 100);
        if (CamerapercentColor > 100) {
            CamerapercentColor = 100;
        } else {
            CamerapercentColor = Math.round(Cameratotalfreq / 3 * 100);
        }


        var SpeechpercentColor = Math.round(Speechtotalfreq / 3 * 100);
        if (SpeechpercentColor > 100) {
            SpeechpercentColor = 100;
        } else {
            SpeechpercentColor = Math.round(Speechtotalfreq / 3 * 100);
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
        // executablePath: '/usr/bin/chromium-browser',
        executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
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

ipcMain.on('uploadAPI', async(event, APIdata) => {
    // api.Question.addQa
    api.Question.addQa(1, APIdata['Question'], APIdata['Answer'], "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUSEhMWFRUXFxUVFxUXFRcXGhUYGBUWFxUWFRcYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy8iHSUtLS0tKy0tLS0tLSsrLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALMBGQMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAgMEBQYBB//EADsQAAIBAgMFBQYGAQMFAQAAAAABAgMRBCExBRJBUWEGE3GBkSKhsdHh8BQyQlLB8XIHYoIjQ0RTkhX/xAAaAQACAwEBAAAAAAAAAAAAAAAABAECAwUG/8QALhEAAgIBBAEDAgQHAQAAAAAAAAECAxEEEiExQRMiUQWRFGFx0SMyQlKBscEV/9oADAMBAAIRAxEAPwD3EAAAAAAAAAAAAAAAADjGp4iK1kgyThvoeAjrFx5+5jka0XxIyg2v4HAACSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADjAAZGxOMUctX96jWJxtm4R/Mld9Lmd2ljt12V2zGy5RGtPpnY+S0xGMlIjOo+aKP8TJvW3S4vvJfbFJXZOmtLtLlX5nY1mmVdPFS4khVnxaJUysqmuy4oYxosaGJUujMx33FMk0sT1NI34FbNNnlGmAgYPGXyZPGoyUllCEouLwwAALFQAbq1VFZsra+1f228WUlNR7LwrlPotWNTrxWrM/iNrPixieNv8AqMnevA1HRT8mjeOhz9x1Y2H7jLfilzOLGJlfWZp+BNhCono0xZjIYpp5P0LXBbXeks1z4msbU+zKzRzjyuS+Abo1lJXTuhw1EwAAAAAAAAAAAAAAAAAAAAAAAAI2OxKpwlN8FpzfBEhmW7TbVSbgn+XX/J6eiKWS2xNqKnZNRKjEbQaur+1J3m+vJdFoQ+845lfOV3x1HoVrcjmyyz08KlFYRNhUQrvrdSBPErmMvEXephI0VOS2WLz0JNHE72TyKRV+Nx6njOdiPU4KTo+EXgql4lRRxyeT1H5zeqLbhd0tcMuKVVpl7s/F72T1M1g1KST068ybh4OLvvZodplJCGoqjJY8mnuRsbjI01nryI//AOn0XqU+Nws6jb315jFljS9ojTRmXv4QYrF97zz5Mg4jC5ZTs+ufyGsVhq0FdR3/AAd7eWpV/jJXs8vEQnLP8yO1TTlex8FhUw0ksnd8vkQZVpRdnFryf9D0cZbiEtoNmPtb44GYxmu1kgyxzTzFxxw1icDGorp7r45XT8ikxMalNveTtopLOP08Cd0o/oMJQkvzNTRxieVyVTxFsjF0sey1p4x2NlPKyjCVSzg2WztouL+KNTh6ykro80w+MZpuzu0faUXpLLz4DVNvg5Wu0uFvRqgOHRo44AAAAAAAAAAAAAAAAAAABC2ri+7puS10XiebbWrtSs83q31eb++hte09aMd3e0Sbt9+B512hq/8AVlbQVu5Z1/p2I8/Il4lITVxSsVMq+d2d71CcjvRaZP73zExqdbEN1uQidZX4+JizdE6rVbXh7xeHrytmVarzT5kjCV03bO7skubbtkuZRpmixgvtnS3pKKV5PJJcTS4fCQh+Z70vcvBcX1ImzMGsNC8s6slnx3V+1fydq4jmxiqpR90uzk3z9aT2/wAv+yfPE5jbrsq3O/XzCU3z8jbeUWnSLaOMYtYkpnUtxY9Rq3I9QrKhYyXUajtf+bCMRQhVVqkbvhLivPiRqTz1HHVzJc0+GLuDT4KfHbJlTvJe1DmuHiirnW4G1hU4XKza2xFJOdJWlq48JeHJitlDXuh9hujWYe237/uUEJ8h+jO+Ts0+Gt0V/fWOLaCXiZ125H518DmO2AnedFO3GGtusfkOYDApp3kTdnbWaeZX9sa7jCNaGSk92SXOzafuZpZGajugJ7pbtj+4YqrFexF+ZZ7ExLUkuVvVGBhjW3dmj7P41qSuUpnOMueTa2tSraPZ6crpPmriyPgJ3pwf+1Eg7q6PHtYeAAAJIAAAAAAAAAAAAAAAAMt29oN0N9cMvv3nmu0J76jPnFJ/5LJ+89o2rg1WpTpv9UWl0fB+p4hjIyhv0rZpt2900utkn5MWtXJ0dJP24+CvqSE96FWKWfB2+BGrRYvJHYrseMoe74V3y8+ZBafE5KrYycUMKxkqri2nY2HYvZaUViqkfad1ST4LjO3XNLp4mJ2ThHXr06S/XLN8orOT9Ez1GtUSSUVaMVuxXBJKyS8rFowS5MbrnL2L/JzFYnPMizg/pyGYO7u3cmU9CXyTH2rCEQVtF4sWpDFTEL8qGt8q2kaKDZMck+QjvWuT6EdVB+E08mYzksA44JVGqvvgS41EysqqyfEVSqae8VsucecmUqk+SxVRrj9CZhMRdZ/1YoKmIadvMlYXFZfefQcrm2soysozHJD7X7L/APIgrr/uJaJ8Jrx4/wBmQjOz0PTISUouEs4yVmujWZ5ptLC9zVnTee67X4taxfmmmRZFJ7o+TfS3Pb6cvHX6D9DElvWpLEUJ0b5tJx6Si04/C3mZpXWehabNxDjZo1hLwF0crK7K+GxZx1un4aFzsfZLUoyvdXLirUjNXas/iWWwqO9OEVzXpqRCn3Gdl7jXk3GFp7sIx5JL3DxxHTrHl28gAABAAAAAAAAAABy4AdA45DcsRBOzlFO19Vpz8CNyAcZ5p/qHsJwqfiYLKT9q36Zc/M9K3hjG4eFWEqc1eMlZorOO5YNabXXLJ4BXg25NaWv/AIvivB5teBBdXmbHtT2cnhJ7yW9Td7Pg0+D5NffTF42hb2oZx98ejE3HwzrVXpddCZ1UMSfIZUxSmirjgcVuTV9gKKdWrUf6ae6v+cs/dFmqxE7WXPUy3+ntT2q6/wBsH6OXzLvaFV8PvMh9FIc2NjneW0+0KnjNURKE888uITp5P3dTKU8DsYJip1L+P0Iyryb3WNynwa9Aoz588mYTngaisImwxFsiwwrUkVClnwH8LiHG+X39/AWnLMSk45XBcLLVXQiUeKO4PEKWT15D9knyFW9z2sUfteGVGMqX6NHcNWt9+Y/tDDWl04fyQ6NJ3yH9PLbBKQwnFxNFhKmngvgZjtxgt2rTqpXUouDXWOav/wAZJeRdYObVvv71OdrYXw29+2pC3mnH+UNblJcHPn/DsTMPCm27/wBIn0Ked0RYSXEkqqknd24X5FFk2dixllrh3e3n7j0HstgNyHePV6eHM8vwW2qcJL2XUtwT3U/GVsvJFvW7TYmu/wA/dw4Qp+ykuV9WW/FV0+6XL+Dja/WKS2RPUq+Lpw/POMfGSQzT2rRk7KrBvlvI8thLO+vXi/MfYnL67PdxDj9TkOw9XUjp5xszblSg1Z3h+xvLy5G02XtqlWS3ZpSesG1vJ8rcfI6uj+o1ahY6l8P/AIWjNMswOJnToFwAAADjZnu0HaKNJOFO0p21ytHXN83fgU3abtE5t0qTaim1KSaanfKytfLzMzFHB131XGYVff8AYylZ4RMxu0KlV705t5W5K3Ky4ZlfL78BUn92GnM4LnKTy3kzySI4+pFezVmsrZTkvLUdpdo8VTbarSd9VL2lpbRlbNjFaqks/r5I3rttT9rZZM1MO3V47mJoqadlJxfC2b3Hx00aKHaexKNa9XBVou7d6UvZktXa0tV95lFXxN9FZddfoQ6lR63Z1qtXZjE+TWFziRMfhM7OO6+ma+hWVISj1LKq7EKtUQxG9vwbx1cl0X/+n2JtXqReTlSdvKUfqaedPj96nneysd3NaFRfpefWLyl7mz0i+ud09PijSUso6uhu3t5EumndtDbiOKWVhFX8t765C820dmvkj1YX8tRDp8sh2rZxs9ej1G6b3Va9/H4fAUnJjCZ2GntLPmO0otcb+WYKeWaEymkLNybDLLDC1bvUs3PeRQQqLmWeCrLTnxJ2PKYtbHyTMRO9O/JZX58EU7qMm7Yq7kIR/c2/JfVohUlcrq7drSRlVPDHqGIaaF9rcao4P2nnKpBLra8n8BhYWaabeXgUXa3FupUhSWapp3/zla/okl43HqJL09wp9TuUK8rsppYuVvZt/wAr/C38jSo1Jtbzv4NfBD0cNzaFQp55Z9Qla2ebs1U59sm4XDpZWyyuW9KXApqLktGTqNf93u+QhbHdyYb0WcKg9GTZHowTV0/d8ydRqK1mnfg0KbFnngo5HIYeTepZbM2G6srRd7au9kut0ObKwc6ztFPVXly8TcbMwEaMd2OvF82dfQfT1Y90lwTCDk/yIeyNiui7urUl/t3nu+jbuXIAeihCMFtj0NJJLCAAAuSeOxdhE5kmVBL+xmVJHgtuHyIb0R5TuMyl4kuUCBtGrZbqWut1wfI0gsvBKnkaq17Xtr8PmQJyFT8xibG4RwWyJnIjVGOzuM1BiKLojVWQ6pLlF+Jx4NsYi0uy6ZVTN12Q2h3tJU5P2qeXjDSL8tPQzMcISdnuVGcakb3XD9yeq8zX1V0Nae/05pm7k+Aisk1bhlmO5NJ+av8AA5KHpwKyPVUzykyFVovnawzUlNuyWXPUsFTbVnwGp0bLTPkYSG1IhyWS5+nkK3suPmdmnyGLNary4EKvJd9C23f6fItcC873KqzvxXgizwWFUFebt0bzfLIs48GU2sck7btDep02tU3b0+hCwU3DKa10fMvbxnSs+Fmil2pWUaVSyvuxbS0u+GYpbpp2z64Oa5qKbfgl7W2nGjQc8nLSK5yenktfI87lVbd73bu2+berE4/GVKjTqXSWSXCK6fMewTjwV3z+QxGpQjg83q9R6suOvAujQnLRWXN5EqjhHpdLwzHoVF5kiEHwy++RnNPHAg5CFgVzbHFhUmSKEP3PMmrDR+2LuMvkruIMMnlqafsxKhKSjWXtvRt+w+j66lLDDIXTpclkZ12KE1LGcfJKeGer4agoKySS5IkJGd7J7W7yPdS/NBZPW8VZXb5mjPX0WxsgpR6HYtNZQAAGpYAAAAztbYND/wBfo5L+SJLYND9j/wDqXqahwGqlJC8tLU+4r7Iy9NfBg+0mFoUKV1F78rxhaTef7ne6y6mHkm82XnaHFOtiJz3oyim4waVlup5a5vxK2ora2PN6icHY9iSX5C8ms8EGUONrDNSP3xJ/dSeit4nY4NfqzfoiilgjcipUG9FfwOxwF85eiLmNK3CwTpMl3Y6DcVn4VJZIT3ORZd1w1fJZv0J+E7P1Z6rcXNrN+EfmWr32PEVkvFNmcVLgk2+CWbfgi/2R2f3WpzzlwX7fmzSbN2DClory4yer+XkWawtuB2NNo9vun2Mwjjso/wAHkNqlbw+BeVaBX4nDmt9G7lHV0mqcPa+iBGKT+7eZyaXIVUiuOT5iJL7Rz3B55O3C2MllMarU4rw9xGqtLgS9y53uY8cyYxS7NPUwQ41H+lL0zJNLD29qTu+Q7GSjoRMZjoxTzv0jm2axWehey1QWWyU6r0vy/ozu3to5OEXfNb/yXuuV+P2tVn7MU6ceX6n58PIjUaZZywsHntbrN+Yw6JdJpoXPBx1S3fDL6DVCG6+O6WNON8jHd4ZyGM0qUo6WkvR+pMhi+Ek49bZeqyHKEOHFZD9OnbIrgoxuMn+lrxJNKm+LQ28Ir3zvzWT+o5GjJaNPxyfqYutPnBXJJt1Dd63GY1EvzJrx09dB+NV8LeRjZSvAZJOBrOnNSg7NO/8AfNHpOz8XGrBTi7p/HircPA8vc29UaDsrtNUpbkr2lZau0XfW38jP07UOqzZLpjFM8PDN0BxM6eiGwAAABqrVjFXk0lzbsZLtD2ijJOlRu07qUkteaXJdS6xWw4VXerOc+m9aK8IpD+H2TRhbdpxy42u/eYWRsnwuEZSUnwuDzB4GUuG6uiuxVLZj/TCUnwsmz1buVyEughH/AMqPyY+h+Z5zS7OVpZtRgurz9ESqPZV/qn5RT+LN1+GR1YdGi+mUrvkuqUjFw7Kx4yk/JL+CTT7M0l+lvxbNZ3CO90ax0FEf6UXVaRQUNkwh+WKXgiRHCFt3QnuxmMIx6RfBXLDnHQLLuzjplsFioqYch18KX8qQ1PDlXEvGWDJYnAldUwTWmRtqmEIs8AYyqyMwvwYyeGnzYj8JN8WbF7OXI4tnLkZ+gvg1epfyY9bNb1ux2Ox+hro7PQ5HBGsa0LztyYyrsGMlaUU/FEGr2X/a2ujzXzPRo4NCvwK5ES08Zdi0kmeW1Nk1I33oZLis7/yKo4ZrTQ9Ols1ciNW2HCWsUxeWh+GYSq+DBQovXRkiMMtDXz2BHS3p6jc+z2Ss2in4WaMnVIy9NW10HN0v49nZ21Wvhl6CF2dq20Xhco6JrwZuqRTKBx4WOqVn0yLyPZ6rbRLzQ/Hs7V5x9X6aFPQs/tD05fBn40pLR36PJ+qHFUS/NFryuvVGmp9mnxn7vqSY9m4WzlK/SxK0Vj8EqqRH2F2gikqc3kslK97f5ZmmhUTSad0+KM7V7J05fqafOy+JzD7CxFF3o114STt6Zj1TugsSWRiDnHho0wEXBd7b/q7l+cL+9NEoaTybJnLAdAkMCbBYUABgTYLCgAk5Y5YUAAIaObouwWABDiJ3R05YAGt044D1g3QAjumJ7ok7oboARXROOgS90N0ME5IfcgqRM3Dm6BBGVIWqY9uit0AGe7O92O2O2ABnukHdD1gsADSpndwcsdAjA3uHd0WABgTunbHQAnBywWOgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAOgAHAAAAAAAAAAAADoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/9k=", APIdata['keyWord'].trim(), "語音", (event) => {
        console.log("callback=" + JSON.stringify(event));
    });

})