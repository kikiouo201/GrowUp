let {
  ipcRenderer
} = require('electron');
const e = require('express');

var count = 0;
var num = 0;
var currectAns = 0;


var startTest = document.getElementById("startTest");
var option1 = document.getElementById("option1");
var option2 = document.getElementById("option2");
var option3 = document.getElementById("option3");
var option4 = document.getElementById("option4");
var start = document.getElementById("startTest");
var end = document.getElementById("endTest");
var AnsImg = document.getElementById("AnsImg");
var total;
var question;

// var Question = JSON.stringify();
// var result = JSON.parse(Question);
// var Answer = ["蘋果","西瓜","草莓","香蕉","水蜜桃"];



function startQ() {
  console.log("startTest");

  console.log(currectAns + " " + count + " " + num);
  ipcRenderer.send('getApi-addQuiz');

  count = 0;
  num = 0;
  currectAns = 0;

  option1.style.visibility = "visible";
  option2.style.visibility = "visible";
  option3.style.visibility = "visible";
  option4.style.visibility = "visible";
  AnsImg.style.visibility = "visible";
  start.style.visibility = "hidden";
  ipcRenderer.on('replyApi-addQuiz', (event, data) => {
    question = JSON.parse(data)
    option1.innerHTML = question[num]["options0"];
    option1.value = question[num]["options0"];
    option2.innerHTML = question[num]["options1"];
    option2.value = question[num]["options1"];
    option3.innerHTML = question[num]["options2"];
    option3.value = question[num]["options2"];
    option4.innerHTML = question[num]["options3"];
    option4.value = question[num]["options3"];
    AnsImg.src = question[num]["url"];
    total = question.length
    //  console.log(Question);
  })
}

function End() {
  start.style.visibility = "visible";
  end.style.visibility = "hidden";

  alert("總答對題數: " + currectAns + "/" + total);
  count = 0;
  num = 0;
  currectAns = 0;
}

function Option(btn) {

  console.log("total=>" + total);
  num++;
  if (btn.value == question[num - 1]["answer"])
    currectAns++

  if ((num + 1) > total){
    option1.style.visibility = "hidden";
    option2.style.visibility = "hidden";
    option3.style.visibility = "hidden";
    option4.style.visibility = "hidden";
    AnsImg.style.visibility = "hidden";
    end.style.visibility = "visible";
    
  }else {
    option1.innerHTML = question[num]["options0"];
    option1.value = question[num]["options0"];
    option2.innerHTML = question[num]["options1"];
    option2.value = question[num]["options1"];
    option3.innerHTML = question[num]["options2"];
    option3.value = question[num]["options2"];
    option4.innerHTML = question[num]["options3"];
    option4.value = question[num]["options3"];
    AnsImg.src = question[num]["url"];
  }
}
startTest.addEventListener('click', startQ)


end.addEventListener('click', End)