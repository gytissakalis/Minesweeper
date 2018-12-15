var web;
var column;
var row;
var bombCount = 0;
var win = 0;
var w = 40;
var lang = 40;
var minas = 0.01;
var maxas = 0.1;


function setup() {
    createCanvas((w*10+1), (w*10+1));
    column = floor(width / lang);
    row = floor(height / lang);
    web = board(column, row);

    for (var i = 0; i < column; i++) {
        for (var g = 0; g < row; g++) {
            web[i][g] = new cell(i, g, lang);
        }
    }

    for (var i = 0; i < column; i++) {
        for (var g = 0; g < row; g++) {
            web[i][g].bombCount();
        }
    }
}

function draw() {
    background(255);
    for (var i = 0; i < column; i++) {
        for (var g = 0; g < row; g++) {
            web[i][g].show();

        }

    }
}


function board(stulp, eil) {

    var arr = new Array(stulp);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(eil);
    }

    return arr;
}



function mousePressed() {
    background(255);
    for (var i = 0; i < column; i++) {
        for (var g = 0; g < row; g++) {
            if (web[i][g].contains(mouseX, mouseY)) {
                web[i][g].showCells();
                if ((100 - this.skaicius) == this.win) {
                    window.alert('LAIMEJAI');
                }
                if (web[i][g].bomba) {
                    gameOver();
                }

            }

        }

    }

}
