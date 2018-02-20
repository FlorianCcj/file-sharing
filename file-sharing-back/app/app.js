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
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});

var storage = multer.diskStorage({
  // destination
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

app.options('/api/upload', function(req, res) {
  res.send();
});

app.get('/api/files', function(req, res) {
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

app.post("/api/upload", upload.array("uploads[]", 12), function (req, res) {
  res.send(req.files);
});

app.options('/api/file/:filename', function(req, res) {
  res.send();
});

app.delete('/api/file/:filename', function(req, res) {
  // todo: here there is a deprecated to understand !!!!
  fs.unlink(process.cwd() + '/uploads/' + req.params.filename);
  res.send({});
});

var server = app.listen(port, function () {
  console.log("Listening on port %s...", port);
});