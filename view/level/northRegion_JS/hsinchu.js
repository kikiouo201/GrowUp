function changeInfor(type) {
  const picture = document.querySelector("#picture");
  const speaker = document.querySelector("#speaker");
  const intro = document.querySelector("#intro");
  document.querySelector(".fullContent").style.display='block'

  switch (type) {
      case 0:
          picture.src= "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/%E5%8D%97%E6%8A%95%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83.png/350px-%E5%8D%97%E6%8A%95%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83.png";
          intro.textContent = "新竹地區，分為新竹縣與新竹市，且新竹客家族群約佔總人口數的85%，其中新竹市又名「風城」，因為九降風特別強盛。"
          speaker.alt = "hsinchuRegion"
          break;
      case 1:
          picture.src = "https://ct.yimg.com/xd/api/res/1.2/KyT.rvoptDb9QVMw6InfmQ--/YXBwaWQ9eXR3YXVjdGlvbnNlcnZpY2U7aD00NjU7cT04NTtyb3RhdGU9YXV0bzt3PTcwMA--/https://s.yimg.com/ob/image/71dfbea5-5960-4d84-a6dc-3f5f64156839.jpg";
          intro.textContent = "貢丸為豬肉製作的種肉丸。新竹的貢丸特別有名。而新竹貢丸的材料必須用新鮮溫體豬肉製作。"
          speaker.alt = "hsinchu_f1"
          break;
      case 2:
          picture.src = "https://images.chinatimes.com/newsphoto/2020-03-21/900/20200321002361.jpg";
          intro.textContent = "簡稱六福村。園內有四大主題村：魔幻神奇的「阿拉伯皇宮」、狂野飆悍的「美國大西部」、熱帶島嶼風情的「南太平洋」以及近距離觀察原始動物的「非洲部落」"
          speaker.alt = "hsinchu_f2"
          break;
      case 3:
          picture.src = "https://images.chinatimes.com/newsphoto/2019-12-23/900/20191223002639.jpg";
          intro.textContent = "是目前臺灣現存最老的動物園，其動物園舊大門入口的洗石子門柱與售票口結合設計，且設有水泥塑大象及蹲獅裝飾。"
          speaker.alt = "hsinchu_f3"
          break;

}
}