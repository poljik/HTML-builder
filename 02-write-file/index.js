const fs = require('fs');
const path =  require('path');

const pathFile = path.join(__dirname,'text.txt');
const output = fs.createWriteStream(pathFile);

console.log('Please, enter something funny here:');

process.stdin.on('data', txt => {
  if(txt.toString().slice(0,-1) === 'exit') process.exit();
  output.write(txt);
});

process.on('exit', () => console.log('Bye-bye! :)'));
process.on('SIGINT', () => process.exit());