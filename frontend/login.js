document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('userId', data.userId);  // ✅ This is the key used in script.js
      window.location.href = 'dashboard.html';      // ✅ Create this page to show expenses
    } else {
      alert(data.message || 'Login failed.');
    }
  } catch (err) {
    console.error('Login error:', err);
    alert('Server error. Please try again.');
  }
});
