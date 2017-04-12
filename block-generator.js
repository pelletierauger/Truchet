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

var seed = generateSeed();
var data = fillBlock(seed);

function generateSeed() {
    var blockWidth = Math.round(Math.random() * 10 + 2);
    var blockData = [];
    var colorData = [];
    var builtBlocks = 0;
    while (builtBlocks < blockWidth) {
        for (var i = 0; i <= builtBlocks; i++) {
            if (!blockData[builtBlocks]) {
                blockData[builtBlocks] = getRandomTile();
                colorData[builtBlocks] = [];
                colorData[builtBlocks][0] = new ColorTile([255, 150, 150, 0, 150, 80]);
            } else {
                blockData[builtBlocks] = blockData[builtBlocks] + getRandomTile();
                colorData[builtBlocks].push(new ColorTile([255, 150, 150, 0, 150, 80]));
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
    var blockWidth = seed.width;
    var blockData = seed.tiles.slice(0);
    var colorData = seed.colors.slice(0);

    // Mirror the seed obliquely.
    var builtRows = 0;
    var currentTile = 1;
    while (builtRows < blockWidth) {
        while (blockData[builtRows].length < blockWidth) {
            var tileToGet = blockData[builtRows].length;
            if (colorData[builtRows]) {
                var colorToGet = colorData[builtRows].length
                if (colorData[colorToGet]) {
                    colorToGet = colorData[colorToGet][builtRows];
                    colorData[builtRows].push(colorToGet);
                }
            }
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
            var colorToMirror = colorData[k][j];
            tileToMirror = getSymmetricalTile(tileToMirror, "horizontal");
            blockData[k] += tileToMirror;
            colorData[k].push(colorToMirror);
        }
    }

    // Mirror the block vertically
    for (var l = blockWidth - 1; l >= 0; l--) {
        var newString = "";
        for (var ll = 0; ll < blockWidth * 2; ll++) {
            var tileToAdd = blockData[l][ll];
            tileToAdd = getSymmetricalTile(tileToAdd, "vertical");
            newString += tileToAdd;
        }
        blockData.push(newString);
        var colorRowToAdd = colorData[l].slice(0);
        colorData.push(colorRowToAdd);
    }
    return {
        block: blockData,
        colors: colorData
    }
}

function shiftSeed() {
    // console.log("SEED : " + seed);
    blockData = seed.slice(0);
    colorData = colorSeed.slice(0);
    // console.log("BLOCKDATA : " + blockData);
    for (var i = 0; i < blockWidth; i++) {
        if (i == 0) {
            blockData[i] = getRandomTile();
        } else {
            blockData[i] = blockData[i].slice(1, blockData[i].length);
            blockData[i] += getRandomTile();
        }

    }
    // console.log("end of shiftSeed : " + blockData);
    seed = blockData.slice(0);
    colorSeed = colorData.slice(0);
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
    // if (test < 0.1) {
    //     tile = "E";
    // }
    // if (test > 0.1 && test < 0.95) {
    //     tile = "F";
    // }
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
