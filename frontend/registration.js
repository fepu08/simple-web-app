document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('register-form');

  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;

    // Clear previous errors
    document.querySelectorAll('.error-message').forEach((el) => el.remove());

    let isValid = true;

    // Helper function to show error messages
    function showError(element, message) {
      const error = document.createElement('span');
      error.classList.add('error-message');
      error.style.color = 'red';
      error.style.display = 'block';
      error.style.marginTop = '5px';
      error.textContent = message;
      element.insertAdjacentElement('afterend', error);
      isValid = false;
    }

    // Validate inputs
    if (!name) showError(document.getElementById('name'), 'Name is required.');
    if (!email)
      showError(document.getElementById('email'), 'Email is required.');
    else if (!/\S+@\S+\.\S+/.test(email))
      showError(document.getElementById('email'), 'Invalid email format.');

    if (!password)
      showError(document.getElementById('password'), 'Password is required.');
    if (!passwordConfirm)
      showError(
        document.getElementById('passwordConfirm'),
        'Password confirmation is required.'
      );

    if (password && passwordConfirm && password !== passwordConfirm) {
      showError(
        document.getElementById('passwordConfirm'),
        'Passwords do not match.'
      );
    }

    if (!isValid) return;

    const formData = {
      name,
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to register. Please try again.');
      }

      alert('Registration successful!');

      // Redirect to home page if successful
      window.location.href = '';
    } catch (error) {
      alert(error.message);
    }
  });
});
