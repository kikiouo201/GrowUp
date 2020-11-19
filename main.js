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
let askhomework = false;
let camehomework = false;
//true 有網路
//false 無網路，資料寫死
let childGoodBabyValue = 740;
//乖寶寶值
let allLevelIsPass = JSON.parse('{ "event": "show_level", "content": [ { "id": 1, "child_id": 1, "level_name": "ㄅ", "ispass": 1, "created_at": "2020-08-17 00:59:16", "updated_at": "2020-11-07 19:37:38" }, { "id": 2, "child_id": 1, "level_name": "ㄆ", "ispass": 1, "created_at": "2020-08-17 01:00:46", "updated_at": "2020-10-28 01:00:46" }, { "id": 3, "child_id": 1, "level_name": "ㄇ", "ispass": 1, "created_at": "2020-08-17 01:00:46", "updated_at": "2020-10-25 01:00:46" }, { "id": 4, "child_id": 1, "level_name": "ㄈ", "ispass": 1, "created_at": "2020-08-17 01:01:26", "updated_at": "2020-10-28 15:42:19" }, { "id": 5, "child_id": 1, "level_name": "ㄉ", "ispass": 1, "created_at": "2020-08-17 01:01:26", "updated_at": "2020-10-28 19:54:04" }, { "id": 6, "child_id": 1, "level_name": "ㄊ", "ispass": 0, "created_at": "2020-08-17 01:01:54", "updated_at": "2020-10-16 22:32:04" }, { "id": 7, "child_id": 1, "level_name": "ㄋ", "ispass": 1, "created_at": "2020-08-17 01:01:54", "updated_at": "2020-11-07 11:31:59" }, { "id": 8, "child_id": 1, "level_name": "ㄌ", "ispass": 1, "created_at": "2020-08-17 01:02:36", "updated_at": "2020-11-07 11:47:27" }, { "id": 9, "child_id": 1, "level_name": "ㄍ", "ispass": 1, "created_at": "2020-08-17 01:02:36", "updated_at": "2020-11-06 11:55:39" }, { "id": 10, "child_id": 1, "level_name": "ㄎ", "ispass": 0, "created_at": "2020-08-23 12:20:10", "updated_at": "2020-10-16 17:50:48" }, { "id": 11, "child_id": 1, "level_name": "ㄏ", "ispass": 0, "created_at": "2020-08-24 09:41:00", "updated_at": "2020-10-16 17:50:54" }, { "id": 12, "child_id": 1, "level_name": "ㄐ", "ispass": 0, "created_at": "2020-08-24 09:41:11", "updated_at": "2020-10-16 17:50:59" }, { "id": 13, "child_id": 1, "level_name": "ㄑ", "ispass": 0, "created_at": "2020-08-24 09:41:20", "updated_at": "2020-10-16 17:51:05" }, { "id": 14, "child_id": 1, "level_name": "ㄒ", "ispass": 0, "created_at": "2020-08-24 09:42:33", "updated_at": "2020-10-15 19:37:56" }, { "id": 15, "child_id": 1, "level_name": "ㄓ", "ispass": 0, "created_at": "2020-08-24 09:42:45", "updated_at": "2020-10-15 19:37:59" }, { "id": 16, "child_id": 1, "level_name": "ㄔ", "ispass": 0, "created_at": "2020-08-24 09:42:56", "updated_at": "2020-10-15 19:38:03" }, { "id": 17, "child_id": 1, "level_name": "ㄕ", "ispass": 0, "created_at": "2020-08-24 09:43:05", "updated_at": "2020-10-15 19:38:05" }, { "id": 18, "child_id": 1, "level_name": "ㄖ", "ispass": 0, "created_at": "2020-08-24 09:44:06", "updated_at": "2020-11-07 19:38:07" }, { "id": 19, "child_id": 1, "level_name": "ㄗ", "ispass": 0, "created_at": "2020-08-24 09:44:34", "updated_at": "2020-10-15 19:38:14" }, { "id": 20, "child_id": 1, "level_name": "ㄘ", "ispass": 0, "created_at": "2020-08-24 09:44:46", "updated_at": "2020-10-15 20:26:04" }, { "id": 21, "child_id": 1, "level_name": "ㄙ", "ispass": 0, "created_at": "2020-08-24 09:44:54", "updated_at": "2020-10-15 20:26:07" }, { "id": 22, "child_id": 1, "level_name": "ㄧ", "ispass": 0, "created_at": "2020-08-24 09:45:03", "updated_at": "2020-10-15 20:26:10" }, { "id": 23, "child_id": 1, "level_name": "ㄨ", "ispass": 0, "created_at": "2020-08-24 09:45:34", "updated_at": "2020-10-15 20:26:12" }, { "id": 24, "child_id": 1, "level_name": "ㄩ", "ispass": 0, "created_at": "2020-08-24 09:45:46", "updated_at": "2020-10-15 20:26:13" }, { "id": 25, "child_id": 1, "level_name": "ㄚ", "ispass": 0, "created_at": "2020-08-24 09:45:53", "updated_at": "2020-10-16 17:51:22" }, { "id": 26, "child_id": 1, "level_name": "ㄛ", "ispass": 0, "created_at": "2020-08-24 09:46:06", "updated_at": "2020-10-16 17:51:27" }, { "id": 27, "child_id": 1, "level_name": "ㄜ", "ispass": 0, "created_at": "2020-08-24 09:46:51", "updated_at": "2020-10-15 20:26:18" }, { "id": 28, "child_id": 1, "level_name": "ㄝ", "ispass": 0, "created_at": "2020-08-24 09:47:00", "updated_at": "2020-10-15 20:26:16" }, { "id": 29, "child_id": 1, "level_name": "ㄞ", "ispass": 0, "created_at": "2020-08-24 09:47:07", "updated_at": "2020-10-15 20:26:20" }, { "id": 30, "child_id": 1, "level_name": "ㄟ", "ispass": 0, "created_at": "2020-08-24 09:47:28", "updated_at": "2020-10-15 20:26:22" }, { "id": 31, "child_id": 1, "level_name": "ㄠ", "ispass": 1, "created_at": "2020-08-24 09:47:45", "updated_at": "2020-10-16 17:52:01" }, { "id": 32, "child_id": 1, "level_name": "ㄡ", "ispass": 1, "created_at": "2020-08-24 09:47:54", "updated_at": "2020-10-16 17:52:13" }, { "id": 33, "child_id": 1, "level_name": "ㄢ", "ispass": 1, "created_at": "2020-08-24 09:48:13", "updated_at": "2020-10-16 17:52:25" }, { "id": 34, "child_id": 1, "level_name": "ㄣ", "ispass": 1, "created_at": "2020-08-24 09:54:42", "updated_at": "2020-10-16 17:52:39" }, { "id": 35, "child_id": 1, "level_name": "ㄤ", "ispass": 1, "created_at": "2020-08-24 09:55:19", "updated_at": "2020-10-16 17:52:46" }, { "id": 36, "child_id": 1, "level_name": "ㄥ", "ispass": 1, "created_at": "2020-08-24 09:55:26", "updated_at": "2020-10-16 17:51:48" }, { "id": 37, "child_id": 1, "level_name": "ㄦ", "ispass": 1, "created_at": "2020-08-24 10:00:34", "updated_at": "2020-10-16 17:53:12" }, { "id": 38, "child_id": 1, "level_name": "1", "ispass": 0, "created_at": "2020-08-24 10:00:41", "updated_at": "2020-10-30 17:56:12" }, { "id": 39, "child_id": 1, "level_name": "2", "ispass": 0, "created_at": "2020-08-24 10:00:49", "updated_at": "2020-10-31 20:26:36" }, { "id": 40, "child_id": 1, "level_name": "3", "ispass": 0, "created_at": "2020-08-24 10:00:56", "updated_at": "2020-10-15 20:26:38" }, { "id": 41, "child_id": 1, "level_name": "4", "ispass": 1, "created_at": "2020-08-24 10:01:04", "updated_at": "2020-10-17 17:56:24" }, { "id": 42, "child_id": 1, "level_name": "5", "ispass": 1, "created_at": "2020-08-24 10:01:11", "updated_at": "2020-10-17 17:56:34" }, { "id": 43, "child_id": 1, "level_name": "6", "ispass": 1, "created_at": "2020-08-24 10:01:19", "updated_at": "2020-10-16 17:56:51" }, { "id": 44, "child_id": 1, "level_name": "7", "ispass": 1, "created_at": "2020-08-24 10:01:31", "updated_at": "2020-10-16 17:57:14" }, { "id": 45, "child_id": 1, "level_name": "8", "ispass": 1, "created_at": "2020-08-24 10:01:37", "updated_at": "2020-10-16 17:57:24" }, { "id": 46, "child_id": 1, "level_name": "9", "ispass": 1, "created_at": "2020-08-24 10:01:43", "updated_at": "2020-10-16 17:57:34" }, { "id": 47, "child_id": 1, "level_name": "0", "ispass": 0, "created_at": "2020-08-24 10:02:29", "updated_at": "2020-10-15 20:26:50" }, { "id": 48, "child_id": 1, "level_name": "a", "ispass": 0, "created_at": "2020-08-24 10:16:42", "updated_at": "2020-11-07 20:25:49" }, { "id": 49, "child_id": 1, "level_name": "b", "ispass": 0, "created_at": "2020-08-24 10:16:56", "updated_at": "2020-10-16 17:53:47" }, { "id": 50, "child_id": 1, "level_name": "c", "ispass": 0, "created_at": "2020-08-24 10:17:05", "updated_at": "2020-10-15 20:25:52" }, { "id": 51, "child_id": 1, "level_name": "d", "ispass": 0, "created_at": "2020-08-24 10:17:36", "updated_at": "2020-10-16 17:53:57" }, { "id": 52, "child_id": 1, "level_name": "e", "ispass": 0, "created_at": "2020-08-24 10:17:44", "updated_at": "2020-10-15 20:27:04" }, { "id": 53, "child_id": 1, "level_name": "f", "ispass": 0, "created_at": "2020-08-24 10:18:45", "updated_at": "2020-10-15 20:27:02" }, { "id": 54, "child_id": 1, "level_name": "g", "ispass": 0, "created_at": "2020-08-24 10:18:55", "updated_at": "2020-10-15 20:27:07" }, { "id": 55, "child_id": 1, "level_name": "h", "ispass": 0, "created_at": "2020-08-24 10:19:03", "updated_at": "2020-10-15 20:27:06" }, { "id": 56, "child_id": 1, "level_name": "i", "ispass": 0, "created_at": "2020-08-24 10:19:17", "updated_at": "2020-10-16 17:54:44" }, { "id": 57, "child_id": 1, "level_name": "j", "ispass": 1, "created_at": "2020-08-24 10:19:27", "updated_at": "2020-11-04 17:54:17" }, { "id": 58, "child_id": 1, "level_name": "k", "ispass": 1, "created_at": "2020-08-24 10:19:41", "updated_at": "2020-10-16 17:54:31" }, { "id": 59, "child_id": 1, "level_name": "l", "ispass": 1, "created_at": "2020-08-24 10:20:53", "updated_at": "2020-10-21 13:47:35" }, { "id": 60, "child_id": 1, "level_name": "m", "ispass": 1, "created_at": "2020-08-24 10:21:01", "updated_at": "2020-11-04 17:55:17" }, { "id": 61, "child_id": 1, "level_name": "n", "ispass": 1, "created_at": "2020-08-24 10:21:08", "updated_at": "2020-11-03 17:55:05" }, { "id": 62, "child_id": 1, "level_name": "o", "ispass": 0, "created_at": "2020-08-24 10:21:20", "updated_at": "2020-10-15 20:27:20" }, { "id": 63, "child_id": 1, "level_name": "p", "ispass": 0, "created_at": "2020-08-24 10:21:28", "updated_at": "2020-10-15 20:27:18" }, { "id": 64, "child_id": 1, "level_name": "q", "ispass": 0, "created_at": "2020-08-24 10:21:39", "updated_at": "2020-10-16 17:55:31" }, { "id": 65, "child_id": 1, "level_name": "r", "ispass": 0, "created_at": "2020-08-24 10:21:46", "updated_at": "2020-10-16 17:55:39" }, { "id": 66, "child_id": 1, "level_name": "s", "ispass": 0, "created_at": "2020-08-24 10:21:53", "updated_at": "2020-10-15 20:27:29" }, { "id": 67, "child_id": 1, "level_name": "t", "ispass": 0, "created_at": "2020-08-24 10:22:01", "updated_at": "2020-10-15 20:27:27" }, { "id": 68, "child_id": 1, "level_name": "u", "ispass": 0, "created_at": "2020-08-24 10:22:09", "updated_at": "2020-10-15 20:27:26" }, { "id": 69, "child_id": 1, "level_name": "v", "ispass": 0, "created_at": "2020-08-24 10:22:18", "updated_at": "2020-10-15 20:27:22" }, { "id": 70, "child_id": 1, "level_name": "w", "ispass": 0, "created_at": "2020-08-24 10:22:25", "updated_at": "2020-10-15 20:27:24" }, { "id": 71, "child_id": 1, "level_name": "x", "ispass": 0, "created_at": "2020-08-24 10:22:33", "updated_at": "2020-10-15 20:27:31" }, { "id": 72, "child_id": 1, "level_name": "y", "ispass": 0, "created_at": "2020-08-24 10:22:40", "updated_at": "2020-10-15 20:27:32" }, { "id": 73, "child_id": 1, "level_name": "z", "ispass": 0, "created_at": "2020-08-24 10:22:47", "updated_at": "2020-10-15 20:27:34" }, { "id": 74, "child_id": 1, "level_name": "changhua", "ispass": 0, "created_at": "2020-08-27 16:45:35", "updated_at": "2020-10-15 13:48:30" }, { "id": 75, "child_id": 1, "level_name": "chiayi", "ispass": 0, "created_at": "2020-08-27 16:45:59", "updated_at": "2020-10-15 13:48:39" }, { "id": 76, "child_id": 1, "level_name": "hsinchu", "ispass": 0, "created_at": "2020-08-27 16:46:26", "updated_at": "2020-10-15 13:48:55" }, { "id": 77, "child_id": 1, "level_name": "plus", "ispass": 0, "created_at": "2020-08-27 16:46:40", "updated_at": "2020-10-16 17:57:58" }, { "id": 78, "child_id": 1, "level_name": "kaohsiung", "ispass": 1, "created_at": "2020-08-27 16:47:18", "updated_at": "2020-10-26 13:49:03" }, { "id": 79, "child_id": 1, "level_name": "keelung", "ispass": 1, "created_at": "2020-08-27 16:47:30", "updated_at": "2020-10-16 17:58:07" }, { "id": 80, "child_id": 1, "level_name": "miaoli", "ispass": 1, "created_at": "2020-08-27 16:47:43", "updated_at": "2020-10-16 17:58:19" }, { "id": 81, "child_id": 1, "level_name": "nantou", "ispass": 0, "created_at": "2020-08-27 16:47:57", "updated_at": "2020-10-16 17:59:10" }, { "id": 82, "child_id": 1, "level_name": "newTaipei", "ispass": 1, "created_at": "2020-08-27 16:48:09", "updated_at": "2020-10-16 17:59:10" }, { "id": 83, "child_id": 1, "level_name": "minus", "ispass": 0, "created_at": "2020-08-27 16:48:23", "updated_at": "2020-10-16 17:59:10" }, { "id": 84, "child_id": 1, "level_name": "taichung", "ispass": 0, "created_at": "2020-08-27 16:48:39", "updated_at": "2020-10-16 17:59:10" }, { "id": 85, "child_id": 1, "level_name": "tainan", "ispass": 1, "created_at": "2020-08-27 16:48:53", "updated_at": "2020-10-26 17:59:10" }, { "id": 86, "child_id": 1, "level_name": "taipei", "ispass": 0, "created_at": "2020-08-27 16:50:40", "updated_at": "2020-10-16 17:59:10" }, { "id": 87, "child_id": 1, "level_name": "yo", "ispass": 0, "created_at": "2020-10-15 21:23:07", "updated_at": "2020-10-15 21:23:07" }, { "id": 88, "child_id": 1, "level_name": "taoyuan", "ispass": 0, "created_at": "2020-08-27 16:52:05", "updated_at": "2020-10-16 17:59:10" }, { "id": 89, "child_id": 1, "level_name": "yilan", "ispass": 0, "created_at": "2020-08-27 16:52:18", "updated_at": "2020-10-16 17:59:10" }, { "id": 90, "child_id": 1, "level_name": "yunlin", "ispass": 0, "created_at": "2020-08-27 16:52:34", "updated_at": "2020-10-16 17:59:10" }, { "id": 91, "child_id": 1, "level_name": "findBallast", "ispass": 1, "created_at": "2020-09-03 10:59:05", "updated_at": "2020-10-16 17:59:51" }, { "id": 92, "child_id": 1, "level_name": "gophers", "ispass": 1, "created_at": "2020-09-03 10:59:17", "updated_at": "2020-10-26 17:59:44" }, { "id": 93, "child_id": 1, "level_name": "pickingUpIsALittleRed", "ispass": 1, "created_at": "2020-09-03 10:59:39", "updated_at": "2020-10-16 17:59:38" }, { "id": 94, "child_id": 1, "level_name": "puzzle", "ispass": 1, "created_at": "2020-09-03 10:59:51", "updated_at": "2020-10-20 17:59:57" }, { "id": 95, "child_id": 1, "level_name": "hualien", "ispass": 1, "created_at": "2020-09-05 23:57:38", "updated_at": "2020-10-16 17:59:10" }, { "id": 96, "child_id": 1, "level_name": "pingtung", "ispass": 0, "created_at": "2020-09-05 23:57:50", "updated_at": "2020-10-16 17:59:10" }, { "id": 97, "child_id": 1, "level_name": "taitung", "ispass": 1, "created_at": "2020-10-15 14:50:40", "updated_at": "2020-10-16 17:59:10" } ] }');

