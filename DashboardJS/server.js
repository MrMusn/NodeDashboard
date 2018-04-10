const express = require('express');
const app = express();
const http = require('http');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

app.use('/freeboard',express.static('freeboard'));
app.get('/', function(req, res){
  res.redirect('http://localhost:8081');
});
app.listen(8080, () => console.log('Dashboard App listening on port 8080!'));

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = './freeboard/upload/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err){
          var filePath = path.join(__dirname, '/management/faliure.html');
          var stat = fs.statSync(filePath);
          res.writeHead(200, {'Content-Type': 'text/html'});
          var readStream = fs.createReadStream(filePath);
          // We replaced all the event handlers with a simple call to readStream.pipe()
          readStream.pipe(res);
        }
        else
        {
          var filePath = path.join(__dirname, '/management/success.html');
          var stat = fs.statSync(filePath);
          res.writeHead(200, {'Content-Type': 'text/html'});
          var readStream = fs.createReadStream(filePath);
          // We replaced all the event handlers with a simple call to readStream.pipe()
          readStream.pipe(res);
        }
      });
 });
  } else {
    var filePath = path.join(__dirname, '/management/index.html');
    var stat = fs.statSync(filePath);
    res.writeHead(200, {'Content-Type': 'text/html'});
    var readStream = fs.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(res);
  }
}).listen(8081, () => console.log('Upload App listening on port 8081!'));
