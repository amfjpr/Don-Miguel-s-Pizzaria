/*Store the JavaScript in a file named view-data.js */

// JSON in string format
var data = '[{"orderId":"ORD-1001","customer":"Agenor","pizza":"Margherita","size":"Medium","price":14.99},' +
           '{"orderId":"ORD-1002","customer":"Mike","pizza":"Pepperoni","size":"Large","price":18.50},' +
           '{"orderId":"ORD-1003","customer":"Heloisa","pizza":"Four Cheese","size":"Small","price":12.00},' +
           '{"orderId":"ORD-1004","customer":"John","pizza":"Hawaiian","size":"Medium","price":15.25},' +
           '{"orderId":"ORD-1005","customer":"Francisco","pizza":"Veggie","size":"Large","price":17.75}]';

// Parse to JS object
var jsonObject = JSON.parse(data);

main();

function main() {
    console.log(jsonObject);
    console.log(jsonObject.length);
    console.log(JSON.stringify(jsonObject));

    showTable();
}

function showTable() {
    var htmlString = "";

    for (var i = 0; i < jsonObject.length; i++) {
        htmlString += "<tr>";
        htmlString += "<td>" + jsonObject[i].orderId + "</td>";
        htmlString += "<td>" + jsonObject[i].customer + "</td>";
        htmlString += "<td>" + jsonObject[i].pizza + "</td>";
        htmlString += "<td>" + jsonObject[i].size + "</td>";
        // price with two decimals
        var price = (typeof jsonObject[i].price === "number") ? jsonObject[i].price.toFixed(2) : jsonObject[i].price;
        htmlString += "<td>" + price + "</td>";
        htmlString += "</tr>";
    }

    var tableBodyObj = document.getElementById("libraryTable");
    tableBodyObj.innerHTML = htmlString;
}

function refreshTable() {
    console.log("refreshTable() called");
    var newOrder = { orderId:"ORD-2001", customer:"Agenor", pizza:"Diavola", size:"Large", price:19.90 };
    jsonObject.push(newOrder);

    var anotherOrder = {};
    anotherOrder.orderId = "ORD-2002";
    anotherOrder.customer = "Heloisa";
    anotherOrder.pizza = "Funghi";
    anotherOrder.size = "Medium";
    anotherOrder.price = 16.75;

    jsonObject.push(anotherOrder);

    showTable();
}
