
var async = require('async');
var eventproxy = require('eventproxy');
var superagent = require('superagent');
var fs = require('fs');

var getImages = function(photoIds , n ){
	var ep = new eventproxy();

	ep.after('topic_html', photoIds.length,function(list){
			var list=list.map(function(every_list){
			return({
				href: every_list
			})
		});
	});

	async.mapLimit(photoIds, n, function(photoid, callback){

			var referer = 'http://www.plantphoto.cn/tu/' + photoid;
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
		            }else {
		                var filename = photoid + '.jpg';
		                console.log('image : ', filename);
		                callback();
		                ep.emit('topic_html', res.body);
		                fs.writeFile('img/' + filename, res.body, function(err) {
			                if (err) {
			                    console.log('Failed to get ' + photoid);
			                } else {
			                    console.log('Fetch image ' + photoid + ' successfully\n');
			                }
		                });
		            }
		    });
	},function(err){
		console.log(err);
	});

}

var getOtherInfo = function(photoIds, n ){

	var ep = new eventproxy();

	ep.after('topic_html', photoIds.length,function(list){
			var list=list.map(function(every_list){
			return({
				href: every_list
			})
		});
	});

	async.mapLimit(photoIds, n, function(photoid, callback){
			var referer = 'http://www.plantphoto.cn/tu/' + photoid;
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
		            }else {
		                var filename = photoid + '.jpg';
		                console.log('name', res.text);
		                callback();
		                ep.emit('topic_html', res.txt);
		                // fs.writeFile('img/' + filename, res.body, function(err) {
			               //  if (err) {
			               //      console.log('Failed to get ' + photoid);
			               //  } else {
			               //      onsole.log('Fetch image ' + photoid + ' successfully\n');
			               //      ep.emit('ok');
			               //  }
		                // });
		            }
		    });
	},function(err){
		console.log(err);
	});

}

module.exports = {
    getOtherInfo: getOtherInfo,
    getImages : getImages
}