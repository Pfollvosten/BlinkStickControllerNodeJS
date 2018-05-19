//imports
var http = require("http");
var url = require('url');
var blinkstick = require('blinkstick');
var fs = require('fs');
//device setup
var device = blinkstick.findFirst();
device.inverse = true;
//server setup
server = http.createServer(function (req, res) {
    console.log('got request....processing');

    pathname = url.parse(req.url , true).pathname.substring(1);
    if(pathname.substr(pathname.length-4) == 'html'){
        fs.readFile(pathname ,function (err, data){
            res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
            res.write(data);
            res.end();
        });  
    }
    q = url.parse(req.url, true).query;
    applyColor(q.mode , q.color);

}).listen(8187 , '192.168.178.28');
console.log('Server up and running');

//blinkstick control
function applyColor(mode , color){
    switch(mode){
        case "color":
        device.setColor(color);
        break;
        case "flow":
        device.morph(color, 1, 1);
        break;
        case "blink":
        device.blink(color , 1,1 );
        break;
    }
    //console.log("color set to: " + color + " in " + mode + " mode"); //why no working? .toString() ????
}