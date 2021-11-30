const loginFormHandler = async function(event) {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
  
    // Gather the data from the form elements on the page
    const usernameEl = document.querySelector('#username-input-login').value.trim();
    const passwordEl = document.querySelector('#password-login').value.trim();
  
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({
        username: usernameEl,
        password: passwordEl,
      }),
      headers: { 'Content-type': 'application/json' },
    });

      if (response.ok) {
        document.location.replace('/dash');
      } else {
        alert('Failed to log in');
      }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);