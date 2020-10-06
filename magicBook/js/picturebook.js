const parent_recommend = document.querySelector("#parent_recommend");
const machine_recommend = document.querySelector("#machine_recommend");
const else_book = document.querySelector("#else_book");

const parent_tab = document.querySelector("#parent_tab");
const machine_tab = document.querySelector("#machine_tab");
const else_tab = document.querySelector("#else_tab");


const fullscr = document.querySelector("#allFull");
let par_book;

function tabClick(temp) {
  if (temp == 1) {
    parent_recommend.style.display = "block";
    parent_tab.style.boxShadow = "15px 30px 20px #342727";
    parent_tab.style.backgroundColor = 'rgb(223, 192, 140)';

    machine_recommend.style.display = "none"
    machine_tab.style.boxShadow =  ""
    machine_tab.style.backgroundColor = 'rgb(255, 182, 160)';


    else_book.style.display = "none"
    else_tab.style.boxShadow =  ""
    else_tab.style.backgroundColor = 'rgb(206, 255, 160)';


  } else if (temp == 2) {
    parent_recommend.style.display = "none"
    parent_tab.style.boxShadow =  ""
    parent_tab.style.backgroundColor = 'rgb(255, 220, 160)';

    machine_recommend.style.display = "block"
    machine_tab.style.boxShadow = "15px 30px 20px #342727"
    machine_tab.style.backgroundColor = 'rgb(209, 149, 131)';

    else_book.style.display = "none"
    else_tab.style.boxShadow =  ""
    else_tab.style.backgroundColor = 'rgb(206, 255, 160)';
  } else {
    parent_recommend.style.display = "none"
    parent_tab.style.boxShadow =  ""
    parent_tab.style.backgroundColor = 'rgb(255, 220, 160)';

    machine_recommend.style.display = "none"
    machine_tab.style.boxShadow =  ""
    machine_tab.style.backgroundColor = 'rgb(255, 182, 160)';

    else_book.style.display = "block"
    else_tab.style.boxShadow = "15px 30px 20px #342727"
    else_tab.style.backgroundColor = 'rgb(173, 214, 134)';

  }
}

ipcRenderer.send('getPictureData', 1);
ipcRenderer.once('retruePictureData', (event, data) => {
  console.log("Success catch Picturebook Data")
  console.log("Success catch Picturebook Data" + data.toString())

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

    let web_url = data['content'][i]['introduction']
    watch_btn.onclick = () => {
      showWeb( web_url, fullscr);
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
// onclick="window.location.hash = '#else_book'"
ipcRenderer.send('getMachineData', 1);
ipcRenderer.once('retrueMachineData', (event, data) => {
  // console.log(par_book);

  const dataurl = "https://children.moc.gov.tw/opendata/2";
  const request = new XMLHttpRequest();
  request.open('GET', dataurl);
  request.responseType = 'json';
  request.send();
  // let jsontext;

  request.onreadystatechange = function (evt) {
    if (request.readyState !== 4) {
      return;
    }
    recommendListbook(request.response);
  }

  function recommendListbook(jsons, keyword) {
    let request = new XMLHttpRequest();
    let imgurltemp = 6805;
    let Pushing = true;
    for (let i = 1; i < jsons.length; i++) {
      for (let k = data['content'].length - 1; k > data['content'].length - 3; k--) {

        console.log( data['content'][k])

        if (jsons[i]['name'].includes(data['content'][k]['keyword']) || jsons[i]['intro'].includes(data['content'][k]['keyword']) || jsons[i]['name'].includes('水果')) {
          let imgurl = 'https://children.moc.gov.tw/resource/animate_image/' + imgurltemp + '.jpg';

          for (let j = 0; j < par_book.length; j++) {
            // console.log(jsons[i]['name'] + "&&" + par_book[j])
            if (jsons[i]['name'].includes(par_book[j])) {
              break;
            } else if (j == par_book.length - 1 && Pushing) {
              Pushing = false;
              console.log(jsons[i]['name'] + "&&" + par_book[j] + "&&" + j + "&&" + k)
              let bookdiv = document.createElement("div");
              bookdiv.className = 'book';

              let bookname = document.createElement("div");
              bookname.className = 'bookname-div'

              let name = document.createElement("h2");

              name.append(document.createTextNode(jsons[i]['name']));

              let voice_ic = document.createElement('img');
              voice_ic.src = "../icons/speaker.png";
              voice_ic.className = "voice"

              bookname.append(name);
              bookname.append(voice_ic);

              bookdiv.append(bookname);
              if (jsons[i]['name'] == "我的水果寶寶")
                getimg(7008, bookdiv, jsons[i]['url']);
              else
                getimg(imgurltemp, bookdiv, jsons[i]['url']);
            }
          }
        }
      }
      Pushing = true;
      imgurltemp++;
      if (imgurltemp == 6909)
        imgurltemp = 6910
    }
  }

  function getimg(imgurltemp, bookdiv, url) {
    let request = new XMLHttpRequest();
    let imgurl = 'https://children.moc.gov.tw/resource/animate_image/' + imgurltemp + '.jpg';
    if (imgurltemp == 7008)
      imgurl = 'https://children.moc.gov.tw/resource/animate_image/' + imgurltemp + '.png';
    request.open('GET', imgurl);
    request.send()
    request.onreadystatechange = function (evt) {
      if (request.readyState !== 4)
        return;
      if (request.status != 404) {
        let activity_div = document.createElement("div");
        activity_div.className = 'activity-div';

        let bookimg = document.createElement('img');
        bookimg.src = imgurl
        activity_div.append(bookimg);

        let watch_btn = document.createElement('button');
        watch_btn.onclick = () => {
          showWeb(url,fullscr);
        }
        let watch_ic = document.createElement('img');
        watch_ic.src = "./image/icon_watchVideo.png";
        let watch_h2 = document.createElement('h2');
        watch_h2.append("觀看繪本");
        watch_btn.append(watch_ic, watch_h2);

        activity_div.append(watch_btn);
        bookdiv.append(activity_div);
        machine_recommend.append(bookdiv);

      } else {
        // console.log(imgurltemp);
        let activity_div = document.createElement("div");
        activity_div.className = 'image-div';
        let bookimg = document.createElement('img');
        bookimg.src = 'https://children.moc.gov.tw/resource/animate_image/6805.jpg';
        activity_div.append(bookimg);
        bookdiv.append(activity_div);
        machine_recommend.append(bookdiv);
      }
      return imgurltemp;
    }
    return imgurltemp;
  }
})