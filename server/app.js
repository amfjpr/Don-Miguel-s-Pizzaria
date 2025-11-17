const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/client", express.static(path.resolve(__dirname + "/../client/")));
app.use(express.static(path.resolve(__dirname + "/../client/")));

const router = require('./router');
router(app);

const services = require('./services');
services(app);

const port = 5000;
app.listen(port, err => {
  if (err) throw err;
  console.log("Listening on port: " + port);
});
