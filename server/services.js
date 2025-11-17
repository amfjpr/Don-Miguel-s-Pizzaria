const fs = require("fs");
const path = require("path");

const database_file = path.join(__dirname + "/files/data.txt");

var services = function (app) {

  app.post("/write-record", function (req, res) {
    var id = "lib" + Date.now();

    var newpizzaData = {
      id: id,
      orderID: req.body.orderID,
      customer: req.body.customer,
      pizza: req.body.pizza,
      size: req.body.size,
      price: req.body.price
    };

    if (fs.existsSync(database_file)) {
      fs.readFile(database_file, "utf-8", function (err, data) {
        if (err) {
          res.send(JSON.stringify({ msg: err }));
        } else {
          var pizzaData = [];
          if (data) pizzaData = JSON.parse(data);

          pizzaData.push(newpizzaData);

          fs.writeFile(database_file, JSON.stringify(pizzaData), function (err) {
            if (err) {
              res.send(JSON.stringify({ msg: err }));
            } else {
              res.send(JSON.stringify({ msg: "SUCCESS" }));
            }
          });
        }
      });
    } else {
      var pizzaData = [newpizzaData];

      fs.writeFile(database_file, JSON.stringify(pizzaData), function (err) {
        if (err) {
          res.send(JSON.stringify({ msg: err }));
        } else {
          res.send(JSON.stringify({ msg: "SUCCESS" }));
        }
      });
    }
  });

  app.get("/get-records", function (req, res) {
    if (fs.existsSync(database_file)) {
      fs.readFile(database_file, "utf-8", function (err, data) {
        if (err) {
          res.send(JSON.stringify({ msg: err }));
        } else {
          var pizzaData = [];
          if (data) pizzaData = JSON.parse(data);

          res.json({ msg: "SUCCESS", fredData: pizzaData });
        }
      });
    } else {
      res.json({ msg: "SUCCESS", fredData: [] });
    }
  });

  app.delete("/delete-record", function (req, res) {
    var deleteID = req.body.id;

    if (fs.existsSync(database_file)) {
      fs.readFile(database_file, "utf-8", function (err, data) {
        if (err) {
          res.json({ msg: err });
        } else {
          var pizzaData = [];
          if (data) pizzaData = JSON.parse(data);

          for (var i = 0; i < pizzaData.length; i++) {
            if (pizzaData[i].id === deleteID) {
              pizzaData.splice(i, 1);
              break;
            }
          }

          fs.writeFile(database_file, JSON.stringify(pizzaData), function (err) {
            if (err) {
              res.json({ msg: err });
            } else {
              res.json({ msg: "SUCCESS" });
            }
          });
        }
      });
    } else {
      res.json({ msg: "ERROR", error: "Database file not found" });
    }
  });

};

module.exports = services;






