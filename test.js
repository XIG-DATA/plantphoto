var n = 10;
var N = 1000;
var photoIds = [];

var run = require('./run.js');

for (var i = 1; i <= N; i++){
	photoIds.push(i);
}

run.getImages(photoIds, n );