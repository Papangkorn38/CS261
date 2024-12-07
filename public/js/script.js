const form = document.getElementById("login-form")

async function submitLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginStatusBox = document.getElementById('loginStatus');
    const errorMessage = document.getElementById('errorMessage'); 
    if (username.length !== 10) {
        errorMessage.textContent = 'Please enter your username correctly.';
        loginStatusBox.style.display = "none";
        return;
    }
    try {
        const response = await fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Application-Key": "TU5d5d94a81ddf8180ba59b909802b958f0852358099894bc088730fe4af356cd848b499af6acfc1ee2a1ccb8c9b37144a",
            },
            body: JSON.stringify({ UserName: username, PassWord: password })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (data.tu_status && data.displayname_th && data.displayname_en && data.email && data.department && data.faculty) {
            loginStatusBox.innerHTML = `
                <p><strong>Name:</strong> ${data.displayname_en}</p>
                <p><strong>ชื่อ:</strong> ${data.displayname_th}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Faculty:</strong> ${data.faculty}</p>
                <p><strong>Department:</strong> ${data.department}</p>
                <p><strong>Type:</strong> ${data.type}</p>
                <p><strong>StudentID:</strong> ${data.username}</p>
            `;
        } else {
            loginStatusBox.innerHTML = `<p>Login successful, but certain information wasn't provided.</p>`;
        }

        errorMessage.textContent = ''; 
        loginStatusBox.style.display = "block";
    } catch (error) {
        console.error('Error:', error);
        loginStatusBox.style.display = "none"; 
        errorMessage.textContent = 'Your Username or Password is not correct. Please try again.';
    }
}

form.addEventListener('submit', submitLogin);
