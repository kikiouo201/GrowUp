function changeInfor(type) {
  const picture = document.querySelector("#picture");
  const speaker = document.querySelector("#speaker");
  const intro = document.querySelector("#intro");
  document.querySelector(".fullContent").style.display='block'

  switch (type) {
      case 0:
          picture.src= "https://care-old.org/keelung/wp-content/uploads/2018/05/%E5%9F%BA%E9%9A%86.png";
          intro.textContent = "桃園地區擁有多元的文化，加上北橫豐富的山水景觀，具有「千塘之鄉」的美名，成就桃園為觀光大市。"
          speaker.alt = "taoyuanRegion"
          break;
      case 1:
          picture.src = "https://pic.pimg.tw/linpapahu2012/1435070271-421504407_n.jpg";
          intro.textContent = "大溪豆乾是桃園市大溪區知名的地方特產。特色是黑豆干，外皮厚而黑，整體口感比白豆乾更加硬實，味道也更加重。"
          speaker.alt = "taoyuan_f1"
          break;
      case 2:
          picture.src = "https://attach.setn.com/newsimages/2020/06/30/2635413-XXL.jpg";
          intro.textContent = "X park水族館是台灣與日本耗時5年規劃打造，是台灣第一座新都會型的水生公園，顛覆傳統水族館樣貌。"
          speaker.alt = "taoyuan_f2"
          break;
      case 3:
          picture.src = "https://www.taoyuanairport.com.tw/assets/images/kv2.jpg";
          intro.textContent = "桃園國際機場，起初命名為「中正國際機場」，到2006年才改為桃園國際機場。是台灣最大的國際機場。"
          speaker.alt = "taoyuan_f3"
          break;
           
  }
}