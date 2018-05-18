var http = require("http");
var url = require('url');

var blinkstick = require('blinkstick');
var device = blinkstick.findFirst();
device.inverse = true;

server = http.createServer(function (req, res) {
    console.log('request starting...');

    //respond
    res.write('hello client!');
    res.end();


    /*
    res.writeHead(200, {'Content-Type': 'text/html'});
    var q = url.parse(req.url, true).query;
    var txt = q.mode + " " + q.color;
    var mode = q.mode;
    var color = q.color;
    device.setColor(color);
    res.end(mode + " " + color);
    */
})
server.listen(8187);//, '192.168.178.28');
console.log('Server up and running');