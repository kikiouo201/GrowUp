//let {ipcRenderer }= require('electron');
let isDrawing = false;
let x = 0;
let y = 0;
let points = [];
let level = ['b', 'p', 'm', 'f', ''];
let nextLevel = 'no';
let id = (new URLSearchParams(location.search)).get("id");

const myPics = document.querySelectorAll('.draw');
console.log('pics' + myPics.length);
myPics.forEach((pics, num) => {

    const context = pics.getContext('2d');
    points.push([0, 0, 0, 0, 0]);
    // event.offsetX, event.offsetY gives the (x,y) offset from the edge of the canvas.

    // Add the event listeners for mousedown, mousemove, and mouseup
    // pics.addEventListener('mousedown', e => {
    //     x = e.offsetX;
    //     y = e.offsetY;
    //     isDrawing = true;
    // });

    // pics.addEventListener('mousemove', e => {
    //     if (isDrawing === true) {
    //         drawLine(context, x, y, e.offsetX, e.offsetY);
    //         x = e.offsetX;
    //         y = e.offsetY;
    //         console.log('scoreJudgment');
    //         scoreJudgment(id, x, y, points, num);
    //     }
    // });
    // window.addEventListener('mouseup', e => {
    //     if (isDrawing === true) {
    //         drawLine(context, x, y, e.offsetX, e.offsetY);
    //         x = 0;
    //         y = 0;
    //         isDrawing = false;
    //     }
    // });
    pics.addEventListener('touchstart', e => {
        const rect = e.target.getBoundingClientRect();
        const touch = e.targetTouches[0];
        x = touch.pageX - rect.left;
        y = touch.pageY - rect.top;
        isDrawing = true;
    });

    pics.addEventListener('touchmove', e => {
        if (isDrawing === true) {
            const rect = e.target.getBoundingClientRect();
            const touch = e.targetTouches[0];
            drawLine(context, x, y, touch.pageX - rect.left, touch.pageY - rect.top);
            x = touch.pageX - rect.left;
            y = touch.pageY - rect.top;
            console.log('scoreJudgment');
            scoreJudgment(id, x, y, points, num);
        }
    });
    window.addEventListener('touchend', e => {
        if (isDrawing === true) {
            const rect = e.target.getBoundingClientRect();
            const touch = e.targetTouches[0];
            drawLine(context, x, y, touch.pageX - rect.left, touch.pageY - rect.top);
            x = 0;
            y = 0;
            isDrawing = false;
        }
    });
});

const score = document.querySelector('.score');
console.log('score= ' + score);

const levelName = {
    b: 'ㄅ',
    p: 'ㄆ',
}


score.addEventListener('click', () => {
    console.log('score onclick');
    let totalPoint = 0;
    points.forEach((grid) => {
        if (grid == 1) {
            totalPoint++;
        }
    });
    const status = document.querySelector('.status');
    const props = document.querySelector('.props');
    const smallCard = document.querySelector('.smallCard');
    const tool = document.querySelector('.tool');
    // if (totalPoint < 3) {
    //     status.innerHTML = '<img src="../../image/drawZhuyin/tryAgain.png" width="300px"/>失敗';
    //     props.style.visibility = "hidden";
    // } else {
    status.innerHTML = '<img src="../../image/drawZhuyin/good.png" width="200px"/>你好棒';
    props.style.visibility = "visible";

    smallCard.innerHTML = '<img src="../../image/magicCard/chineseAlphabet/' + id + '.png" width="50px"/>';
    //ipcRenderer.send("levelIsPass",levelName[id]);
    // }
    console.log('totalPoint= ' + totalPoint);
    tool.style.visibility = "hidden"
    const black_overlay = document.querySelector('.black_overlay');
    black_overlay.style.visibility = "visible";


});

const close = document.querySelector('.close');
close.addEventListener('click', () => {
    const black_overlay = document.querySelector('.black_overlay');
    const props = document.querySelector('.props');
    black_overlay.style.visibility = "hidden";
    props.style.visibility = "hidden";
});

function reset() {
    // let reset=document.querySelector('.reset');
    let canvas = document.querySelector('.draw');
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < points.length; i++) {
        points[i] = 0;
    }

}

function challengeAgain() {

    window.location.href = "../../view/game/drawzhuyin.html?id=" + id;
}

function goNextLevel() {
    let counties = (new URLSearchParams(location.search)).get("counties");
    //console.log('counties='+counties);
    if (counties != null) {
        window.location.href = `../../view/level/${counties}.html`;
    } else {
        window.location.href = `../../treature_list.html`;
    }
}

function load() {

    let zhuyin = document.querySelector(".zhuyin img");
    console.log(`id=${id}`);
    if (id == null) {
        id = 'b';
    }
    zhuyin.src = `../../image/drawZhuyin/${id}.png`;
    moveFinger();

}

