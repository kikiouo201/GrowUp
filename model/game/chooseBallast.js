let {ipcRenderer:ipcRenderer2 }= require('electron');
let nowScore = 0;

let animal=[{name:'South_American_Coati',chineseName:'長鼻浣熊'},
            {name:'Ring_tailed_Lemur',chineseName:'環尾狐猴'},
            {name:'White_handed_Gibbon',chineseName:'白手長臂猿'},
            {name:'Black_and_white_ruffed_Lemur',chineseName:'白頸狐猴'},
            {name:'Alpaca',chineseName:'羊駝'},
            {name:'Greater_Flamingo',chineseName:'大紅鶴'},
            {name:'Donkey',chineseName:'家驢'},
            {name:'Pony',chineseName:'迷你馬'},
            {name:'Chinchilla',chineseName:'絨鼠'},];
            
            //不適合 {name:'Kinkajou',chineseName:'蜜熊'},  {name:'Brown_Lemur',chineseName:'褐狐猴'},
let answerIndex="";
function startGame(){
    
    const topic = document.querySelector('#topic');
    shuffle(animal);
    for(let i=1;i<5;i++){
        const target = document.querySelector('.target' + i);
        target.src=`../../image/animal/${animal[i].name}.png`;
    }
    answerIndex = getAnswer(1,4);
    console.log(`answerIndex=${answerIndex}`)
    topic.innerHTML=`找找看${animal[answerIndex].chineseName}在哪裡`;
}

function getAnswer(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
};

function shuffle(array){
    for(i=0;i<array.length;i++){
      let seed=Math.floor(Math.random()*array.length);
      let temp=array[i];
      array[i]=array[seed];
      array[seed]=temp;
    }
    return array;
  }

function checkAnswer(id){
    const status = document.querySelector('.status');
    const props = document.querySelector('.props');
    const black_overlay = document.querySelector('.black_overlay');
    black_overlay.style.visibility = "visible";
    if(id == answerIndex){
        status.innerHTML = '<img src="../../image/drawZhuyin/good.png" width="200px"/>你好棒';
        props.style.visibility = "visible";
        ipcRenderer2.send("levelIsPass", 'chooseBallast');
    }else{
        status.innerHTML = '<img src="../../image/drawZhuyin/tryAgain.png" width="200px"/>失敗';
        props.style.visibility = "hidden";
    }
   
}
  
// function toBig(id) {
//     const target = document.querySelector('.target' + id);
//     target.className = 'getTarget';
//     nowScore++;
//     setTimeout(toBackgroundBlack, 1000);
// }
// function toBackgroundBlack() {
//     const black_overlay = document.querySelector('.black_overlay');
//     black_overlay.style.visibility = "visible";
// }
// function next() {
//     const targets = document.querySelectorAll('.getTarget');
//     targets.forEach((target) => {
//         target.style.visibility = "hidden";
//     });

//     setTimeout('document.querySelector(".score").innerHTML=' + nowScore + '+"分"', 1000);
//     if (targets.length == 5) {
//         setTimeout(end, 1000);
//     } else {
//         setTimeout('document.querySelector(".black_overlay").style.visibility = "hidden";', 1000);
//     }
// }
function end(){
    const next = document.querySelector('.next');
    const result = document.querySelector('.result');
    next.style.visibility = 'hidden';
    result.style.visibility = 'visible';
  //  ipcRenderer.send("levelIsPass","findBallast");
}



function challengeAgain() {
    window.location.href = "../../view/game/chooseBallast.html";
}

function goNextLevel() {
        window.location.href = `../../view/level/hualien.html`;           
}

