/* Store the JavaScript in a file named write-data.js*/

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('orderForm');
  const inputs = form.querySelectorAll('input, select');
  const submitBtn = document.getElementById('submitBtn');
  const clearBtn = document.getElementById('clearBtn');

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    //alert("Submit button was pressed");

    var orderId = document.getElementById( "orderID").value;
    var costumer = document.getElementById( "costumer").value;
    var pizza = document.getElementById( "pizza").value;
    var size = document.getElementById( "size").value;
    var price= document.getElementById( "price").value;

    if(!orderId || !costumer || !pizza || !size || !price) {

      alert("Please fill in all fields before submitted");
      return;
    }

    var jsonObject = {
        orderId: orderId,
        costumer: costumer,
        pizza: pizza,
        size: size,
        price: price

    }

    // Send data througt data

    fetch(pizzaURL + "/write-record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
        body : JSON.stringify(jsonObject)

    })

    .then(response => {
     if(!response.ok){
        throw new Error("Netword Error: " + response.status.Text);
        
     }
      return response.json();
           
    })

    .then(data => {
      alert(data.msg);
      if(data.msg === "SUCESS") {
        document.getElementById("clearBtn").click();

      }
    })

    .catch(error => {
        alert("Error: " + error);
    });

  });

  clearBtn.addEventListener('click', (e) => {
    e.preventDefault();
    inputs.forEach(el => { if (el.tagName === 'INPUT') el.value = ''; if (el.tagName === 'SELECT') el.selectedIndex = 0; });
  });
});