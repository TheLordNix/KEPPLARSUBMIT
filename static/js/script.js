document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const toggleCheckbox = document.getElementById('showPassword');

    if (toggleCheckbox && passwordInput) {
        toggleCheckbox.addEventListener('change', () => {
            passwordInput.type = toggleCheckbox.checked ? 'text' : 'password';
        });
    }

    const form = document.querySelector('.login-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); 

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('http://127.0.0.1:8000/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password })
                });

                const result = await response.json();

                if (result.message === "Login successful") {
                    localStorage.setItem("sessionKey", result.sessionKey);
                    console.log("✅ Login successful!");
                    window.location.href = "home.html";
                } else {
                    alert("❌ Invalid username or password");
                }
            } catch (err) {
                alert("🚨 Error connecting to server");
                console.error(err);
            }
        });
    }

    // Define the checkSession function to validate the session
    async function checkSession() {
        const sessionKey = localStorage.getItem("sessionKey");
        if (!sessionKey) {
            alert("❌ Session has expired! Please login again!");
            window.location.href = "index.html";
        } else {
            try {
                const response = await fetch('http://127.0.0.1:8000/validateSession', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({sessionKey})
                });

                const result = await response.json();

                if (result.message === "Session valid") {
                    console.log("✅ Session is still valid!");
                } else {
                    alert("❌ Session is no longer valid. Please login again.");
                    localStorage.removeItem("sessionKey");
                    window.location.href = "index.html";
                }
            } catch (err) {
                alert("🚨 Error connecting to server");
                console.error(err);
            }
        }
    }

    // Help button event listener
    const helpButton = document.querySelector('.help-link');
    if (helpButton) {
        helpButton.addEventListener('click', function(event) {
            event.preventDefault();
            alert("Need help? Contact volunteers or visit the Help Desk.");
        });
    }

    // Leaderboard button event listener
    const leaderboardButton = document.querySelector('.leaderboard-link');
    if (leaderboardButton) {
        checkSession();
        leaderboardButton.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = "leaderboard.html";
        });
    }

    // Home button event listener
    const homeButton = document.querySelector('.home-link');
    if (homeButton) {
        checkSession();
        homeButton.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = "home.html";
        });
    }

    // Logout button event listener
    const logoutButton = document.querySelector('.logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', async function (event) {
            event.preventDefault();
    
            const sessionKey = localStorage.getItem("sessionKey");
    
            // Notify the backend about logout
            try {
                await fetch('http://127.0.0.1:8000/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ sessionKey })
                });
            } catch (err) {
                console.error("Error notifying server during logout:", err);
            }
    
            localStorage.removeItem('sessionKey');
            window.location.href = "index.html";
        });
    }
});