function createWindow() {

    // 创建浏览器窗口。
    win = new BrowserWindow({
        icon: path.join(__dirname, 'icons/raspberry_icon.png'),
        fullscreen: true,
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

    if (IsNetwork == true) {
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

            });
    } else {
        result = {
            "Question": '獅子是什麼',
            "Answer": '動物名。哺乳綱食肉目貓科。多分布於印度及非洲一帶。身長約二、三公尺，頭圓肩闊，四肢強健，有鉤爪，尾細長。雄獅頭至頸部有鬣，雌獅體型較小，無鬣。營社會生活。以大型草食性動物為主食。',
            "Answer_pic": "data:image/jpeg;base64,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",
            "keyWord": '獅子',
            "pbookName": "小獅子多多",
            "bookImg": "https://children.moc.gov.tw/resource/animate_image/6737.jpg",
            "pbookIntro": "有一天，森林裡突然發生大火，小獅子多多奮不顧身的搶救同伴。但是多多美麗的鬃毛，卻被燒毀…他很難過，很傷心，他覺得自己的樣子變得很醜，一定沒有人會喜歡他。真的會這樣嗎？",
        }

        setTimeout(async() => {
            await event.reply('reply-start')
        }, 8000);

        setTimeout(async() => {
            await event.reply('anaysis-voice')
        }, 11000);

        setTimeout(async() => {
            await event.reply('reply-noNetwork-result', result);
        }, 14000);
    }
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
    if (IsNetwork == true) {
        setTimeout(() => {
            event.sender.send('reply-mainjsfunction-captrue')
        }, 2000);

    } else {
        setTimeout(() => {
            event.sender.send('reply-writeDead')
        }, 2000);

    }

})



