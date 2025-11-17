const fs = require("fs");
const path = require("path");

const database_file = path.join(__dirname + "/files/data.txt");

var services = function (app) {

  app.post("/write-record", function (req, res) {

    var newpizzaData = {
      id: req.body.id,
      orderID: req.body.orderID,
      customer: req.body.customer,
      pizza: req.body.pizza,
      size: req.body.size,
      price: req.body.price
    };

    var pizzaData = [];

    if (fs.existsSync(database_file)) {
      var data = fs.readFileSync(database_file, "utf-8");
      if (data) {
        pizzaData = JSON.parse(data);
      }
    }

    pizzaData.push(newpizzaData);

    fs.writeFileSync(database_file, JSON.stringify(pizzaData));
    res.send(JSON.stringify({ msg: "SUCCESS" }));
  });

  app.get("/get-records", function (req, res) {
    var pizzaData = [];

    if (fs.existsSync(database_file)) {
      var data = fs.readFileSync(database_file, "utf-8");
      if (data) pizzaData = JSON.parse(data);
      res.json({ msg: "SUCCESS", fredData: pizzaData });
    } else {
      res.json({ msg: "SUCCESS", fredData: [] });
    }
  });

  // ⬇⬇⬇ NEW – DELETE service requested in Assignment 4.2
  app.delete("/delete-record", function (req, res) {
    var deleteID = req.body.id;
    var pizzaData = [];

    if (fs.existsSync(database_file)) {
      var data = fs.readFileSync(database_file, "utf-8");
      if (data) {
        pizzaData = JSON.parse(data);
      }

      for (var i = 0; i < pizzaData.length; i++) {
        if (pizzaData[i].id === deleteID) {
          pizzaData.splice(i, 1);
          break;
        }
      }

      fs.writeFileSync(database_file, JSON.stringify(pizzaData));
      res.json({ msg: "SUCCESS" });
    } else {
      res.json({ msg: "ERROR", error: "Database file not found" });
    }
  });


};

module.exports = services;




