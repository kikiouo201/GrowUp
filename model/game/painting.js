let {ipcRenderer }= require('electron');
let canvas = document.getElementById('art');
let ctx = canvas.getContext('2d');

function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function mouseMove(evt) {
    let mousePos = getMousePos(canvas, evt);
  ctx.lineTo(mousePos.x, mousePos.y);
  ctx.stroke();
}

canvas.addEventListener('mousedown', function(evt) {
    let mousePos = getMousePos(canvas, evt);
  ctx.beginPath();
  ctx.moveTo(mousePos.x, mousePos.y);
  evt.preventDefault();
  canvas.addEventListener('mousemove', mouseMove, false);
});

canvas.addEventListener('mouseup', function() {
  canvas.removeEventListener('mousemove', mouseMove, false);
}, false);

document.getElementById('reset').addEventListener('click', function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}, false);

document.getElementById('save').addEventListener('click', function() {
    ipcRenderer.send("levelIsPass","painting");
    let lowQuality=canvas.toDataURL("image/jpeg", 0.1);
    console.log(`lowQuality=${lowQuality}`);
    let saveImg=document.querySelector('.saveImg');
    saveImg.innerHTML+="<img src='"+lowQuality+"' />";
  }, false);



let colors = ['red', 'blue', 'green', 'purple', 'yellow', 'orange', 'pink', 'black', 'white', 'ebebeb'];
let size = [1, 3, 5, 10, 15, 20];
let sizeNames = ['default', 'three', 'five', 'ten', 'fifteen', 'twenty'];

function listener(i) {
  document.getElementById(colors[i]).addEventListener('click', function() {
    ctx.strokeStyle = colors[i];
  }, false);
}

function fontSizes(i) {
  document.getElementById(sizeNames[i]).addEventListener('click', function() {
    ctx.lineWidth =size[i];
  }, false);
}

for(let i = 0; i < colors.length; i++) {
  listener(i);
}

for(let i = 0; i < size.length; i++) {
  fontSizes(i);
}



