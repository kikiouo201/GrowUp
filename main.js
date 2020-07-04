// 'use strict';
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path');
const url = require('url');
const appCallPython = require('./app-call-python-child-process')  
const callVis = require('./vision')   
const { StillCamera } = require("pi-camera-connect");
const fs = require('fs');
// const api = require('./model/api');

// let {PythonShell} = require('python-shell')
  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  let win=null;




  function createWindow () {

    // 创建浏览器窗口。
    win = new BrowserWindow({
      icon: path.join(__dirname, 'icons/raspberry_icon.png'),
      fullscreen: true,
      webSecurity: false,
        webPreferences:{
            nodeIntegration: true,
            width: 1200, height: 1000
          }
    })

    // 然后加载应用的 index.html。
    win.loadFile('test1.html')

    //到app資料夾執行index.html
    // win.loadURL(url.format({
    //     protocol: 'file',
    //     slashes: true,
    //     pathname: path.join(__dirname, 'app/index.html')
    // }));


    // start時直接跳出chrome檢查的開發者介面
    win.webContents.openDevTools()

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
    appCallPython.startSpeak(
      () => {
        event.reply('voice-require-to-py-reply-start')
      },
      (result) => {
        
        event.reply('voice-require-to-py-reply-result', result)
        
        console.log("Q="+result.q+" A="+result.a+" result(?)="+result)
      //   api.Question.addQa(1, result.q, result.a, "", "知識", (event) => {
      //     console.log("callback=" + JSON.stringify(event));
      // });

      }
    )
});


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




  ipcMain.on('vision',async (event, args)=>{
    let array=await callVis.start();
   console.log("call vision"+" "+array);
  
   //array.forEach(label => console.log("vis="+label.description));
   event.sender.send('reply-mainjsfunction',array)
  })
  
  ipcMain.on('captrue',async(event, args)=>{
    const stillCamera = new StillCamera();
  
      const image = await stillCamera.takeImage();
  
      fs.writeFileSync("still-image.jpg", image);
    console.log("call captrue");
   event.sender.send('reply-mainjsfunction-captrue')
  })
  
// ipcMain.on('invokeAction', function(event, data){
//   var result = processData(data);
//   event.sender.send('actionReply', result);
// });