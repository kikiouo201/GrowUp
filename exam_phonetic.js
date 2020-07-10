let { ipcRenderer } = require('electron');




  
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
  
 
  // var Question = JSON.stringify();
  // var result = JSON.parse(Question);
  // var Answer = ["蘋果","西瓜","草莓","香蕉","水蜜桃"];

  function startQ(){
    console.log("startTest");
    count = 0;
    num = 0;
    currect = 0;
    console.log(currect+" "+count+" "+num);
    ipcRenderer.send('getApi-addQuiz');
    
      
  

      option1.style.visibility = "visible";
      option2.style.visibility = "visible";
      option3.style.visibility = "visible";
      option4.style.visibility = "visible";
      AnsImg.style.visibility = "visible";
      start.style.visibility = "hidden";
      ipcRenderer.on('replyApi-addQuiz', (event,data) => {
        var question = JSON.parse(data)
        option1.innerHTML = question[0]["options0"];
        option1.value = question[0]["options0"];
        option2.innerHTML = question[0]["options1"];
        option2.value = question[0]["options1"];
        option3.innerHTML = question[0]["options2"];
        option3.value = question[0]["options2"];
        option4.innerHTML = question[0]["options3"];
        option4.value = question[0]["options3"];
        AnsImg.src = question[0]["url"];

    //  console.log(Question);
      }) 
      
    }



  function Option1(){
    ipcRenderer.send('getApi-option1');
    ipcRenderer.on('replyApi-option1', (event,data) => {
      if(num>=10){
        var end = document.querySelector(".endTest");
        end.style.visibility = "visible";
        option1.style.visibility = "hidden";
        option2.style.visibility = "hidden";
        option3.style.visibility = "hidden";
        option4.style.visibility = "hidden";
        AnsImg.style.visibility = "hidden";
    }
      

        var question = JSON.parse(data)
        
        option1.innerHTML = question[num]["options0"];
        option1.value = question[num]["options0"];
        option2.innerHTML = question[num]["options1"];
        option2.value = question[num]["options1"];
        option3.innerHTML = question[num]["options2"];
        option3.value = question[num]["options2"];
        option4.innerHTML = question[num]["options3"];
        option4.value = question[num]["options3"];
        AnsImg.src = question[num]["url"];
    
        if(option1.value == question[num]["answer"]){
          console.log(question[num]["answer"]);
          currectAns++
        }
        count++
        num++ 
    })
 
  }
    

    function Option2(){
      ipcRenderer.send('getApi-option2');
      ipcRenderer.on('replyApi-option2', (event,data) => {
        if(num>=10){
          var end = document.querySelector(".endTest");
          end.style.visibility = "visible";
          option1.style.visibility = "hidden";
          option2.style.visibility = "hidden";
          option3.style.visibility = "hidden";
          option4.style.visibility = "hidden";
          AnsImg.style.visibility = "hidden";
      }
        

          var question = JSON.parse(data)
         
          
          option1.innerHTML = question[num]["options0"];
          option1.value = question[num]["options0"];
          option2.innerHTML = question[num]["options1"];
          option2.value = question[num]["options1"];
          option3.innerHTML = question[num]["options2"];
          option3.value = question[num]["options2"];
          option4.innerHTML = question[num]["options3"];
          option4.value = question[num]["options3"];
          AnsImg.src = question[num]["url"];
      
          if(option2.value == question[num]["answer"]){
            console.log(question[num]["answer"]);
            currectAns++
          }
      
      })
      count++
      num++; 
    }





    function Option3(){
      ipcRenderer.send('getApi-option3');
      ipcRenderer.on('replyApi-option3', (event,data) => {
        if(num>=10){
          var end = document.querySelector(".endTest");
          end.style.visibility = "visible";
          option1.style.visibility = "hidden";
          option2.style.visibility = "hidden";
          option3.style.visibility = "hidden";
          option4.style.visibility = "hidden";
          AnsImg.style.visibility = "hidden";
      }
        

          var question = JSON.parse(data)
         
          
          option1.innerHTML = question[num]["options0"];
          option1.value = question[num]["options0"];
          option2.innerHTML = question[num]["options1"];
          option2.value = question[num]["options1"];
          option3.innerHTML = question[num]["options2"];
          option3.value = question[num]["options2"];
          option4.innerHTML = question[num]["options3"];
          option4.value = question[num]["options3"];
          AnsImg.src = question[num]["url"];
      
          if(option3.value == question[num]["answer"]){
            console.log(question[num]["answer"]);
            currectAns++
          }
      
      })
      count++
      num++; 
    }





    function Option4(){
      ipcRenderer.send('getApi-option4');
      ipcRenderer.on('replyApi-option4', (event,data) => {
        if(num>=10){
          var end = document.querySelector(".endTest");
          end.style.visibility = "visible";
          option1.style.visibility = "hidden";
          option2.style.visibility = "hidden";
          option3.style.visibility = "hidden";
          option4.style.visibility = "hidden";
          AnsImg.style.visibility = "hidden";
      }
        

          var question = JSON.parse(data)
        
          
          option1.innerHTML = question[num]["options0"];
          option1.value = question[num]["options0"];
          option2.innerHTML = question[num]["options1"];
          option2.value = question[num]["options1"];
          option3.innerHTML = question[num]["options2"];
          option3.value = question[num]["options2"];
          option4.innerHTML = question[num]["options3"];
          option4.value = question[num]["options3"];

          AnsImg.src = question[num]["url"];
      
        if(option4.value == question[num]["answer"]){
          console.log(question[num]["answer"]);
          currectAns++
        }
      
      })
      count++
      num++; 
    }


    function End(){
      
      option1.style.visibility = "hidden";
      option2.style.visibility = "hidden";
      option3.style.visibility = "hidden";
      option4.style.visibility = "hidden";
      AnsImg.style.visibility = "hidden";
      start.style.visibility = "visible";
      
      alert("總答對題數: "+currectAns+"/"+count);
      
    }

  startTest.removeEventListener('click',startQ)  
  startTest.addEventListener('click',startQ)
 

    option1.removeEventListener('click', Option1)            
    option1.addEventListener('click',Option1)
  
    
    option2.removeEventListener('click', Option2)
    option2.addEventListener('click',Option2)


    option3.removeEventListener('click', Option3)
    option3.addEventListener('click',Option3)


    option4.removeEventListener('click', Option4)
    option4.addEventListener('click',Option4)

    
  
    end.removeEventListener('click',End)
    end.addEventListener('click',End)