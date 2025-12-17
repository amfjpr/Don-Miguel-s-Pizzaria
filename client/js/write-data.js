document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('orderForm');
  const inputs = form.querySelectorAll('input, select');
  const submitBtn = document.getElementById('submitBtn');
  const clearBtn = document.getElementById('clearBtn');

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    var idField = document.getElementById("id");
    var id = "lib" + Date.now();
    idField.value = id;

    var orderId = document.getElementById("orderId").value;
    var customer = document.getElementById("customer").value;
    var pizza = document.getElementById("pizza").value;
    var size = document.getElementById("size").value;
    var price = document.getElementById("price").value;
    var category = document.getElementById("category").value;

    if (!orderId || !customer || !pizza || !size || !price || !category) {
      alert("Please fill in all fields before submitting");
      return;
    }

    var jsonObject = {
      id: id,
      orderID: orderId,
      customer: customer,
      pizza: pizza,
      size: size,
      price: price,
      category: category
    };

    fetch(pizzaURL + "/write-record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jsonObject)
    })
      .then(response => {
        if (!response.ok) throw new Error("Network Error: " + response.statusText);
        return response.json();
      })
      .then(data => {
        alert(data.msg);
        if (data.msg === "SUCCESS") {
          inputs.forEach(el => {
            if (el.tagName === 'INPUT') el.value = '';
            if (el.tagName === 'SELECT') el.selectedIndex = 0;
          });
        }
      })
      .catch(error => {
        alert("Error: " + error);
      });
  });

  clearBtn.addEventListener('click', (e) => {
    e.preventDefault();
    inputs.forEach(el => {
      if (el.tagName === 'INPUT') el.value = '';
      if (el.tagName === 'SELECT') el.selectedIndex = 0;
    });
  });

});
