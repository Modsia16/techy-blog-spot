const signupFormHandler = (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-input-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    const response = fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password,
        }),
        headers: { 'Content-type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/dash');
    } else {
        alert('Failed to sign up');
}
};

document.querySelector('#new-user-form').addEventListener('submit', signupFormHandler);
