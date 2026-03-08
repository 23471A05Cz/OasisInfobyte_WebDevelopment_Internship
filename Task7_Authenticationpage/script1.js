let users = JSON.parse(localStorage.getItem('users')) || {};

function toggleForms() {
    document.getElementById('registerForm').style.display =
        document.getElementById('registerForm').style.display === 'none' ? 'block' : 'none';
    document.getElementById('loginForm').style.display =
        document.getElementById('loginForm').style.display === 'none' ? 'block' : 'none';
    clearMessages();
}

function clearMessages() {
    document.getElementById('regMessage').innerText = '';
    document.getElementById('loginMessage').innerText = '';
}

// Register function
function register() {
    let name = document.getElementById('regName').value.trim();
    let email = document.getElementById('regEmail').value.trim();
    let password = document.getElementById('regPassword').value.trim();
    let message = document.getElementById('regMessage');

    if (!name || !email || !password) {
        message.innerText = "Please fill all fields!";
        message.className = "message";
        return;
    }

    if (users[email]) {
        message.innerText = "Email already registered!";
        message.className = "message";
    } else {
        users[email] = { name, password };
        localStorage.setItem('users', JSON.stringify(users));
        message.innerText = "Registered successfully! You can now login.";
        message.className = "message success";
        // Inputs remain visible after registration
    }
}

// Login function with short delay
function login() {
    let email = document.getElementById('loginEmail').value.trim();
    let password = document.getElementById('loginPassword').value.trim();
    let message = document.getElementById('loginMessage');

    if (users[email] && users[email].password === password) {
        message.innerText = "Login Successful!";
        message.className = "message success";

        setTimeout(() => {
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('securedPage').style.display = 'block';
            document.getElementById('welcomeText').innerText = `Welcome, ${users[email].name}! You have accessed the secured page.`;
            message.innerText = '';
        }, 1000); // 1 second delay
    } else {
        message.innerText = "Invalid email or password!";
        message.className = "message";
    }
}

// Logout function - shows blank registration page
function logout() {
    document.getElementById('securedPage').style.display = 'none';
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';

    // Clear all input fields
    document.getElementById('regName').value = '';
    document.getElementById('regEmail').value = '';
    document.getElementById('regPassword').value = '';
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
    clearMessages();
}