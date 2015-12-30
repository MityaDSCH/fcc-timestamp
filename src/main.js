'use strict';

var express = require('express');
var moment = require('moment');

var app = express();

var path = process.cwd();
console.log(path);

app.use('/', express.static('./'));

app.route('/')
  .get(function(req, res) {
    res.sendFile(path + '/src/index.html');
  });

app.route('/:query')
  .get(function(req, res) {

    var query = req.params.query;
    if (query === 'favicon.ico') {
      res.end();
      return null;
    }
    if (!isNaN(query)) {
      query = parseInt(query, 10);
    }

    var date = new Date(query);
    if (date.getTime()) {
      res.json({
        unix: date.getTime(),
        natural: moment(date).format('MMMM DD, YYYY')
      })
    } else {
      res.json({
        unix: null,
        natural: null
      })
    }

    res.end();

  });

app.listen(process.env.PORT || 8080, function() {
  console.log('listening');
});
