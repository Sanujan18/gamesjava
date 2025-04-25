document.addEventListener('DOMContentLoaded', function() {
    loadOrder();
});

// Loading the added order from local storage and displaying it
function loadOrder() {
    const orderData = JSON.parse(localStorage.getItem("favorites")) || []; 

    const orderTable = document.querySelector("#orderTable tbody");
    let totalAmount = 0;

    // Clear existing rows
    orderTable.innerHTML = '';

    orderData.forEach(item => {
        let row = document.createElement("tr");

        // Create and append name cell
        let cellName = document.createElement("td");
        cellName.innerText = item.productName; 
        row.appendChild(cellName);

        // Create and append quantity cell
        let cellQuantity = document.createElement("td");
        cellQuantity.innerText = item.quantity;
        row.appendChild(cellQuantity);

        // Create and append total price cell
        let cellTotalPrice = document.createElement("td");
        cellTotalPrice.innerText = `Rs ${item.totalPrice}`; 
        row.appendChild(cellTotalPrice);

        // Append the row to the table
        orderTable.appendChild(row);

        // Calculate total amount
        totalAmount += parseFloat(item.totalPrice);
    });

    // Display total amount in the footer
    document.getElementById("orderTotal").innerText = `Rs ${totalAmount.toFixed(2)}`;
}

function showDeliveryDate() {
    const today = new Date();
    const deliveryDate = new Date();
    deliveryDate.setDate(today.getDate() + 7);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = deliveryDate.toLocaleDateString(undefined, options);

    alert(`Thank you for your purchase! Your product will be delivered by ${formattedDate}.`);
}