function moveFinger() {
    let finger;

    finger = document.querySelector('#finger');
    finger.style.visibility = "visible";

    finger.classList.add('moveFinger' + id);

    finger.addEventListener('animationend', function() {
        finger.classList.remove('moveFinger' + id);
        finger.style.visibility = "hidden";
    }, { once: true });

    // document.querySelector('.finger' + id ).className = 'moveFinger'+ id ;

    // let drawTime = {
    //     b: [1500, 2500, 3600, 4900, 6100, 7500, 9000, 10000, 11000, 12500, 13500, 14500, 15500, 16500],
    //     1: [1500, 2500, 3500, 4500, 5500, 6500, 8000, 9000, 10000, 11000, 12000, 12000, 14000, 14500, 15500],
    //     2: [1500, 2500, 3500, 4500, 5500, 6500, 8000, 9000, 10000, 11000, 12000, 12000, 14000, 14500, 15500],
    //     3: [1500, 2500, 3500, 4500, 5500, 6500, 8000, 9000, 10000, 11000, 12000, 12000, 14000, 14500, 15500],
    //     4: [1500, 2500, 3600, 4900, 6100, 7500, 9000, 10000, 11000, 12500, 13500, 14500, 15500, 16500],
    //     5: [1500, 2500, 3600, 4900, 6100, 7500, 9000, 10000, 11000, 12500, 13500, 14500, 15500, 16500],
    //     6: [1500, 2500, 3600, 4900, 6100, 7500, 9000, 10000, 11000, 12500, 13500, 14500, 15500, 16500],
    //     7: [1500, 2500, 3600, 4900, 6100, 7500, 9000, 10000, 11000, 12500, 13500, 14500, 15500, 16500],
    //     8: [1500, 2500, 3500, 4500, 5500, 6500, 8000, 9000, 10000, 11000, 12000, 12000, 14000, 14500, 15500],
    //     9: [1500, 2500, 3500, 4500, 5500, 6500, 7500, 8500, 9500, 10500, 11500, 12500, 13500, 14500, 15500],
    //     0: [1500, 2500, 3500, 4500, 5500, 6500, 7500, 8500, 9500, 10500, 11500, 12500, 13500, 14500, 15500],
    //     f1: [1500, 2500, 3600, 4900, 6100, 7500, 9000, 10000, 11000, 12500, 13500, 14500, 15500, 16500],
    // }

    // let strokeNumber = {
    //     b: 8,
    //     1: 3,
    //     2: 7,
    //     3: 10,
    //     4: 8,
    //     5: 8,
    //     6: 8,
    //     7: 6,
    //     8: 13,
    //     9: 12,
    //     0: 9,
    //     f1: 8
    // }
    // setTimeout("document.querySelector('.finger" + id + "').className = 'moveFinger" + id + "1';", drawTime[id][0]);
    // console.log(`strokeNumber[id]=${strokeNumber[id]}`);
    // for (let i = 1; i < strokeNumber[id]; i++) {
    //     setTimeout("document.querySelector('.moveFinger" + id + i + "').className = 'moveFinger" + id + (i + 1) + "';", drawTime[id][i]);
    //     console.log(`moveFinger"+id+(i+1)+=${id+(i+1)}`);
    // }
    // setTimeout("document.querySelector('.moveFinger" + id + (strokeNumber[id]) + "').className = 'finger" + id + "';", drawTime[id][strokeNumber[id] + 1]);
    // console.log(`drawTime[strokeNumber[id]+1]=${drawTime[strokeNumber[id]+1]}`)
    // setTimeout("document.querySelector('.finger" + id + "').style.visibility='hidden';", (drawTime[id][strokeNumber[id] + 1] + 20));

    // if (id == 4) {
    //     setTimeout("document.querySelector('.moveFinger" + id + "1').style.visibility='hidden';", 2480);
    //     setTimeout("document.querySelector('.moveFinger" + id + "3').style.visibility='visible';", 4800);
    // }




}

function drawLine(context, x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = 'black';
    context.lineWidth = 4;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}

let judgmentCriteria = {
    b: [{ x: [87, 128], y: [75, 85] },
        { x: [180, 220], y: [112, 150] },
        { x: [185, 270], y: [120, 145] },
        { x: [145, 175], y: [200, 305] },
        { x: [110, 150], y: [200, 245] }
    ],
    p: [{ x: [43, 50], y: [19, 22] },
        { x: [25, 40], y: [45, 48] },
        { x: [84, 86], y: [37, 48] },
        { x: [58, 65], y: [98, 105] },
        { x: [45, 50], y: [93, 100] }
    ],

};


function scoreJudgment(id, x, y, points, num) {
    if (id == null) id = 'b';
    let criterias = judgmentCriteria[id];
    console.log(`x=${x},y=${y}`)
    for (let i = 0; i < criterias.length; i++) {
        let criteria = criterias[i];

        if (criteria.y[0] < y && y < criteria.y[1] && criteria.x[0] < x && x < criteria.x[1]) {
            points[i] = 1;
        } else if (points[i] != 1) {
            points[i] = 0;
        }
    }

    console.log(`point=${points}`);
}


// var aaauu = document.querySelector(".audio")

function playAudio() {
    var audioCreate = document.createElement("AUDIO");
    console.log("length==" + `${id}`.length)
    if (audioCreate.canPlayType("audio/mpeg")) {
        if (`${id}`.length == 1 && `${id}` > 0 && `${id}` < 10) { //數字
            audioCreate.setAttribute("src", "../../TTS/mp3/012/" + `${id}` + ".mp3");
        } else if (`${id}`.includes = '1' && `${id}`.length == 1) { //英文
            audioCreate.setAttribute("src", "../../TTS/mp3/ABC/" + `${id}` + ".mp3");

        } else { //注音
            audioCreate.setAttribute("src", "../../TTS/mp3/bpm/" + `${id}` + ".mp3");
        }
    }

    // x.setAttribute("controls", "controls");
    document.body.appendChild(audioCreate);
    // console.log("OK " + `${id} ` + aaauu.children[0].src)
    // aaauu.children[0].src = "../../TTS/mp3/bpm/" + `${id}` + ".mp3"
    audioCreate.play();
}