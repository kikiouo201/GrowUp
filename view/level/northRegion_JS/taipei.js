function changeInfor(type) {
  const picture = document.querySelector("#picture");
  const speaker = document.querySelector("#speaker");
  const intro = document.querySelector("#intro");
  document.querySelector(".fullContent").style.display='block'

  switch (type) {
      case 0:
          picture.src= "https://care-old.org/keelung/wp-content/uploads/2018/05/%E5%9F%BA%E9%9A%86.png";
          intro.textContent = "位於臺灣北部，為六都之一。交通四通八達，無論陸、空皆十分方便，是臺灣區最大的都市和政治、經濟、交通、文化中心。"
          speaker.alt = "taipeiRegion"
          title.textContent = "臺北地區";
          title.style.left = "33%"
          title.style.width = "220px"
          break;
      case 1:
          picture.src = "http://www.egc.com.tw/_upload/image/masterpiece/large/9675791c51d2f0a5.jpg";
          intro.textContent = "是台灣第一高樓以及唯一樓層超過100層的建築物，是世界第一座超過500公尺的大樓，目前為世界第十二高樓，是臺北重要地標之一。"
          speaker.alt = "taipei_f1"
          title.textContent = "臺北101大樓";
          title.style.left = "33%"
          title.style.width = "220px"
          break;
      case 2:
          picture.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Chiang_Kai-shek_memorial_amk.jpg/420px-Chiang_Kai-shek_memorial_amk.jpg";
          intro.textContent = "是紀念已故前中華民國總統蔣中正而興建的建築，落成以來成為臺北市及臺灣在國際上最著名地標與觀光景點之一。"
          speaker.alt = "taipei_f2"
          title.textContent = "中正紀念堂";
          title.style.left = "33%"
          title.style.width = "220px"
          break;
      case 3:
          picture.src = "https://www.taiwan.net.tw/att/1/big_scenic_spots/pic_74_4.jpg";
          intro.textContent = "別名中山博物院。收藏舊日清宮原有的各種古代文物，為臺灣最具規模的博物館以及臺灣八景之一。"
          speaker.alt = "taipei_f3"
          title.textContent = "國立故宮博物院";
          title.style.left = "30%"
          title.style.width = "250px"
          break; 
  }
}