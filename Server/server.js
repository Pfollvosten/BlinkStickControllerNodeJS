var http = require("http");
var url = require('url');

var blinkstick = require('blinkstick');
var device = blinkstick.findFirst();
device.inverse = true;

device.setColor('green');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var q = url.parse(req.url, true).query;
    //var txt = q.mode + " " + q.color;
    var mode = q.mode;
    var color = q.color;
    
    //device.setColor(color);

    res.end(mode + " " + color);
}).listen(8081);
// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');