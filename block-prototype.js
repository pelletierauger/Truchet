var Block = function(block) {
    this.size = block.size;
    this.fullSpaces = this.makeLargeSpace(block);
    this.tilings = this.makeTiling(this.fullSpaces);
};

Block.prototype.makeLargeSpace = function(block) {
    var largeArray = block.data.slice(0);
    // var largeColorArray = block.colors.slice(0);

    var largeColorArray = [];
    for (var p = 0; p < block.colors.length; p++) {
        largeColorArray[p] = [];
        for (var pp = 0; pp < block.colors[p].length; pp++) {
            largeColorArray[p].push(block.colors[p][pp]);
        }
    }

    //Fill the tiling array horizontally
    while (largeArray[0].length < block.maxSize.width) {
        for (var i = 0; i < largeArray.length; i++) {
            largeArray[i] = largeArray[i] + largeArray[i];
        }
    }

    //Fill the color array horizontally
    while (largeColorArray[0].length < block.maxSize.width) {
        for (var h = 0; h < largeColorArray.length; h++) {
            var startLength = largeColorArray[h].length;
            for (var k = 0; k < startLength; k++) {
                largeColorArray[h].push(largeColorArray[h][k]);
            }
        }
    }

    //Fill both arrays vertically
    while (largeArray.length < block.maxSize.height) {
        for (var j = 0; j < block.size.height; j++) {
            largeArray.push(largeArray[j]);
            largeColorArray.push(largeColorArray[j]);
        }
    }
    return {
        tiles: largeArray,
        colors: largeColorArray
    };
};

Block.prototype.makeTiling = function(fullSpaces) {
    var tilings = tilingFiller({
        space: fullSpaces.tiles,
        colors: fullSpaces.colors,
        offset: { x: 0, y: 0 },
        outputSize: { width: gridXAmount, height: gridYAmount }
    });
    return tilings;
};

Block.prototype.showTiling = function() {
    for (var x = 0; x < gridXAmount * tileWidth; x += tileWidth) {
        for (var y = 0; y < gridYAmount * tileWidth; y += tileWidth) {
            var current = (x / tileWidth) + (y / tileWidth) * gridXAmount;
            var tile = this.tilings.tiles[current];
            var light = this.tilings.colors[current].l;
            light = color(light.r, light.g, light.b);
            var dark = this.tilings.colors[current].d;
            dark = color(dark.r, dark.g, dark.b);
            showNumeral(tile, x, y, tileWidth, light, dark);
        }
    }
};

function tilingFiller(instructions) {
    var space = instructions.space;
    var colors = instructions.colors;
    var offset = instructions.offset;
    var size = instructions.outputSize;
    var tiling = [];
    var tilingColors = [];
    for (var x = 0; x < size.width; x += 1) {
        for (var y = 0; y < size.height; y += 1) {
            tiling[x + y * size.width] = space[offset.y + y][offset.x + x];
            tilingColors[x + y * size.width] = colors[offset.y + y][offset.x + x];
        }
    }
    return {
        tiles: tiling,
        colors: tilingColors
    };
}

var seededBlock = new Block({
    size: { width: seed.width * 2, height: seed.width * 2 },
    maxSize: { width: 600, height: 700 },
    data: data.block.slice(0),
    colors: data.colors.slice(0)
});

// var blockOne = new Block({
//     type: "static",
//     size: { width: 8, height: 8 },
//     maxSize: { width: 500, height: 700 },
//     data: ["BBDADACC",
//         "BDBCBCAC",
//         "DBBADCCA",
//         "CACBCBDB",
//         "DBDADACA",
//         "CAABCDDB",
//         "ACADADBD",
//         "AACBCBDD"
//     ],
//     // data: ["CB", "DD", "CB", "DD"],
//     horizontalSymmetry: false,
//     verticalSymmetry: false
// });

// var blockTwo = new Block({
//     type: "static",
//     size: { width: 12, height: 12 },
//     maxSize: { width: 500, height: 700 },
//     data: ["BBDCACBDBACC",
//         "BBBDCADBACCC",
//         "DBBBDCBACCCA",
//         "ADBBBDACCCAD",
//         "CADBBBCCCADB",
//         "ACADBBCCADBD",
//         "BDBCAADDBCAC",
//         "DBCAAADDDBCA",
//         "BCAAACBDDDBC",
//         "CAAACDABDDDB",
//         "AAACDBCABDDD",
//         "AACDBDACABDD"
//     ],
//     // data: ["AD", "CB", "AD", "CB"],
//     // data: ["CC", "DD", "CC", "DD"],
//     horizontalSymmetry: false,
//     verticalSymmetry: false
// });
