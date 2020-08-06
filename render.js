let {ipcRenderer }= require('electron');
// const createQA = (text, text2, text3, text4, text5) =>`<div class="card text-white  mb-3" style="background-color: #92337eba;">

//     <div class="card-body" style="margin-top: 30px;">
//         <div style="float:left; display: block; text-align: left;">
//             <p id="Ans" class="card-text card_A" style="float: left;">答案：</p>
//             <p id="AnsTxt" class="card-text card_A" style="margin-left: 0px;">${text}</p>
//             <img class="speaker_A" id="speaker_A" src="icons/speaker.png" />
//         </div>

//         <div style="float:left; display: block; text-align: left;">
//             <p id="explain" class="card-text card_A" style="float: left;">敘述：</p>
//             <p id="explainTxt" class="card-text card_A" style="margin-left: 0px;">${text2}</p>
//             <img class="speaker_A" id="speaker_A" src="icons/speaker.png" />
//         </div>  
//     </div>
//     <div class="card-header contentCss" id="QA_num_" style="background-color: #f8f9fa24;">
//         <p class="contentlink">相關繪本連結：</p>
//         <p class="book_css">${text3}</p>
//         <img src="${text4}"
//             style="margin-left: 20px; display: inline;" width="180" height="153" alt="蘋果甜蜜蜜">
//         <p
//             style="display: inline; margin-left: 20px; margin-top: 40px; position: absolute; margin-right: 40px; font-size: 20pt;">
//             ${text5}</p>
//     </div>
//     <div class="card-header" id="QA_num_">
//         <p class="contentlink">相關連結解釋：</p>
//     </div>

// </div>
// `

let identifyBtn = document.querySelector('#identify-js');
if(identifyBtn){
identifyBtn.addEventListener('click',()=>{   
    ipcRenderer.send('captrue');
    console.log('ready');

    ipcRenderer.on('reply-visionready',(event,data)=>{
        document.getElementById('leadTxt').innerHTML="辨識中。。。";
        ipcRenderer.send('vision-start');
    })

    ipcRenderer.on('reply-mainjsfunction',(event,data)=>{
        ipcRenderer.send('crawler',data)
        console.log(data)
        // data.forEach(label => all+="\nyo="+label);
        document.getElementById('AnsTxt').innerHTML=" "+data
    })

    ipcRenderer.on('reply-webcrawlerfunction',(event,data) =>{
        if(data==undefined){
            document.getElementById('explainTxt').innerHTML="";
        }else{
            var ShowVisibility = document.querySelector('.QA_card_area');
            var ImgVisibility = document.querySelector('img#AnsImg');
            ShowVisibility.style.visibility = "visible";
            ImgVisibility.style.visibility = "visible";
            document.getElementById('leadTxt').innerHTML="辨識成功!!";

            document.getElementById('explainTxt').innerHTML=data;
        }
        
    })


    ipcRenderer.on('reply-mainjsfunction-captrue',(event,data)=>{
        console.log("hihi");
        document.getElementById("AnsImg").src="./still-image.jpg"
        ipcRenderer.send('vision');
    })
    

    })
}

