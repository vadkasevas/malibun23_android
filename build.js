// https://www.androiddevice.info

var sax = require('./.npm/package/node_modules/sax/lib/sax.js');
var fs = require('fs');

var deviceData = {};
var submission_id = null;

var saxStream = sax.createStream(false, {});
var blocksCount = 0;
saxStream.on("error", function (e) {
    console.error("error!", e);
    this._parser.error = null;
    this._parser.resume();
});
saxStream.on("opentag", function (node) {
    if(node.attributes&&node.attributes.UDID)
        submission_id = node.attributes.UDID;
});
saxStream.on('text',function(text){
    blocksCount++;
    if(text&&text.trim()) {
        try {
            var data = JSON.parse(text);
            var props = data.props ? data.props : (data.properties||null );
            var javasys = data.javasys;
            if(!props||!javasys)
                return;
            var device = props['ro.product.device'];
            var product = props['ro.build.product'];
            var release = props['ro.build.version.release'];
            var sdk = Number( props['ro.build.version.sdk'] );
            var model = props['ro.product.model'];
            var manufacturer = props['ro.product.manufacturer'];
            var hardware = props['ro.boot.hardware'];
            var x = Number(data.display&&data.display.x?data.display.x:0);
            var y = Number(data.display&&data.display.y?data.display.y:0);
            var submission = Number( submission_id );
            var useragent = javasys['http.agent'];

            if (useragent && device && product && release && sdk && model && manufacturer && hardware && x && y) {
                if(deviceData[model])
                    return;
                deviceData[model] = {
                    submission_id: submission,
                    'product': product,
                    device: device,
                    model: model,
                    manufacturer: manufacturer,
                    hardware: hardware,
                    version: {release: release, int: sdk},
                    screen: {x: x, y: y},
                    useragent:useragent
                }
            }
        }catch(e){
            console.log(e);
        }
    }
});

var readStream = fs.createReadStream('.data/raw.xml');
var logInterval = null;

readStream.on('close',()=>{
    setTimeout(()=>{
        var devices = [];
        for(var model in deviceData){
            var device = deviceData[model];
            devices.push(device);
        }

        fs.writeFile('server/devices.json', JSON.stringify(devices), (err) => {
            clearInterval(logInterval);
            if (err) throw err;
            console.log('Success builded server/devices.json');
        });


    },1000);
});
readStream
    .pipe(saxStream);

logInterval = setInterval(()=>{
    console.log('building....blocksCount:'+blocksCount);
},1000);

