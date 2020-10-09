function changeInfor(type) {
    const picture = document.querySelector("#picture");
    const speaker = document.querySelector("#speaker");
    const intro = document.querySelector("#intro");
    document.querySelector(".fullContent").style.display='block'
  
    switch (type) {
        case 0:
            picture.src= "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/%E5%8D%97%E6%8A%95%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83.png/350px-%E5%8D%97%E6%8A%95%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83.png";
            intro.textContent = "土地肥沃，物產豐饒，有「臺灣穀倉」之稱。早年鹿港發展成為中部地區最具發展潛力的城鎮。"
            speaker.alt = "changhuaRegion"
            break;
        case 1:
            picture.src = "https://tourism.chcg.gov.tw/upload/27/2017081612043794500.jpg";
            intro.textContent = "八卦山位於彰化市東方邊的山。交通部觀光局將獅頭山、梨山、八卦山 3 個風景區合併為「參山國家風景區」。"
            speaker.alt = "changhua_f1"
            break;
        case 2:
            picture.src = "https://leafyeh.com/wp-content/uploads/flickr/48250627257_98f549c20e_o.jpg";
            intro.textContent = "這些發電機位於臺灣彰化縣芳苑鄉。通過環評審查，運轉後將可為台灣280萬個家庭供電。"
            speaker.alt = "changhua_f2"
            break;
       
  }
}