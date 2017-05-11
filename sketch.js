var looping = true;
var gridXAmount = 32 * 1;
var gridYAmount = 18 * 1;
var tileWidth;
var number = 1;
var current;
var dark;
var light;
var r, g, b;
var posShaker = 0;
var shakerToggle = 1;
var boxOfDots = [];
var dotCount = Infinity;
var printDots = false;

function maps(n, start1, stop1, start2, stop2) {
    return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
};


function setup() {
    createCanvas(windowWidth, windowWidth * 9 / 16);
    background(0);
    frameRate(30);
    tileWidth = width / gridXAmount;
    fill(150);
    noStroke();
    // stroke(70);
    current = 0;
    // noLoop();
    dark = color(50);
    light = color(120);
    seededBlock.showTiling();
}

function draw() {
    // scale(width / (width + 20), width / (width + 20));
    // translate(10, 10);
    // seed = shiftSeed(seed);
    // data = fillBlock(seed);
    // seededBlock = new Block({
    //     size: { width: seed.width * 2, height: seed.width * 2 },
    //     maxSize: { width: 500, height: 700 },
    //     data: data.block,
    //     colors: data.colors
    // });


    // show("A", width / 2, height / 2, tileWidth, light, dark);
    // animate();
    // background(color(100));
    // animate2TilingsAlgo();
    // animateAlgo();
    // fill(255, 0, 0);
    // // rect(posShaker, 0, 4, height);
    // posShaker += 20;
    // if (posShaker > width + 250) {
    //     posShaker = -250;
    //     shakerToggle *= -1;
    // }

    //The showing of the dotted tiling
    if (dotCount < boxOfDots.length) {
        scale(width / (width + 20), width / (width + 20));
        translate(10, 5);
        for (var i = 0; i < 4500; i++) {
            var box = boxOfDots[dotCount];
            fill(box.r, box.g, box.b, 50);
            ellipse(box.x, box.y, box.s);
            dotCount++;
        }
    }

}

function animate2TilingsAlgo() {
    for (var x = 0; x < width; x += tileWidth) {
        for (var y = 0; y < height; y += tileWidth) {
            var lerpValue = map(sin(frameCount / 20), -1, 1, -0.4, 1.4);
            lerpValue = constrain(lerpValue, 0, 1);
            if (x > posShaker) {
                if (shakerToggle == 1) {
                    lerpValue = 1;
                } else {
                    lerpValue = 0;
                }
            } else {
                if (shakerToggle == 1) {
                    lerpValue = 0;
                } else {
                    lerpValue = 1;
                }
                var r = abs(x - posShaker);
                if (r < 250) {
                    if (shakerToggle == 1) {
                        var maps = map(r, 0, 250, 1, 0);
                    } else {
                        var maps = map(r, 0, 250, 0, 1);
                    }

                    lerpValue = maps;
                }
            }
            // var red = lerp(255, 150, lerpValue);
            // var green = lerp(50, 255, lerpValue);
            // var blue = lerp(255, 150, lerpValue);
            // light = (red, green, blue);

            // var d = dist(x, posShaker);
            // lerpValue = lerp(d, 0,10,)
            var current = blockOne.tiling[(x / tileWidth) + (y / tileWidth) * gridXAmount];
            var current2 = blockTwo.tiling[(x / tileWidth) + (y / tileWidth) * gridXAmount];
            sortTransitions(current, current2, x, y, lerpValue);
        }
    }
}

function animateAlgo() {
    for (var x = 0; x < width; x += tileWidth) {
        for (var y = 0; y < height; y += tileWidth) {
            var lerpValue = map(sin(frameCount / 100), -1, 1, 0, 1);
            animateCtoA(x, y, lerpValue);
            // if (frameCount % 13 == 0) {
            //     console.log(lerpValue);
            // }
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

function showNumeralDotted(position, x, y, tW, light, dark) {
    var s = 1;
    // fill(light.r, light.g, light.b, 50);
    var gap = 0;
    for (var i = 0; i < 7500 * 4; i++) {
        var randomDotX = x + random(-gap, tW + gap);
        var randomDotY = y + random(-gap, tW + gap);
        // ellipse(randomDotX, randomDotY, 1);
        boxOfDots.push({
            x: randomDotX,
            y: randomDotY,
            s: s,
            r: red(light),
            g: green(light),
            b: blue(light)
        });
    }
    gap = 0.5;
    // fill(dark.r, dark.g, dark.b, 50);
    for (var i = 0; i < 4500 * 4; i++) {
        var randomDotX = x + random(-gap, tW + gap);
        var randomDotY = y + random(-gap, tW + gap);
        // if (randomDotY < -randomDotX + x + y + tW) {
        //     ellipse(randomDotX, randomDotY, 1);
        // }
        switch (position) {
            case "A":
                if (randomDotY - gap - y > randomDotX - x) {
                    showDot(randomDotX, randomDotY, s);
                }
                break;
            case "B":
                if (randomDotY + gap < -randomDotX + x - 0.05 + y + tW) {
                    showDot(randomDotX, randomDotY, s);
                }
                break;
            case "C":
                if (randomDotY + gap - y < randomDotX - x) {
                    showDot(randomDotX, randomDotY, s);
                }
                break;
            case "D":
                if (randomDotY - gap > -randomDotX + x - 0.05 + y + tW) {
                    showDot(randomDotX, randomDotY, s);
                }
                break;
            case "E":
                break;
            case "F":
                showDot(randomDotX, randomDotY, s);
                break;
            default:
                console.log("Error, not tile type read.");
        }
    }

    function showDot(x, y, s) {
        // ellipse(x, y, s);
        boxOfDots.push({
            x: x,
            y: y,
            s: s,
            r: red(dark),
            g: green(dark),
            b: blue(dark)
        });
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
    if (key == 'r' || key == 'R' || key == 'm' || key == 'M') {
        cV = generateColorVariant();
        seed = generateSeed(seed);
        // data = fillBlock(seed);
        for (var i = 0; i < 10; i++) {
            seed = shiftSeed(seed, i);
        }
        // console.log(seed.colors);
        data = fillBlock(seed);
        seededBlock = new Block({
            size: { width: seed.width * 2, height: seed.width * 2 },
            maxSize: { width: 500, height: 700 },
            data: data.block,
            colors: data.colors
        });
        seededBlock.showTiling();
    }
    if (key == 'p' || key == 'P') {
        background(0);
        seededBlock.showTilingDotted();
    }
}
