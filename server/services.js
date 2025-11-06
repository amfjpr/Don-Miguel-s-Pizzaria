const fs = require('fs');
const path = require("path");

const database_file = path.join(__dirname + "./files/data.txt");

var service = function(app) {

    app.post('/write-record', function(req, res) {
        var id = "lib" + Date.now();

        var newpizzaData = {
            id: id,

            orderID: req.body.orderId,
            customer: req.body.customer,
            pizza: req.body.pizza,
            size: req.body.size,
            price: req.body.price

        }

        var pizzaData = [];

        if (fs.existsSync(database_file)) {

            // Read current data
            fs.readFileSync(database_file, "utf-8", function(err, data){
                if(err) {
                    res.send(JSON.stringify({msg: err}));
                } else {
                    pizzaData = JSON.parse(data);

                    pizzaData.push(newpizzaData);

                    fs.writeFileSync(database_file, JSON.stringify(pizzaData), function(err) {

                        if (err) {
                            res.send(JSON.stringify({msg:err}));
                        } else{
                            res.send(JSON.stringify({msg: "SUCCESS"}));
                        }
                    });
                }

            });

        } else { 
            pizzaData.push(newpizzaData);

            fs.writeFileSync(database_file, JSON.stringify(pizzaData), function(err) {

                        if (err) {
                            res.send(JSON.stringify({msg:err}));
                        } else{
                            res.send(JSON.stringify({msg: "SUCCESS"}));
                        }
                    });


        }

    });


}

module.exports = services;
