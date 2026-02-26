
function loadSummary() {
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    let total = 0;
    let totalQty = 0;

    if(cart.length === 0) {
        alert("Your cart is empty! Going back to shopping.");
        window.location.href = "3-index.html"; 
        return;
    }

    cart.forEach(item => {
        total += (item.price * (item.quantity || 1));
        totalQty += (item.quantity || 1);
    });

    const qtyElement = document.getElementById('summary-qty');
    const totalElement = document.getElementById('summary-total');

    if(qtyElement) qtyElement.innerText = totalQty;
    if(totalElement) totalElement.innerText = total.toFixed(0);
}

document.getElementById('checkout-form').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const name = document.getElementById('cust-name').value.trim();
    const phone = document.getElementById('cust-phone').value.trim();
    const address = document.getElementById('cust-address').value.trim();
    const paymentMethod = document.querySelector('input[name="payment"]:checked');

    
    if (name.length < 3) {
        alert("Please enter a valid Name.");
        return;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        alert("Please enter a valid 10-digit Phone Number.");
        return;
    }

    if (address.length < 10) {
        alert("Please provide a complete address for delivery.");
        return;
    }

    if (!paymentMethod) {
        alert("Please select a Payment Method.");
        return;
    }

    
    if (paymentMethod.value === "Online") {
        const cardNo = prompt("Enter your 16-digit Card Number for Payment:");
        if (!cardNo || cardNo.length !== 16) {
            alert("Payment Failed: Invalid Card Number.");
            return;
        }
    }


    const cartData = JSON.parse(localStorage.getItem('myCart'));

    const orderDetails = {
        customerName: name,
        customerPhone: phone,
        deliveryAddress: address,
        paymentType: paymentMethod.value,
        items: cartData,
        orderDate: new Date().toLocaleString()
    };

    console.log("Order Finalized:", orderDetails);

    localStorage.setItem('lastOrder', JSON.stringify(orderDetails));

    localStorage.removeItem('myCart'); 

    alert("Thank you, " + name + "! Order Successful.");
    window.location.href = "9-order-success.html"; 
});

window.onload = loadSummary;