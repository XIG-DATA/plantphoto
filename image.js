var http = require('http');
var fs = require('fs');
var debug = require('./debug.js').debug;
var debugNL = require('./debug.js').debugNL;

photoid = 2380756;


var imgOptions = {
    hostname: 'img.plantphoto.cn',
    port: 80,
    path: '/image2/b/2380756.jpg',
    method: 'GET',
    headers: {
        'Host': 'img.plantphoto.cn',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36', 
        'Referer': 'http://www.plantphoto.cn/tu/2380756', 
        'Accept': 'image/webp,image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4,zh-TW;q=0.2',
        'Accept-Encoding': 'gzip, deflate, sdch',
        'Cookie': 'AJSTAT_ok_pages=2; AJSTAT_ok_times=1',
        'X-Requested-With': 'XMLHttpRequest',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    }
};

var filename = photoid + '.png';

debugNL(' -- Start fetching image ' + photoid + ' -- ');
http.get(imgOptions, function(res) {
    debugNL('SYN', res.statusCode, res.statusMessage);

    var data = new Buffer('');
    res.on('data', function(chunk) {
        debug(chunk.length + ' ');
        var length = data.length + chunk.length;
        data = Buffer.concat([data, chunk], length);
    });

    res.on('end', function() {
        debugNL('\nFinish: image size', data.length);
        fs.writeFile(filename, data, function(err) {
            if (err) {
                debugNL('Failed to get ' + photoid);
            } else {
                debugNL('Fetch image' + photoid + ' successfully\n');
            }
        });
    });
});  