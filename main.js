var blinkstick = require('blinkstick');
var device = blinkstick.findFirst();

device.inverse = true;
device.blink(250 , 100 ,0);
