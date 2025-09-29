/* Store the JavaScript in a file named write-data.js*/

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('orderForm');
  const inputs = form.querySelectorAll('input, select');
  const submitBtn = document.getElementById('submitBtn');
  const clearBtn = document.getElementById('clearBtn');

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    alert("Submit button was pressed");
  });

  clearBtn.addEventListener('click', (e) => {
    e.preventDefault();
    inputs.forEach(el => { if (el.tagName === 'INPUT') el.value = ''; if (el.tagName === 'SELECT') el.selectedIndex = 0; });
  });
});