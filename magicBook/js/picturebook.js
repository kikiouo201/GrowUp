const parent_recommend = document.querySelector("#parent_recommend");
const machine_recommend = document.querySelector("#machine_recommend");

let par_book;

ipcRenderer.send('getPictureData', 1);
ipcRenderer.once('retruePictureData', (event, data) => {
  console.log("Success catch Picturebook Data")

  par_book = new Array(data['content'].length);

  for (i = 0; i < data['content'].length; i++) {
    // console.log(data['content'].length + data['content'][i]['name']);

    let bookdiv = document.createElement("div");
    bookdiv.className = 'book';

    let bookname = document.createElement("div");
    bookname.className = 'bookname-div'

    let name = document.createElement("h2");
    name.append(data['content'][i]['name']);
    par_book[i] = data['content'][i]['name'];

    let voice_ic = document.createElement('img');
    voice_ic.src = "../icons/speaker.png";
    voice_ic.className = "voice"

    bookname.append(name);
    bookname.append(voice_ic);
    bookdiv.append(bookname);

    let activity_div = document.createElement("div");
    activity_div.className = 'activity-div';

    let bookimg = document.createElement('img');
    bookimg.src = data['content'][i]['image']
    activity_div.append(bookimg);

    let watch_btn = document.createElement('button');
    watch_btn.onclick = () => {
      showWeb('https://www.google.com.tw/webhp?hl=zh-TW');
    }

    let watch_ic = document.createElement('img');
    watch_ic.src = "./image/icon_watchVideo.png";
    let watch_h2 = document.createElement('h2');
    watch_h2.append("觀看繪本");

    watch_btn.append(watch_ic, watch_h2);

    activity_div.append(watch_btn);
    bookdiv.append(activity_div);

    parent_recommend.append(bookdiv);

  }
})



// ipcRenderer.send('getMachineData', 1);

// ipcRenderer.once('retrueMachineData', (event, data) => {
//   // console.log(par_book);

//   const dataurl = "https://children.moc.gov.tw/opendata/2";
//   const request = new XMLHttpRequest();
//   request.open('GET', dataurl);
//   request.responseType = 'json';
//   request.send();
//   // let jsontext;

//   request.onreadystatechange = function (evt) {
//     if (request.readyState !== 4) {
//       return;
//     }

//     recommendListbook(request.response);
//   }

//   function recommendListbook(jsons, keyword) {
//     let request = new XMLHttpRequest();
//     let imgurltemp = 6805;

//     for (let i = 1; i < jsons.length; i++) {
//       for (let j = 0; j < par_book.length; j++) {
//         if (jsons[i]['name'].includes(par_book[j]))
//           break;
//         else{   
//           for (let k = data['content'].length - 1; k > data['content'].length - 3; k--) {
//             if (jsons[i]['name'].includes(data['content'][k]['keyword']) || jsons[i]['intro'].includes(data['content'][k]['keyword'])) {
//               console.log(jsons[i]['name'] + data['content'][k]['keyword'] + par_book[j])
//               let imgurl = 'https://children.moc.gov.tw/resource/animate_image/' + imgurltemp + '.jpg';

//               let bookdiv = document.createElement("div");
//               bookdiv.className = 'book';

//               let bookname = document.createElement("div");
//               bookname.className = 'bookname-div'

//               let name = document.createElement("h2");

//               name.append(document.createTextNode(jsons[i]['name']));

//               let voice_ic = document.createElement('img');
//               voice_ic.src = "../icons/speaker.png";
//               voice_ic.className = "voice"

//               bookname.append(name);
//               bookname.append(voice_ic);

//               bookdiv.append(bookname);
//               getimg(imgurltemp, bookdiv, jsons[i]['url']);
//               break;
//             }
//           }
       
//           break;
//         }
//       }
//       imgurltemp++;
//       if (imgurltemp == 6909)
//         imgurltemp = 6910
//     }
//   }

//   function getimg(imgurltemp, bookdiv, url) {
//     let request = new XMLHttpRequest();
//     let imgurl = 'https://children.moc.gov.tw/resource/animate_image/' + imgurltemp + '.jpg';
//     request.open('GET', imgurl);
//     request.send()
//     request.onreadystatechange = function (evt) {
//       if (request.readyState !== 4)
//         return;
//       if (request.status != 404) {
//         let activity_div = document.createElement("div");
//         activity_div.className = 'activity-div';

//         let bookimg = document.createElement('img');
//         bookimg.src = imgurl
//         activity_div.append(bookimg);

//         let watch_btn = document.createElement('button');
//         watch_btn.onclick = () => {
//           showWeb(url);
//         }
//         let watch_ic = document.createElement('img');
//         watch_ic.src = "./image/icon_watchVideo.png";
//         let watch_h2 = document.createElement('h2');
//         watch_h2.append("觀看繪本");
//         watch_btn.append(watch_ic, watch_h2);

//         activity_div.append(watch_btn);
//         bookdiv.append(activity_div);
//         machine_recommend.append(bookdiv);

//       } else {
//         // console.log(imgurltemp);
//         let activity_div = document.createElement("div");
//         activity_div.className = 'image-div';
//         let bookimg = document.createElement('img');
//         bookimg.src = 'https://children.moc.gov.tw/resource/animate_image/6805.jpg';
//         activity_div.append(bookimg);
//         bookdiv.append(activity_div);
//         machine_recommend.append(bookdiv);
//       }
//       return imgurltemp;
//     }
//     return imgurltemp;
//   }
// })