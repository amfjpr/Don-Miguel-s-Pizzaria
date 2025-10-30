const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());

app.use(function(req,res,next) {
    res.header('Acess-Control-Allow-Origin', '*');
    next();

});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/client", express.static(path.resolve(__dirname + "/../client/")));

const port = 5000;

// Page listeners (our router)

// Service listeners ( our data processes)

// Listen
var server = app.listen (port, function(err){
    if(err) throw err;

    console.log("Listening on port: " + port);
});
