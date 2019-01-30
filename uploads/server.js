const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const fs = require('fs');

app.use('/form', express.static(`${__dirname  }/index.html`));
app.use('/style', express.static(`${__dirname  }/src/css/style.css`));
app.use('/helpers.js', express.static(`${__dirname  }/src/helpers.js`));
app.use('/HttpRequest.js', express.static(`${__dirname  }/src/HttpRequest.js`));
app.use('/progress.js', express.static(`${__dirname  }/src/progress.js`));
app.use('/upload.js', express.static(`${__dirname  }/src/upload.js`));
app.use('/download.js', express.static(`${__dirname  }/src/download.js`));
app.use('/inputsChanger.js', express.static(`${__dirname  }/src/inputsChanger.js`));
app.use('/imgViewer.js', express.static(`${__dirname  }/src/imgViewer.js`));

app.use('/fileList.js', express.static(`${__dirname  }/src/fileList.js`));
app.use('/bg', express.static(`${__dirname  }/src/img/bg.jpg`));
app.use('/logo', express.static(`${__dirname  }/src/img/logo.png`));
app.use('/files', express.static(`${__dirname  }/uploads`));

// default options
app.use(fileUpload());

app.post('/ping', function(req, res) {
  res.send('pong');
});

app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;

  if (Object.keys(req.files).length == 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  console.log('req.files >>>', req.files); // eslint-disable-line

  sampleFile = req.files.sampleFile;

  uploadPath = `${__dirname  }/uploads/${  sampleFile.name}`;

  sampleFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.send(`File uploaded to ${  uploadPath}`);
  });
});

app.get('/list', function(req, res) {
  const uploadPath = `${__dirname }/uploads/`;
  fs.readdir(uploadPath, (err, files) => {
    const resultArr = files.filter(file => file !== '.gitkeep');
    res.send(resultArr);
  });
});

app.listen(8000, function() {
  console.log('Express server listening on port 8000'); // eslint-disable-line
});