ipcMain.on('vision', (event, args) => {
    console.log("call-vision")
    event.sender.send('reply-visionready')
})
let visionAnswer;
ipcMain.on('vision-start', async(event, args) => {
    let array = await callVis.start();
    console.log("start-vision")
        // let cameraSTT_Ans = await callSTT.cameraTTS('crawlerR', 1, array);

    visionAnswer = array
        //array.forEach(label => console.log("vis="+label.description));
    event.sender.send('reply-mainjsfunction', array)
})



ipcMain.on('crawler', async (event, args) => {
    // let webcrawler = await callCrawler.webcrawler();
    //  console.log(`webcrawler=${webcrawler}`)
    console.log("call-crawler")

    if (explainJSON[0][args] == undefined) {
        const data = encodeURI(args)
        console.log(data)
        const url = 'https://www.moedict.tw/' + data + '#gsc.tab=0'
        let output = [];
        console.log(url)
        request(url, async (err, res, body) => {

            if (!err && res.statusCode == 200) {
                const $ = cheerio.load(body);
                // let def = $('.def')
                // output = def.find('a').text()

                await $('.def').each(function(i, elem) {
                    output[i] = $(this).text();
                });

            }
            //console.log(output);
            event.sender.send('reply-webcrawlerfunction', output[0]);
            console.log(output);

        })
    } else {
        event.sender.send('reply-webcrawlerfunction', explainJSON[0][args]);
    }



    //  event.sender.send('reply-webcrawlerfunction',webcrawler);

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

    event.sender.send('replyPresetCamera', cameraPreset);
})


