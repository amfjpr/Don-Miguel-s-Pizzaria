const path = require('path');

// function to hold all the page routes
var router = function(app) {

  // home page route
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/../client/home.html"));
  });

  // view data page route
  app.get('/view-data', function(req, res) {
    res.sendFile(path.join(__dirname + "/../client/view-data.html"));
  });

  // write data page route
  app.get('/write-data', function(req, res) {
    res.sendFile(path.join(__dirname + "/../client/write-data.html"));
  });

  // extra browse page route
  app.get('/browse', (req, res) => {
    res.sendFile(path.join(__dirname + "/../client/browse.html"));
  });
}

module.exports = router; // export the router so app.js can use it

