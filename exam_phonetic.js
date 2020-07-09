let { ipcRenderer } = require('electron');




  
  var count = 0;
  var num = 0;
  var currect = 0;
  
 
  // var Question = JSON.stringify();
  // var result = JSON.parse(Question);
  // var Answer = ["蘋果","西瓜","草莓","香蕉","水蜜桃"];
 
 
  document.getElementById("startTest").addEventListener('click',function(){
                console.log("startTest");
                console.log("ipcRenderer"+ ipcRenderer);
              
                //  ipcRenderer.send('getApi-addQuiz');
                 
                //  ipcRenderer.on('replyApi-addQuiz', (event) => {
                //   console.log(`event=${event}`);
                // });
                  var start = document.getElementById("startTest");
                  var option1 = document.getElementById("option1");
                  var option2 = document.getElementById("option2");
                  var option3 = document.getElementById("option3");
                  var option4 = document.getElementById("option4");
                  var nextQ = document.getElementById("nextQ");
                  var AnsImg = document.getElementById("AnsImg");

                  option1.style.visibility = "visible";
                  option2.style.visibility = "visible";
                  option3.style.visibility = "visible";
                  option4.style.visibility = "visible";
                  AnsImg.style.visibility = "visible";
                  nextQ.style.visibility = "visible";
                  start.style.visibility = "hidden";
                //  console.log(Question);
                 

                  test();
                })
  function test(){
    
    document.getElementById("nextQ").addEventListener('click',function(){
      if(num<6){
        num++;
        var option1 = document.getElementById("option1");
        var option2 = document.getElementById("option2");
        var option3 = document.getElementById("option3");
        var option4 = document.getElementById("option4");


       
      }else{
        var next = document.querySelector('.nextQ');
        var end = document.querySelector("endTest");
        end.style.visibility = "visible"
        next.style.visibility = "hidden";

        num = 0;
      }     
    });

  }
  

