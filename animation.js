function animate() {
    var maps = map(sin(frameCount / 10), -1, 1, 0, 1);
    var tW = tileWidth;
    translate(width / 2 - tW / 2, height / 2 - tW / 2);
    // strokeWeight(1);
    // stroke(255);
    // var x = 10;
    // var y = (x * 1.5) + 30;
    // beginShape();
    // vertex(x, y);
    // x = 30;
    // y = (x * 1.5) + 30
    // vertex(x, y);
    // endShape();
    // line(-100, -100, 100, 100);
    var x = 0;
    var y = 0;

    var dotLerp1 = lerp(0, 0 + tW, maps);
    var dotLerp2 = lerp(0 + tW, 0, maps);
    fill(light);
    rect(x, y, tW, tW);
    beginShape();
    fill(dark);
    vertex(x, y);
    vertex(dotLerp1, y);
    vertex(dotLerp2, y + tW);
    vertex(x, y + tW);
    endShape(CLOSE);

}
