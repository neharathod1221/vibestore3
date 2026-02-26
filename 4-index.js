
let products = [];

function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');

    if (isLoggedIn) {
        if(loginBtn) loginBtn.style.display = 'none';
        if(logoutBtn) logoutBtn.style.display = 'block';
    } else {
        if(loginBtn) loginBtn.style.display = 'block';
        if(logoutBtn) logoutBtn.style.display = 'none';
    }
}

function logoutUser() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    alert("Logged out successfully!");
    window.location.href = "1-login.html"; 
}

async function fetchProductsFromAPI() {
    const container = document.getElementById('product-container');
    if(container) container.innerHTML = '<h2 style="text-align:center; width:100%; margin-top:50px;">Loading Collection...</h2>';

    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const apiData = await response.json();

        products = apiData.map(p => {
            let myCategory = "Other";
            
            if (p.category === "men's clothing") myCategory = "Men Wear";
            if (p.category === "women's clothing") myCategory = "Women Wear";
            if (p.category === "jewelery") myCategory = "Jewellery"; 
            if (p.category === "electronics") myCategory = "Electronics"; 
            return {
                id: p.id,
                name: p.title,
                price: p.price * 80, 
                category: myCategory,
                img: p.image 
            };
        });

        loadProducts(products);
    } catch (error) {
        console.error("API Error:", error);
        if(container) container.innerHTML = '<h2 style="text-align:center; color:red;">Oops! Could not load products.</h2>';
    }
}

function loadProducts(data = products) {
    const container = document.getElementById('product-container');
    if(!container) return;
    container.innerHTML = '';

    const categories = ["Women Wear", "Men Wear", "Jewellery", "Electronics"];

    categories.forEach(cat => {
        const filtered = data.filter(p => p.category === cat);
        if(filtered.length > 0) {
            let section = `
                <div style="width:100%; margin-bottom:40px; clear:both; display:inline-block;">
                    <h2 style="border-bottom:3px solid #000; padding:10px; font-family:sans-serif; text-align:left; margin-left: 20px; text-transform: uppercase;">${cat}</h2>
                    <div style="display:flex; flex-wrap:wrap; justify-content:center; gap: 20px;">
            `;

            filtered.forEach(p => {
                section += `
                    <div style="width:260px; border:1px solid #eee; padding:15px; background:#fff; text-align:center; border-radius:15px; box-shadow: 0 10px 20px rgba(0,0,0,0.05); transition: 0.3s;">
                        <div style="height:250px; display:flex; align-items:center; justify-content:center; overflow:hidden;">
                            <img src="${p.img}" alt="${p.name}" style="max-width:100%; max-height:100%; object-fit:contain; border-radius:8px;">
                        </div>
                        <h4 style="margin:15px 0 5px 0; color:#333; height:40px; overflow:hidden; font-size:14px; line-height:1.4;">${p.name}</h4>
                        <p style="font-weight:bold; color:#e67e22; font-size:1.2rem; margin: 10px 0;">₹${p.price.toFixed(0)}</p>
                        <button onclick="addToCart(${p.id})" style="width:100%; padding:12px; background:#000; color:#fff; border:none; cursor:pointer; border-radius:8px; font-weight:bold; text-transform:uppercase; letter-spacing:1px;">Add to Cart</button>
                    </div>
                `;
            });
            section += `</div></div>`;
            container.innerHTML += section;
        }
    });
}

function handleSearch() {
    const query = document.getElementById('search-input').value.toLowerCase().trim();
    const filteredResults = products.filter(p => 
        p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
    );
    loadProducts(filteredResults);
}

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    const item = products.find(p => p.id === id);
    if(!item) return;

    const existingItem = cart.find(c => c.id === id);
    if(existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...item, quantity: 1});
    }
    localStorage.setItem('myCart', JSON.stringify(cart));
    alert(`${item.name} added to cart!`);
}

document.addEventListener('DOMContentLoaded', () => {
    const sInput = document.getElementById('search-input');
    if (sInput) sInput.addEventListener('input', handleSearch);
});

window.onload = () => {
    checkAuthStatus();
    fetchProductsFromAPI();
};