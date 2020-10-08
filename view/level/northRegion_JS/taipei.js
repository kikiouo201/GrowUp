function changeInfor(type) {
  const picture = document.querySelector("#picture");
  const speaker = document.querySelector("#speaker");
  const intro = document.querySelector("#intro");
  document.querySelector(".fullContent").style.display='block'

  switch (type) {
      case 0:
          picture.src= "https://care-old.org/keelung/wp-content/uploads/2018/05/%E5%9F%BA%E9%9A%86.png";
          intro.textContent = "臺北地區位於臺灣北部的臺北盆地。是臺灣的政治、經濟、文化、教育、醫療、學術研究等領域的發展中心。"
          speaker.alt = "taipeiRegion"
          break;
      case 1:
          picture.src = "http://www.egc.com.tw/_upload/image/masterpiece/large/9675791c51d2f0a5.jpg";
          intro.textContent = "臺北101大樓位於臺北市信義區。是台灣第一高樓以及唯一樓層超過100層的建築物，是臺北重要地標之一。"
          speaker.alt = "taipei_f1"
          break;
      case 2:
          picture.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Chiang_Kai-shek_memorial_amk.jpg/420px-Chiang_Kai-shek_memorial_amk.jpg";
          intro.textContent = "中正紀念堂，是為紀念已故前中華民國總統蔣中正的建築，也是眾多紀念蔣中正的建築中規模最大者，在國際上也是著名的地標之一。"
          speaker.alt = "taipei_f2"
          break;
      case 3:
          picture.src = "https://www.taiwan.net.tw/att/1/big_scenic_spots/pic_74_4.jpg";
          intro.textContent = "國立故宮博物院，別名中山博物院。為臺灣最具規模的博物館以及臺灣八景之一，也是古代中國藝術史與漢學研究機構。"
          speaker.alt = "taipei_f3"
          break; 
  }
}