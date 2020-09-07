var times = 0;
var src = Array();
src.push("../../image/puzzle/dog_01.jpg");
src.push("../../image/puzzle/dog_02.jpg");
src.push("../../image/puzzle/dog_03.jpg");
src.push("../../image/puzzle/dog_04.jpg");
src.push("../../image/puzzle/output.png");
src.push("../../image/puzzle/dog_06.jpg");
src.push("../../image/puzzle/dog_07.jpg");
src.push("../../image/puzzle/dog_08.jpg");
src.push("../../image/puzzle/dog_09.jpg");


function addLoadEvent(func) {

    //为window添加新事件函数
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        };
    }
}

function getInfor() {
    var ps = document.getElementById("box");
    var Arrps = ps.getElementsByTagName("img");

    for (var i = 0; i < Arrps.length; i++) {
        Arrps[i].onclick = function () {
            if (this.getAttribute("src") == "../../image/puzzle/output.png");
            changeP(this, Arrps);
        };
    }
}


function tostar() {
    var butt = document.getElementById("button");
    butt.onclick = function () {
        toST();
        times = 0;
        getInfor();
    };
}


function changeP(ob, Arrps) {
    var Ni = 0;
    var Nj = 0;
    for (var i = 0; i < Arrps.length; i++) {
        if (Arrps[i] == ob)
            Ni = i;
        if (Arrps[i].getAttribute("src") == "../../image/puzzle/output.png")
            Nj = i;
    }

    if (Math.abs(Ni - Nj) == 3) {
        var temperOb = ob.getAttribute("src");
        ob.setAttribute("src", "../../image/puzzle/output.png");
        Arrps[Nj].setAttribute("src", temperOb);
        times++;
        ifright();

    } else if ((Ni - Nj) == 1 && (Ni % 3) != 0) {
        var temperOb = ob.getAttribute("src");
        ob.setAttribute("src", "../../image/puzzle/output.png");
        Arrps[Nj].setAttribute("src", temperOb);
        times++;
        ifright();

    } else if ((Ni - Nj) == -1 && (Ni % 3) != 2) {
        var temperOb = ob.getAttribute("src");
        ob.setAttribute("src", "../../image/puzzle/output.png");
        Arrps[Nj].setAttribute("src", temperOb);
        times++;
        ifright();
    }



}

function ifright() {

    var ps = document.getElementById("box");
    var Arrps = ps.getElementsByTagName("img");
    for (var i = 0; i < src.length; i++) {
        if (src[i] != Arrps[i].getAttribute("src")) return;
    }

    if (times < 50)

        alert("恭喜，你成功了。。" + "\n" + "仅用了" + times + "步哦");
    else alert("恭喜，你成功了。。" + "\n" + "用了" + times + "步");
}

function toST() {

    var srcUsing = new Array();
    for (var p = 0; p < src.length; p++) {
        srcUsing[p] = src[p];
    }
    var ps = document.getElementById("box");
    var Arrps = ps.getElementsByTagName("img");


    var newArry = new Array();
    for (var i = 0; i < Arrps.length; i++) {
        newArry.push(srcUsing.splice(Math.floor(Math.random() * srcUsing.length), 1));
    }


    for (var j = 0; j < newArry.length; j++) {


        //var newarrValue=newArry[j];
        Arrps[j].setAttribute("src", String(newArry[j]));

    }

}

addLoadEvent(tostar);