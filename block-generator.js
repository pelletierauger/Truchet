var ColorTile = function(arr) {
    this.l = {};
    this.d = {};
    this.l.r = arr[0];
    this.l.g = arr[1];
    this.l.b = arr[2];
    this.d.r = arr[3];
    this.d.g = arr[4];
    this.d.b = arr[5];
};
var seed, data;
var cV = generateColorVariant();
generateThings();


function generateThings() {
    seed = generateSeed();
    for (var i = 0; i < 13; i++) {
        seed = shiftSeed(seed, i);
    }
    // console.log(seed.colors);
    data = fillBlock(seed);
}

function generateSeed() {
    var frames = 0;
    var c = colorationAlgorithm001(cV.fS, cV.f, frames, cV.c, cV.mi, cV.ma);
    // var red = maps(Math.sin(frames / 5), -1, 1, 0, 255);
    // var green = maps(Math.cos(frames / 5), -1, 1, 0, 255);
    // var blue = maps(Math.sin(frames / 5), -1, 1, 0, 105);
    var blockWidth = Math.round(Math.random() * 10 + 3);
    // var blockWidth = 4;
    var blockData = [];
    var colorData = [];
    var builtBlocks = 0;
    while (builtBlocks < blockWidth) {
        for (var i = 0; i <= builtBlocks; i++) {
            if (!blockData[builtBlocks]) {
                blockData[builtBlocks] = getRandomTile();
                colorData[builtBlocks] = [];
                colorData[builtBlocks][0] = new ColorTile([
                    c.lightRed,
                    c.lightGreen,
                    c.lightBlue,
                    c.darkRed,
                    c.darkGreen,
                    c.darkBlue
                ]);
            } else {
                blockData[builtBlocks] = blockData[builtBlocks] + getRandomTile();
                colorData[builtBlocks].push(new ColorTile([
                    c.lightRed,
                    c.lightGreen,
                    c.lightBlue,
                    c.darkRed,
                    c.darkGreen,
                    c.darkBlue
                ]));
            }
        }
        builtBlocks++;
    }
    return {
        width: blockWidth,
        tiles: blockData,
        colors: colorData
    }
}

function fillBlock(seed) {
    // console.log(seed.colors[0].length);
    var blockWidth = seed.width;
    var blockData = seed.tiles.slice(0);
    var colorData = seed.colors.slice(0);
    // colorData.push("Yeah!");
    // console.log(colorData);
    // console.log(seed.colors);
    // colorData[0].push("Nope");
    var colorsData = [];
    for (var p = 0; p < seed.colors.length; p++) {
        colorsData[p] = [];
        for (var pp = 0; pp < seed.colors[p].length; pp++) {
            colorsData[p].push(seed.colors[p][pp]);
        }
    }
    // console.log("colorsData");
    // console.log(colorsData);

    // console.log(colorData);
    // return;


    // Mirror the seed obliquely.
    var builtRows = 0;
    var currentTile = 1;
    while (builtRows < blockWidth) {
        while (blockData[builtRows].length < blockWidth) {
            var tileToGet = blockData[builtRows].length;
            // if (colorData[builtRows]) {
            var colorToGet = colorsData[builtRows].length;
            //     if (colorData[colorToGet]) {
            colorToGet = colorsData[colorToGet][builtRows];
            // console.log(colorToGet);

            //THIS IS THE ROOT OF THE PROBLEM, SOMEHOW
            colorsData[builtRows][colorsData[builtRows].length] = colorToGet;
            //     }
            // }
            tileToGet = blockData[tileToGet][builtRows];
            tileToGet = getSymmetricalTile(tileToGet, "obliqueDownward");
            blockData[builtRows] += tileToGet;
        }
        builtRows++;
    }

    // Mirror the block horizontally
    for (var k = 0; k < blockWidth; k++) {
        for (var j = blockWidth - 1; j >= 0; j--) {
            var tileToMirror = blockData[k][j];
            var colorToMirror = colorsData[k][j];
            // console.log("k :" + k + ", j : " + j);
            tileToMirror = getSymmetricalTile(tileToMirror, "horizontal");
            blockData[k] += tileToMirror;
            colorsData[k].push(colorToMirror);
            // console.log("blockData[k].length : " + blockData[k].length);
            // console.log("colorData[k].length : " + colorData[k].length);
        }
    }
    // console.log(colorData[0].length);
    // console.log(colorData[0]);
    // Mirror the block vertically
    for (var l = blockWidth - 1; l >= 0; l--) {
        var newString = "";
        for (var ll = 0; ll < blockWidth * 2; ll++) {
            var tileToAdd = blockData[l][ll];
            tileToAdd = getSymmetricalTile(tileToAdd, "vertical");
            newString += tileToAdd;
        }
        blockData.push(newString);
        var colorRowToAdd = colorsData[l].slice(0);
        colorsData.push(colorRowToAdd);
    }
    return {
        block: blockData,
        colors: colorsData
    }
}

