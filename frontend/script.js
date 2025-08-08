document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value;

  if (!email || !password) {
    alert('Please enter both email and password.');
    return;
  }

  try {
    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('userId', data.userId);
      alert('Login successful!');
      window.location.href = 'dashboard.html'; 
    } else {
      alert(data.message || 'Login failed. Please check your credentials.');
    }
  } catch (err) {
    console.error('Login error:', err);
    alert('Server error. Please try again.');
  }
});
