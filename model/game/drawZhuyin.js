
let isDrawing = false;
let x = 0;
let y = 0;
let points = [];
let level=['b','p','m','f',''];
let nextLevel ='no';

const myPics = document.querySelectorAll('.draw');
console.log('pics' + myPics.length);
myPics.forEach((pics, num) => {
    let id = (new URLSearchParams(location.search)).get("id");
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
        // console.log('grid= ' + grid);
        grid.forEach((point) => {
            console.log('point= ' + point);
            if (point == 1) {
                totalPoint++;
            }
        });
    });

    const status=document.querySelector('.status');
    const props=document.querySelector('.props');
  
   if (totalPoint < 3) {
        status.innerHTML="再加油";
        props.style.visibility="hidden";
       
       // nextLevel='no';
    } else  {
        status.innerHTML="你好棒";
        props.style.visibility="visible";
        
    }
    console.log('totalPoint= ' + totalPoint);

    const black_overlay=document.querySelector('.black_overlay');
    black_overlay.style.visibility = "visible";
    
    
});

const close = document.querySelector('.close');
close.addEventListener('click',() => {
    const black_overlay=document.querySelector('.black_overlay');
    black_overlay.style.visibility = "hidden";
});

function reset(){
   // let reset=document.querySelector('.reset');
   let canvas = document.querySelector('.draw');
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function challengeAgain(){
    let id = (new URLSearchParams(location.search)).get("id");
    window.location.href="../../view/game/drawzhuyin.html?id="+id;
}

function goNextLevel(){
    let counties = (new URLSearchParams(location.search)).get("counties");
    //console.log('counties='+counties);
    if(counties!=null){
        window.location.href=`../../view/level/${counties}.html`;
    }else{
        window.location.href=`../../treature_list.html`;
    }
}

function onload() {

    let id = (new URLSearchParams(location.search)).get("id");

     console.log(`id=${id}`);
    if (id != null) {
        let zhuyin = document.querySelector(".zhuyin img");
        zhuyin.src = `../../image/drawZhuyin/${id}.png`;
        
        const counties = (new URLSearchParams(location.search)).get("counties");
        const returnfloat = document.querySelector('.returnfloat');

        if(counties!=null){
            returnfloat.href=`../../view/level/${counties}.html`;
        }else{
            returnfloat.href=`../../treature_list.html`;
        }
        
        // if((level.indexOf(id)!=-1)&&(level.indexOf(id)+1)<level.length){
        //     nextLevel=level[(level.indexOf(id)+1)];
        // }else{
        //     nextLevel='no';
        // }
    //     console.log("nextLevel"+nextLevel);
    //    console.log('level.indexOf(id)='+level.indexOf(id));
        
    }

     moveFinger();
 
}

function moveFinger(){
    let finger=document.querySelector('.finger');
    // finger.className = 'moveFinger';
    // console.log(`finger=${finger.className}`);
    finger.style.visibility="visible";
    setTimeout("document.querySelector('.finger').className = 'moveFinger';", 500);
    setTimeout("document.querySelector('.moveFinger').className = 'moveFinger2';", 1500);
    setTimeout("document.querySelector('.moveFinger2').className = 'moveFinger3';", 3500);
    setTimeout("document.querySelector('.moveFinger3').className = 'moveFinger4';", 5500);
    setTimeout("document.querySelector('.moveFinger4').className = 'moveFinger5';", 6000);
    setTimeout("document.querySelector('.moveFinger5').className = 'moveFinger6';", 6300);
    setTimeout("document.querySelector('.moveFinger6').className = 'moveFinger7';", 7000);
    setTimeout("document.querySelector('.moveFinger7').className = 'moveFinger8';", 9300);
    setTimeout("document.querySelector('.moveFinger8').className = 'moveFinger9';", 9800);
    setTimeout("document.querySelector('.moveFinger9').className = 'moveFinger10';", 12000);
    setTimeout("document.querySelector('.moveFinger10').className = 'finger';", 12800);
    setTimeout("document.querySelector('.finger').style.visibility='hidden';", 12800);
    
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
    b: [{ x: [127, 158], y: [50, 76] },
     { x: [69, 124], y: [120, 130] },
     { x: [265, 300], y: [120, 145] },
     { x: [175, 205], y: [280, 335] },
     { x: [150, 160], y: [270, 295] } ] ,
     p: [{ x: [43, 50], y: [19, 22] },
     { x: [25, 40], y: [45, 48] },
     { x: [84, 86], y: [37, 48] },
     { x: [58, 65], y: [98, 105] },
     { x: [45, 50], y: [93, 100] } ] ,

};


function scoreJudgment(id ,x, y, points, num) {
    if(id==null) id='b';
    let criterias =judgmentCriteria[id];
        
        for(let i=0;i<criterias.length;i++){
            let criteria=criterias[i];
            console.log(`x=${x},y=${y}`)
            if (criteria.y[0] < y && y < criteria.y[1] && criteria.x[0] < x && x < criteria.x[1]) {
                points[num][i] = 1;
            }
        }
  
    console.log(`point=${points}`);
}

