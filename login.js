function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function loginUser() {
    const email = document.getElementById('typeEmailX').value.trim();
    const password = document.getElementById('typePasswordX').value.trim();

    if (!email || !password) {
        alert('All fields are required!');
        return;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email address!');
        return;
    }

    fetch('https://66e7e6bbb17821a9d9da704c.mockapi.io/home', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Invalid credentials');
        }
        return response.json();
    })
    .then(data => {
        alert('Login successful!');
        window.location.href = 'home.html';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Login failed. Please check your credentials and try again.');
    });
}