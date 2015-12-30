'use strict';

var express = require('express');

var app = express();

var path = process.cwd();
console.log(path);

app.use('/', express.static('./'));

app.route('/')
  .get(function(req, res) {
    console.log('root');
    res.sendFile(path + '/src/index.html');
  });

app.route('/:query')
  .get(function(req, res) {
    console.log(req.url);
    res.status(200).send();
    res.end();
  });

app.listen(process.env.PORT || 8080, function() {
  console.log('listening');
});
