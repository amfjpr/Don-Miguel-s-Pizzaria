//Bring in Mongo
const { MongoClient, ObjectId } = require('mongodb');

//Define Database URL
const dbURL = "mongodb://127.0.0.1";

//Define the database server
const client = new MongoClient(dbURL);

var services = function(app) {

  
    // POST: write-record  (add new pizza order)
  
    app.post('/write-record', async function(req, res) {

        //1. Bring in the data from the client
        var orderIDSentFromClient  = req.body.orderID;
        var customerSentFromClient = req.body.customer;
        var pizzaSentFromClient    = req.body.pizza;
        var sizeSentFromClient     = req.body.size;
        var priceSentFromClient    = req.body.price;

        //2. Create JSON with data to be inserted
        var newPizzaOrder = {
            orderID:  orderIDSentFromClient,
            customer: customerSentFromClient,
            pizza:    pizzaSentFromClient,
            size:     sizeSentFromClient,
            price:    priceSentFromClient
        };

        //3. Connect and insert data, close database, return success or failure
        try {
            const conn = await client.connect();
            const db   = conn.db("pizzaria");
            const coll = db.collection("orders");

            await coll.insertOne(newPizzaOrder);

            await conn.close();
            return res.json({ msg: "SUCCESS" });

        } catch (err) {
            return res.json({ msg: "Error: " + err });
        }

    });

 
    // GET: get-records  (get all pizza orders)

    app.get('/get-records', async function(req, res) {

        //1. Set up sort by orderID ascending
        const orderBy = { orderID: 1 };

        //2. Connect, find data, close database, return results or error 
        try {
            const conn = await client.connect();
            const db   = conn.db("pizzaria");
            const coll = db.collection("orders");

            const pizzaData = await coll.find().sort(orderBy).toArray();

            await conn.close();
            return res.json({ msg: "SUCCESS", fredData: pizzaData });

        } catch (err) {
            return res.json({ msg: "Error: " + err });
        }

    });

    // DELETE: delete-record  (delete one pizza order by _id)

    app.delete('/delete-record', async function(req, res) {

        //1. Bring in the data from the client (ID sent via query)
        var idSentFromClient = req.query.recordID;

        //2. Convert id string to a Mongo ObjectId
        var idAsMongoObject = ObjectId.createFromHexString(idSentFromClient);

        //3. Create search with MongoID
        const search = { _id: idAsMongoObject };

        //4. Connect and delete data, close database, return success or failure
        try {
            const conn = await client.connect();
            const db   = conn.db("pizzaria");
            const coll = db.collection("orders");

            await coll.deleteOne(search);

            await conn.close();
            return res.json({ msg: "SUCCESS" });

        } catch (err) {
            return res.json({ msg: "Error: " + err });
        }

    });

};

module.exports = services;




