const path = require('path');

// Function to hold all our page listeners

var router = function(app) {

app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname + "/../client/home.html"));

    });

app.get('/view-data', function(req, res) {
        res.sendFile(path.join(__dirname + "/../client/view-data.html"));

    });

app.get('/write-data', function(req, res) {
       res.sendFile(path.join(__dirname + "/../client/write-data.html"));

    });

app.get('/write-data', function(req, res) {
       res.sendFile(path.join(__dirname + "/../client/browse.html"));

    });


}

module.exports = router;