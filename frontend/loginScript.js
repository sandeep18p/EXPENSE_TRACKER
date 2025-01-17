const form = document.getElementById('loginForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  document.getElementById('emailError').textContent = '';
  document.getElementById('passwordError').textContent = '';

  let isValid = true;

  // Validate email
  if (!email) {
    document.getElementById('emailError').textContent = 'Email is required.';
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    document.getElementById('emailError').textContent = 'Enter a valid email address.';
    isValid = false;
  }

  // Validate password
  if (!password) {
    document.getElementById('passwordError').textContent = 'Password is required.';
    isValid = false;
  }

  if (isValid) {
    try {
      const response = await axios.post('http://localhost:3000/user/login', { email, password });
      alert(response.data.message);

      // Redirect to dashboard or homepage after successful login
      window.location.href = 'dashboard.html';
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || 'An error occurred. Please try again.');
      } else {
        alert('An error occurred. Please try again.');
      }
    }
  }
});
