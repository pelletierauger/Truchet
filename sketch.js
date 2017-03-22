var looping = true;
var gridXAmount = 32 * 1;
var gridYAmount = 18 * 1;
var tileWidth;
var number = 1;
var current;
var dark;
var light;
var r, g, b;


function setup() {
    createCanvas(windowWidth, windowWidth * 9 / 16);
    background(51);
    // frameRate(10);
    tileWidth = width / gridXAmount;
    fill(150);
    noStroke();
    current = 0;
    // noLoop();
    dark = color(50);
    light = color(120);
}

function draw() {
    // truchetAlgorithm3();
    // blockOne.showTiling();
    // show("A", width / 2, height / 2, tileWidth, light, dark);
    // animate();
    animateAlgo();
}

function animateAlgo() {
    for (var x = 0; x < width; x += tileWidth) {
        for (var y = 0; y < height; y += tileWidth) {
            var lerpValue = map(sin(frameCount / 5), -1, 1, 0, 1);
            animateAtoB(x, y, lerpValue);
            // rect(x, y, x + tileWidth, y + tileWidth);
        }
    }
}

function truchetAlgorithm3() {
    var truchetArray = [];
    var truchetArraySize = 32 * 18;
    var block = {
        lines: ["AAAABBBBCCCCDDDD"],
        horizontalSymmetry: true,
        verticalSymmetry: false
    };
    fillArray(block, truchetArray);
    showArray(truchetArray);

    function fillArray(block, truchetArray, startX, startY) {

        var instruction = block.lines[0];
        // console.log(block.lines[0].length);
        while (truchetArray.length < truchetArraySize) {
            for (var i = 0; i < instruction.length; i++) {
                // console.log(instruction[i]);
                truchetArray.push(instruction[i]);
            }
        }

    }

    function showArray(truchetArray) {
        console.log(truchetArray);
        for (var x = 0; x < width; x += tileWidth) {
            for (var y = 0; y < height; y += tileWidth) {
                var current = truchetArray[(x / tileWidth) + (y / tileWidth) * gridXAmount];
                showNumeral(current, x, y, tileWidth, light, dark);
            }
        }
    }
}


function truchetAlgorithm2() {
    for (var x = 0; x < width; x += tileWidth) {
        for (var y = 0; y < height; y += tileWidth) {
            if (x / tileWidth % 2 == 0) {
                if (y / tileWidth % 2 == 0) {
                    current = 0;
                    // light = color(255, 0, 0);
                } else {
                    current = 1;
                    // light = color(255, 255, 0);
                }

            } else {
                if (y / tileWidth % 2 == 0) {
                    current = 3;
                    // light = color(0, 0, 255);
                } else {
                    current = 2;
                    // light = color(0, 255, 0);
                }

            }

            show(current, x, y, tileWidth, light, dark);
        }
    }
    number += 1;
}

function truchetSinewave() {
    for (var x = 0; x < width; x += tileWidth) {
        for (var y = 0; y < height; y += tileWidth) {
            show(current, x, y, tileWidth, light, dark);
            // truchetAlgorithm(x, y, tileWidth, light, dark);
            current = map(sin((x + y * gridXAmount) / number), -1, 1, 0, 4);
            // r = map(sin((x + y * gridXAmount) / number), -1, 1, 0, 55);
            // g = map(sin((x + y * gridXAmount) / number), -1, 1, 155, 25);
            // b = map(cos((x + y * gridXAmount) / number), -1, 1, 150, 5);
            // r = map(x / tileWidth, 0, gridXAmount, 0, 255);
            // g = map(y / tileWidth, 0, gridYAmount, 255, 0);
            // b = map(y / tileWidth, 0, gridYAmount, 0, 255);
            // dark = color(r / 2, g / 2, b / 2);
            // light = color(r, g, b);
            // dark = color(r, g, b);
            // light = color(g, b, g);
            // dark = color(b, g, r);
            current = floor(current);
        }

        // if (y % number == 0) {
        //     current += 1;
        // }
        // if (current > 3) {
        //     current = 0;
        // }
    }
    number += 1;
}

function truchetAlgorithm(x, y, tW, light, dark) {
    var current;
    if (y % 3 == 0) {
        current = 0;
    } else {
        current = 2;
    }
    show(current, x, y, tileWidth, light, dark);
}

function show(position, x, y, tW, light, dark) {
    switch (position) {
        case 0:
            showA(x, y, tileWidth, light, dark);
            break;
        case 1:
            showB(x, y, tileWidth, light, dark);
            break;
        case 2:
            showC(x, y, tileWidth, light, dark);
            break;
        case 3:
            showD(x, y, tileWidth, light, dark);
            break;
        default:
            showA(x, y, tileWidth, light, dark);
    }
}

function showNumeral(position, x, y, tW, light, dark) {
    switch (position) {
        case "A":
            showA(x, y, tileWidth, light, dark);
            break;
        case "B":
            showB(x, y, tileWidth, light, dark);
            break;
        case "C":
            showC(x, y, tileWidth, light, dark);
            break;
        case "D":
            showD(x, y, tileWidth, light, dark);
            break;
        case "E":
            showE(x, y, tileWidth, light, dark);
            break;
        case "F":
            showF(x, y, tileWidth, light, dark);
            break;
        default:
            showA(x, y, tileWidth, light, dark);
    }
}

function showA(x, y, tW, light, dark) {
    fill(light);
    rect(x, y, tW, tW);
    beginShape();
    fill(dark);
    vertex(x, y);
    vertex(x + tW, y + tW);
    vertex(x, y + tW);
    endShape();
}

function showB(x, y, tW, light, dark) {
    fill(light);
    rect(x, y, tW, tW);
    beginShape();
    fill(dark);
    vertex(x, y);
    vertex(x + tW, y);
    vertex(x, y + tW);
    endShape();
}

function showC(x, y, tW, light, dark) {
    fill(light);
    rect(x, y, tW, tW);
    beginShape();
    fill(dark);
    vertex(x, y);
    vertex(x + tW, y);
    vertex(x + tW, y + tW);
    endShape();
}

function showD(x, y, tW, light, dark) {
    fill(light);
    rect(x, y, tW, tW);
    beginShape();
    fill(dark);
    vertex(x + tW, y);
    vertex(x + tW, y + tW);
    vertex(x, y + tW);
    endShape();
}

function showE(x, y, tW, light, dark) {
    fill(light);
    rect(x, y, tW, tW);
}

function showF(x, y, tW, light, dark) {
    fill(dark);
    rect(x, y, tW, tW);
}

function keyPressed() {
    if (keyCode === 32) {
        if (looping) {
            noLoop();
            looping = false;
        } else {
            loop();
            looping = true;
        }
    }
}
