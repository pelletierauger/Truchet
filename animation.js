//transition A to B, lerp also needs to be an argument.
function animateAtoB(x, y, lerpValue) {
    var tW = tileWidth;
    var dotLerp1 = lerp(0, tW, lerpValue);
    var dotLerp2 = lerp(tW, 0, lerpValue);

    push();
    translate(x, y);
    fill(light);
    rect(0, 0, tW, tW);
    beginShape();
    fill(dark);
    vertex(0, 0);
    vertex(dotLerp1, 0);
    vertex(dotLerp2, tW);
    vertex(0, tW);
    endShape();
    pop();
}

function animateAtoB_new(x, y, lerpValue) {
    var tW = tileWidth;
    push();
    translate(x + tW / 2, y + tW / 2);
    rotate(PI / 2 * lerpValue);
    translate(-tW / 2, -tW / 2);
    fill(light);
    rect(0, 0, tW, tW);
    beginShape();
    fill(dark);
    vertex(0, 0);
    vertex(0 + tW, 0 + tW);
    vertex(0, 0 + tW);
    endShape();
    pop();
}

function animateBtoC_new(x, y, lerpValue) {
    var tW = tileWidth;
    push();
    translate(x + tW / 2, y + tW / 2);
    rotate(PI / 2 * lerpValue);
    translate(-tW / 2, -tW / 2);
    fill(light);
    rect(0, 0, tW, tW);
    beginShape();
    fill(dark);
    vertex(0, 0);
    vertex(0 + tW, 0);
    vertex(0, 0 + tW);
    endShape();
    pop();
}

function animateCtoD_new(x, y, lerpValue) {
    var tW = tileWidth;
    push();
    translate(x + tW / 2, y + tW / 2);
    rotate(PI / 2 * lerpValue);
    translate(-tW / 2, -tW / 2);
    fill(light);
    rect(0, 0, tW, tW);
    beginShape();
    fill(dark);
    vertex(0, 0);
    vertex(0 + tW, 0);
    vertex(0 + tW, 0 + tW);
    endShape();
    pop();
}

function animateDtoA_new(x, y, lerpValue) {
    var tW = tileWidth;
    push();
    translate(x + tW / 2, y + tW / 2);
    rotate(PI / 2 * lerpValue);
    translate(-tW / 2, -tW / 2);
    fill(light);
    rect(0, 0, tW, tW);
    beginShape();
    fill(dark);
    vertex(0 + tW, 0);
    vertex(0 + tW, 0 + tW);
    vertex(0, 0 + tW);
    endShape();
    pop();
}

function animateBtoC(x, y, lerpValue) {
    var tW = tileWidth;
    var dotLerp1 = lerp(0, tW, lerpValue);
    var dotLerp2 = lerp(tW, 0, lerpValue);

    push();
    translate(x, y);
    fill(light);
    rect(0, 0, tW, tW);
    beginShape();
    fill(dark);
    vertex(0, 0);
    vertex(tW, 0);
    vertex(tW, dotLerp1);
    vertex(0, dotLerp2);

    endShape();
    pop();
}

function animateCtoD(x, y, lerpValue) {
    var tW = tileWidth;
    var dotLerp1 = lerp(0, tW, lerpValue);
    var dotLerp2 = lerp(tW, 0, lerpValue);

    push();
    translate(x, y);
    fill(light);
    rect(0, 0, tW, tW);
    beginShape();
    fill(dark);
    vertex(tW, 0);
    vertex(tW, tW);
    vertex(dotLerp2, tW);
    vertex(dotLerp1, 0);

    endShape();
    pop();
}

function animateDtoA(x, y, lerpValue) {
    var tW = tileWidth;
    var dotLerp1 = lerp(0, tW, lerpValue);
    var dotLerp2 = lerp(tW, 0, lerpValue);

    push();
    translate(x, y);
    fill(light);
    rect(0, 0, tW, tW);
    beginShape();
    fill(dark);
    vertex(tW, tW);
    vertex(0, tW);
    vertex(0, dotLerp2);
    vertex(tW, dotLerp1);

    endShape();
    pop();
}

