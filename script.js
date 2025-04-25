document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const productPrice = parseFloat(productCard.querySelector('.product-price').textContent.replace('Price: Rs.', '').replace(',', '').trim());            
            const quantity = parseInt(productCard.querySelector('.product-quantity').value);

            addToCart(productName, productPrice, quantity);
        });
    });

    // Clear the cart on page load (if desired)
    clearCartOnRefresh();

    // Add to favorites function
    document.getElementById('add-to-favorites').addEventListener('click', () => {
        const cartArray = JSON.parse(localStorage.getItem('cart')) || []; 
        const favoritesArray = cartArray.map(item => ({
            productName: item.productName,
            quantity: item.quantity,
            price: item.price,
            totalPrice: item.totalPrice
        })); 

        localStorage.setItem('favorites', JSON.stringify(favoritesArray)); 
        alert('Current cart items have been added to favorites!');
    });
});

// Add to Cart button function
function addToCart(name, price, quantity) {
    let cartArray = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cartArray.findIndex(item => item.productName === name);

    if (existingItemIndex > -1) {
        // Update existing item
        cartArray[existingItemIndex].quantity = quantity; 
        cartArray[existingItemIndex].totalPrice = (cartArray[existingItemIndex].price * cartArray[existingItemIndex].quantity).toFixed(2);
    } else {
        // Add new item
        const cartItem = {
            productName: name,
            price: price,
            quantity: quantity,
            totalPrice: (price * quantity).toFixed(2)
        };
        cartArray.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cartArray)); 
    showCartTable();
}

function showCartTable() {
    const cartBody = document.getElementById('cart-body');
    // Clear existing table rows
    cartBody.innerHTML = ''; 

    const cartArray = JSON.parse(localStorage.getItem('cart')) || []; 
    let grandTotal = 0;

    cartArray.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.productName}</td>
            <td>${item.quantity}</td>
            <td>Rs. ${item.price.toFixed(2)}</td>
            <td>Rs. ${item.totalPrice}</td>
        `;
        cartBody.appendChild(row);
        grandTotal += parseFloat(item.totalPrice);
    });

    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td colspan="3">Total</td>
        <td>Rs. ${grandTotal.toFixed(2)}</td>
    `;
    cartBody.appendChild(totalRow);
}

// Clear cart 
function clearCartOnRefresh() {
    localStorage.removeItem('cart'); 
    showCartTable(); 
}

document.addEventListener("DOMContentLoaded", () => {
    const cartBody = document.getElementById("cart-body");
    const applyFavoritesBtn = document.getElementById("apply-to-favorites");

    applyFavoritesBtn.addEventListener("click", () => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || []; 
        const cartArray = [];
        cartBody.innerHTML = ""; 
        let grandTotal = 0;

        favorites.forEach(item => {
            const row = document.createElement("tr");

            const nameCell = document.createElement("td");
            nameCell.textContent = item.productName;

            const quantityCell = document.createElement("td");
            quantityCell.textContent = item.quantity;

            const priceCell = document.createElement("td");
            priceCell.textContent = `Rs. ${item.price.toFixed(2)}`;
            
            const subtotalCell = document.createElement("td");
            const subtotal = item.quantity * item.price;
            subtotalCell.textContent = `Rs. ${subtotal.toFixed(2)}`;

            row.appendChild(nameCell);
            row.appendChild(quantityCell);
            row.appendChild(priceCell);
            row.appendChild(subtotalCell);

            cartBody.appendChild(row);
            grandTotal += subtotal;

            // Add the item to the new cart array
            cartArray.push({
                productName: item.productName,
                price: item.price,
                quantity: item.quantity,
                totalPrice: subtotal.toFixed(2)
            });
        });

        // Add total row at the bottom
        const totalRow = document.createElement("tr");
        totalRow.innerHTML = `
            <td colspan="3">Total</td>
            <td>Rs. ${grandTotal.toFixed(2)}</td>
        `;
        cartBody.appendChild(totalRow);

        // Update local storage with the new cart
        localStorage.setItem('cart', JSON.stringify(cartArray));
    });
});

// Pay Now button function
document.addEventListener('DOMContentLoaded', () => {
    const payNowButton = document.getElementById('pay-now');

    payNowButton.addEventListener('click', () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || []; 

        if (cart.length > 0) {
            window.location.href = 'checkout.html';
        } else {
            alert('Your cart is empty. Please add items before proceeding to checkout.');
        }
    });
});

function getOrderData() {
    const rows = document.querySelectorAll("#orderTable tbody tr");
    const order = [];

    rows.forEach((row) => {
        const productName  = row.querySelector("td:nth-child(1)").innerText; 
        const quantity = row.querySelector("td:nth-child(2)").innerText; 
        const totalPrice = row.querySelector("td:nth-child(3)").innerText; 
        order.push({ name: productName, quantity: quantity, totalPrice: totalPrice });
    });

    return order;
}