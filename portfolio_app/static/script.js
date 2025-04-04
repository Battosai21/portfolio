$(document).ready(function() {
  $('a.active').removeClass('active').removeAttr('aria-current');
  $('a[href="' + location.pathname + '"]').closest('a').addClass('active').attr('aria-current', 'page'); 
});

function togglePasswordVisibility(inputId, toggleButtonId) {
    const passwordInput = document.getElementById(inputId);
    const toggleButton = document.getElementById(toggleButtonId);
    const icon = toggleButton.querySelector('i');

    toggleButton.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('bi-eye');
            icon.classList.add('bi-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('bi-eye-slash');
            icon.classList.add('bi-eye');
        }
    });
}

// Initialize toggle functionality for both password fields
togglePasswordVisibility('firstPassword', 'toggleFirstPassword');
togglePasswordVisibility('confirmPassword', 'toggleConfirmPassword');

// Functions for adding and removing feedback messages for forms validation
function addInvalidFeedback(inputId, message) {
  const input = document.getElementById(inputId);
  const feedback = document.createElement('div');
  feedback.className = 'invalid-feedback';
  feedback.innerText = message;
  input.parentNode.insertBefore(feedback, input.nextSibling);
}

function removeInvalidFeedback(inputId) {
  const input = document.getElementById(inputId);
  const feedback = input.parentNode.querySelector('.invalid-feedback');
  if (feedback) {
    feedback.remove();
  }
}

//----------------------------------------------------------------
// Validacion de los campos del formulario de registro

const firstName = document.getElementById('firstName');
firstName.addEventListener('blur', (event) => {
  if (firstName.value.length == "") {
    removeInvalidFeedback('firstName');
    addInvalidFeedback('firstName', 'Please enter your first name.');
    firstName.classList.add('is-invalid');
  } else {
    removeInvalidFeedback('firstName');
    firstName.classList.remove('is-invalid');
  }
})

const lastName = document.getElementById('lastName');
lastName.addEventListener('blur', (event) => {
  if (lastName.value.length == "") {
    removeInvalidFeedback('lastName');
    addInvalidFeedback('lastName', 'Please enter your last name.');
    lastName.classList.add('is-invalid');
  } else {
    removeInvalidFeedback('lastName');
    lastName.classList.remove('is-invalid');
  }
})

// Funcion para validar el nombre de usuario. Se fija si el nombre de usuario ya existe en la base de datos.
const username = document.getElementById('username');
username.addEventListener('blur', (event) => {
  const usernameValue = username.value;

  if (usernameValue.length === 0) {
    username.classList.add('is-invalid');
    removeInvalidFeedback('username');
    addInvalidFeedback('username', 'Please enter a username.');
    return;
  }

  // Send AJAX request to validate the username
  fetch(`/validate_username/?username=${encodeURIComponent(usernameValue)}`)
    .then(response => response.json())
    .then(data => {
      if (data.is_taken) {
        username.classList.add('is-invalid');
        removeInvalidFeedback('username');
        addInvalidFeedback('username', 'This username is already taken.');
      } else {
        username.classList.remove('is-invalid');
        removeInvalidFeedback('username');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

// Funcion para validar las contraseñas
const password = document.getElementById('firstPassword');
password.addEventListener('blur', (event) => {
  if (password.value.length == 0) {
    password.classList.add('is-invalid');
    removeInvalidFeedback('firstPassword');
    addInvalidFeedback('firstPassword', 'Please enter a password.');
  } else if (password.value.length < 6) {
    password.classList.add('is-invalid');
    removeInvalidFeedback('firstPassword');
    addInvalidFeedback('firstPassword', 'Password must be at least 6 characters long.');
  } else if (password.value.search(/[A-Z]/) == -1) {
    password.classList.add('is-invalid');
    removeInvalidFeedback('firstPassword');
    addInvalidFeedback('firstPassword', 'Password must contain at least one uppercase letter.');
  } else if (password.value.search(/[\W_]/) == -1) {
    password.classList.add('is-invalid');
    removeInvalidFeedback('firstPassword');
    addInvalidFeedback('firstPassword', 'Password must contain at least one special character.');
  } else {
    password.classList.remove('is-invalid');
    removeInvalidFeedback('firstPassword');
  }
});

const confirmPassword = document.getElementById('confirmPassword');
confirmPassword.addEventListener('blur', (event) => {
  if (confirmPassword.value.length == 0) {
    confirmPassword.classList.add('is-invalid');
    removeInvalidFeedback('confirmPassword');
    addInvalidFeedback('confirmPassword', 'Please confirm your password.');
  } else if (confirmPassword.value != password.value) {
    confirmPassword.classList.add('is-invalid');
    removeInvalidFeedback('confirmPassword');
    addInvalidFeedback('confirmPassword', 'Passwords do not match.');
  } else {
    confirmPassword.classList.remove('is-invalid');
    removeInvalidFeedback('confirmPassword');
  }
});

const email = document.getElementById('email');
email.addEventListener('blur', (event) => {
  if (email.value.length == "") {
    email.classList.add('is-invalid');
    removeInvalidFeedback('email');
    addInvalidFeedback('email', 'Please enter an email address.');
  } else if (email.value.search(/^\S+@\S+$/) == -1) {
    // Regex for validating email format
    email.classList.add('is-invalid');
    removeInvalidFeedback('email');
    addInvalidFeedback('email', 'Please enter a valid email address.');
  } else {
    email.classList.remove('is-invalid');
    removeInvalidFeedback('email');
  }
});

const countrySelect = document.getElementById('countrySelect');
countrySelect.addEventListener('blur', (event) => {
  if (countrySelect.value == "") {
    countrySelect.classList.add('is-invalid');
    removeInvalidFeedback('countrySelect');
    addInvalidFeedback('countrySelect', 'Please select a country.');
  } else {
    countrySelect.classList.remove('is-invalid');
    removeInvalidFeedback('countrySelect');
  }
});

const termsCheck = document.getElementById('termsCheck');
termsCheck.addEventListener('click', (event) => {
  if (!termsCheck.checked) {
    termsCheck.classList.add('is-invalid');
    removeInvalidFeedback('termsCheck');
    addInvalidFeedback('termsCheck', 'You must accept the terms and conditions.');
  } else {
    termsCheck.classList.remove('is-invalid');
    removeInvalidFeedback('termsCheck');
  }
});

//---------------------------------------------------------
// JavaScript for disabling sign up form submissions if there are invalid fields
(() => {
  'use strict';

  // Fetch the form element
  const form = document.getElementById('signupForm');

  // Add a submit event listener to the form
  form.addEventListener('submit', (event) => {
    let isFormValid = true;

    // Validate each field manually
    const fieldsToValidate = [
      'firstName',
      'lastName',
      'username',
      'firstPassword',
      'confirmPassword',
      'email',
      'countrySelect',
    ];

    fieldsToValidate.forEach((fieldId) => {
      const field = document.getElementById(fieldId);

      // Trigger the blur event for each field to apply validation logic
      if (field) {
        field.dispatchEvent(new Event('blur'));

        // Check if the field is invalid
        if (field.classList.contains('is-invalid')) {
          isFormValid = false;
        }
      }
    });

    // Prevent form submission if any field is invalid
    if (!isFormValid || !form.checkValidity()) {
      event.preventDefault(); // Prevent form submission
      event.stopPropagation(); // Stop further propagation of the event
    }

    // Add Bootstrap's validation styles
    form.classList.add('was-validated');
  }, false);
})();