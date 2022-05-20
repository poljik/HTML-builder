const fs = require('fs');
const path =  require('path');

const pathFile = path.join(__dirname,'text.txt');

const readableStream = fs.createReadStream(pathFile);
readableStream.on('data', chunk => process.stdout.write(chunk.toString()));