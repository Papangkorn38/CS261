const form = document.getElementById("login-form")

async function submitLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginStatusBox = document.getElementById('loginStatus');
    
    await fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Application-Key":"TU5d5d94a81ddf8180ba59b909802b958f0852358099894bc088730fe4af356cd848b499af6acfc1ee2a1ccb8c9b37144a",
        },
        body: JSON.stringify({ UserName: username, PassWord: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.tu_status && data.displayname_th && data.displayname_en && data.email && data.department && data.faculty) {
            loginStatusBox.innerHTML = `
                <p><strong>Name (EN):</strong> ${data.displayname_en}</p>
                <p><strong>ชื่อ (ภาษาไทย):</strong> ${data.displayname_th}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Faculty:</strong> ${data.faculty}</p>
                <p><strong>Department:</strong> ${data.department}</p>
                <p><strong>StudentID:</strong> ${data.username}</p>
            `;
        } else {
            loginStatusBox.innerHTML = `<p>Login successful, but some information is missing from the response.</p>`;
        }

        loginStatusBox.style.display = "flex";
    })
    .catch(error => console.error('Error:', error));
}

form.addEventListener('submit', submitLogin)

