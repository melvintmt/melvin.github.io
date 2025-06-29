document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  const rememberCheckbox = document.getElementById('remember');

  const savedUsername = localStorage.getItem('savedUsername');
  const savedPassword = localStorage.getItem('savedPassword');

  if (savedUsername && savedPassword) {
    document.getElementById('username').value = savedUsername;
    document.getElementById('password').value = savedPassword;
    rememberCheckbox.checked = true;
  }

  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');

    usernameError.style.display = 'none';
    passwordError.style.display = 'none';

    if (username.value.trim() === '') {
      usernameError.style.display = 'block';
      valid = false;
    }

    if (password.value.trim() === '') {
      passwordError.style.display = 'block';
      valid = false;
    }

    if (valid) {
      if (rememberCheckbox.checked) {
        localStorage.setItem('savedUsername', username.value);
        localStorage.setItem('savedPassword', password.value);
      } else {
        localStorage.removeItem('savedUsername');
        localStorage.removeItem('savedPassword');
      }
      window.location.href = 'home-085.html';
    }
  });
});
