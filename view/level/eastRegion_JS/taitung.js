function changeInfor(type) {
  const picture = document.querySelector("#picture");
  const speaker = document.querySelector("#speaker");
  const intro = document.querySelector("#intro");
  document.querySelector(".fullContent").style.display='block'

  switch (type) {
      case 0:
          picture.src= "https://care-old.org/keelung/wp-content/uploads/2018/05/%E5%9F%BA%E9%9A%86.png";
          intro.textContent = "台東地區擁有豐富的生態資源。海岸、高山、森林、溪谷都保持著自然完整的風貌，處處都是天然美景。"
          speaker.alt = "taitungRegion"
          break;
      case 1:
          picture.src = "https://i2.wp.com/www.zztaitung.com/wp-content/uploads/2019/06/2019%E5%8F%B0%E6%9D%B1%E7%86%B1%E6%B0%A3%E7%90%83%E6%97%85%E9%81%8A%E5%98%89%E5%B9%B4%E8%8F%AF-17.jpg?resize=900%2C600";
          intro.textContent = "是將氣球內的空氣加熱，使氣球往高空飄浮。每年的6月至8月，台東縣鹿野鄉舉辦的臺灣國際熱氣球嘉年華，可以坐在熱氣球上觀賞花東縱谷的美景。"
          speaker.alt = "taitung_f1"
          break;
      case 2:
          picture.src = "https://www.erv-nsa.gov.tw/image/10397/1024x768";
          intro.textContent = "位於台東縣卑南鄉。是全台灣唯一的坡地牧場。有滾草、餵食黑白相間的乳牛等觀光活動，其中出產的初鹿鮮奶聞名。"
          speaker.alt = "taitung_f2"
          break;
      case 3:
          picture.src = "https://tour.taitung.gov.tw/image/753/1024x768";
          intro.textContent = "位於臺東市西邊，俗稱卑南山。因為外形與鯉魚相似而出名，是臺東市區最明顯的地標和風景區之一"
          speaker.alt = "taitung_f3"
          break;
      case 4:
          picture.src = "https://tour.taitung.gov.tw/image/23686/1024x768";
          intro.textContent = "位於臺東縣池上鄉。在伯朗大道上的一棵茄苳樹，附近是一望無際的稻田，金城武樹就孤立其中。"
          speaker.alt = "taitung_f4"
          break;
           
  }
}