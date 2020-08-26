
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
        
        // const counties = (new URLSearchParams(location.search)).get("counties");
        // const returnfloat = document.querySelector('.returnfloat');

        // if(counties!=null){
        //     returnfloat.href=`../../view/level/${counties}.html`;
        // }else{
        //     returnfloat.href=`../../treature_list.html`;
        // }
 
    }
    zhuyin.src = `../../image/drawZhuyin/${id}.png`;
     moveFinger();
 
}

// let drawShape = {
//     b: [{ top: [-130], left: [-185],time:[0] },
//      { top: [-65], left: [-215],time:[500] },
//      { top: [-80], left: [-145],time:[1500] },
//      { top: [-90], left: [-85],time:[3500] },
//      { top: [-75], left: [-70],time:[5000] },
//      { top: [-5], left: [-100],time:[6000] },
//      { top: [-5], left: [-100],time:[6300] },
//      { top: [45], left: [-130],time:[7000] },
//      { top: [30], left: [-155],time:[8300] },
//       ],
//      4: [{ top: [-110], left: [-145],time:[0] },
//      { top: [-10], left: [-200],time:[500] },
//      { top: [-10], left: [-100],time:[1500] },
//      { top: [-110], left: [-125],time:[3500] },
//      { top: [25], left: [-125],time:[5000] },
//     ] ,

// };
// function setFingerDrawPath(nextDrawPathNum){
//     const shape=drawShape[id];
//     if(nextDrawPathNum==0){
//         document.querySelector('.finger').style.top = shape[1].top;
//         document.querySelector('.finger').style.left = shape[1].left;
//     }else if(nextDrawPathNum==1){
//         console.log(`'moveFinger'+nextDrawPathNum=${ shape[nextDrawPathNum].top}`)
//         document.querySelector('.finger').className = 'moveFinger1';
//         document.querySelector('.moveFinger1').style.top = ""+shape[nextDrawPathNum].top;
//         document.querySelector('.moveFinger1').style.left = shape[nextDrawPathNum].left;
//     }else{
//         let nextFingerPoint='moveFinger'+nextDrawPathNum;
//         console.log(`nextFingerPoint=${nextFingerPoint}`)
//         document.querySelector('.moveFinger'+(nextDrawPathNum-1)).className =nextFingerPoint;
//         document.querySelector('.'+nextFingerPoint).style.top = ""+shape[nextDrawPathNum].top;
//         document.querySelector('.'+nextFingerPoint).style.left = shape[nextDrawPathNum].left;
//         console.log(`'('.'+nextFingerPoint).style.top=${document.querySelector('.'+nextFingerPoint).style.top}`)
//         console.log(`'('.'+nextFingerPoint).style.left=${document.querySelector('.'+nextFingerPoint).style.left}`)
//     }
// }

function moveFinger(){
    //const shape=drawShape[id];
    let finger;
    try {
        finger=document.querySelector('.finger');
        finger.style.visibility="visible";
        document.querySelector('.finger').className = 'finger'+id;
    } catch (error) {
        finger=document.querySelector('.finger'+id);
        finger.style.visibility="visible";
    }
   
   
    
    
    setTimeout("document.querySelector('.finger"+id+"').className = 'moveFinger"+id+"1';", 1500);
    setTimeout("document.querySelector('.moveFinger"+id+"1').className = 'moveFinger"+id+"2';", 2500);
    setTimeout("document.querySelector('.moveFinger"+id+"2').className = 'moveFinger"+id+"3';", 3600);
    if(id==4){
       setTimeout("document.querySelector('.moveFinger"+id+"1').style.visibility='hidden';", 2480);
       setTimeout("document.querySelector('.moveFinger"+id+"3').style.visibility='visible';", 4800);
    }
    setTimeout("document.querySelector('.moveFinger"+id+"3').className = 'moveFinger"+id+"4';", 4900);
    setTimeout("document.querySelector('.moveFinger"+id+"4').className = 'moveFinger"+id+"5';", 6100);
    setTimeout("document.querySelector('.moveFinger"+id+"5').className = 'moveFinger"+id+"6';", 7500);
    setTimeout("document.querySelector('.moveFinger"+id+"6').className = 'moveFinger"+id+"7';", 9000);
    setTimeout("document.querySelector('.moveFinger"+id+"7').className = 'moveFinger"+id+"8';", 11000);
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
     { x: [235, 270], y: [120, 145] },
     { x: [145, 175], y: [280, 335] },
     { x: [120, 130], y: [270, 295] } ] ,
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
            }
        }
  
    console.log(`point=${points}`);
}

