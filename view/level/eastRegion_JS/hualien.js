function changeInfor(type) {
  const picture = document.querySelector("#picture");
  const speaker = document.querySelector("#speaker");
  const intro = document.querySelector("#intro");
  document.querySelector(".fullContent").style.display='block'

  switch (type) {
      case 0:
          picture.src= "https://care-old.org/keelung/wp-content/uploads/2018/05/%E5%9F%BA%E9%9A%86.png";
          intro.textContent = "花蓮地區，位於臺灣本島東部。是臺灣面積最大的縣級行政區。花蓮地區是台灣原住民最多的區域，其中以第一大族阿美族分布最廣。"
          speaker.alt = "taitungRegion"
          break;
      case 1:
          picture.src = "https://www.ner.gov.tw/api/images/5affbec7581023000596746f/2400/jpeg";
          intro.textContent = "花蓮大西瓜富含養分，讓西瓜的口感「沙甜」且「清脆」"
          speaker.alt = "taitung_f1"
          break;
      case 2:
          picture.src = "https://s.yimg.com/zp/MerchandiseSpec/99DE9C85C0-SP-6215750.jpg";
          intro.textContent = "遠雄海洋公園俗稱花蓮海洋公園。是臺灣第一座以海洋為主題，結合了自然公園與休閒飯店的主題樂園。"
          speaker.alt = "taitung_f2"
          break;
      case 3:
          picture.src = "https://www.erv-nsa.gov.tw/image/10343/1024x768";
          intro.textContent = "瑞穗牧場是一座開放式的休閒牧場，以放牧乳牛、生產乳製品而聞名。"
          speaker.alt = "taitung_f3"
          break;
           
  }
}