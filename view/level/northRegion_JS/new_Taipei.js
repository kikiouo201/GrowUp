function changeInfor(type) {
    const picture = document.querySelector("#picture");
    const speaker = document.querySelector("#speaker");
    const intro = document.querySelector("#intro");
    document.querySelector(".fullContent").style.display = 'block'

    switch (type) {
        case 0:
            picture.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/New_Taipei_map.png/500px-New_Taipei_map.png";
            intro.textContent = "位於臺灣西北部，為六都之一，前身為「臺北縣」，是全臺人口最多的市。全境環繞臺北市。"
            speaker.alt = "newTaipeiRegion"
            break;
        case 1:
            picture.src = "https://www.travel.taipei/image/1130/1024x768";
            intro.textContent = "是新北市鶯歌區最著名的特產。相傳清朝嘉慶年間發現鄰近的尖山地區很多黏土，於是就設窯製陶。現在多轉向觀光化發展。"
            speaker.alt = "newTaipei_f1"
            break;
        case 2:
            picture.src = "https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2018/12/12/6/5652537.jpg&x=0&y=0&sw=0&sh=0&sl=W&fw=1050";
            intro.textContent = "是野柳地質公園的一個知名的風化地形景觀，外型宛如一個凝視遠方的女王，其頸部修長、臉部線條優美。"
            speaker.alt = "newTaipei_f2"
            break;
        case 3:
            picture.src = "https://www.tour-ntpc.com/cdn/site/a3be84a9-7283-40a3-b4c7-758bf39c7828/Content/Upload/Place/9c57d594-8ba5-4260-b2c3-77ae7de49ff1.jpg";
            intro.textContent = "是流水從地下流進，滲入礦區後，與礦物接觸，經過化學作用使瀑布水呈現金黃偏橘色的，從遠方看就像一幅巨型的黃金岩壁。"
            speaker.alt = "newTaipei_f3"
            break;
        case 4:
            picture.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Christmasland_in_NTPC_2019.jpg/375px-Christmasland_in_NTPC_2019.jpg";
            intro.textContent = "是新北市新板特區商圈的一系列耶誕節活動的總稱，並推出耶誕主燈秀，年年結合最新的科技和音樂，每年都有創新和驚喜。"
            speaker.alt = "newTaipei_f4"
            break;
        case 5:
            picture.src = "https://tour.ntpc.gov.tw/Content/Upload/Place/22213ac2-7965-4afb-b377-137fe919e300.jpg";
            intro.textContent = "又稱烏來蹦蹦車，目前保留下來的長度約1.5公里，是台灣少數仍留存的輕便鐵路（臺車）之一。"
            speaker.alt = "newTaipei_f5"
            break;
    }
}