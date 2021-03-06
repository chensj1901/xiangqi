﻿var com = com || {};
com.init = function (e) {
    com.nowStype = e || com.getCookie("stype") || "stype1";
    var e = com.stype[com.nowStype];
    com.width = e.width;
    com.height = e.height;
    com.spaceX = e.spaceX;
    com.spaceY = e.spaceY;
    com.pointStartX = e.pointStartX;
    com.pointStartY = e.pointStartY;
    com.page = e.page;
    com.get("box").style.width = com.width;
    com.canvas = document.getElementById("chess");
    com.ct = com.canvas.getContext("2d");
    com.canvas.width = com.width;
    com.canvas.height = com.height;
    com.childList = com.childList || [];
    com.loadImages(com.page)
};
com.stype = {
    stype1: {
        width: 325,
        height: 402,
        spaceX: 35,
        spaceY: 36,
        pointStartX: 5,
        pointStartY: 19,
        page: "stype_1"
    }
};
com.get = function (e) {
    return document.getElementById(e)
};
window.onload = function () {
    com.bg = new com.class.Bg;
    com.dot = new com.class.Dot;
    com.pane = new com.class.Pane;
    com.pane.isShow = false;
    com.childList = [com.bg, com.dot, com.pane];
    com.mans = {};
    com.createMans(com.initMap);
    com.bg.show();
    com.get("bnBox").style.display = "block";
    com.get("superPlay").addEventListener("click", function (e) {
        if (confirm("确认开始大师级对弈？")) {
            play.isPlay = true;
            gameDifficulty = "大师";
            play.depth = 4;
            play.init()
        }
    });
    com.get("normalPlay").addEventListener("click", function (e) {
        if (confirm("确认开始中级对弈？")) {
            play.isPlay = true;
            gameDifficulty = "中级";
            play.depth = 3;
            play.init()
        }
    });
    com.get("tyroPlay").addEventListener("click", function (e) {
        if (confirm("确认开始新手级对弈？")) {
            play.isPlay = true;
            gameDifficulty = "新手";
            play.depth = 2;
            play.init()
        }
    });
    com.getData("js/gambit.all.js", function (e) {
        com.gambit = e.split(" ");
        AI.historyBill = com.gambit
    });
    com.getData("js/store.js", function (e) {
        com.store = e.split(" ")
    });
    document.addEventListener("touchmove", function (e) {
        e.preventDefault()
    })
};
com.loadImages = function (e) {
    com.bgImg = new Image;
    com.bgImg.src = "img/" + e + "/bg.png";
    com.dotImg = new Image;
    com.dotImg.src = "img/" + e + "/dot.png";
    for (var t in com.args) {
        com[t] = {};
        com[t].img = new Image;
        com[t].img.src = "img/" + e + "/" + com.args[t].img + ".png"
    }
    com.paneImg = new Image;
    com.paneImg.src = "img/" + e + "/r_box.png";
    document.getElementsByTagName("body")[0].style.background = "url(img/" + e + "/bg.jpg)"
};
com.show = function () {
    com.ct.clearRect(0, 0, com.width, com.height);
    for (var e = 0; e < com.childList.length; e++) {
        com.childList[e].show()
    }
};
com.showPane = function (e, t, n, r) {
    com.pane.isShow = true;
    com.pane.x = e;
    com.pane.y = t;
    com.pane.newX = n;
    com.pane.newY = r
};
com.createMans = function (e) {
    for (var t = 0; t < e.length; t++) {
        for (var n = 0; n < e[t].length; n++) {
            var r = e[t][n];
            if (r) {
                com.mans[r] = new com.class.Man(r);
                com.mans[r].x = n;
                com.mans[r].y = t;
                com.childList.push(com.mans[r])
            }
        }
    }
};
com.alert = function (e, t, n) {
    if (typeof e !== "object") {
        try {
            console.log(e)
        } catch (r) {
        }
    }
    var i = [];
    for (var s in e)i.push(s + " = " + e[s]);
    try {
        console.log(i.join(n || "\n"))
    } catch (r) {
    }
};
var z = com.alert;
com.getDomXY = function (e) {
    var t = e.offsetLeft;
    var n = e.offsetTop;
    var r = e.offsetParent;
    while (r !== null) {
        t += r.offsetLeft;
        n += r.offsetTop;
        r = r.offsetParent
    }
    return {x: t, y: n}
};
com.getCookie = function (e) {
    if (document.cookie.length > 0) {
        start = document.cookie.indexOf(e + "=");
        if (start != -1) {
            start = start + e.length + 1;
            end = document.cookie.indexOf(";", start);
            if (end == -1)end = document.cookie.length;
            return unescape(document.cookie.substring(start, end))
        }
    }
    return false
};
com.arr2Clone = function (e) {
    var t = [];
    for (var n = 0; n < e.length; n++) {
        t[n] = e[n].slice()
    }
    return t
};
com.getData = function (e, t) {
    var n = false;
    if (window.XMLHttpRequest) {
        n = new XMLHttpRequest
    } else if (window.ActiveXObject) {
        n = new ActiveXObject("Microsoft.XMLHTTP")
    }
    if (n) {
        n.open("GET", e);
        n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        n.onreadystatechange = function () {
            if (n.readyState == 4 && n.status == 200) {
                t(n.responseText)
            }
        };
        n.send(null)
    }
};
com.createMove = function (e, t, n, r, i) {
    var s = "";
    var o = com.mans[e[n][t]];
    s += o.text;
    e[i][r] = e[n][t];
    delete e[n][t];
    if (o.my === 1) {
        var u = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
        r = 8 - r;
        s += u[8 - t];
        if (i > n) {
            s += "退";
            if (o.pater == "m" || o.pater == "s" || o.pater == "x") {
                s += u[r]
            } else {
                s += u[i - n - 1]
            }
        } else if (i < n) {
            s += "进";
            if (o.pater == "m" || o.pater == "s" || o.pater == "x") {
                s += u[r]
            } else {
                s += u[n - i - 1]
            }
        } else {
            s += "平";
            s += u[r]
        }
    } else {
        var u = ["１", "２", "３", "４", "５", "６", "７", "８", "９", "10"];
        s += u[t];
        if (i > n) {
            s += "进";
            if (o.pater == "M" || o.pater == "S" || o.pater == "X") {
                s += u[r]
            } else {
                s += u[i - n - 1]
            }
        } else if (i < n) {
            s += "退";
            if (o.pater == "M" || o.pater == "S" || o.pater == "X") {
                s += u[r]
            } else {
                s += u[n - i - 1]
            }
        } else {
            s += "平";
            s += u[r]
        }
    }
    return s
};
com.initMap = [["C0", "M0", "X0", "S0", "J0", "S1", "X1", "M1", "C1"], [, , , , , , , ,], [, "P0", , , , , , "P1"], ["Z0", , "Z1", , "Z2", , "Z3", , "Z4"], [, , , , , , , ,], [, , , , , , , ,], ["z0", , "z1", , "z2", , "z3", , "z4"], [, "p0", , , , , , "p1"], [, , , , , , , ,], ["c0", "m0", "x0", "s0", "j0", "s1", "x1", "m1", "c1"]];
com.initMap1 = [[, , , , "J0", , , ,], [, , , , , , , ,], [, , , , , "c0", , ,], [, , , , , , , ,], [, , , , , , , ,], [, , , , , , , ,], [, , , , , , , ,], [, , , , , , , ,], [, , , , "s0", , , "C0"], [, , , "s1", , "j0", , ,]];
com.initMap1 = [[, , , , "J0", , , ,], [, , , , , , , ,], [, , , , , "z0", , ,], [, , , , , , , ,], [, , , , , , , ,], [, , , , , , , ,], [, , , , , , , ,], [, , , , , , , ,], [, , , , , , , ,], [, , , "j0", , , ,]];
com.keys = {
    c0: "c",
    c1: "c",
    m0: "m",
    m1: "m",
    x0: "x",
    x1: "x",
    s0: "s",
    s1: "s",
    j0: "j",
    p0: "p",
    p1: "p",
    z0: "z",
    z1: "z",
    z2: "z",
    z3: "z",
    z4: "z",
    z5: "z",
    C0: "c",
    C1: "C",
    M0: "M",
    M1: "M",
    X0: "X",
    X1: "X",
    S0: "S",
    S1: "S",
    J0: "J",
    P0: "P",
    P1: "P",
    Z0: "Z",
    Z1: "Z",
    Z2: "Z",
    Z3: "Z",
    Z4: "Z",
    Z5: "Z"
};
com.bylaw = {};
com.bylaw.c = function (e, t, n, r) {
    var i = [];
    for (var s = e - 1; s >= 0; s--) {
        if (n[t][s]) {
            if (com.mans[n[t][s]].my != r)i.push([s, t]);
            break
        } else {
            i.push([s, t])
        }
    }
    for (var s = e + 1; s <= 8; s++) {
        if (n[t][s]) {
            if (com.mans[n[t][s]].my != r)i.push([s, t]);
            break
        } else {
            i.push([s, t])
        }
    }
    for (var s = t - 1; s >= 0; s--) {
        if (n[s][e]) {
            if (com.mans[n[s][e]].my != r)i.push([e, s]);
            break
        } else {
            i.push([e, s])
        }
    }
    for (var s = t + 1; s <= 9; s++) {
        if (n[s][e]) {
            if (com.mans[n[s][e]].my != r)i.push([e, s]);
            break
        } else {
            i.push([e, s])
        }
    }
    return i
};
com.bylaw.m = function (e, t, n, r) {
    var i = [];
    if (t - 2 >= 0 && e + 1 <= 8 && !play.map[t - 1][e] && (!com.mans[n[t - 2][e + 1]] || com.mans[n[t - 2][e + 1]].my != r))i.push([e + 1, t - 2]);
    if (t - 1 >= 0 && e + 2 <= 8 && !play.map[t][e + 1] && (!com.mans[n[t - 1][e + 2]] || com.mans[n[t - 1][e + 2]].my != r))i.push([e + 2, t - 1]);
    if (t + 1 <= 9 && e + 2 <= 8 && !play.map[t][e + 1] && (!com.mans[n[t + 1][e + 2]] || com.mans[n[t + 1][e + 2]].my != r))i.push([e + 2, t + 1]);
    if (t + 2 <= 9 && e + 1 <= 8 && !play.map[t + 1][e] && (!com.mans[n[t + 2][e + 1]] || com.mans[n[t + 2][e + 1]].my != r))i.push([e + 1, t + 2]);
    if (t + 2 <= 9 && e - 1 >= 0 && !play.map[t + 1][e] && (!com.mans[n[t + 2][e - 1]] || com.mans[n[t + 2][e - 1]].my != r))i.push([e - 1, t + 2]);
    if (t + 1 <= 9 && e - 2 >= 0 && !play.map[t][e - 1] && (!com.mans[n[t + 1][e - 2]] || com.mans[n[t + 1][e - 2]].my != r))i.push([e - 2, t + 1]);
    if (t - 1 >= 0 && e - 2 >= 0 && !play.map[t][e - 1] && (!com.mans[n[t - 1][e - 2]] || com.mans[n[t - 1][e - 2]].my != r))i.push([e - 2, t - 1]);
    if (t - 2 >= 0 && e - 1 >= 0 && !play.map[t - 1][e] && (!com.mans[n[t - 2][e - 1]] || com.mans[n[t - 2][e - 1]].my != r))i.push([e - 1, t - 2]);
    return i
};
com.bylaw.x = function (e, t, n, r) {
    var i = [];
    if (r === 1) {
        if (t + 2 <= 9 && e + 2 <= 8 && !play.map[t + 1][e + 1] && (!com.mans[n[t + 2][e + 2]] || com.mans[n[t + 2][e + 2]].my != r))i.push([e + 2, t + 2]);
        if (t + 2 <= 9 && e - 2 >= 0 && !play.map[t + 1][e - 1] && (!com.mans[n[t + 2][e - 2]] || com.mans[n[t + 2][e - 2]].my != r))i.push([e - 2, t + 2]);
        if (t - 2 >= 5 && e + 2 <= 8 && !play.map[t - 1][e + 1] && (!com.mans[n[t - 2][e + 2]] || com.mans[n[t - 2][e + 2]].my != r))i.push([e + 2, t - 2]);
        if (t - 2 >= 5 && e - 2 >= 0 && !play.map[t - 1][e - 1] && (!com.mans[n[t - 2][e - 2]] || com.mans[n[t - 2][e - 2]].my != r))i.push([e - 2, t - 2])
    } else {
        if (t + 2 <= 4 && e + 2 <= 8 && !play.map[t + 1][e + 1] && (!com.mans[n[t + 2][e + 2]] || com.mans[n[t + 2][e + 2]].my != r))i.push([e + 2, t + 2]);
        if (t + 2 <= 4 && e - 2 >= 0 && !play.map[t + 1][e - 1] && (!com.mans[n[t + 2][e - 2]] || com.mans[n[t + 2][e - 2]].my != r))i.push([e - 2, t + 2]);
        if (t - 2 >= 0 && e + 2 <= 8 && !play.map[t - 1][e + 1] && (!com.mans[n[t - 2][e + 2]] || com.mans[n[t - 2][e + 2]].my != r))i.push([e + 2, t - 2]);
        if (t - 2 >= 0 && e - 2 >= 0 && !play.map[t - 1][e - 1] && (!com.mans[n[t - 2][e - 2]] || com.mans[n[t - 2][e - 2]].my != r))i.push([e - 2, t - 2])
    }
    return i
};
com.bylaw.s = function (e, t, n, r) {
    var i = [];
    if (r === 1) {
        if (t + 1 <= 9 && e + 1 <= 5 && (!com.mans[n[t + 1][e + 1]] || com.mans[n[t + 1][e + 1]].my != r))i.push([e + 1, t + 1]);
        if (t + 1 <= 9 && e - 1 >= 3 && (!com.mans[n[t + 1][e - 1]] || com.mans[n[t + 1][e - 1]].my != r))i.push([e - 1, t + 1]);
        if (t - 1 >= 7 && e + 1 <= 5 && (!com.mans[n[t - 1][e + 1]] || com.mans[n[t - 1][e + 1]].my != r))i.push([e + 1, t - 1]);
        if (t - 1 >= 7 && e - 1 >= 3 && (!com.mans[n[t - 1][e - 1]] || com.mans[n[t - 1][e - 1]].my != r))i.push([e - 1, t - 1])
    } else {
        if (t + 1 <= 2 && e + 1 <= 5 && (!com.mans[n[t + 1][e + 1]] || com.mans[n[t + 1][e + 1]].my != r))i.push([e + 1, t + 1]);
        if (t + 1 <= 2 && e - 1 >= 3 && (!com.mans[n[t + 1][e - 1]] || com.mans[n[t + 1][e - 1]].my != r))i.push([e - 1, t + 1]);
        if (t - 1 >= 0 && e + 1 <= 5 && (!com.mans[n[t - 1][e + 1]] || com.mans[n[t - 1][e + 1]].my != r))i.push([e + 1, t - 1]);
        if (t - 1 >= 0 && e - 1 >= 3 && (!com.mans[n[t - 1][e - 1]] || com.mans[n[t - 1][e - 1]].my != r))i.push([e - 1, t - 1])
    }
    return i
};
com.bylaw.j = function (e, t, n, r) {
    var i = [];
    var s = function (e, t) {
        var e = com.mans["j0"].y;
        var r = com.mans["J0"].x;
        var t = com.mans["J0"].y;
        for (var i = e - 1; i > t; i--) {
            if (n[i][r])return false
        }
        return true
    }();
    if (r === 1) {
        if (t + 1 <= 9 && (!com.mans[n[t + 1][e]] || com.mans[n[t + 1][e]].my != r))i.push([e, t + 1]);
        if (t - 1 >= 7 && (!com.mans[n[t - 1][e]] || com.mans[n[t - 1][e]].my != r))i.push([e, t - 1]);
        if (com.mans["j0"].x == com.mans["J0"].x && s)i.push([com.mans["J0"].x, com.mans["J0"].y])
    } else {
        if (t + 1 <= 2 && (!com.mans[n[t + 1][e]] || com.mans[n[t + 1][e]].my != r))i.push([e, t + 1]);
        if (t - 1 >= 0 && (!com.mans[n[t - 1][e]] || com.mans[n[t - 1][e]].my != r))i.push([e, t - 1]);
        if (com.mans["j0"].x == com.mans["J0"].x && s)i.push([com.mans["j0"].x, com.mans["j0"].y])
    }
    if (e + 1 <= 5 && (!com.mans[n[t][e + 1]] || com.mans[n[t][e + 1]].my != r))i.push([e + 1, t]);
    if (e - 1 >= 3 && (!com.mans[n[t][e - 1]] || com.mans[n[t][e - 1]].my != r))i.push([e - 1, t]);
    return i
};
com.bylaw.p = function (e, t, n, r) {
    var i = [];
    var s = 0;
    for (var o = e - 1; o >= 0; o--) {
        if (n[t][o]) {
            if (s == 0) {
                s++;
                continue
            } else {
                if (com.mans[n[t][o]].my != r)i.push([o, t]);
                break
            }
        } else {
            if (s == 0)i.push([o, t])
        }
    }
    var s = 0;
    for (var o = e + 1; o <= 8; o++) {
        if (n[t][o]) {
            if (s == 0) {
                s++;
                continue
            } else {
                if (com.mans[n[t][o]].my != r)i.push([o, t]);
                break
            }
        } else {
            if (s == 0)i.push([o, t])
        }
    }
    var s = 0;
    for (var o = t - 1; o >= 0; o--) {
        if (n[o][e]) {
            if (s == 0) {
                s++;
                continue
            } else {
                if (com.mans[n[o][e]].my != r)i.push([e, o]);
                break
            }
        } else {
            if (s == 0)i.push([e, o])
        }
    }
    var s = 0;
    for (var o = t + 1; o <= 9; o++) {
        if (n[o][e]) {
            if (s == 0) {
                s++;
                continue
            } else {
                if (com.mans[n[o][e]].my != r)i.push([e, o]);
                break
            }
        } else {
            if (s == 0)i.push([e, o])
        }
    }
    return i
};
com.bylaw.z = function (e, t, n, r) {
    var i = [];
    if (r === 1) {
        if (t - 1 >= 0 && (!com.mans[n[t - 1][e]] || com.mans[n[t - 1][e]].my != r))i.push([e, t - 1]);
        if (e + 1 <= 8 && t <= 4 && (!com.mans[n[t][e + 1]] || com.mans[n[t][e + 1]].my != r))i.push([e + 1, t]);
        if (e - 1 >= 0 && t <= 4 && (!com.mans[n[t][e - 1]] || com.mans[n[t][e - 1]].my != r))i.push([e - 1, t])
    } else {
        if (t + 1 <= 9 && (!com.mans[n[t + 1][e]] || com.mans[n[t + 1][e]].my != r))i.push([e, t + 1]);
        if (e + 1 <= 8 && t >= 6 && (!com.mans[n[t][e + 1]] || com.mans[n[t][e + 1]].my != r))i.push([e + 1, t]);
        if (e - 1 >= 0 && t >= 6 && (!com.mans[n[t][e - 1]] || com.mans[n[t][e - 1]].my != r))i.push([e - 1, t])
    }
    return i
};
com.value = {
    c: [[206, 208, 207, 213, 214, 213, 207, 208, 206], [206, 212, 209, 216, 233, 216, 209, 212, 206], [206, 208, 207, 214, 216, 214, 207, 208, 206], [206, 213, 213, 216, 216, 216, 213, 213, 206], [208, 211, 211, 214, 215, 214, 211, 211, 208], [208, 212, 212, 214, 215, 214, 212, 212, 208], [204, 209, 204, 212, 214, 212, 204, 209, 204], [198, 208, 204, 212, 212, 212, 204, 208, 198], [200, 208, 206, 212, 200, 212, 206, 208, 200], [194, 206, 204, 212, 200, 212, 204, 206, 194]],
    m: [[90, 90, 90, 96, 90, 96, 90, 90, 90], [90, 96, 103, 97, 94, 97, 103, 96, 90], [92, 98, 99, 103, 99, 103, 99, 98, 92], [93, 108, 100, 107, 100, 107, 100, 108, 93], [90, 100, 99, 103, 104, 103, 99, 100, 90], [90, 98, 101, 102, 103, 102, 101, 98, 90], [92, 94, 98, 95, 98, 95, 98, 94, 92], [93, 92, 94, 95, 92, 95, 94, 92, 93], [85, 90, 92, 93, 78, 93, 92, 90, 85], [88, 85, 90, 88, 90, 88, 90, 85, 88]],
    x: [[0, 0, 20, 0, 0, 0, 20, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 23, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 20, 0, 0, 0, 20, 0, 0], [0, 0, 20, 0, 0, 0, 20, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [18, 0, 0, 0, 23, 0, 0, 0, 18], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 20, 0, 0, 0, 20, 0, 0]],
    s: [[0, 0, 0, 20, 0, 20, 0, 0, 0], [0, 0, 0, 0, 23, 0, 0, 0, 0], [0, 0, 0, 20, 0, 20, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 20, 0, 20, 0, 0, 0], [0, 0, 0, 0, 23, 0, 0, 0, 0], [0, 0, 0, 20, 0, 20, 0, 0, 0]],
    j: [[0, 0, 0, 8888, 8888, 8888, 0, 0, 0], [0, 0, 0, 8888, 8888, 8888, 0, 0, 0], [0, 0, 0, 8888, 8888, 8888, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 8888, 8888, 8888, 0, 0, 0], [0, 0, 0, 8888, 8888, 8888, 0, 0, 0], [0, 0, 0, 8888, 8888, 8888, 0, 0, 0]],
    p: [[100, 100, 96, 91, 90, 91, 96, 100, 100], [98, 98, 96, 92, 89, 92, 96, 98, 98], [97, 97, 96, 91, 92, 91, 96, 97, 97], [96, 99, 99, 98, 100, 98, 99, 99, 96], [96, 96, 96, 96, 100, 96, 96, 96, 96], [95, 96, 99, 96, 100, 96, 99, 96, 95], [96, 96, 96, 96, 96, 96, 96, 96, 96], [97, 96, 100, 99, 101, 99, 100, 96, 97], [96, 97, 98, 98, 98, 98, 98, 97, 96], [96, 96, 97, 99, 99, 99, 97, 96, 96]],
    z: [[9, 9, 9, 11, 13, 11, 9, 9, 9], [19, 24, 34, 42, 44, 42, 34, 24, 19], [19, 24, 32, 37, 37, 37, 32, 24, 19], [19, 23, 27, 29, 30, 29, 27, 23, 19], [14, 18, 20, 27, 29, 27, 20, 18, 14], [7, 0, 13, 0, 16, 0, 13, 0, 7], [7, 0, 7, 0, 15, 0, 7, 0, 7], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]]
};
com.value.C = com.arr2Clone(com.value.c).reverse();
com.value.M = com.arr2Clone(com.value.m).reverse();
com.value.X = com.value.x;
com.value.S = com.value.s;
com.value.J = com.value.j;
com.value.P = com.arr2Clone(com.value.p).reverse();
com.value.Z = com.arr2Clone(com.value.z).reverse();
com.args = {
    c: {text: "车", img: "r_c", my: 1, bl: "c", value: com.value.c},
    m: {text: "马", img: "r_m", my: 1, bl: "m", value: com.value.m},
    x: {text: "相", img: "r_x", my: 1, bl: "x", value: com.value.x},
    s: {text: "仕", img: "r_s", my: 1, bl: "s", value: com.value.s},
    j: {text: "将", img: "r_j", my: 1, bl: "j", value: com.value.j},
    p: {text: "炮", img: "r_p", my: 1, bl: "p", value: com.value.p},
    z: {text: "兵", img: "r_z", my: 1, bl: "z", value: com.value.z},
    C: {text: "車", img: "b_c", my: -1, bl: "c", value: com.value.C},
    M: {text: "馬", img: "b_m", my: -1, bl: "m", value: com.value.M},
    X: {text: "象", img: "b_x", my: -1, bl: "x", value: com.value.X},
    S: {text: "士", img: "b_s", my: -1, bl: "s", value: com.value.S},
    J: {text: "帅", img: "b_j", my: -1, bl: "j", value: com.value.J},
    P: {text: "炮", img: "b_p", my: -1, bl: "p", value: com.value.P},
    Z: {text: "卒", img: "b_z", my: -1, bl: "z", value: com.value.Z}
};
com.class = com.class || {};
com.class.Man = function (e, t, n) {
    this.pater = e.slice(0, 1);
    var r = com.args[this.pater];
    this.x = t || 0;
    this.y = n || 0;
    this.key = e;
    this.my = r.my;
    this.text = r.text;
    this.value = r.value;
    this.isShow = true;
    this.alpha = 1;
    this.ps = [];
    this.show = function () {
        if (this.isShow) {
            com.ct.save();
            com.ct.globalAlpha = this.alpha;
            com.ct.drawImage(com[this.pater].img, com.spaceX * this.x + com.pointStartX, com.spaceY * this.y + com.pointStartY);
            com.ct.restore()
        }
    };
    this.bl = function (e) {
        var e = e || play.map;
        return com.bylaw[r.bl](this.x, this.y, e, this.my)
    }
};
com.class.Bg = function (e, t, n) {
    this.x = t || 0;
    this.y = n || 0;
    this.isShow = true;
    this.show = function () {
        if (this.isShow)com.ct.drawImage(com.bgImg, com.spaceX * this.x, com.spaceY * this.y)
    }
};
com.class.Pane = function (e, t, n) {
    this.x = t || 0;
    this.y = n || 0;
    this.newX = t || 0;
    this.newY = n || 0;
    this.isShow = true;
    this.show = function () {
        if (this.isShow) {
            com.ct.drawImage(com.paneImg, com.spaceX * this.x + com.pointStartX, com.spaceY * this.y + com.pointStartY);
            com.ct.drawImage(com.paneImg, com.spaceX * this.newX + com.pointStartX, com.spaceY * this.newY + com.pointStartY)
        }
    }
};
com.class.Dot = function (e, t, n) {
    this.x = t || 0;
    this.y = n || 0;
    this.isShow = true;
    this.dots = [];
    this.show = function () {
        for (var e = 0; e < this.dots.length; e++) {
            if (this.isShow)com.ct.drawImage(com.dotImg, com.spaceX * this.dots[e][0] + 10 + com.pointStartX, com.spaceY * this.dots[e][1] + 10 + com.pointStartY)
        }
    }
};
com.init();
var play = play || {};
play.init = function () {
    play.my = 1;
    play.map = com.arr2Clone(com.initMap);
    play.nowManKey = false;
    play.pace = [];
    play.isPlay = true;
    play.mans = com.mans;
    play.bylaw = com.bylaw;
    play.show = com.show;
    play.showPane = com.showPane;
    play.isOffensive = true;
    play.depth = play.depth || 3;
    play.isFoul = false;
    com.pane.isShow = false;
    for (var e = 0; e < play.map.length; e++) {
        for (var t = 0; t < play.map[e].length; t++) {
            var n = play.map[e][t];
            if (n) {
                com.mans[n].x = t;
                com.mans[n].y = e;
                com.mans[n].isShow = true
            }
        }
    }
    play.show();
    com.canvas.addEventListener("click", play.clickCanvas);
    com.get("regretBn").addEventListener("click", function (e) {
        play.regret()
    })
};
play.regret = function () {
    var e = com.arr2Clone(com.initMap);
    for (var t = 0; t < e.length; t++) {
        for (var n = 0; n < e[t].length; n++) {
            var r = e[t][n];
            if (r) {
                com.mans[r].x = n;
                com.mans[r].y = t;
                com.mans[r].isShow = true
            }
        }
    }
    var i = play.pace;
    i.pop();
    i.pop();
    for (var t = 0; t < i.length; t++) {
        var s = i[t].split("");
        var o = parseInt(s[0], 10);
        var u = parseInt(s[1], 10);
        var a = parseInt(s[2], 10);
        var f = parseInt(s[3], 10);
        var r = e[u][o];
        var l = e[f][a];
        if (l)com.mans[e[f][a]].isShow = false;
        com.mans[r].x = a;
        com.mans[r].y = f;
        e[f][a] = r;
        delete e[u][o];
        if (t == i.length - 1) {
            com.showPane(a, f, o, u)
        }
    }
    play.map = e;
    play.my = 1;
    play.isPlay = true;
    com.show()
};
play.clickCanvas = function (e) {
    if (!play.isPlay)return false;
    var t = play.getClickMan(e);
    var n = play.getClickPoint(e);
    var r = n.x;
    var i = n.y;
    if (t) {
        play.clickMan(t, r, i)
    } else {
        play.clickPoint(r, i)
    }
    play.isFoul = play.checkFoul()
};
play.clickMan = function (e, t, n) {
    var r = com.mans[e];
    if (play.nowManKey && play.nowManKey != e && r.my != com.mans[play.nowManKey].my) {
        if (play.indexOfPs(com.mans[play.nowManKey].ps, [t, n])) {
            r.isShow = false;
            var i = com.mans[play.nowManKey].x + "" + com.mans[play.nowManKey].y;
            delete play.map[com.mans[play.nowManKey].y][com.mans[play.nowManKey].x];
            play.map[n][t] = play.nowManKey;
            com.showPane(com.mans[play.nowManKey].x, com.mans[play.nowManKey].y, t, n);
            com.mans[play.nowManKey].x = t;
            com.mans[play.nowManKey].y = n;
            com.mans[play.nowManKey].alpha = 1;
            play.pace.push(i + t + n);
            play.nowManKey = false;
            com.pane.isShow = false;
            com.dot.dots = [];
            com.show();
            setTimeout("play.AIPlay()", 500);
            if (e == "j0")play.showWin(-1);
            if (e == "J0")play.showWin(1)
        }
    } else {
        if (r.my === 1) {
            if (com.mans[play.nowManKey])com.mans[play.nowManKey].alpha = 1;
            r.alpha = .6;
            com.pane.isShow = false;
            play.nowManKey = e;
            com.mans[e].ps = com.mans[e].bl();
            com.dot.dots = com.mans[e].ps;
            com.show()
        }
    }
};
play.clickPoint = function (e, t) {
    var n = play.nowManKey;
    var r = com.mans[n];
    if (play.nowManKey) {
        if (play.indexOfPs(com.mans[n].ps, [e, t])) {
            var i = r.x + "" + r.y;
            delete play.map[r.y][r.x];
            play.map[t][e] = n;
            com.showPane(r.x, r.y, e, t);
            r.x = e;
            r.y = t;
            r.alpha = 1;
            play.pace.push(i + e + t);
            play.nowManKey = false;
            com.dot.dots = [];
            com.show();
            setTimeout("play.AIPlay()", 500)
        } else {
        }
    }
};
play.AIPlay = function () {
    play.my = -1;
    var e = AI.init(play.pace.join(""));
    if (!e) {
        play.showWin(1);
        return
    }
    play.pace.push(e.join(""));
    var t = play.map[e[1]][e[0]];
    play.nowManKey = t;
    var t = play.map[e[3]][e[2]];
    if (t) {
        play.AIclickMan(t, e[2], e[3])
    } else {
        play.AIclickPoint(e[2], e[3])
    }
};
play.checkFoul = function () {
    var e = play.pace;
    var t = parseInt(e.length, 10);
    if (t > 11 && e[t - 1] == e[t - 5] && e[t - 5] == e[t - 9]) {
        return e[t - 4].split("")
    }
    return false
};
play.AIclickMan = function (e, t, n) {
    var r = com.mans[e];
    r.isShow = false;
    delete play.map[com.mans[play.nowManKey].y][com.mans[play.nowManKey].x];
    play.map[n][t] = play.nowManKey;
    play.showPane(com.mans[play.nowManKey].x, com.mans[play.nowManKey].y, t, n);
    com.mans[play.nowManKey].x = t;
    com.mans[play.nowManKey].y = n;
    play.nowManKey = false;
    com.show();
    if (e == "j0")play.showWin(-1);
    if (e == "J0")play.showWin(1)
};
play.AIclickPoint = function (e, t) {
    var n = play.nowManKey;
    var r = com.mans[n];
    if (play.nowManKey) {
        delete play.map[com.mans[play.nowManKey].y][com.mans[play.nowManKey].x];
        play.map[t][e] = n;
        com.showPane(r.x, r.y, e, t);
        r.x = e;
        r.y = t;
        play.nowManKey = false
    }
    com.show()
};
play.indexOfPs = function (e, t) {
    for (var n = 0; n < e.length; n++) {
        if (e[n][0] == t[0] && e[n][1] == t[1])return true
    }
    return false
};
play.getClickPoint = function (e) {
    var t = com.getDomXY(com.canvas);
    var n = Math.round((e.pageX - t.x - com.pointStartX - 20) / com.spaceX);
    var r = Math.round((e.pageY - t.y - com.pointStartY - 20) / com.spaceY);
    return {x: n, y: r}
};
play.getClickMan = function (e) {
    var t = play.getClickPoint(e);
    var n = t.x;
    var r = t.y;
    if (n < 0 || n > 8 || r < 0 || r > 9)return false;
    return play.map[r][n] && play.map[r][n] != "0" ? play.map[r][n] : false
};
play.showWin = function (e) {
    play.isPlay = false;
    if (e === 1) {
        alert("恭喜你，你赢了！");
        play68_submitScore(2)
    } else {
        alert("很遗憾，你输了！");
        play68_submitScore(1)
    }
};
var AI = AI || {};
AI.historyTable = {};
AI.init = function (e) {
    var t = AI.historyBill || com.gambit;
    if (t.length) {
        var n = e.length;
        var r = [];
        for (var i = 0; i < t.length; i++) {
            if (t[i].slice(0, n) == e) {
                r.push(t[i])
            }
        }
        if (r.length) {
            var s = Math.floor(Math.random() * r.length);
            AI.historyBill = r;
            return r[s].slice(n, n + 4).split("")
        } else {
            AI.historyBill = []
        }
    }
    var o = (new Date).getTime();
    AI.treeDepth = play.depth;
    AI.number = 0;
    AI.setHistoryTable.lenght = 0;
    var u = AI.getAlphaBeta(-99999, 99999, AI.treeDepth, com.arr2Clone(play.map), play.my);
    if (!u || u.value == -8888) {
        AI.treeDepth = 2;
        u = AI.getAlphaBeta(-99999, 99999, AI.treeDepth, com.arr2Clone(play.map), play.my)
    }
    if (u && u.value != -8888) {
        var a = play.mans[u.key];
        var f = (new Date).getTime();
        return [a.x, a.y, u.x, u.y]
    } else {
        return false
    }
};
AI.iterativeSearch = function (e, t) {
    var n = 100;
    var r = 1;
    var i = 8;
    AI.treeDepth = 0;
    var s = (new Date).getTime();
    var o = {};
    for (var u = r; u <= i; u++) {
        var a = (new Date).getTime();
        AI.treeDepth = u;
        AI.aotuDepth = u;
        var o = AI.getAlphaBeta(-99999, 99999, AI.treeDepth, e, t);
        if (a - s > n) {
            return o
        }
    }
    return false
};
AI.getMapAllMan = function (e, t) {
    var n = [];
    for (var r = 0; r < e.length; r++) {
        for (var i = 0; i < e[r].length; i++) {
            var s = e[r][i];
            if (s && play.mans[s].my == t) {
                play.mans[s].x = i;
                play.mans[s].y = r;
                n.push(play.mans[s])
            }
        }
    }
    return n
};
AI.getMoves = function (e, t) {
    var n = AI.getMapAllMan(e, t);
    var r = [];
    var i = play.isFoul;
    for (var s = 0; s < n.length; s++) {
        var o = n[s];
        var u = o.bl(e);
        for (var a = 0; a < u.length; a++) {
            var f = o.x;
            var l = o.y;
            var c = u[a][0];
            var h = u[a][1];
            if (i[0] != f || i[1] != l || i[2] != c || i[3] != h) {
                r.push([f, l, c, h, o.key])
            }
        }
    }
    return r
};
AI.getAlphaBeta = function (e, t, n, r, i) {
    if (n == 0) {
        return {value: AI.evaluate(r, i)}
    }
    var s = AI.getMoves(r, i);
    for (var o = 0; o < s.length; o++) {
        var u = s[o];
        var a = u[4];
        var f = u[0];
        var l = u[1];
        var c = u[2];
        var h = u[3];
        var p = r[h][c] || "";
        r[h][c] = a;
        delete r[l][f];
        play.mans[a].x = c;
        play.mans[a].y = h;
        if (p == "j0" || p == "J0") {
            play.mans[a].x = f;
            play.mans[a].y = l;
            r[l][f] = a;
            delete r[h][c];
            if (p) {
                r[h][c] = p
            }
            return {key: a, x: c, y: h, value: 8888}
        } else {
            var d = -AI.getAlphaBeta(-t, -e, n - 1, r, -i).value;
            play.mans[a].x = f;
            play.mans[a].y = l;
            r[l][f] = a;
            delete r[h][c];
            if (p) {
                r[h][c] = p
            }
            if (d >= t) {
                return {key: a, x: c, y: h, value: t}
            }
            if (d > e) {
                e = d;
                if (AI.treeDepth == n)var v = {key: a, x: c, y: h, value: e}
            }
        }
    }
    if (AI.treeDepth == n) {
        if (!v) {
            return false
        } else {
            return v
        }
    }
    return {key: a, x: c, y: h, value: e}
};
AI.setHistoryTable = function (e, t, n, r) {
    AI.setHistoryTable.lenght++;
    AI.historyTable[e] = {depth: t, value: n}
};
AI.evaluate = function (e, t) {
    var n = 0;
    for (var r = 0; r < e.length; r++) {
        for (var i = 0; i < e[r].length; i++) {
            var s = e[r][i];
            if (s) {
                n += play.mans[s].value[r][i] * play.mans[s].my
            }
        }
    }
    AI.number++;
    return n * t
};
AI.evaluate1 = function (e, t) {
    var n = 0;
    for (var r in play.mans) {
        var i = play.mans[r];
        if (i.isShow) {
            n += i.value[i.y][i.x] * i.my
        }
    }
    AI.number++;
    return n * t
};
var bill = bill || {};
bill.init = function () {
    if (com.store) {
        clearInterval(bill.timer);
        bill.setBillList(com.arr2Clone(com.initMap));
        play.isPlay = false;
        com.show()
    } else {
        bill.timer = setInterval("bill.init()", 300)
    }
};
bill.setBillList = function (e) {
    var t = com.get("billList");
    for (var n = 0; n < com.store.length; n++) {
        var r = document.createElement("option");
        r.text = "棋谱" + (n + 1);
        r.value = n;
        t.add(r, null)
    }
    t.addEventListener("change", function (t) {
        bill.setBox(com.store[this.value], e)
    });
    bill.setBox(com.store[0], e)
};
bill.setMove = function (e, t, n) {
    var n = com.arr2Clone(n);
    for (var r = 0; r < n.length; r++) {
        for (var i = 0; i < n[r].length; i++) {
            var s = n[r][i];
            if (s) {
                com.mans[s].x = i;
                com.mans[s].y = r;
                com.mans[s].isShow = true
            }
        }
    }
    for (var r = 0; r <= t; r++) {
        var i = r * 4;
        var o = e[i + 1];
        var u = e[i + 2];
        var a = e[i + 0];
        var f = e[i + 3];
        if (com.mans[n[f][u]]) {
            com.mans[n[f][u]].isShow = false
        }
        com.mans[n[o][a]].x = u;
        com.mans[n[o][a]].y = f;
        if (r == t) {
            com.showPane(a, o, u, f)
        }
        n[f][u] = n[o][a];
        delete n[o][a]
    }
    return n
};
bill.setBox = function (e, t) {
    var n = com.arr2Clone(t);
    var e = e.split("");
    var r = "";
    for (var i = 0; i < e.length; i += 4) {
        r += '<li id="move_' + i / 4 + '">';
        var s = e[i + 0];
        var o = e[i + 1];
        var u = e[i + 2];
        var a = e[i + 3];
        r += com.createMove(n, s, o, u, a);
        r += "</li>\n\r"
    }
    com.get("billBox").innerHTML = r;
    var f = com.get("billBox").getElementsByTagName("li");
    for (var i = 0; i < f.length; i++) {
        f[i].addEventListener("click", function (n) {
            var r = this.getAttribute("id").split("_")[1];
            bill.setMove(e, r, t);
            com.show()
        })
    }
}