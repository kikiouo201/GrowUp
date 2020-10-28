function changeInfor(type) {
    const picture = document.querySelector("#picture");
    const speaker = document.querySelector("#speaker");
    const intro = document.querySelector("#intro");
    document.querySelector(".fullContent").style.display = 'block'

    switch (type) {
        case 0:
            picture.src = "https://house.netete.com/images/hualienmap.jpg";
            intro.textContent = "位於臺灣本島東部。是臺灣面積最大的縣級行政區。花蓮地區是台灣原住民最多的區域，其中以第一大族阿美族分布最廣。"
            speaker.alt = "taitungRegion"
            title.textContent = "花蓮地區";
            title.style.left = "33%"
            title.style.width = "220px"
            break;
        case 1:
            picture.src = "https://www.ner.gov.tw/api/images/5affbec7581023000596746f/2400/jpeg";
            intro.textContent = "栽種品種主要為「華寶西瓜」，產量是全台第一，且富含養分，讓西瓜的口感「沙甜」且「清脆」!"
            speaker.alt = "taitung_f1"
            title.textContent = "花蓮大西瓜";
            title.style.left = "33%"
            title.style.width = "220px"
            break;
        case 2:
            picture.src = "https://s.yimg.com/zp/MerchandiseSpec/99DE9C85C0-SP-6215750.jpg";
            intro.textContent = "俗稱花蓮海洋公園。是臺灣第一座以海洋為主題，結合了自然公園與休閒飯店的主題樂園。"
            speaker.alt = "taitung_f2"
            title.textContent = "遠雄海洋公園";
            title.style.left = "33%"
            title.style.width = "220px"
            break;
        case 3:
            picture.src = "https://www.erv-nsa.gov.tw/image/10343/1024x768";
            intro.textContent = "是一座開放式的休閒牧場，能看見成群的乳牛或鴕鳥悠閒漫步在草地上。以放牧乳牛、生產各式鮮奶產品而聞名。"
            speaker.alt = "taitung_f3"
            title.textContent = "瑞穗牧場";
            title.style.left = "33%"
            title.style.width = "220px"
            break;

    }
}