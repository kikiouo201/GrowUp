function changeInfor(type) {
    const picture = document.querySelector("#picture");
    const speaker = document.querySelector("#speaker");
    const intro = document.querySelector("#intro");
    document.querySelector(".fullContent").style.display='block'
  
    switch (type) {
        case 0:
            picture.src= "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/%E5%8D%97%E6%8A%95%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83.png/350px-%E5%8D%97%E6%8A%95%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83.png";
            intro.textContent = "六都之一，是臺灣西半部的樞紐，四季氣候宜人。日治時期，臺中遂躍身為中臺灣政治、經濟、交通、文化的重鎮。"
            speaker.alt = "taichungRegion"
            break;
        case 1:
            picture.src = "http://www.ifhouse.com.tw/upload_file/ifhouse/901/15299979011.jpg";
            intro.textContent = "一種甜餡薄餅，通常內餡是麥芽糖，中臺灣的名產之一。"
            speaker.alt = "taichung_f1"
            break;
        case 2:
            picture.src = "https://www.taiwan.net.tw/pic.ashx?qp=1/big_scenic_spots/pic_9547_18.jpg&sizetype=3";
            intro.textContent = "武陵農場位於臺中市北橫宜蘭支線。農場內阡陌縱橫，種植高山蔬果與茶葉，四季風情不同。"
            speaker.alt = "taichung_f2"
            break;
        case 3:
            picture.src = "https://travel.taichung.gov.tw/Utility/DisplayImage?id=24379";
            intro.textContent = "日本建築師伊東豊雄設計，以「美聲涵洞」為概念，採用曲牆、孔洞與管狀等等設計，建構一棟沒有樑柱支撐。"
            speaker.alt = "taichung_f3"
            break;
       
  }
}