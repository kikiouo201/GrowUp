function changeInfor(type) {
  const picture = document.querySelector("#picture");
  const speaker = document.querySelector("#speaker");
  const intro = document.querySelector("#intro");
  document.querySelector(".fullContent").style.display='block'

  switch (type) {
      case 0:
          picture.src= "../../image/map/Taitung_introduce.png";
          intro.textContent = "位於臺灣東南部。擁有豐富的生態資源。海岸、高山、森林、溪谷都保持著自然完整的風貌，處處都是天然美景。"
          speaker.alt = "taitungRegion"
          title.textContent = "臺東地區";
          title.style.left = "33%"
          title.style.width = "220px"
          break;
      case 1:
          picture.src = "https://i2.wp.com/www.zztaitung.com/wp-content/uploads/2019/06/2019%E5%8F%B0%E6%9D%B1%E7%86%B1%E6%B0%A3%E7%90%83%E6%97%85%E9%81%8A%E5%98%89%E5%B9%B4%E8%8F%AF-17.jpg?resize=900%2C600";
          intro.textContent = "是將氣球內的氣體用瓦斯加熱，使氣球往高空飄浮。每年6月至8月所舉辦的臺灣國際熱氣球嘉年華，可以坐在熱氣球上觀賞花東縱谷的美景。"
          speaker.alt = "taitung_f1"
          title.textContent = "熱氣球";
          title.style.left = "33%"
          title.style.width = "220px"
          break;
      case 2:
          picture.src = "https://www.erv-nsa.gov.tw/image/10397/1024x768";
          intro.textContent = "是全台唯一的坡地牧場。從事森林浴、滾草、餵食黑白相間的荷蘭種乳牛等觀光活動，以出產新鮮、香醇的初鹿鮮奶聞名。"
          speaker.alt = "taitung_f2"
          title.textContent = "初鹿牧場";
          title.style.left = "33%"
          title.style.width = "220px"
          break;
      case 3:
          picture.src = "https://tour.taitung.gov.tw/image/753/1024x768";
          intro.textContent = "俗稱卑南山。因外形與鯉魚相似而得名，是臺東市區最寬廣的休閒綠地也是最明顯的地標和風景區之一。"
          speaker.alt = "taitung_f3"
          title.textContent = "鯉魚山";
          title.style.left = "33%"
          title.style.width = "220px"
          break;
      case 4:
          picture.src = "https://tour.taitung.gov.tw/image/23686/1024x768";
          intro.textContent = "是伯朗大道上的一棵茄苳樹，枝葉茂密、適合乘涼，周圍為一望無際的稻田，這顆樹孤立其中，配上遠方的山景，有著拍照的好景色。"
          speaker.alt = "taitung_f4"
          title.textContent = "金城武樹";
          title.style.left = "33%"
          title.style.width = "220px"
          break;
           
  }
}