function animateAtoC(x, y, lerpValue) {
    if (lerpValue < 0.5) {
        animateAtoB(x, y, lerpValue * 2);
    } else {
        animateBtoC(x, y, (-0.5 + lerpValue) * 2);
    }
}

function animateBtoD(x, y, lerpValue) {
    if (lerpValue < 0.5) {
        animateBtoC(x, y, lerpValue * 2);
    } else {
        animateCtoD(x, y, (-0.5 + lerpValue) * 2);
    }
}

function animateCtoA(x, y, lerpValue) {
    if (lerpValue < 0.5) {
        animateCtoD(x, y, lerpValue * 2);
    } else {
        animateDtoA(x, y, (-0.5 + lerpValue) * 2);
    }
}

function animateDtoB(x, y, lerpValue) {
    if (lerpValue < 0.5) {
        animateDtoA(x, y, lerpValue * 2);
    } else {
        animateAtoB(x, y, (-0.5 + lerpValue) * 2);
    }
}

function animateAtoD(x, y, lerpValue) {
    if (lerpValue <= 1 / 3) {
        animateAtoB(x, y, lerpValue * 3);
    } else if (lerpValue > 1 / 3 && lerpValue <= 2 / 3) {
        animateBtoC(x, y, (-1 / 3 + lerpValue) * 3);
    } else if (lerpValue > 2 / 3) {
        animateCtoD(x, y, (-2 / 3 + lerpValue) * 3);
    }
}

function animateBtoA(x, y, lerpValue) {
    if (lerpValue <= 1 / 3) {
        animateBtoC(x, y, lerpValue * 3);
    } else if (lerpValue > 1 / 3 && lerpValue <= 2 / 3) {
        animateCtoD(x, y, (-1 / 3 + lerpValue) * 3);
    } else if (lerpValue > 2 / 3) {
        animateDtoA(x, y, (-2 / 3 + lerpValue) * 3);
    }
}

function animateCtoB(x, y, lerpValue) {
    if (lerpValue <= 1 / 3) {
        animateCtoD(x, y, lerpValue * 3);
    } else if (lerpValue > 1 / 3 && lerpValue <= 2 / 3) {
        animateDtoA(x, y, (-1 / 3 + lerpValue) * 3);
    } else if (lerpValue > 2 / 3) {
        animateAtoB(x, y, (-2 / 3 + lerpValue) * 3);
    }
}

function animateDtoC(x, y, lerpValue) {
    if (lerpValue <= 1 / 3) {
        animateDtoA(x, y, lerpValue * 3);
    } else if (lerpValue > 1 / 3 && lerpValue <= 2 / 3) {
        animateAtoB(x, y, (-1 / 3 + lerpValue) * 3);
    } else if (lerpValue > 2 / 3) {
        animateBtoC(x, y, (-2 / 3 + lerpValue) * 3);
    }
}


// sortTransitions(current, current2, x, y, lerpValue);

function sortTransitions(current, current2, x, y, lerpValue) {
    if (current == current2) {
        showNumeral(current, x, y, tileWidth, light, dark);
    } else {
        if (current == "A" && current2 == "B") {
            animateAtoB(x, y, lerpValue);
        } else if (current == "B" && current2 == "C") {
            animateBtoC(x, y, lerpValue);
        } else if (current == "C" && current2 == "D") {
            animateCtoD(x, y, lerpValue);
        } else if (current == "D" && current2 == "A") {
            animateDtoA(x, y, lerpValue);
        } else if (current == "A" && current2 == "C") {
            animateAtoC(x, y, lerpValue);
        } else if (current == "B" && current2 == "D") {
            animateBtoD(x, y, lerpValue);
        } else if (current == "C" && current2 == "A") {
            animateCtoA(x, y, lerpValue);
        } else if (current == "D" && current2 == "B") {
            animateDtoB(x, y, lerpValue);
        } else if (current == "A" && current2 == "D") {
            animateAtoD(x, y, lerpValue);
        } else if (current == "B" && current2 == "A") {
            animateBtoA(x, y, lerpValue);
        } else if (current == "C" && current2 == "B") {
            animateCtoB(x, y, lerpValue);
        } else if (current == "D" && current2 == "C") {
            animateDtoC(x, y, lerpValue);
        } else {
            console.log("Erreur!" + current + ", " + current2);
        }
    }
}
