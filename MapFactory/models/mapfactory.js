
var MapFactory = module.exports = function () {

    this.maps = [];

};

var Zone = function ( name, sizeX, sizeY ) {

    this.name = name;
    this.sectors = [];

};

var MapSector = function (name, x, y) {

    this.background = "grassRepeat";
    this.name = name;
    this.x = x;
    this.y = y;

};

MapFactory.prototype.newSector = function () {

    return new MapSector( "test", 0, 0 );

};