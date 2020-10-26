function changeInfor(type) {
    const picture = document.querySelector("#picture");
    const speaker = document.querySelector("#speaker");
    const intro = document.querySelector("#intro");
    const title = document.querySelector('#title');
    document.querySelector(".fullContent").style.display = 'block'

    switch (type) {
        case 0:
            picture.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/%E5%8F%B0%E4%B8%AD%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83.png/450px-%E5%8F%B0%E4%B8%AD%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83.png";
            intro.textContent = "位於臺灣中部，為六都之一，四季氣候宜人，是縱貫鐵路的中點，也是中部交通樞紐及教育、文化中心。"
            speaker.alt = "taichungRegion"
            title.textContent = "台中地區";
            title.style.left = "33%"
            title.style.width = "220px"
            break;
        case 1:
            picture.src = "http://www.ifhouse.com.tw/upload_file/ifhouse/901/15299979011.jpg";
            intro.textContent = "為一種點心。以麵粉與糖製成的圓形鬆脆餅。是臺中市的名產。"
            speaker.alt = "taichung_f1"
            title.textContent = "太陽餅";
            title.style.left = "33%"
            title.style.width = "220px"
            break;
        case 2:
            picture.src = "https://www.taiwan.net.tw/pic.ashx?qp=1/big_scenic_spots/pic_9547_18.jpg&sizetype=3";
            intro.textContent = "是親近雪霸國家公園的重要遊憩據點，農場內阡陌縱橫，種植高山蔬果與茶葉，四季風情皆不同。"
            speaker.alt = "taichung_f2"
            title.textContent = "武陵農場";
            title.style.left = "33%"
            title.style.width = "220px"
            break;
        case 3:
            picture.src = "https://travel.taichung.gov.tw/Utility/DisplayImage?id=24379";
            intro.textContent = "為日本建築師伊東豊雄設計，以「美聲涵洞」為概念，採用曲牆、孔洞與管狀等等設計，建構一棟沒有樑柱支撐。"
            speaker.alt = "taichung_f3"
            title.textContent = "臺中國家歌劇院";
            title.style.left = "23.5%"
            title.style.width = "330px"
            break;

    }
}