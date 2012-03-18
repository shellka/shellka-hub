var express = require('express'),
    app = express.createServer(),
    io = require('socket.io').listen( app),
    MapFactory = require('./models/mapfactory');

app.use(express.static(__dirname + '/public'));
app.listen( 8080 );

io.set('log level', 1);

var map = new MapFactory();

io.sockets.on('connection', function (socket) {

    io.sockets.emit('mapSector',  map.newSector( ));

});