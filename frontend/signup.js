
document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('signupUsername').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;

  if (!username || !email || !password) {
    alert('Please fill in all fields.');
    return;
  }

  try {
    const res = await fetch('http://localhost:3000/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
    });


    const data = await res.json();

    if (res.ok) {
      alert('Signup successful! Redirecting to login page...');
      window.location.href = 'login.html'; // Redirect to login after successful signup
    } else {
      alert(data.message || 'Signup failed. Please try again.');
    }
  } catch (err) {
    console.error('Signup error:', err);
    alert('Server error. Please try again.');
  }
});
