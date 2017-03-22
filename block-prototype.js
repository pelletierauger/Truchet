var Block = function(block) {
    this.type = block.type;
    this.size = block.size;
    this.data = block.data;
    this.horizontalSymmetry = block.horizontalSymmetry;
    this.verticalSymmetry = block.verticalSymmetry;
    this.fullSpace = this.makeLargeSpace(block);
    this.tiling = this.makeTiling();
};

Block.prototype.makeLargeSpace = function(block) {
    var largeArray = [];
    //Make copies to take care of symmetries,
    //to end up with blocks that can be copied simply without symmetry.

    largeArray = block.data.slice(0);

    while (largeArray[0].length < block.maxSize.width) {
        for (var i = 0; i < largeArray.length; i++) {
            largeArray[i] = largeArray[i] + largeArray[i];
        }
    }
    while (largeArray.length < block.maxSize.height) {
        for (var j = 0; j < block.size.height; j++) {
            largeArray.push(largeArray[j]);
        }
    }
    //At this point, largeArray needs to be "flattened".
    //Each node of largeArray represents an horizontal line...
    var flatArray = "";
    for (var k = 0; k < largeArray.length; k++) {
        flatArray = flatArray + largeArray[k];
    }

    //And then, make a large amount of copies.
    //Return the large array.
    // console.log(largeArray);
    // console.log(flatArray);
    return largeArray;
    // return flatArray;
};

Block.prototype.makeTiling = function() {
    // console.log(this.fullSpace);
    var myTiling = tilingFiller({
        space: this.fullSpace,
        offset: { x: 0, y: 0 },
        outputSize: { width: 32, height: 18 }
    });
    // console.log(myTiling);
    return myTiling;
};

Block.prototype.showTiling = function() {
    for (var x = 0; x < 32 * tileWidth; x += tileWidth) {
        for (var y = 0; y < 18 * tileWidth; y += tileWidth) {
            var current = this.tiling[(x / tileWidth) + (y / tileWidth) * 32];
            // console.log(current);
            showNumeral(current, x, y, tileWidth, light, dark);
        }
    }
};

function tilingFiller(instructions) {
    var space = instructions.space;
    var offset = instructions.offset;
    var size = instructions.outputSize;
    var tiling = [];
    for (var x = 0; x < size.width; x += 1) {
        for (var y = 0; y < size.height; y += 1) {
            tiling[x + y * size.width] = space[offset.y + y][offset.x + x];
            // tiling[x + y * size.width] = space[(offset.x + x) + ((offset.y + y) * size.width)];
        }
    }
    var tilingAsAString = "";
    for (var i = 0; i < tiling.length; i++) {
        tilingAsAString = tilingAsAString + tiling[i];
    }
    console.log(tilingAsAString);
    return tiling;
}

var blockOne = new Block({
    type: "static",
    size: { width: 8, height: 4 },
    maxSize: { width: 500, height: 700 },
    data: ["CBCB", "DFFA", "CBCB", "BCBC"],
    horizontalSymmetry: false,
    verticalSymmetry: false
});

var blockTwo = new Block({
    type: "static",
    size: { width: 8, height: 4 },
    maxSize: { width: 500, height: 700 },
    data: ["ACCA", "DBBD", "FEEF", "CDDC"],
    horizontalSymmetry: false,
    verticalSymmetry: false
});
