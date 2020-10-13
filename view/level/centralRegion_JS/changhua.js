function changeInfor(type) {
    const picture = document.querySelector("#picture");
    const speaker = document.querySelector("#speaker");
    const intro = document.querySelector("#intro");
    document.querySelector(".fullContent").style.display='block'
  
    switch (type) {
        case 0:
            picture.src= "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/%E5%BD%B0%E5%8C%96%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83.png/350px-%E5%BD%B0%E5%8C%96%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83.png";
            intro.textContent = "位於臺灣西部，古稱半線。土地肥沃，物產豐饒，有「臺灣穀倉」之稱。早年鹿港發展成為中部地區最具發展潛力的城鎮。"
            speaker.alt = "changhuaRegion"
            break;
        case 1:
            picture.src = "https://imageproxy.icook.network/resize?height=600&nocrop=false&stripmeta=true&type=auto&url=http%3A%2F%2Ftokyo-kitchen.icook.tw.s3.amazonaws.com%2Fuploads%2Frecipe%2Fcover%2F193513%2F4f4604bd32819a5a.jpg&width=800";
            intro.textContent = "彰化特色小吃。彰化以北多用油炸油泡、彰化以南多為炊蒸。而彰化肉圓還有將它製成涼式的吃法，將蒸好的肉圓放冷後，再放到冰涼的湯水內，夏天吃極為清爽。"
            speaker.alt = "changhua_f1"
            break;
        case 2:
            picture.src = "https://tourism.chcg.gov.tw/upload/27/2017081612043794500.jpg";
            intro.textContent = "有釋迦牟尼大佛像一尊。登臨其上，可俯瞰彰化市及鄰近農區，是彰化有名的風景區。"
            speaker.alt = "changhua_f2"
            break;
        case 3:
            picture.src = "https://leafyeh.com/wp-content/uploads/flickr/48250627257_98f549c20e_o.jpg";
            intro.textContent = "有著外星人的秘密基地與外星人打蛋器之稱，主要是蓄電用的風車，形狀為三葉式造型，是目前全世界唯一獲得認證的垂直軸小風。"
            speaker.alt = "changhua_f3"
            break;
       
  }
}