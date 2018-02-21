var express = require('express');
var multer = require('multer');
var path = require('path');
var bytes = require('bytes');
var app = express();
var fs = require('fs');
var port = 3003;

// specify the folder
app.use(express.static(path.join(__dirname, 'uploads')));

// headers and content type
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, cache-control");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});

var storage = multer.diskStorage({
  // destination
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function(req, file, cb) {
    var now = formatDate(new Date());
    var [name, extension] = file.originalname.split('.');
    cb(null, name + '_' + now + '.' + extension);
  }
});

var formatDate = function(date) {
  var month = date.getMonth();
  month = (month.length == 2) ? month : '0' + month;
  var day = '' + date.getDay();
  day = (day.length == 2) ? day : '0' + day;
  var hours = '' + date.getHours();
  hours = (hours.length == 2) ? hours : '0' + hours;
  var minutes = '' + date.getMinutes();
  minutes = (minutes.length == 2) ? minutes : '0' + minutes;
  var seconds = '' + date.getSeconds();
  seconds = (seconds.length == 2) ? seconds : '0' + seconds;

  return date.getFullYear() + '-' + month + '-' + day + '_' +
    hours + ':' + minutes + ':' + seconds;
};

var upload = multer({ storage: storage });

app.get('/api/files', function(req, res) {
  console.log('[GET] - ' + '/api/files');
  fs.readdir('./uploads', function(err, files) {
    let currentFiles = [];
    files.forEach(function(file) {
      currentFiles.push({
        id: file,
        size: bytes(fs.statSync('./uploads/' + file).size)
          .replace(/([a-z])B/, '$1iB')
      });
    });
    res.send({ files: currentFiles });
  });
});

app.get('/api/file/:filename', function(req, res) {
  console.log('[GET] - ' + '/api/file/:filename');
  console.log(req.params.filename);
  res.sendFile(process.cwd() + '/uploads/' + req.params.filename);
});

app.options('/api/upload', function(req, res) {
  console.log('[OPTIONS] - ' + '/api/upload');
  res.send();
});

app.post('/api/upload', upload.array("uploads[]", 12), function (req, res) {
  console.log('[POST] - ' + '/api/upload');
  res.send(req.files);
});

app.options('/api/file/:filename', function(req, res) {
  console.log('[OPTIONS] - ' + '/api/file/:filename');
  res.send();
});

app.delete('/api/file/:filename', function(req, res) {
  console.log('[DELETE] - ' + '/api/file/:filename');
  console.log(req.params.filename);
  // todo: here there is a deprecated to understand !!!!
  fs.unlink(process.cwd() + '/uploads/' + req.params.filename);
  res.send({});
});

var server = app.listen(port, function () {
  console.log("Listening on port %s...", port);
});