function shiftSeed(seed, frame) {
    var red = maps(Math.sin(frame / 5), -1, 1, 0, 255);
    var green = maps(Math.cos(frame / 5), -1, 1, 0, 255);
    var blue = maps(Math.sin(frame / 5), -1, 1, 0, 105);
    var blockData = seed.tiles.slice(0);

    var c = colorationAlgorithm001(cV.fS, cV.f, frame, cV.c, cV.mi, cV.ma);



    var colourData = [];
    for (var p = 0; p < seed.colors.length; p++) {
        colourData[p] = [];
        for (var pp = 0; pp < seed.colors[p].length; pp++) {
            colourData[p].push(seed.colors[p][pp]);
        }
    }

    for (var i = 0; i < seed.width; i++) {
        if (i == 0) {
            blockData[i] = getRandomTile();
            colourData[i] = [new ColorTile([
                c.lightRed,
                c.lightGreen,
                c.lightBlue,
                c.darkRed,
                c.darkGreen,
                c.darkBlue
            ])];
        } else {
            blockData[i] = blockData[i].slice(1, blockData[i].length);
            colourData[i] = colourData[i].slice(1, colourData[i].length);
            blockData[i] += getRandomTile();
            colourData[i].push(new ColorTile([
                c.lightRed,
                c.lightGreen,
                c.lightBlue,
                c.darkRed,
                c.darkGreen,
                c.darkBlue
            ]));
        }
    }
    return {
        width: seed.width,
        tiles: blockData,
        colors: colourData
    }
}

function shiftSeed02() {
    console.log("SEED : " + seed);
    blockData = seed.slice(0);
    console.log("BLOCKDATA : " + blockData);
    for (var i = 0; i < blockWidth; i++) {
        var tileToMove = blockData[i][0];
        if (i == 0) {
            // blockData[i] = getRandomTile();
        } else {
            blockData[i] = blockData[i].slice(1, blockData[i].length);
            blockData[i] += tileToMove;
        }

    }
    console.log("end of shiftSeed : " + blockData);
    seed = blockData.slice(0);
}

function getRandomTile() {
    var tiles = ["A", "B", "C", "D", "E", "F"];
    var tile = tiles[Math.round(Math.random() * 5)];

    // var test = Math.random();
    // if (test < 0.3) {
    //     tile = "E";
    // }
    // if (test > 0.3 && test < 0.6) {
    //     tile = "F";
    // }
    // tile = "C";
    return tile;
}

