
document.body.style.backgroundImage = "url('https://emilyandblair.com/wp-content/uploads/2023/07/Online_Shopping_Websites.jpg')";
document.body.style.backgroundSize = "cover";
document.body.style.backgroundAttachment = "fixed";
document.body.style.backgroundPosition = "center";

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.innerText = message;
        errorElement.style.color = "#e74c3c"; 
        errorElement.style.display = "block";
    }
}

function clearErrors() {
    const errorIds = ["name-error", "email-error", "pass-error", "login-error"];
    errorIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.innerText = "";
            el.style.display = "none";
        }
    });
}

function registerUser() {
    clearErrors();
    
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const pass = document.getElementById('reg-pass').value.trim();
    let hasError = false;

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
        showError("name-error", "Use letters only for name.");
        hasError = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError("email-error", "Please enter a valid email address.");
        hasError = true;
    }

    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passRegex.test(pass)) {
        showError("pass-error", "Need 1 Upper, 1 Lower, 1 Number (Min 8 chars).");
        hasError = true;
    }

    if (hasError) return;

    if (localStorage.getItem(email)) {
        showError("email-error", "This email is already registered!");
        return;
    }


    localStorage.setItem(email, JSON.stringify({ name, email, pass }));
    alert("Registration Successful! Please login now.");
    if (typeof toggleForm === 'function') toggleForm(); 
}


function loginUser() {
    clearErrors();
    
    const email = document.getElementById('login-email').value.trim().toLowerCase();
    const pass = document.getElementById('login-pass').value.trim();
    
    console.log("Checking login for:", email); 
    if (!email || !pass) {
        showError("login-error", "Enter email and password.");
        return;
    }

    const storedData = localStorage.getItem(email);
    
    if (storedData) {
        const user = JSON.parse(storedData);
        console.log("User found:", user.name); 

        if (user.pass === pass) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', user.name);
            
            alert("Welcome back, " + user.name + "!");
            window.location.href = "3-index.html"; 
        } else {
            showError("login-error", "Wrong password!");
            triggerShake();
        }
    } else {
        showError("login-error", "Account not found. Please Sign up.");
        triggerShake();
    }
}

function triggerShake() {
    const container = document.querySelector('.container') || document.body;
    container.style.animation = "shake 0.5s";
    setTimeout(() => container.style.animation = "", 500);
}