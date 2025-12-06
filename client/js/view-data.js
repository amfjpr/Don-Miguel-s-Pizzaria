/*Store the JavaScript in a file named view-data.js */

// here we have the JSON data in string format (for example)
// var data = '[{"orderID":"ORD-1001","customer":"Agenor","pizza":"Margherita","size":"Medium","price":14.99},' +
//           '{"orderID":"ORD-1002","customer":"Mike","pizza":"Pepperoni","size":"Large","price":18.50},' +
//           '{"orderID":"ORD-1003","customer":"Heloisa","pizza":"Four Cheese","size":"Small","price":12.00},' +
//           '{"orderID":"ORD-1004","customer":"John","pizza":"Hawaiian","size":"Medium","price":15.25},' +
//           '{"orderID":"ORD-1005","customer":"Francisco","pizza":"Veggie","size":"Large","price":17.75}]';

// global object that will hold the list of orders
var jsonObject = [];

main();

// main function that runs everything
function main() {
    console.log(jsonObject); // shows the whole object in the console
    console.log(jsonObject.length); // shows how many items are in the list
    console.log(JSON.stringify(jsonObject)); // shows the data as one long text
    retrieveData();
}

function retrieveData() {

    fetch(pizzaURL + "/get-records", {
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

function createPizzaTable(pizzaList) {
    jsonObject = pizzaList || [];

    console.log(jsonObject); 
    console.log(jsonObject.length); 
    console.log(JSON.stringify(jsonObject)); 

    showTable();
}

function showTable() {
    var htmlString = ""; 

    for (var i = 0; i < jsonObject.length; i++) {
        htmlString += "<tr>";
        htmlString += "<td>" + jsonObject[i].orderID + "</td>";
        htmlString += "<td>" + jsonObject[i].customer + "</td>";
        htmlString += "<td>" + jsonObject[i].pizza + "</td>";
        htmlString += "<td>" + jsonObject[i].size + "</td>";

        var price = jsonObject[i].price;
        if (typeof price === "number") {
            price = price.toFixed(2);
        }
        htmlString += "<td>" + price + "</td>";
    
        htmlString += '<td><button class="delete-button" data-id="' + jsonObject[i]._id + '">Delete</button></td>';

        htmlString += "</tr>";
    }

    var tableBodyObj = document.getElementById("libraryTable");
    tableBodyObj.innerHTML = htmlString;

    activateDelete();
}

function refreshTable() {
    console.log("refreshTable() called");

    var newOrder = { 
        orderID: "ORD-2001", 
        customer: "Agenor", 
        pizza: "Diavola", 
        size: "Large", 
        price: 19.90 
    };
    jsonObject.push(newOrder);

    var anotherOrder = {};
    anotherOrder.orderID = "ORD-2002";
    anotherOrder.customer = "Heloisa";
    anotherOrder.pizza = "Funghi";
    anotherOrder.size = "Medium";
    anotherOrder.price = 16.75;

    jsonObject.push(anotherOrder);

    showTable();
}

// function from professor to activate delete buttons
function activateDelete() {
    // Capture all html items tagged with the delete-button class
    const deleteButtons = document.querySelectorAll('.delete-button');

    //Loop through all the deleteButtons and create a listener for each one
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const deleteID = this.getAttribute("data-id");  // <-- from the html button object
            handleDelete(deleteID);  
        });
    });
}

// function to call the DELETE service on the server
function handleDelete(deleteID) {

    fetch(pizzaURL + "/delete-record?recordID=" + deleteID, {
        method: "DELETE"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        if (data.msg === "SUCCESS") {
            retrieveData();
        } else {
            alert("Error: " + (data.error || "Unknown error"));
        }
    })
    .catch(err => {
        alert("Error: " + err);
    });
}