function getSymmetricalTile(tile, type) {
    if (tile == "E" || tile == "F") {
        return tile;
    }
    if (tile == "A" && type == "horizontal") {
        return "D";
    }
    if (tile == "A" && type == "vertical") {
        return "B";
    }
    if (tile == "A" && type == "obliqueDownward") {
        return "C";
    }
    if (tile == "A" && type == "obliqueUpward") {
        return "A";
    }
    if (tile == "B" && type == "horizontal") {
        return "C";
    }
    if (tile == "B" && type == "vertical") {
        return "A";
    }
    if (tile == "B" && type == "obliqueDownward") {
        return "B";
    }
    if (tile == "B" && type == "obliqueUpward") {
        return "D";
    }
    if (tile == "C" && type == "horizontal") {
        return "B";
    }
    if (tile == "C" && type == "vertical") {
        return "D";
    }
    if (tile == "C" && type == "obliqueDownward") {
        return "A";
    }
    if (tile == "C" && type == "obliqueUpward") {
        return "C";
    }
    if (tile == "D" && type == "horizontal") {
        return "A";
    }
    if (tile == "D" && type == "vertical") {
        return "C";
    }
    if (tile == "D" && type == "obliqueDownward") {
        return "D";
    }
    if (tile == "D" && type == "obliqueUpward") {
        return "B";
    }
}


function generateColorVariant() {

    //fS can either null or an integer between 0 and 255
    var fS = {
        a: (Math.random() > 0.25) ? null : Math.round(Math.random() * 255),
        b: (Math.random() > 0.25) ? null : Math.round(Math.random() * 255),
        c: (Math.random() > 0.25) ? null : Math.round(Math.random() * 255),
        d: (Math.random() > 0.25) ? null : Math.round(Math.random() * 55),
        e: (Math.random() > 0.25) ? null : Math.round(Math.random() * 55),
        f: (Math.random() > 0.25) ? null : Math.round(Math.random() * 55)
    };

    var f = {
        a: (Math.random() > 0.5) ? Math.sin : Math.cos,
        b: (Math.random() > 0.5) ? Math.sin : Math.cos,
        c: (Math.random() > 0.5) ? Math.sin : Math.cos,
        d: (Math.random() > 0.5) ? Math.sin : Math.cos,
        e: (Math.random() > 0.5) ? Math.sin : Math.cos,
        f: (Math.random() > 0.5) ? Math.sin : Math.cos
    };

    var c = {
        a: Math.round(Math.random() * 25),
        b: Math.round(Math.random() * 25),
        c: Math.round(Math.random() * 25),
        d: Math.round(Math.random() * 25),
        e: Math.round(Math.random() * 25),
        f: Math.round(Math.random() * 25)
    };

    var cc = 5;

    c = {
        a: cc,
        b: cc,
        c: cc,
        d: cc,
        e: cc,
        f: cc
    };

    var mi = {
        a: Math.round(Math.random() * 255),
        b: Math.round(Math.random() * 255),
        c: Math.round(Math.random() * 255),
        d: Math.round(Math.random() * 255),
        e: Math.round(Math.random() * 255),
        f: Math.round(Math.random() * 255)
    };

    var ma = {
        a: Math.round(Math.random() * 255),
        b: Math.round(Math.random() * 255),
        c: Math.round(Math.random() * 255),
        d: Math.round(Math.random() * 255),
        e: Math.round(Math.random() * 255),
        f: Math.round(Math.random() * 255)
    };

    return {
        fS: fS,
        f: f,
        c: c,
        mi: mi,
        ma: ma
    };
};

function colorationAlgorithm001(fS, f, i, c, mi, ma) {
    return {
        lightRed: (fS.a !== null) ? fS.a : maps(f.a(i / c.a), -1, 1, mi.a, ma.a),
        lightGreen: (fS.b !== null) ? fS.b : maps(f.b(i / c.b), -1, 1, mi.b, ma.b),
        lightBlue: (fS.c !== null) ? fS.c : maps(f.c(i / c.c), -1, 1, mi.c, ma.c),
        darkRed: (fS.d !== null) ? fS.d : maps(f.d(i / c.d), -1, 1, mi.d, ma.d),
        darkGreen: (fS.e !== null) ? fS.e : maps(f.e(i / c.e), -1, 1, mi.e, ma.e),
        darkBlue: (fS.f !== null) ? fS.f : maps(f.f(i / c.f), -1, 1, mi.f, ma.f)
    }
};
