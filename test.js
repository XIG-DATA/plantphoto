var http = require('http');
var fs = require('fs');
var EventProxy = require('eventproxy');
var superagent = require('superagent');
var debug = require('./debug.js').debug;
var debugNL = require('./debug.js').debugNL;

var photoid = 140491;

var referer = 'http://www.plantphoto.cn/tu/' + photoid;

var ep = EventProxy.create('name', 'place', 'list', 'image', function (name, place, list, imageName) {
    console.log('PhotoId', photoid);
    console.log('Name', name);
    console.log('Place', place);
    console.log('List', list);
    console.log('ImageName', imageName);
});

superagent
    .get('www.plantphoto.cn/ashx/getotherinfo.ashx')
    .query({ 't': 'latin' })
    .query({ 'pid': photoid })
    .query({ 'l': '0.7412579082985606' })
    .set('Host', 'www.plantphoto.cn')
    .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36')
    .set('Accept-Language', 'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4,zh-TW;q=0.2')
    .set('Accept-Encoding', 'gzip, deflate, sdch')
    .set('Cookie', 'AJSTAT_ok_pages=2; AJSTAT_ok_times=1')
    .set('X-Requested-With', 'XMLHttpRequest')
    .set('Pragma', 'no-cache')
    .set('Cache-Control', 'no-cache')
    .set('Connection', 'keep-alive')
    .end(function(err, res){
        if (err) {
            console.log(err);
        } else {
            // console.log('Name', res.text);
            ep.emit('name', res.text);
        }
    });

var ep_mid = EventProxy.create('photo_mid', function(photo_mid) {
    if (photo_mid === null) {
        ep.emit('place', 'cannot get photo_mid');
        return;
    }
    superagent
        .get('www.plantphoto.cn/ashx/memberinfomd5.ashx')
        .query({ 't': '0.013138658221931943' })
        .query({ 'mid': photo_mid })
        .set('Host', 'www.plantphoto.cn')
        .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36')
        .set('Accept-Language', 'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4,zh-TW;q=0.2')
        .set('Accept-Encoding', 'gzip, deflate, sdch')
        .set('Cookie', 'AJSTAT_ok_pages=2; AJSTAT_ok_times=1')
        .set('X-Requested-With', 'XMLHttpRequest')
        .set('Pragma', 'no-cache')
        .set('Cache-Control', 'no-cache')
        .set('Connection', 'keep-alive')
        .end(function(err, res){
            if (err) {
                console.log(err);
            } else {
                ep.emit('place', res.text);
            }
        });
});

// get photo_mid
superagent
    .get('http://www.plantphoto.cn/tu/' + photoid)
    .end(function (err, res) {
        if (err) {
            console.error(err);
            return;
        }
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


superagent
    .get('www.plantphoto.cn/ashx/getotherinfo.ashx')
    .query({ 't': 'photo' })
    .query({ 'pid': photoid })
    .query({ 'l': '0.35521532248876864' })
    .set('Host', 'www.plantphoto.cn')
    .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36')
    .set('Accept-Language', 'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4,zh-TW;q=0.2')
    .set('Accept-Encoding', 'gzip, deflate, sdch')
    .set('Cookie', 'AJSTAT_ok_pages=2; AJSTAT_ok_times=1')
    .set('X-Requested-With', 'XMLHttpRequest')
    .set('Pragma', 'no-cache')
    .set('Cache-Control', 'no-cache')
    .set('Connection', 'keep-alive')
    .end(function(err, res){
        if (err) {
            console.log(err);
        } else {
            // console.log('List', res.text);
            ep.emit('list', res.text);
        }
    });

superagent
    .get('img.plantphoto.cn/image2/b/' + photoid + '.jpg')
    .set('Host', 'img.plantphoto.cn')
    .set('Accept', 'image/webp,image/*,*/*;q=0.8')
    .set('Referer', referer)
    .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36')
    .set('Accept-Language', 'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4,zh-TW;q=0.2')
    .set('Accept-Encoding', 'gzip, deflate, sdch')
    .set('Cookie', 'AJSTAT_ok_pages=2; AJSTAT_ok_times=1')
    .set('X-Requested-With', 'XMLHttpRequest')
    .set('Pragma', 'no-cache')
    .set('Cache-Control', 'no-cache')
    .set('Connection', 'keep-alive')
    .end(function(err, res){
        if (err) {
            console.log(err);
        } else {
            var filename = photoid + '.jpg';
            // console.log('Image', filename);

            fs.writeFile(filename, res.body, function(err) {
            if (err) {
                console.log('Failed to get ' + photoid);
            } else {
                // console.log('Fetch image ' + photoid + ' successfully\n');
                ep.emit('image', filename);
            }
        });
        }
    });




  