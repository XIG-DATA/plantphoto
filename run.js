var cc = require('./main.js');
var async = require('async');
var print_r = require('print_r');
// var photoIds = [1, 2, 3, 4, 5, 6, 7 , 8 , 9 , 10];
// photoIds.forEach(function (photoId) {
//     cc.getAll(photoId);
// });


var n = 10;
for (var i = 0 ; i < 260 ; i++){
	//var N = 100; 
	//photoIds = Array.apply(null, {length: N}).map(Number.call, Number)
	//photoIds = photoIds.slice(1, N)
	var photoIds= [];
	var lowEnd = i * n;
	var highEnd = i * n + n ;
	for (var j = lowEnd; j < highEnd; j++) {
    	photoIds.push(j);
    	//console.log(j);
	}

	async.mapLimit(photoIds, n, function(photoId){
		cc.getAll(photoId)
		console.log("fetch:"+photoId+".successful");
	});
}