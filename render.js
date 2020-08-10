let {ipcRenderer }= require('electron');
const request = require('request')
const cheerio = require('cheerio')
const encoding = require('encoding');
const iconv = require('iconv-lite');

let identifyBtn = document.querySelector('#identify-js');
if(identifyBtn){
identifyBtn.addEventListener('click',()=>{   
    ipcRenderer.send('captrue');
    document.getElementById('leadTxt').innerHTML="拍照中。。。";
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
            var ShowVisibility = document.querySelector('.QA_card_area');
            var ImgVisibility = document.querySelector('img#AnsImg');
            ShowVisibility.style.visibility = "visible";
            ImgVisibility.style.visibility = "visible";
            document.getElementById("AnsImg").src="./still-image.jpg"
            document.getElementById('leadTxt').innerHTML="辨識成功!!";
            document.getElementById('explainTxt').innerHTML="";
        }else{
            var ShowVisibility = document.querySelector('.QA_card_area');
            var ImgVisibility = document.querySelector('img#AnsImg');
            ShowVisibility.style.visibility = "visible";
            ImgVisibility.style.visibility = "visible";
            document.getElementById("AnsImg").src="./still-image.jpg"
            document.getElementById('leadTxt').innerHTML="辨識成功!!";

            document.getElementById('explainTxt').innerHTML=data;
        }
        
    })


    ipcRenderer.on('reply-mainjsfunction-captrue',(event,data)=>{
        console.log("hihi");
        document.getElementById('leadTxt').innerHTML="讀取照片。。。";
        ipcRenderer.send('vision');
    })
    

    })
}

