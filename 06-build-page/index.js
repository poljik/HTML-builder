const fsp = require('fs/promises');
const fs = require('fs');
const path =  require('path');
const pathTo = path.join(__dirname,'project-dist');

async function mergeStyles(pathFrom, pathTo) {
  const filesFrom = await fsp.readdir(pathFrom,  {withFileTypes: true});

  await fsp.writeFile(
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
}

async function copyDir(pathFrom, pathTo) {
  try {
    await fsp.access(pathTo);
  } catch {
    await fsp.mkdir(pathTo, (err) => {
      if (err) throw err;
    });
  }

  const filesFrom = await fsp.readdir(pathFrom,  {withFileTypes: true});
  
  filesFrom.forEach(element => {
    const from = path.join(pathFrom, element.name);
    const to = path.join(pathTo, element.name);
    element.isFile() ? fsp.copyFile(from, to): copyDir(from, to);
  });
}

(async function () {
  await fsp.rm(pathTo, {recursive: true, force: true}, (err) =>{
    if (err) throw err;
  });
  await fsp.mkdir(pathTo, (err) => {
    if (err) throw err;
  });
  
  let template = await fsp.readFile(path.join(__dirname, 'template.html'), 'utf-8', {withFileTypes: true});

  const articles = await fsp.readFile(path.join(__dirname, 'components', 'articles.html'), 'utf-8', {withFileTypes: true});
  const footer = await fsp.readFile(path.join(__dirname, 'components', 'footer.html'), 'utf-8', {withFileTypes: true});
  const header = await fsp.readFile(path.join(__dirname, 'components', 'header.html'), 'utf-8', {withFileTypes: true});
  
  template = template.replaceAll('{{articles}}', articles);
  template = template.replaceAll('{{footer}}', footer);
  template = template.replaceAll('{{header}}', header);
  
  await fsp.writeFile(path.join(pathTo, 'index.html'), template, (err) => {
    if (err) throw err;
  });
  
  mergeStyles(path.join(__dirname, 'styles'), path.join(pathTo, 'style.css'));

  copyDir(path.join(__dirname, 'assets'), path.join(pathTo, 'assets'));
} () );