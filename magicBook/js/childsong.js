const main = document.querySelector('.maincontent');

const fullscr = document.querySelector("#allFull");
console.log('ShowWeb&Ele =>' +fullscr);

ipcRenderer.on('songCreating', (event, data) => {

  console.log("Success catch Picturebook Data")

  main.innerHTML +=
  `
    <div class="song">
      <div class="songname-div">
          <h2>${data.name}</h2>
          <img class="voice" src=" ../icons/speaker.png" />
      </div>
      <div class="activity-div">
          <img src="${data.src}">
          <button onclick='showWeb("https://children.moc.gov.tw${data.href},${fullscr}")'>
              <img src="./image/icon_watchVideo.png" />
              <h2>觀看兒歌</h2>
          </button>
      </div>
    </div>
  `
  console.log("Success catch Picturebook Data")

})