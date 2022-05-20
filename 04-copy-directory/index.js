const fs = require('fs/promises');
const path =  require('path');
const pathFrom = path.join(__dirname,'files');
const pathTo = path.join(__dirname,'files-copy');
console.log(pathTo);

(async function () {
  await fs.rm(pathTo, {recursive: true, force: true}, (err) =>{
    if (err) console.log(err);
  });

  await fs.mkdir(pathTo, (err) => {
    if (err) console.log(err);
  });

  const filesFrom = await fs.readdir(pathFrom);
	filesFrom.forEach(element => {
    let from = path.join(pathFrom, element);
    let to = path.join(pathTo, element);
    fs.copyFile(from, to);
	});
} () );