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

                console.log(result);
                if (result.message === "Login successful") {
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

    const helpButton = document.querySelector('.help-link');
    if (helpButton) {
        helpButton.addEventListener('click', function(event) {
            event.preventDefault();
            alert("Need help? Contact volunteers or visit the Help Desk.");
        });
    }

    const leaderboardButton = document.querySelector('.leaderboard-link');
    if (leaderboardButton) {
        leaderboardButton.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = "leaderboard.html";
        });
    }

    const homeButton = document.querySelector('.home-link');
    if (homeButton) {
        homeButton.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = "home.html";
        });
    }

    const logoutButton = document.querySelector('.logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.clear();
            window.location.href = "index.html";
        });
    }
});
