var http = require('http');
var fs = require('fs');
var debug = require('./debug.js').debug;
var debugNL = require('./debug.js').debugNL;
var EventProxy = require('eventproxy');


// photoid = 2380756;
// photoid = 2761650;
photoid = 140491;

var nameData = JSON.stringify({ "t": "latin", "pid": photoid, "l": 0.7412579082985606 });
var placeData = { "t": 0.013138658221931943, "mid": 'todo' };
var listData = JSON.stringify({ "t": 'photo', "l": 0.35521532248876864, "pid": photoid });

var referer = 'http://www.plantphoto.cn/tu/' + photoid;
var nameOptions = {
    hostname: 'www.plantphoto.cn',
    port: 80,
    path: '/ashx/getotherinfo.ashx?t=latin&pid=' + photoid + '&l=0.7412579082985606',
    method: 'GET',
    headers: {
        'Content-Length': Buffer.byteLength(nameData),
        'Host': 'www.plantphoto.cn',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36', 
        'Referer': referer,
        'Accept-Language': 'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4,zh-TW;q=0.2',
        'Accept-Encoding': 'gzip, deflate, sdch',
        'Cookie': 'AJSTAT_ok_pages=2; AJSTAT_ok_times=1',
        'X-Requested-With': 'XMLHttpRequest',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    }
};

var placeOptions = {
    hostname: 'www.plantphoto.cn',
    port: 80,
    // path: '/ashx/memberinfomd5.ashx?t=0.013138658221931943&mid=392639BD762CD4F1',
    method: 'GET',
    headers: {
        // 'Content-Length': Buffer.byteLength(placeData),
        'Host': 'www.plantphoto.cn',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36', 
        'Referer': referer,
        'Accept-Language': 'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4,zh-TW;q=0.2',
        'Accept-Encoding': 'gzip, deflate, sdch',
        'Cookie': 'AJSTAT_ok_pages=2; AJSTAT_ok_times=1',
        'X-Requested-With': 'XMLHttpRequest',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    }
};   

var midOptions = {
    hostname: 'www.plantphoto.cn',
    port: 80,
    path: '/tu/' + photoid,
    method: 'GET',
    headers: {
        'Host': 'www.plantphoto.cn',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36', 
        'Accept-Language': 'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4,zh-TW;q=0.2',
        'Accept-Encoding': 'gzip, deflate, sdch',
        'Cookie': 'AJSTAT_ok_pages=2; AJSTAT_ok_times=1',
        'X-Requested-With': 'XMLHttpRequest',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    }
};   


var listOptions = {
    hostname: 'www.plantphoto.cn',
    port: 80,
    path: '/ashx/getotherinfo.ashx?t=photo&pid=' + photoid + '&l=0.35521532248876864',
    method: 'GET',
    headers: {
        'Content-Length': Buffer.byteLength(placeData),
        'Host': 'www.plantphoto.cn',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36', 
        'Referer': referer,
        'Accept-Language': 'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4,zh-TW;q=0.2',
        'Accept-Encoding': 'gzip, deflate, sdch',
        'Cookie': 'AJSTAT_ok_pages=2; AJSTAT_ok_times=1',
        'X-Requested-With': 'XMLHttpRequest',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    }
};   

var imgOptions = {
    hostname: 'img.plantphoto.cn',
    port: 80,
    path: '/image2/b/' + photoid + '.jpg',
    method: 'GET',
    headers: {
        'Host': 'img.plantphoto.cn',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36', 
        'Referer': referer, 
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

var ep = EventProxy.create('name', 'place', 'list', 'image', function (name, place, list, imageName) {
    console.log('PhotoId', photoid);
    console.log('Name', name);
    console.log('Place', place);
    console.log('List', list);
    console.log('ImageName', imageName);
});

http.get(nameOptions, function(res) {
    res.on("data", function(chunk) {
        ep.emit('name', chunk.toString());
    });
});

http.get(listOptions, function(res) {
    res.on("data", function(chunk) {
        ep.emit('list', chunk.toString());
    });
});

debugNL(' -- Start fetching image ' + photoid + ' -- ');
http.get(imgOptions, function(res) {
    console.log('SYN', res.statusCode, res.statusMessage);

    var data = new Buffer('');
    res.on('data', function(chunk) {
        debug(chunk.length + ' ');
        var length = data.length + chunk.length;
        data = Buffer.concat([data, chunk], length);
    });

    res.on('end', function() {
        debugNL('\nFinish: image size', data.length);
        var filename = photoid + '.jpg';
        fs.writeFile(filename, data, function(err) {
            if (err) {
                debugNL('Failed to get ' + photoid);
            } else {
                debugNL('Fetch image' + photoid + ' successfully\n');
                ep.emit('image', filename);
            }
        });
    });
});  


var ep_mid = EventProxy.create('photo_mid', function(photo_mid) {
    if (photo_mid === null) {
        ep.emit('place', 'cannot get photo_mid');
        return;
    }
    placeData.mid = photo_mid;
    placeData = JSON.stringify(placeData);
    placeOptions.headers['Content-Length'] = Buffer.byteLength(placeData);
    placeOptions.path = '/ashx/memberinfomd5.ashx?t=0.013138658221931943&mid=' + photo_mid;
    http.get(placeOptions, function(res) {
        res.on("data", function(chunk) {
            ep.emit('place', chunk.toString());
        });
    });
});

http.get(midOptions, function(res) {
    var data = new Buffer('');
    res.on('data', function(chunk) {
        debug(chunk.length + ' ');
        var length = data.length + chunk.length;
        data = Buffer.concat([data, chunk], length);
    });

    res.on('end', function() {
        var text = data.toString();

        var photo_mid_pattern = /var photo_mid = \"([0-9A-Za-z]+)\";/;
        var result = photo_mid_pattern.exec('var photo_mid = "5C1E6927C98647ED";');
        if (result === null) {
            console.error('cannot find mid');
            ep_mid.emit('photo_mid', null);
            return;
        }
        var photo_mid = result[1];
        console.log('mid', photo_mid);
        ep_mid.emit('photo_mid', photo_mid);
    });
}); 
