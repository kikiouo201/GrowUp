function changeInfor(type) {
  const picture = document.querySelector("#picture");
  const speaker = document.querySelector("#speaker");
  const intro = document.querySelector("#intro");
  document.querySelector(".fullContent").style.display='block'

  switch (type) {
      case 0:
          picture.src= "https://care-old.org/keelung/wp-content/uploads/2018/05/%E5%9F%BA%E9%9A%86.png";
          intro.textContent = "宜蘭地區囿於三面背山、一面向海特殊地形，孕育獨特文化與人情味，呈現以三生共構的世外桃源。"
          speaker.alt = "yilanRegion"
          break;
      case 1:
          picture.src = "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/1901-110-on-the-road-02-1550061057.jpg?crop=1xw:1xh;center,top&resize=980:*";
          intro.textContent = "三星蔥白又長、質地細緻、蔥味香濃，名列『三星四寶』之一，品質更是全台之冠。"
          speaker.alt = "yilan_f1"
          break;
      case 2:
          picture.src = "http://www.sunspring-resort.com.tw/image/tour/1000x500/%E5%A5%87%E9%BA%97%E7%81%A3%E7%8F%8D%E5%A5%B6%E6%96%87%E5%8C%96%E9%A4%A8.jpg";
          intro.textContent = "奇麗灣珍奶文化館是一間以台灣珍珠奶茶為主題的觀光工廠，並且首創「燈泡珍珠奶茶」。"
          speaker.alt = "yilan_f2"
          break;
      case 3:
          picture.src = "https://content.shopback.com/tw/wp-content/uploads/2018/12/11173746/hotspring-park-1-e1544541973517.jpg";
          intro.textContent = "由於地殼有裂隙，地下水滲入後受地熱影響而升高溫度，為天然溫暖的泉水，也稱為「湯泉」、「溫湯」。"
          speaker.alt = "yilan_f3"
          break;
           
  }
}