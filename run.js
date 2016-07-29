var cc = require('./main.js');

var photoIds = [140491, 1236620];

photoIds.forEach(function (photoId) {
    cc.getAll(photoId);
});