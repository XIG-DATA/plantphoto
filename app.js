var http = require('http');

photoid = 2380756;

var data = { "t": "latin", "pid": photoid, "l": 0.7412579082985606 };

console.log(data);
data = JSON.stringify(data);

// http://www.plantphoto.cn/ashx/getotherinfo.ashx?t=latin&pid=2380756&l=0.7412579082985606

// var options = {
//   hostname: 'www.plantphoto.cn',
//   port: 80,
//   path: '/ashx/getotherinfo.ashx?t=latin&pid=2380756&l=0.7412579082985606',
//   method: 'GET',
//   headers: {
//     // 'Content-Length': Buffer.byteLength(data),
//     // 'Host': 'www.plantphoto.cn',
//     'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36', 
//     'Referer': 'http://www.plantphoto.cn/tu/2380756',
//     'Accept-Language': 'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4,zh-TW;q=0.2',
//     'Accept-Encoding': 'gzip, deflate, sdch',
//     'Cookie': 'AJSTAT_ok_pages=2; AJSTAT_ok_times=1',
//     'X-Requested-With': 'XMLHttpRequest',
//     'Pragma': 'no-cache',
//     'Cache-Control': 'no-cache',
//     'Connection': 'keep-alive'
//   }
// };

var options = {
  hostname: 'www.plantphoto.cn',
  port: 80,
  path: '/ashx/getotherinfo.ashx?t=latin&pid=2380756&l=0.7412579082985606',
  // path: '/ashx/getotherinfo.ashx',
  method: 'GET',
  headers: {
    'Content-Length': Buffer.byteLength(data),
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

var req = http.request(options, function(res) {
    var data = new Buffer('');
    res.on('data', function(chunk) {
      console.log('body new' );
      var length = data.length + chunk.length;
      data = Buffer.concat([data, chunk], length);
    });

    res.on('end', function() {
      console.log('end', data.toString());
    });
    console.log('Back', res.statusCode, res.statusMessage);
    // res.resume();
});

// req.write(data, function() {
//   console.log('a');
// });
req.write('');
req.end();

// http.get(options, function(res) {
//   console.log("Got response: " + res.statusCode);

//   res.on("data", function(chunk) {
//     console.log("BODY: " + chunk);
//   });
// });

  