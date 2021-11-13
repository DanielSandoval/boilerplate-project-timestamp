// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function(req, res) {
  var dateString = req.params.date;
  var date = new Date(dateString);
  var dateUtc;
  var dateTimestamp;
  if(date != "Invalid Date") {
    dateUtc = date.toUTCString();
    dateTimestamp = Date.parse(dateUtc);
    res.json({unix: dateTimestamp, utc: dateUtc});
  }
  else {
    date = new Date(parseInt(dateString));
    if(date != "Invalid Date") {
      dateTimestamp = Date.parse(date);
      dateUtc = date.toUTCString();
      res.json({unix: dateTimestamp, utc: dateUtc});
    }
    else if(!dateString) {
      date = new Date(Date.now());
      res.json({unix: Date.parse(date), utc: date.toUTCString()});
    }
    else {
      res.json({error: date.toUTCString()});
    }
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
