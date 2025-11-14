/*Store the JavaScript in a file named view-data.js */

// here we have the JSON data in string format (for example)
// var data = '[{"orderID":"ORD-1001","customer":"Agenor","pizza":"Margherita","size":"Medium","price":14.99},' +
//           '{"orderID":"ORD-1002","customer":"Mike","pizza":"Pepperoni","size":"Large","price":18.50},' +
//           '{"orderID":"ORD-1003","customer":"Heloisa","pizza":"Four Cheese","size":"Small","price":12.00},' +
//           '{"orderID":"ORD-1004","customer":"John","pizza":"Hawaiian","size":"Medium","price":15.25},' +
//           '{"orderID":"ORD-1005","customer":"Francisco","pizza":"Veggie","size":"Large","price":17.75}]';

// global object that will hold the list of orders
var jsonObject = [];

// make sure pizzaURL exists (same ideia do write-data.js)
if (typeof window.pizzaURL === "undefined" || !window.pizzaURL) {
  window.pizzaURL = location.origin;
}

// this starts the program when the page loads
main();

// main function that runs everything
function main() {
    console.log(jsonObject); // shows the whole object in the console
    console.log(jsonObject.length); // shows how many items are in the list
    console.log(JSON.stringify(jsonObject)); // shows the data as one long text

    // Get the data from the database
    fetch(window.pizzaURL + "/get-records", {
        method: "GET"
    }) 
    .then(response => {
        if(!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        if (data.msg === "SUCCESS") {
            createPizzaTable(data.fredData);
        }
    })
    .catch(err => {
        alert("Error: " + err);
    });
}

// this function receives the data from the server and builds the table
function createPizzaTable(pizzaList) {
    jsonObject = pizzaList || [];

    console.log(jsonObject); 
    console.log(jsonObject.length); 
    console.log(JSON.stringify(jsonObject)); 

    showTable(); // call the function that builds the table
}

// function to show the data in a table on the page
function showTable() {
    var htmlString = ""; // start with an empty string

    // go through each item in the list
    for (var i = 0; i < jsonObject.length; i++) {
        htmlString += "<tr>";
        htmlString += "<td>" + jsonObject[i].orderID + "</td>";
        htmlString += "<td>" + jsonObject[i].customer + "</td>";
        htmlString += "<td>" + jsonObject[i].pizza + "</td>";
        htmlString += "<td>" + jsonObject[i].size + "</td>";

        // make sure price has two decimal numbers
        var price = jsonObject[i].price;
        if (typeof price === "number") {
            price = price.toFixed(2);
        }
        htmlString += "<td>" + price + "</td>";
        htmlString += "</tr>";
    }

    // find the table body in the HTML and put the rows inside
    var tableBodyObj = document.getElementById("libraryTable");
    tableBodyObj.innerHTML = htmlString;
}

// this function is just for testing – it adds two new orders
function refreshTable() {
    console.log("refreshTable() called");

    // first new order
    var newOrder = { 
        orderID: "ORD-2001", 
        customer: "Agenor", 
        pizza: "Diavola", 
        size: "Large", 
        price: 19.90 
    };
    jsonObject.push(newOrder);

    // second new order
    var anotherOrder = {};
    anotherOrder.orderID = "ORD-2002";
    anotherOrder.customer = "Heloisa";
    anotherOrder.pizza = "Funghi";
    anotherOrder.size = "Medium";
    anotherOrder.price = 16.75;

    // add both to the list
    jsonObject.push(anotherOrder);

    // show the updated table
    showTable();
}
