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
