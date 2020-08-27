

let isDrawing = false;
let x = 0;
let y = 0;
let points = [];
let level=['b','p','m','f',''];
let nextLevel ='no';
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
    pics.addEventListener('touchend', e => {
        x = e.offsetX;
        y = e.offsetY;
        isDrawing = true;
    });

    pics.addEventListener('touchmove', e => {
        if (isDrawing === true) {
            drawLine(context, x, y, e.offsetX, e.offsetY);
            x = e.offsetX;
            y = e.offsetY;
           console.log('scoreJudgment');
            scoreJudgment(id,x, y, points, num);
        }
    });
    window.addEventListener('touchstart', e => {
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
        if (grid == 1) {
            totalPoint++;
        }
    });
    const status=document.querySelector('.status');
    const props=document.querySelector('.props');
    const smallCard=document.querySelector('.smallCard');
  
   if (totalPoint < 3) {
        status.innerHTML='<img src="../../image/drawZhuyin/tryAgain.png" width="300px"/>失敗';
        props.style.visibility="hidden";
    } else  {
        status.innerHTML='<img src="../../image/drawZhuyin/good.png" width="200px"/>你好棒';
        props.style.visibility="visible";
        smallCard.innerHTML='<img src="../../image/magicCard/chineseAlphabet/'+id+'.png" width="50px"/>';
        
    }
    console.log('totalPoint= ' + totalPoint);

    const black_overlay=document.querySelector('.black_overlay');
    black_overlay.style.visibility = "visible";
    
    
});

const close = document.querySelector('.close');
close.addEventListener('click',() => {
    const black_overlay=document.querySelector('.black_overlay');
    const props=document.querySelector('.props');
    black_overlay.style.visibility = "hidden";
    props.style.visibility="hidden";
});

function reset(){
   // let reset=document.querySelector('.reset');
   let canvas = document.querySelector('.draw');
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i=0;i<points.length;i++){
       points[i]=0;
    }
    
}

function challengeAgain(){
    
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

    let zhuyin = document.querySelector(".zhuyin img");
     console.log(`id=${id}`);
    if (id == null) {      
        id='b';
    }
    zhuyin.src = `../../image/drawZhuyin/${id}.png`;
     moveFinger();
 
}



function moveFinger(){
    let finger;
    try {
        finger=document.querySelector('.finger');
        finger.style.visibility="visible";
        document.querySelector('.finger').className = 'finger'+id;
    } catch (error) {
        finger=document.querySelector('.finger'+id);
        finger.style.visibility="visible";
    }
   
   
    let drawTime = [1500,2500,3600,4900,6100,7500,9000,11000];
    let strokeNumber = {b:8,4:8,}
    
    setTimeout("document.querySelector('.finger"+id+"').className = 'moveFinger"+id+"1';", drawTime[0]);
    setTimeout("document.querySelector('.moveFinger"+id+"1').className = 'moveFinger"+id+"2';", drawTime[1]);
    setTimeout("document.querySelector('.moveFinger"+id+"2').className = 'moveFinger"+id+"3';", drawTime[2]);
    if(id==4){
       setTimeout("document.querySelector('.moveFinger"+id+"1').style.visibility='hidden';", 2480);
       setTimeout("document.querySelector('.moveFinger"+id+"3').style.visibility='visible';", 4800);
    }
    setTimeout("document.querySelector('.moveFinger"+id+"3').className = 'moveFinger"+id+"4';", drawTime[3]);
    setTimeout("document.querySelector('.moveFinger"+id+"4').className = 'moveFinger"+id+"5';", drawTime[4]);
    setTimeout("document.querySelector('.moveFinger"+id+"5').className = 'moveFinger"+id+"6';", drawTime[5]);
    setTimeout("document.querySelector('.moveFinger"+id+"6').className = 'moveFinger"+id+"7';", drawTime[6]);
    setTimeout("document.querySelector('.moveFinger"+id+"7').className = 'moveFinger"+id+"8';", drawTime[7]);
    setTimeout("document.querySelector('.moveFinger"+id+"8').className = 'finger"+id+"';", 12000);
    setTimeout("document.querySelector('.finger"+id+"').style.visibility='hidden';", 12050);


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
     { x: [110, 150], y: [200, 245] } ] ,
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
                points[i] = 1;
            }else if(points[i] != 1){
                points[i] = 0;
            }
        }
  
    console.log(`point=${points}`);
}

