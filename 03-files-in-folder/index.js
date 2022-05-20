const fs = require('fs');
const path =  require('path');
const pathSecret = path.join(__dirname,'secret-folder');

(async function () {
	const files = await fs.promises.readdir(pathSecret, {withFileTypes: true});
	files.forEach(element => {
		if (element.isFile()) {
			const filePath = path.join(pathSecret, element.name);
			const fileName = element.name.split('.');
			fs.stat(filePath, (err, stats) => {
				console.log(fileName[0],"-", fileName[1], "-", stats.size);
			});
		}
	});
} () );