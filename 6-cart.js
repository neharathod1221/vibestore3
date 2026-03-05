
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('myCart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
        cartBtn.innerHTML = `<i class="fa fa-shopping-cart"></i> Cart (${totalItems})`;
    }

    const cartPageCount = document.getElementById('cart-count');
    if (cartPageCount) {
        cartPageCount.innerText = totalItems;
    }
}

setInterval(updateCartBadge, 500);

function loadCart() {
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    const container = document.getElementById('cart-items-list');
    const totalElement = document.getElementById('grand-total');
    let total = 0;

    if (!container) return; 

    container.innerHTML = ""; 
    if (cart.length === 0) {
        container.innerHTML = "<h3 style='text-align:center; padding: 50px;'>Oops! Your cart is empty. 🛒</h3>";
        if (totalElement) totalElement.innerText = "0";
        updateCartBadge(); 
        return;
    }

    cart.forEach((item, index) => {
        let qty = item.quantity || 1; 
        let itemTotal = item.price * qty;
        total += itemTotal;

        container.innerHTML += `
            <div class="cart-row" style="display: flex; align-items: center; justify-content: space-between; background: white; padding: 15px; margin-bottom: 10px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                <img src="${item.img}" width="80" style="border-radius: 5px; height: 80px; object-fit: contain;">
                <div style="flex: 1; margin-left: 20px;">
                    <h4 style="margin: 0;">${item.name}</h4>
                    <p style="color: #666; margin: 5px 0;">₹${item.price.toFixed(0)}</p>
                </div>
                
                <div style="display: flex; align-items: center; gap: 10px; margin-right: 20px;">
                    <button onclick="changeQty(${index}, -1)" style="padding: 5px 12px; cursor: pointer; border: 1px solid #ddd; background:#eee; font-weight:bold;">-</button>
                    <span style="font-weight: bold; min-width: 20px; text-align: center;">${qty}</span>
                    <button onclick="changeQty(${index}, 1)" style="padding: 5px 12px; cursor: pointer; border: 1px solid #ddd; background:#eee; font-weight:bold;">+</button>
                </div>

                <div style="text-align: right; min-width: 100px;">
                    <p style="font-weight: bold; margin-bottom: 5px;">₹${itemTotal.toFixed(0)}</p>
                    <button onclick="removeItem(${index})" style="background: #ff4747; color: white; border: none; padding: 6px 12px; cursor: pointer; border-radius: 4px; font-size: 12px;">Remove</button>
                </div>
            </div>
        `;
    });

    if (totalElement) totalElement.innerText = total.toFixed(0);
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
    updateCartBadge(); 
}


function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('myCart', JSON.stringify(cart));
    loadCart(); 
    updateCartBadge(); 
}

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    updateCartBadge();
});