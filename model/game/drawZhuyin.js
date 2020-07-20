
let isDrawing = false;
let x = 0;
let y = 0;
let points = [];
let level=['b','p','m','f'];


const myPics = document.querySelectorAll('.draw');
console.log('pics' + myPics.length);
myPics.forEach((pics, num) => {
    let id = (new URLSearchParams(location.search)).get("id");
    console.log('id='+id);
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
           
            scoreJudgment(id,x, y, points, num);
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
});

const score = document.querySelector('.score');
console.log('score= ' + score);

score.addEventListener('click', () => {
    console.log('score onclick');
    let totalPoint = 0;
    points.forEach((grid) => {
        console.log('grid= ' + grid);
        grid.forEach((point) => {
            console.log('point= ' + point);
            if (point == 1) {
                totalPoint++;
            }
        });
    });
   
    const status=document.querySelector('.status');
    const list=document.querySelector('.list');
    if (totalPoint < 10) {
        status.innerHTML="失敗";
        list.innerHTML="再加油";
    } else if (totalPoint < 20) {
        status.innerHTML="失敗";
        list.innerHTML="很棒在努力喔！";
    } else if (totalPoint < 25) {
        status.innerHTML="成功";
        list.innerHTML="太棒了！你做得真好！";
    } else if (totalPoint < 30) {
        status.innerHTML="成功";
        list.innerHTML="太厲害了！你是小天才！";    
    }
    console.log('totalPoint= ' + totalPoint);

    const black_overlay=document.querySelector('.black_overlay');
    black_overlay.style.visibility = "visible";
    

});

let nextLevel ='b';
function goNextLevel(){
    if(nextLevel.match('no')!=null){
        window.location.href="../../view/game/drawzhuyin.html?id="+nextLevel;
    }
    else{
        alert('要通關才可以到下一關喔！');
    }
}

function onload() {

    let id = (new URLSearchParams(location.search)).get("id");
    console.log(`id=${id}`)
    if (id != null) {
        let zhuyin = document.querySelector(".zhuyin img");
        zhuyin.src = `../../image/zhuyin/${id}.png`;
        if((level.indexOf(id)!=-1)){
            nextLevel=level[(level.indexOf(id)+1)];
           
        }else{
            nextLevel="no";
        }
        console.log('(level.indexOf(id)='+(level.indexOf(id)));
        
    }


}


function drawLine(context, x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}

let judgmentCriteria = {
    b: [{ x: [43, 50], y: [19, 22] },
     { x: [25, 40], y: [45, 48] },
     { x: [84, 86], y: [37, 48] },
     { x: [58, 65], y: [98, 105] },
     { x: [45, 50], y: [93, 100] } ] ,
     p: [{ x: [43, 50], y: [19, 22] },
     { x: [25, 40], y: [45, 48] },
     { x: [84, 86], y: [37, 48] },
     { x: [58, 65], y: [98, 105] },
     { x: [45, 50], y: [93, 100] } ] ,

};


function scoreJudgment(id ,x, y, points, num) {

    let criterias =judgmentCriteria[id];
        
        for(let i=0;i<criterias.length;i++){
            let criteria=criterias[i];
            if (criteria.y[0] < y && y < criteria.y[1] && criteria.x[0] < x && x < criteria.x[1]) {
                points[num][i] = 1;
            }
        }
  
    console.log(`point=${points}`);
}

