const fsp = require('fs/promises');
const fs = require('fs');
const path =  require('path');
const pathFrom = path.join(__dirname,'styles');
const pathTo = path.join(__dirname,'project-dist', 'bundle.css');

(async function () {
  const filesFrom = await fsp.readdir(pathFrom,  {withFileTypes: true});

  fs.writeFile(
    pathTo, '', (err) => {
      if (err) throw err;
    });
	
  filesFrom.forEach(element => {
    if (element.isFile() && element.name.split('.')[1] === 'css') {
      fs.readFile(
        path.join(pathFrom, element.name), 'utf-8', (err, data) => {
          if (err) throw err;
          fs.appendFile(
            pathTo, data, (err) => {
              if (err) throw err;
            }
          );    
        }
      );
    }
  });
} () );