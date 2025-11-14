const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// allow requests from other origins
app.use(cors());

// allow server to read JSON data
app.use(bodyParser.json());

// allow server to read form data (POST)
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from the client folder
app.use("/client", express.static(path.resolve(__dirname + "/../client/")));
app.use(express.static(path.resolve(__dirname + "/../client/")));

// load page routes
const router = require('./router');
router(app);

// load service endpoints (like write-record)
const services = require('./services');
services(app);

// start the server on port 5000
const port = 5000;
app.listen(port, err => {
  if (err) throw err; // show error if server fails
  console.log("Listening on port: " + port); // message to show server is running
});
