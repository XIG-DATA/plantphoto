var http = require('http');

photoid = 2380756;

var nameData = JSON.stringify({ "t": "latin", "pid": photoid, "l": 0.7412579082985606 });
var placeData = JSON.stringify({ "t": 0.013138658221931943, "mid": '392639BD762CD4F1' });
var listData = JSON.stringify({ "t": 'photo', "l": 0.35521532248876864, "pid": photoid });

var nameOptions = {
    hostname: 'www.plantphoto.cn',
    port: 80,
    path: '/ashx/getotherinfo.ashx?t=latin&pid=2380756&l=0.7412579082985606',
    method: 'GET',
    headers: {
        'Content-Length': Buffer.byteLength(nameData),
        'Host': 'www.plantphoto.cn',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36', 
        'Referer': 'http://www.plantphoto.cn/tu/2380756',
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
    path: '/ashx/memberinfomd5.ashx?t=0.013138658221931943&mid=392639BD762CD4F1',
    method: 'GET',
    headers: {
        'Content-Length': Buffer.byteLength(placeData),
        'Host': 'www.plantphoto.cn',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36', 
        'Referer': 'http://www.plantphoto.cn/tu/2380756',
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
    path: '/ashx/getotherinfo.ashx?t=photo&pid=2380756&l=0.35521532248876864',
    method: 'GET',
    headers: {
        'Content-Length': Buffer.byteLength(placeData),
        'Host': 'www.plantphoto.cn',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36', 
        'Referer': 'http://www.plantphoto.cn/tu/2380756',
        'Accept-Language': 'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4,zh-TW;q=0.2',
        'Accept-Encoding': 'gzip, deflate, sdch',
        'Cookie': 'AJSTAT_ok_pages=2; AJSTAT_ok_times=1',
        'X-Requested-With': 'XMLHttpRequest',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    }
};   

http.get(nameOptions, function(res) {
    console.log("\nName: " + res.statusCode);
    res.on("data", function(chunk) {
        console.log("   name: " + chunk);
    });
});

http.get(placeOptions, function(res) {
    console.log("\nPlace: " + res.statusCode);
    res.on("data", function(chunk) {
        console.log("   place: " + chunk);
    });
});

http.get(listOptions, function(res) {
    console.log("\nList: " + res.statusCode);
    res.on("data", function(chunk) {
        console.log("   list: " + chunk);
    });
});



  