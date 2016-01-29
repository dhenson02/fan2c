'use strict';
let fs = require('fs');

let filename = process.argv[2];
let path = __dirname + "/" + filename;
console.log(filename, path);
fs.readFile(path, {encoding: "utf8"}, (err, data) => {
    let fileObj = JSON.parse(data);
    console.log("data: ", data);
    console.log("fileObj: ", fileObj);
    let newObj = [fileObj[filename.replace(".json", "")]];
    let newFile = JSON.stringify(newObj);
    fs.writeFileSync(path, newFile, {encoding: "utf8"});
    process.exit(0);
});
