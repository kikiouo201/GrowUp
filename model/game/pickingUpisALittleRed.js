// require('../../image/pickingUpisALittleRed')


//變數設定
let cards=document.getElementsByClassName('card')    //取得所有的卡牌元素
let fronts=document.getElementsByClassName('front')  //取得所有的卡面元素
let backs=document.getElementsByClassName('back')    //取得所有背面元素
let gap=[1,1];          //用來計算卡牌翻面時間的基準值，最多同時兩張牌，所以以陣列方式存放兩個值
let frames=[0,0];       //用來計算翻牌期間的幀數，作為條件判斷的值，最多同時兩張牌，所以以陣列方式存放兩個值
let ani=new Array();    //存放動畫執行時的計時物件
let shows=new Array();  //存放被翻牌的元素物件
let cardData=[1,2,3,4,5,6,7,8,9,10,11,12,13]; //原始牌組
let gameData=new Array(16);   //用來存放要放在遊戲中的牌組內容，八種樣式，十六個元素
let counterWidth=100;  //計時條長度
let timer=60000;     //倒數時間(亳秒)
let counterHandle;      //計時條
let complete=0;
//startGame();

//遊戲啟動
function startGame(){
  document.getElementsByClassName('mask')[0].style.display="none";

  initial();   //初始化全域變數及資料

  shuffle(cardData)  //對原始資料進行洗牌

  //從洗牌後的資料陣列取出八筆資料並送入遊戲卡牌陣列
  for(i=0;i<8;i++){
    let p=cardData.pop();
    gameData[i*2]=p
    gameData[i*2+1]=p
  }

  shuffle(gameData)   //對遊戲資料進行洗牌
  
  //設定卡牌的資料內及顯示圖片
  for(i=0;i<fronts.length;i++){
    fronts[i].setAttribute("data-type",gameData[i]); //設定資料內容
    
    fronts[i].style="background:url('../image/pickingUpisALittleRed/"+gameData[i]+".png') no-repeat;background-size: contain; ";
  }
//https://portfolio.mackliu.com/game-01/img/1.png
//https://portfolio.mackliu.com/game-01/img/back.png
  //設定卡牌的點擊偵測事件
  for(i=0;i<cards.length;i++){
    
    //卡牌點擊事件綁定函式，發生onclick時才會去執行
    cards[i].onclick=function(){   
  
      gap[0]=1;
      document.getElementById("wall").style.display="block";  //把透明牆打開，以防誤點

      //判斷陣列中是否有重覆的元素以及元素是否是己經完成的牌卡
      if(shows.indexOf(this)==-1 && this.style.animationName!="opa"){
        shows.push(this);
        ani[0]=setInterval(fade,25,this,0)
        frames[0]=0
      }else{
        document.getElementById("wall").style.display="none";
      }
    }
  }
  counterHandle=setInterval(timeCounter,125)    //啟動計時器
}

//初始化相關資料函式
function initial(){
  gap=[1,1];       
  frames=[0,0];    
  ani.length=0;    
  shows.length=0;
  cardData=[1,2,3,4,5,6,7,8,9,10,11,12,13];  
  gameData.length=0;
  counterWidth=100; 
  timer=60000;
  complete=0;
  document.getElementById('counter').style.width="100%";

  //將卡牌元素中的style屬性都先移除
  for(i=0;i<cards.length;i++){
    cards[i].removeAttribute('style');
    cards[i].childNodes[0].removeAttribute('style');
    cards[i].childNodes[1].removeAttribute('style');
  }
}

//計時條倒數函式
function timeCounter(){
  if(timer<0){
    document.getElementById('counter').style.width="0%";
    clearInterval(counterHandle);
    result();  //計時結束時執行結果判定函式
  }else{
    timer-=125;
    counterWidth-=0.21
    document.getElementById('counter').style.width=counterWidth+"%";
  }
}

//結果判定函式
function result(){
  let com=complete;
  let str="";

  //設定結果字串
  if(com>=16){
    str="遊戲結果\n恭喜完成遊戲\n<button onclick='startGame()'>繼續遊戲</button>";
  }else{
    str="遊戲結果\n失敗，還有 "+(16-com)+" 張未完成\n<button onclick='startGame()'>繼續遊戲</button>";
  }

  //把結果字串寫入提示顯示區
  document.getElementsByClassName('intro')[0].innerHTML=str;
  document.getElementsByClassName('mask')[0].style.display="block";

}

//檢查牌面是否相同函式，相同則透明，不同則翻轉回去
function chk(){
  if(shows[0].childNodes[0].dataset.type==shows[1].childNodes[0].dataset.type){
    shows[0].style.animation="opa 500ms ease forwards";
    shows[1].style.animation="opa 500ms ease forwards";
    complete+=2;
    if(complete>=16){
      result();
      clearInterval(counterHandle);
    }
    document.getElementById("wall").style.display="none";
  }else{
    shows[0].removeAttribute('style')
    shows[1].removeAttribute('style')
    document.getElementById("wall").style.display="block";
    ani[0]=setInterval(fade,25,shows[0],0)
    ani[1]=setInterval(fade,25,shows[1],1)
  }
   shows.length=0;
}

//翻牌函式
function fade(obj,d){

  //判定翻轉到一半時，交換要顯示的牌面內容
  if(frames[d]==10){
      if(obj.childNodes[0].style.display=="none" || obj.childNodes[0].style.display=="" ){
          obj.childNodes[1].style.display="none";
          obj.childNodes[0].style.display="block";
        }else{
          obj.childNodes[1].style.display="block";
          obj.childNodes[0].style.display="none";
        }      
    }  

  //根據不同的幀數來決定要進行的動作  
  if(frames[d]>=20){
    if(shows.length<2){
      document.getElementById("wall").style.display="none";
    }else{
      document.getElementById("wall").style.display="block";
      setTimeout(chk,1000);
    }
    clearInterval(ani[d])
    frames[d]=0;
  }else if(frames[d]>=10){
    gap[d]+=0.1
    obj.style.transform="scaleX("+gap[d]+")";
    frames[d]+=1
  }else{
    gap[d]-=0.1
    obj.style.transform="scaleX("+gap[d]+")";
    frames[d]+=1
  }
}

//陣列洗牌函式
function shuffle(array){
  for(i=0;i<array.length;i++){
    let seed=Math.floor(Math.random()*array.length);
    let temp=array[i];
    array[i]=array[seed];
    array[seed]=temp;
  }
  return array;
}
