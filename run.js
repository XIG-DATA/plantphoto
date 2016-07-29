var cc = require('./main.js');
var async = require('async');
var photoIds = [1, 2, 3, 4, 5, 6, 7 , 8 , 9 , 10];

// photoIds.forEach(function (photoId) {
//     cc.getAll(photoId);
// });

async.mapLimit(photoIds,10,function(photoId){
	cc.getAll(photoId)
	console.log("fetch:"+photoId+".successful");
});