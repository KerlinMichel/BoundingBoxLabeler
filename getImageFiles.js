const fs = require('fs');
const path = require('path');

let dir = process.argv[2];


if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " path/to/directory");
    process.exit(-1);
}

let imageFiles = []

fs.readdir(dir, function(err, items) {
    for (var i = 0; i < items.length; i++) {
        var ext = path.extname(items[i]);
        if(ext === '.png' || ext === '.PNG' || ext == '.jpg' || ext === '.JPEG') {
            imageFiles.push(path.join(dir, items[i]));
        }
    }

    console.log(imageFiles);
});

