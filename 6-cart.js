
function loadCart() {
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    const container = document.getElementById('cart-items-list');
    let total = 0;

    container.innerHTML = ""; 
    if (cart.length === 0) {
        container.innerHTML = "<h3 style='text-align:center; padding: 20px;'>Oops! Your cart is empty. 🛒</h3>";
        document.getElementById('grand-total').innerText = 0;
        return;
    }


    cart.forEach((item, index) => {

        let qty = item.quantity || 1; 
        let itemTotal = item.price * qty;
        total += itemTotal;

        container.innerHTML += `
            <div class="cart-row" style="display: flex; align-items: center; justify-content: space-between; background: white; padding: 15px; margin-bottom: 10px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                <img src="${item.img}" width="80" style="border-radius: 5px;">
                <div style="flex: 1; margin-left: 20px;">
                    <h4 style="margin: 0;">${item.name}</h4>
                    <p style="color: #666; margin: 5px 0;">₹${item.price}</p>
                </div>
                
                <div style="display: flex; align-items: center; gap: 10px; margin-right: 20px;">
                    <button onclick="changeQty(${index}, -1)" style="padding: 5px 10px; cursor: pointer; border: 1px solid #ddd;">-</button>
                    <span style="font-weight: bold;">${qty}</span>
                    <button onclick="changeQty(${index}, 1)" style="padding: 5px 10px; cursor: pointer; border: 1px solid #ddd;">+</button>
                </div>

                <div style="text-align: right; min-width: 100px;">
                    <p style="font-weight: bold; margin-bottom: 5px;">₹${itemTotal}</p>
                    <button onclick="removeItem(${index})" style="background: #ff4747; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 3px; font-size: 12px;">Remove</button>
                </div>
            </div>
        `;
    });

    document.getElementById('grand-total').innerText = total;
}


function changeQty(index, delta) {
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    
    if (cart[index]) {
       
        cart[index].quantity = (cart[index].quantity || 1) + delta;
        
        if (cart[index].quantity < 1) {
            removeItem(index); 
            return;
        }
    }
    
    localStorage.setItem('myCart', JSON.stringify(cart));
    loadCart();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('myCart', JSON.stringify(cart));
    loadCart();
    
   
    updateCartCount(); 
}


function checkout() {
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    if(cart.length === 0) {
        alert("Pehle kuch saman toh add karo!");
        return;
    }
   
    window.location.href = "checkout.html";
}


loadCart();