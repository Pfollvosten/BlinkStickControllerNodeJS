var http = require("http");
var url = require('url');
var fs = require("fs");

var blinkstick = require('blinkstick');
var device = blinkstick.findFirst();
device.inverse = true;

device.setColor('red');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var q = url.parse(req.url, true).query;
    //var txt = q.mode + " " + q.color;
    var mode = q.mode;
    var color = q.color;
    
    //device.setColor(color);

    res.end(mode + " " + color);
}).listen(8187, '192.168.178.28');


fs.readFile('index.html', function(err, data){
    if(err){
        return console.error(err);
    }
    console.log("Async read: " + data.toString());
});