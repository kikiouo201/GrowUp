// let { ipcRenderer } = require('electron');
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
    pics.addEventListener('mousedown', e => {
        x = e.offsetX;
        y = e.offsetY;
        isDrawing = true;
    });

    pics.addEventListener('mousemove', e => {
        if (isDrawing === true) {
            drawLine(context, x, y, e.offsetX, e.offsetY);
            x = e.offsetX;
            y = e.offsetY;
            console.log('scoreJudgment');
            scoreJudgment(id, x, y, points, num);
        }
    });
    window.addEventListener('mouseup', e => {
        if (isDrawing === true) {
            drawLine(context, x, y, e.offsetX, e.offsetY);
            x = 0;
            y = 0;
            isDrawing = false;
        }
    });
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
    m: 'ㄇ',
    f: 'ㄈ',
    d: 'ㄉ',
    t: 'ㄊ',
    n: 'ㄋ',
    l: 'ㄌ',
    g: 'ㄍ',
    k: 'ㄎ',
    h: 'ㄏ',
    j: 'ㄐ',
    q: 'ㄑ',
    x: 'ㄒ',
    zhi: 'ㄓ',
    chi: 'ㄔ',
    shi: 'ㄕ',
    ri: 'ㄖ',
    zi: 'ㄗ',
    ci: 'ㄘ',
    si: 'ㄙ',
    yi: 'ㄧ',
    wu: 'ㄨ',
    yu: 'ㄩ',
    ra: 'ㄚ',
    o: 'ㄛ',
    re: 'ㄜ',
    ae: 'ㄝ',
    ai: 'ㄞ',
    ei: 'ㄟ',
    ao: 'ㄠ',
    ou: 'ㄡ',
    an: 'ㄢ',
    en: 'ㄣ',
    ang: 'ㄤ',
    eng: 'ㄥ',
    er: 'ㄦ',
    a1: 'a',
    b1: 'b',
    c1: 'c',
    d1: 'd',
    e1: 'e',
    f1: 'f',
    g1: 'g',
    h1: 'h',
    i1: 'i',
    j1: 'j',
    k1: 'k',
    l1: 'l',
    m1: 'm',
    n1: 'n',
    o1: 'o',
    p1: 'p',
    q1: 'q',
    r1: 'r',
    s1: 's',
    t1: 't',
    u1: 'u',
    v1: 'v',
    w1: 'w',
    y1: 'y',
    x1: 'x',
    z1: 'z',
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    0: 0,
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
    if (totalPoint < 3) {
        status.innerHTML = '<img src="../../image/drawZhuyin/tryAgain.png" width="300px"/>失敗';
        props.style.visibility = "hidden";
    } else {
    status.innerHTML = '<img src="../../image/drawZhuyin/good.png" width="200px"/>你好棒';
    props.style.visibility = "visible";
    smallCard.innerHTML = '<img src="../../image/magicCard/chineseAlphabet/' + id + '.png" width="50px"/>';
    const draw =document.querySelector('.draw');
    draw.style.visibility = "hidden";
    //ipcRenderer.send("levelIsPass", levelName[id]);
    }
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
    p: [{ x: [85, 120], y: [90, 100] },
        { x: [74, 90], y: [100, 140] },
        { x: [185, 220], y: [110, 120] },
        { x: [100, 105], y: [230, 245] },
        { x: [115, 130], y: [170, 185] }
    ],
    m: [{ x: [70, 90], y: [180, 200] },
        { x: [70, 90], y: [100, 120] },
        { x: [140, 145], y: [80, 100] },
        { x: [195, 220], y: [100, 120] },
        { x: [195, 220], y: [200, 225] }
    ], 
    f:  [{ x: [140, 160], y: [90, 110] },
        { x: [70, 100], y: [100, 130] },
        { x: [70, 100], y: [170, 190] },
        { x: [90, 120], y: [200, 230] },
        { x: [195, 220], y: [200, 225] }
    ], 
    d: [{ x: [80, 120], y: [70, 100] },
        { x: [70, 100], y: [130, 150] },
        { x: [210, 230], y: [110, 130] },
        { x: [150, 190], y: [230, 260] },
        { x: [105, 190], y: [160, 190] }
    ], 
    t: [{ x: [80, 100], y: [130, 160] },
        { x: [190, 210], y: [130, 160] },
        { x: [120, 160], y: [90, 120] },
        { x: [80, 120], y: [220, 250] },
        { x: [190, 220], y: [210, 230] }
    ], 
    n: [{ x: [110, 130], y: [60, 90] },
        { x: [150, 180], y: [70, 100] },
        { x: [110, 140], y: [120, 145] },
        { x: [190, 220], y: [120, 150] },
        { x: [140, 160], y: [230, 260] }
    ], 
    l: [{ x: [80, 110], y: [90, 130] },
        { x: [150, 180], y: [70, 100] },
        { x: [110, 140], y: [120, 145] },
        { x: [190, 220], y: [120, 150] },
        { x: [140, 160], y: [230, 260] }
    ], 
    g: [{ x: [110, 130], y: [90, 120] },
        { x: [80, 110], y: [150, 175] },
        { x: [80, 120], y: [160, 190] },
        { x: [180, 200], y: [80, 110] },
        { x: [180, 200], y: [210, 240] }
    ], 
    k: 'ㄎ',
    h: 'ㄏ',
    j: 'ㄐ',
    q: 'ㄑ',
    x: 'ㄒ',
    zhi: 'ㄓ',
    chi: 'ㄔ',
    shi: 'ㄕ',
    ri: 'ㄖ',
    zi: 'ㄗ',
    ci: 'ㄘ',
    si: 'ㄙ',
    yi: 'ㄧ',
    wu: 'ㄨ',
    yu: 'ㄩ',
    ra: 'ㄚ',
    o: 'ㄛ',
    re: 'ㄜ',
    ae: 'ㄝ',
    ai: 'ㄞ',
    ei: 'ㄟ',
    ao: 'ㄠ',
    ou: 'ㄡ',
    an: 'ㄢ',
    en: 'ㄣ',
    ang: 'ㄤ',
    eng: 'ㄥ',
    er: 'ㄦ',
    a1: 'a',
    b1: 'b',
    c1: 'c',
    d1: 'd',
    e1: 'e',
    f1: 'f',
    g1: 'g',
    h1: 'h',
    i1: 'i',
    j1: 'j',
    k1: 'k',
    l1: 'l',
    m1: 'm',
    n1: 'n',
    o1: 'o',
    p1: 'p',
    q1: 'q',
    r1: 'r',
    s1: 's',
    t1: 't',
    u1: 'u',
    v1: 'v',
    w1: 'w',
    y1: 'y',
    x1: 'x',
    z1: 'z',
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    0: 0,
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



function playAudio() {
    var audioCreate = document.createElement("AUDIO");
    console.log("length==" + `${id}`.length)
    if (audioCreate.canPlayType("audio/mpeg")) {
        if (`${id}`.length == 1 && `${id}` > 0 && `${id}` < 10 || `${id}` == 0) { //數字
            audioCreate.setAttribute("src", "../../TTS/mp3/012/" + `${id}` + ".mp3");
        } else if (`${id}` [1] == '1' && `${id}`.length == 2) { //英文
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