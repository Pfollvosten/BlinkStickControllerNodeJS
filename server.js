//imports
var http = require("http");
var url = require('url');
var blinkstick = require('blinkstick');
var fs = require('fs');
//device setup
var device = blinkstick.findFirst();
device.inverse = true;

//server setup
/*server = http.createServer(function (req, res) {
    
    q = url.parse(req.url, true).query;
    applyColor(q.mode , q.color);

}).listen(8187 , '192.168.178.28');*/


var server = http.createServer(function (req ,res){
    console.log('got request...processing');

    fs.readFile('./complex/' + req.url , function(err ,data){
        if(!err){
            var dotoffset = req.url.lastIndexOf('.');
            var mimetype = dotoffset == -1
                            ? 'text/plain'
                            : {
                                '.html' : 'text/html',
                                '.ico' : 'image/x-icon',
                                '.jpg' : 'image/jpeg',
                                '.png' : 'image/png',
                                '.gif' : 'image/gif',
                                '.css' : 'text/css',
                                '.js' : 'text/javascript'
                            }[ req.url.substr(dotoffset)];
            res.setHeader('Content-type' , mimetype);
            res.end(data);
            console.log( req.url , mimetype);
        }else{
            console.log('file not found: ' + req.url);
            res.writeHead(404, "Not Found");
            res.end();
        }
    });
}).listen(8187);
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
}