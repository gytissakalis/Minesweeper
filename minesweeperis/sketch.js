var tinklas;
var stulp;
var eil;
var skaicius = 0;
var win = 0;
var w = 40;
var lang = 40;
var minas = 0.01;
var maxas = 0.1;


function setup() {
    createCanvas((w*10+1), (w*10+1));
    stulp = floor(width / lang);
    eil = floor(height / lang);
    tinklas = lenta(stulp, eil);

    for (var i = 0; i < stulp; i++) {
        for (var g = 0; g < eil; g++) {
            tinklas[i][g] = new Langelis(i, g, lang);
        }
    }

    for (var i = 0; i < stulp; i++) {
        for (var g = 0; g < eil; g++) {
            tinklas[i][g].skaiciuok();
        }
    }
}

function draw() {
    background(255);
    for (var i = 0; i < stulp; i++) {
        for (var g = 0; g < eil; g++) {
            tinklas[i][g].show();

        }

    }
}

function Langelis(i, g, w) {
    this.x = i * w;
    this.y = g * w;
    this.w = w;
    this.i = i;
    this.g = g;
    this.visiKaimynai = 0;
    this.win = win;
    this.skaicius = skaicius;
    if (random(1) < maxas && random(1) > minas) {
        skaicius++;

        this.bomba = true;
    }
    else {
        this.bomba = false;
    }
    this.rodom = false;


}


function lenta(stulp, eil) {

    var arr = new Array(stulp);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(eil);
    }

    return arr;
}


Langelis.prototype.show = function () {

    stroke(0);
    noFill();
    rect(this.x, this.y, this.w, this.w);
    if (this.rodom) {
        if (this.bomba) {
            ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
        }
        else {

            fill(185);
            rect(this.x, this.y, this.w, this.w);
            textAlign(CENTER);
            fill(0);
            if (this.visiKaimynai > 0)
                text(this.visiKaimynai, this.x + this.w * 0.5, this.y + this.w * 0.75);

        }
    }

};

function mousePressed() {
    background(255);
    for (var i = 0; i < stulp; i++) {
        for (var g = 0; g < eil; g++) {
            if (tinklas[i][g].contains(mouseX, mouseY)) {
                tinklas[i][g].rodo();
                if (100 - this.skaicius == this.win) {
                    window.alert('LAIMEJAI');
                }
                if (tinklas[i][g].bomba) {
                    pabaiga();
                }

            }

        }

    }

}


Langelis.prototype.rodo = function () {
    this.rodom = true;
    win++;
    if (this.visiKaimynai == 0) {
        this.floodFill();
    }
    this.win = win;
};

Langelis.prototype.skaiciuok = function () {
    if (this.bomba) {
        this.visiKaimynai = -1;
        return;
    }

    var visi = 0;

    for (var i = -1; i <= 1; i++) {
        for (var g = -1; g <= 1; g++) {
            var kampX = this.i + i;
            var kampY = this.g + g;
            if (kampX > -1 && kampX < stulp && kampY > -1 && kampY < eil) {
                var kaimynas = tinklas[kampX][kampY];
                if (kaimynas.bomba) {
                    visi++;

                }
            }
        }
        this.visiKaimynai = visi;

    }
}


Langelis.prototype.floodFill = function () {

    for (var i = -1; i <= 1; i++) {
        for (var g = -1; g <= 1; g++) {
            var kampX = this.i + i;
            var kampY = this.g + g;
            if (kampX > -1 && kampX < stulp && kampY > -1 && kampY < eil) {
                var kaimynas = tinklas[kampX][kampY];
                if (!kaimynas.bomba && !kaimynas.rodom) {
                    kaimynas.rodo();


                }
            }
        }
    }
}


Langelis.prototype.contains = function (x, y) {
    return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);


};

function refreshPage() {
    window.location.reload();
}

function pabaiga() {
    for (var i = 0; i < stulp; i++) {
        for (var g = 0; g < eil; g++) {
            tinklas[i][g].rodom = true;
        }
    }

}