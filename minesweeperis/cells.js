
function cell(i, g, w) {
    this.x = i * w;
    this.y = g * w;
    this.w = w;
    this.i = i;
    this.g = g;
    this.visiKaimynai = 0;
    this.win = win;
    this.skaicius = bombCount;
    if (random(1) < maxas && random(1) > minas) {
        bombCount++;

        this.bomba = true;
    }
    else {
        this.bomba = false;
    }
    this.cellisOpen = false;


}


cell.prototype.show = function () {

    stroke(0);
    noFill();
    rect(this.x, this.y, this.w, this.w);
    if (this.cellisOpen) {
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



cell.prototype.showCells = function () {
    this.cellisOpen = true;
    win++;
    if (this.visiKaimynai == 0) {
        this.floodFill();
    }
    this.win = win;
};

cell.prototype.bombCount = function () {
    if (this.bomba) {
        this.visiKaimynai = -1;
        return;
    }

    var visi = 0;

    for (var i = -1; i <= 1; i++) {
        for (var g = -1; g <= 1; g++) {
            var kampX = this.i + i;
            var kampY = this.g + g;
            if (kampX > -1 && kampX < column && kampY > -1 && kampY < row) {
                var kaimynas = web[kampX][kampY];
                if (kaimynas.bomba) {
                    visi++;

                }
            }
        }
        this.visiKaimynai = visi;

    }
}


cell.prototype.floodFill = function () {

    for (var i = -1; i <= 1; i++) {
        for (var g = -1; g <= 1; g++) {
            var kampX = this.i + i;
            var kampY = this.g + g;
            if (kampX > -1 && kampX < column && kampY > -1 && kampY < row) {
                var kaimynas = web[kampX][kampY];
                if (!kaimynas.bomba && !kaimynas.cellisOpen) {
                    kaimynas.showCells();


                }
            }
        }
    }
}


cell.prototype.contains = function (x, y) {
    return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);


};

function refreshPage() {
    window.location.reload();
}

function gameOver() {
    for (var i = 0; i < column; i++) {
        for (var g = 0; g < row; g++) {
            web[i][g].cellisOpen = true;
        }
    }

}