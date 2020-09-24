const { ipcRenderer } = require("electron");

function open_mjpgstreamer() {
  ipcRenderer.send('open-mjpg-streamer')
}