ipcMain.on('cameraWebcrawler', async(event, cameraWebC) => {
    // console.log("cameraWebC['ans']:" + cameraWebC['ans'] + ",cameraWebC['content'] " + cameraWebC['picName_camera'])

    let C_voiceAns = await callSTT.cameraTTS('crawler', 1, cameraWebC['ans']);
    cameraWebC['ansV'] = C_voiceAns;

    let C_voiceContent = await callSTT.cameraTTS('crawler', 2, cameraWebC['content']);
    cameraWebC['contentV'] = C_voiceContent;

    let C_voicePicName = await callSTT.cameraTTS('crawler', 3, cameraWebC['picName_camera']);
    cameraWebC['picName_cameraV'] = C_voicePicName;

    let C_voicePicIntro = await callSTT.cameraTTS('crawler', 4, cameraWebC['picIntro_camera']);
    cameraWebC['picIntro_cameraV'] = C_voicePicIntro;

    event.sender.send('replyCameraWebC', cameraWebC);
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

        let PBook = {
            "bookName": "",
            "bookImg": "",
            "bookIntro": "",
            "bNameVoice": "",
            "bIntroVoice": ""
        };


        // 動畫類的第一本書，之後判斷沒有的話，無書目
        const findFBookDIV = await page.waitForSelector('#main > div > div.row > div > div.wood_bg > div > article > div:nth-child(4) > div:nth-child(1) > div > section')

        const findFBookName = await page.$('#main > div > div.row > div > div.wood_bg > div > article > div:nth-child(4) > div:nth-child(1) > div > section > h2 > a')
            // await findFBook.setDefaultNavigationTimeout(10000);
        await findFBookName.evaluate(node => node.innerText).then((value) => {
            Answer = value;
            // console.log(value);
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




        event.sender.send('cameraReplyPbook', PBook)

    } catch (e) {
        console.log('an expection on page.evaluate ', e);
        let PBook = {
            "bookName": "",
            "bookImg": "",
            "bookIntro": "",
            "bNameVoice": "",
            "bIntroVoice": ""
        };
        PBook['bookName'] = '查無此書目';
        // let STTbName = await callSTT.quickStart('crawlerNoBook', 3, PBook['bookName'], click_num);
        // PBook['bNameVoice'] = STTbName;

        event.sender.send('cameraReplynoPbook', PBook)
    }
})

ipcMain.on('addQAtoServer', async(event, arg) => {
    api.Question.addQa(1, arg['answer'], arg['content'], "./still-image.jpg", arg['answer'], "影像辨識", (event) => {
        console.log("callback=" + JSON.stringify(event));
    });
})

ipcMain.on('sendWriteDeadtoServer', async(event, arg) => {
    console.log("no!!!!!!")
    api.Question.addQa(1, "蘋果", "落業喬木。葉軟形，邊緣有細尖鋸齒。果實球形，味美，可食，也可製酒。", "./still-image.jpg", "蘋果", "影像辨識", (event) => {
        console.log("callback=" + JSON.stringify(event));
    });
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

        args: ['--start-fullscreen','--disable-infobars', '--no-default-browser-check'/*, '--start-maximized' ,'--no-startup-window'*/ ],
        ignoreDefaultArgs: ['--enable-automation'],
        headless: false
    });
    const page = await browser.newPage();
    event.reply('colseLoading');

    page.on('colse', async() => {
        await browser.close();
    });

    // page.on('dialog', async dialog => {
    //     console.log(dialog.message());
    //     await dialog.dismiss();
    //     await page.evaluate(() => {
    //         const full = document.querySelector('.fp-fullscreen');

    //         // full.onclick = null;

    //         // setTimeout(() => {
    //         //     document.querySelector('.fp-ui').click()
    //         // }, 2000);
    //         // setTimeout(() => {
    //         //     full.click()
    //         // }, 1000);

    //         // full.onclick = () => window.colseBrowser();

    //     })
    // });

    await page.exposeFunction('colseBrowser', () => {
        page.emit('colse');

    });
    // await page.exposeFunction('colseBrowser', () => {
    //     page.emit('colse');
    // });
    // let currentScreen = await page.evaluate(() => {
    //     return {
    //         width: window.screen.availWidth,
    //         height: window.screen.availHeight,
    //     };
    // });
    // //設定預設網頁頁面大小
    // await page.setViewport(currentScreen);
    await page.goto(args);
    await page.evaluate(() => {
        document.querySelector('.fp-fullscreen').click();

        setTimeout(() => {
            document.querySelector('.fp-ui').click()
        }, 3000);

        document.querySelector('.fp-fullscreen').onclick = () => window.colseBrowser();
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

ipcMain.on('callMagicCard', (event, arg) => {
    if (IsNetwork == false) {
        console.log("success call JSON Magic Card")
        event.sender.send('replyMagicCard', allLevelIsPass);

    } else {
        console.log("success call Magic Card")
        api.Level.showLevel(1, (req) => {
            const data = JSON.parse(JSON.stringify(req));
            // console.log("data = " + JSON.stringify(data))
            event.sender.send('replyMagicCard', data);
        });
    }
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
    if (IsNetwork == false) {
        event.sender.send('selectJsonOnTL', allLevelIsPass);

    } else {
        api.Level.showLevel(1, (req) => {
            const data = JSON.parse(JSON.stringify(req));
            event.sender.send('selectJsonOnTL', data);
        });
    }
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
    if (IsNetwork == true) {
        api.Question.showPastQuestion(1, (req) => {
            const freq = JSON.parse(JSON.stringify(req));
            let Cameratotalfreq = 0;
            let Speechtotalfreq = 0;
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
    } else {
        event.sender.send('reply-deadfrequency');
    }


})
ipcMain.on('reply-homework', (event, data) => {
    askhomework = data['ask'];
    camerahomework = data['camera'];
})
ipcMain.on('call-alertIcon', (event, data) => {
    api.Question.showPastQuestion(1, (req) => {
        console.log("123456");
        const freq = JSON.parse(JSON.stringify(req));
        let dt = new Date();
        let Camtotalfreq = 0;
        let Spetotalfreq = 0;
        let AllData = {
            "Camtotalfreq": Camtotalfreq,
            "Spetotalfreq": Spetotalfreq,
        }

        for (i = (Object.keys(freq.content).length - 1); i >= 0; i--) {

            if (freq.content[i].created_at.substring(6, 7) == (dt.getMonth() + 1) || freq.content[i].created_at.substring(5, 7) == (dt.getMonth() + 1) & freq.content[i].created_at.substring(8, 10) == dt.getDate() || freq.content[i].created_at.substring(9, 10) == dt.getDate()) {

                if (freq.content[i].category == "語音") {
                    // console.log("speechdata =>"+freq.content[i].created_at.substring(9, 10))
                    Spetotalfreq++
                } else {

                    Camtotalfreq++
                }

            }

        }

        event.sender.send('reply-alertIcon', AllData);
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

    await page.goto("https:\/\/www.google.com.tw/search?q=" + keyword + "&tbm=isch&ved=2ahUKEwii497y-IvtAhWSZ94KHevqBagQ2-cCegQIABAA&oq=李子&gs_lcp=CgNpbWcQAzIFCAAQsQMyAggAMgIIADICCAAyAggAMgIIADICCAAyAggAMgIIADICCABQ4R1YvSlghjVoAHAAeACAAbwCiAHxB5IBBzAuMS4xLjKYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=av-0X6KGIpLP-Qbr1ZfACg&bih=625&biw=1366&hl=zh-TW");

    const ImgSrc = await page.$eval('.rg_i', imgs => imgs.getAttribute('src'));

    // await console.log("Imgsrc:" + ImgSrc)
    // browser.close();
    await event.reply('replyImgURL', ImgSrc)
    await browser.close()

})


ipcMain.on('searchAnswer', async(event, keyword, click_num) => {
    console.log('Catch Answer');
    let Ans = {
        "ansText": "",
        "ansVoice": ""
    };
    let output = [];
    if (keyword.toString().trim().includes('子')) {
        console.log('QuQ Pudding')
            // await console.log("kw:" + keyword.substring(0, keyword.toString().trim().length - 1))
        keyword = await keyword.substring(0, keyword.toString().trim().length - 1);
        const data = await encodeURI(keyword)
        await console.log(data)
        const url = await 'https://www.moedict.tw/' + data + '#gsc.tab=0'

        console.log(url)
        await request(url, async(err, res, body) => {

            if (!err && res.statusCode == 200) {
                const $ = await cheerio.load(body);
                // let def = await $('.def')
                // console.log(def)
                await $('.def').each(function(i, elem) {
                    output[i] = $(this).text();
                });

                // output = await def.toString()
                // let def = await $('.def')[0];
                // output = await evaluate(def => element.textContent, def);

            }
            //console.log(output);

            Ans['ansText'] = await output[0];
            let STT_A = await callSTT.quickStart('crawler', 2, output[0], click_num);
            Ans['ansVoice'] = await STT_A;
            await event.sender.send('replyAnswer', Ans);
            await console.log(output);

        })
    } else {
        console.log('QuQ Pudding2')

        const data = await encodeURI(keyword)
        await console.log(data)
        const url = await 'https://www.moedict.tw/' + data + '#gsc.tab=0'

        await console.log(url)
        request(url, async(err, res, body) => {

            if (!err && res.statusCode == 200) {
                const $ = await cheerio.load(body);
                // let def = await $('.def')[0].contents().first()
                    // console.log(def)

                // output = await def.text()
                // let def = await $('.def')[0];
                // output = await page.evaluate(def => element.textContent, def);
                // output = await def.text()

                await $('.def').each(function(i, elem) {
                    output[i] = $(this).text();
                });

            }
            //console.log(output);

            Ans['ansText'] = await output[0];
            let STT_A = await callSTT.quickStart('crawler', 2, output[0], click_num);
            Ans['ansVoice'] = await STT_A;
            await event.sender.send('replyAnswer', Ans);
            await console.log(output);

        })
    }

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

    let PBook = {
        "bookName": "",
        "bookImg": "",
        "bookIntro": "",
        "bNameVoice": "",
        "bIntroVoice": ""
    };

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
        try {
            const findFBookDIV = await page.waitForSelector('#main > div > div.row > div > div.wood_bg > div > article > div:nth-child(4) > div:nth-child(1) > div > section', {
                timeout: 5000
            })
        } catch (e) {
            console.log('NoPicBook Err:' + e + " TheEND");
            PBook['bookName'] = '查無此書目';
            let STTbName = await callSTT.quickStart('crawlerNoBook', 3, PBook['bookName'], click_num);
            PBook['bNameVoice'] = STTbName;

            await event.reply('replyNoPbook', 'error', PBook)
            await browser.close();
        }
        if (findFBookDIV !== null) {
            const findFBookName = await page.$('#main > div > div.row > div > div.wood_bg > div > article > div:nth-child(4) > div:nth-child(1) > div > section > h2 > a')
                // await findFBook.setDefaultNavigationTimeout(10000);
            await findFBookName.evaluate(node => node.innerText).then((value) => {
                Answer = value;
                // console.log("value==X" + value);
            });
            const findFBookPic = await page.$('.pic')
            const picURL = await findFBookPic.$eval('img', src => src.getAttribute('src'))
            await console.log("picURL:" + picURL)

            // 動畫第一本絕對位置
            // const findBookIntro = await page.$eval('#main > div > div.row > div > div.wood_bg > div > article > div:nth-child(4) > div:nth-child(1) > div > section > a > p', a => a.textContent.trim())
            const findBookIntro = await page.$eval('p', al => al.textContent.trim())
                // await console.log("findBookIntro:XX" + findBookIntro)
            PBook['bookName'] = Answer;
            PBook['bookImg'] = picURL;
            PBook['bookIntro'] = findBookIntro;
            let STTbName = await callSTT.quickStart('crawler', 3, PBook['bookName'], click_num);
            PBook['bNameVoice'] = STTbName;

            let STTbIntro = await callSTT.quickStart('crawler', 4, PBook['bookIntro'], click_num);
            PBook['bIntroVoice'] = STTbIntro;

            // console.log("PBook['bookName']:" + PBook['bookName'] + " PBook['bookImg']:" + PBook['bookImg'] + " PBook['bookIntro']" + PBook['bookIntro'])

            await event.reply('replyPbook', PBook)
            await browser.close();

        }
    } catch (e) {
        console.log('an expection on page.evaluate ', e);
        PBook['bookName'] = '查無此書目';
        let STTbName = await callSTT.quickStart('crawlerNoBook', 3, PBook['bookName'], click_num);
        PBook['bNameVoice'] = STTbName;

        await event.reply('replyNoPbook', 'error', PBook)
        await browser.close();

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
    // console.log("prePic[Question]" + prePic['data']['Question'] + ",prePic[i] " + prePic['i'])
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
        {
            'Question': prePic['data']['Question'],
            'Answer': "動物名。哺乳綱食肉目。頭大，四肢粗短，力氣大。用腳掌走路，能攀登樹木。全身覆濃毛，有冬眠習慣，而以肉食為主，多產於寒帶。",
            'pbookName': "三隻熊",
            'pbookIntro': "小女孩把小熊的南瓜湯，喝掉了。把小熊的小搖椅，弄壞了。她還會在三隻熊的家裡，發現什麼？做出什麼事呢？三隻熊回家時，小女孩還會在牠們家裡嗎",
            'Q_voice': "",
            'A_voice': "",
            'pbName_voice': "",
            'pbIntro_voice': "",
            'Answer_pic': "data:image/jpeg;base64,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",
            'bookImg': 'https://children.moc.gov.tw/resource/animate_image/6743.jpg',
        },
        {
            'Question': prePic['data']['Question'],
            'Answer': "柿樹的果實，可以食用。",
            'pbookName': "風乾柿子話客家",
            'pbookIntro': "因為文化形成的特殊性，再加上臺灣客家先民因地制宜之生存智慧，臺灣客家文化漸漸發展出具有獨特性的客家新風貌……在「風乾柿子話客家 」主題中，我們將與大家一起品味柿子、柿餅，同時，認識臺灣客家文化的風貌...",
            'Q_voice': "",
            'A_voice': "",
            'pbName_voice': "",
            'pbIntro_voice': "",
            'Answer_pic': "data:image/jpeg;base64,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",
            'bookImg': 'https://children.moc.gov.tw/resource/animate_image/6828.jpg',
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

    await event.reply('replyPresetAnsPBook', preset[prePic['i']]);
})


ipcMain.on('pictureBookTTS', async(event, picBookTTS, num) => {

    let pbTTS = await callSTT.pictureBookTTS(picBookTTS, num);
    await event.reply('replyPbTTS', pbTTS);
})


ipcMain.on('uploadAPI', async(event, APIdata) => {
    // api.Question.addQa
    api.Question.addQa(1, APIdata['Question'], APIdata['Answer'], APIdata['Answer_pic'], APIdata['keyWord'].trim(), "語音", (event) => {
        console.log("uploadAPIcallback=" + JSON.stringify(event));
    });

})

ipcMain.on('picturebook_IsNetwork', async(event, args) => {
    event.sender.send('picturebook_IsNetworkStatus', IsNetwork);
})