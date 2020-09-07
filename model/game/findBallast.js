let {ipcRenderer }= require('electron');
let nowScore = 0;
function toBig(id) {
    const target = document.querySelector('.target' + id);
    target.className = 'getTarget';
    nowScore++;
    setTimeout(toBackgroundBlack, 1000);
}
function toBackgroundBlack() {
    const black_overlay = document.querySelector('.black_overlay');
    black_overlay.style.visibility = "visible";
}
function next() {
    const targets = document.querySelectorAll('.getTarget');
    targets.forEach((target) => {
        target.style.visibility = "hidden";
    });


    setTimeout('document.querySelector(".score").innerHTML=' + nowScore + '+"分"', 1000);
    if (targets.length == 5) {
        setTimeout(end, 1000);
    } else {
        setTimeout('document.querySelector(".black_overlay").style.visibility = "hidden";', 1000);
    }
}
function end(){
    const next = document.querySelector('.next');
    const result = document.querySelector('.result');
    next.style.visibility = 'hidden';
    result.style.visibility = 'visible';
    ipcRenderer.send("levelIsPass","findBallast");
}
const close = document.querySelector('.close');
close.addEventListener('click', () => {
    const black_overlay = document.querySelector('.black_overlay');
    black_overlay.style.visibility = "hidden";
});


function challengeAgain() {
   
    window.location.href = "../../view/game/findBallast.html";
}

function goNextLevel() {
        window.location.href = `../../view/level/hualien.html`;           
}

