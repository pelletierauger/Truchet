var Block = function(block) {
    this.type = block.type;
    this.size = block.size;
    this.data = block.data;
    this.horizontalSymmetry = block.horizontalSymmetry;
    this.verticalSymmetry = block.verticalSymmetry;
    this.fullSpace = this.makeLargeSpace(block)
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
    //And then, make a large amount of copies.
    //Return the large array.
    console.log(largeArray);
};

var blockOne = new Block({
    type: "static",
    size: { width: 8, height: 4 },
    maxSize: { width: 500, height: 700 },
    data: ["ABBACDAB", "CDDBDADD", "CDABCDAB", "DADDDADD"],
    horizontalSymmetry: false,
    verticalSymmetry: false
});
