// Input fields
const firstName = document.getElementById('firstName');
const surName = document.getElementById('Surname');
const passWord = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const email = document.getElementById('email');
// Form
const form = document.getElementById('myForm');
// Validation colours
const green = '#4CAF50';
const red = '#F44336';

// Handle form
form.addEventListener('submit', function(event){
  // Prevent default behaviour
  event.preventDefault();
  if(
    validateFirstName() && 
    validateSurName() && 
    validatePassword() && validateConfirmPassword() && 
    validateEmail()
) {
      const name = firstName.value;
      const container = document.querySelector('div.container');
      const loader = document.createElement('div');
      loader.className = 'progress';
      const loadingBar = document.createElement('div');
      loadingBar.className = 'indeterminate';
      loader.appendChild(loadingBar);
      container.appendChild(loader);
      setTimeout(function() {
        const loaderDiv = document.querySelector('div.progress');
        const panel = document.createElement('div');
        panel.className = 'card-panel green';
        const text = document.createElement('span');
        text.className = 'white-text';
        text.appendChild(
          document.createTextNode(
            `Registration complete, welcome aboard ${name}!`
          )
        );
        panel.appendChild(text);
        container.replaceChild(panel, loaderDiv);
      }, 1000);
    }
});

// Validation functions
function validateFirstName(){
  // Check if the field is empty
  if(checkIfEmpty(firstName)) return;
  // Check if it has only letter
  if(!checkIfOnlyLetters(firstName)) return;
  return true;
}

function validateSurName(){
  // Check if the field is empty
  if(checkIfEmpty(surName)) return;
  // Check if it has only letter
  if(!checkIfOnlyLetters(surName)) return;
  return true;
}

function validatePassword(){
  // Check if the field is empty
  if(checkIfEmpty(password))  return;
  // Check that the password is long enough
  if(!meetLength(password, 8, 100)) return;
  // Check the password against the character set
  // 1- a
  // 2- a 1
  // 3- A a 1
  // 4- A a 1 @
  if(!containsCharacters(password, 3)) return;
  return true;
}

function validateConfirmPassword(){
  if(password.className !== 'valid'){
    setInvalid(confirmPassword, `Password must be valid`);
    return;
  }
  // Check if passwords match
  if(password.value !== confirmPassword.value){
    setInvalid(confirmPassword, `Passwords must match`);
    return;
  } else {
    setValid(confirmPassword);
  }
  return true;
}

function validateEmail(){
  if(checkIfEmpty(email)) return;
  if(!containsCharacters(email, 5)) return;
  return true;
}

// Utility functions
function checkIfEmpty(field){
  if(isEmpty(field.value.trim())){
    // Set field invalid
    setInvalid(field, `${field.name} must not be empty`);
    return true;
  } else {
    // Set field valid
    setValid(field);
    return false;
  }
}

function isEmpty(value){
  if(value === '') return true;
  return false;
}

function setInvalid(field, message){
  field.className = 'invalid';
  field.nextElementSibling.innerHTML = message;
  field.nextElementSibling.style.color = red;
}

function setValid(field, message){
  field.className = 'valid';
  field.nextElementSibling.innerHTML = '';
  // field.nextElementSibling.style.color = green;
}

function checkIfOnlyLetters(field){
  if(/^[a-zA-Z ]+$/.test(field.value)){
    setValid(field);
    return true;
  } else {
    setInvalid(field, `${field.name} must contain only letters`)
  } return false;
}

function meetLength(field, minLength, maxLength){
  if(field.value.length >= minLength && field.value.length  < maxLength) {
    setValid(field);
    return true;
  } else if(field.value.length < minLength){
    setInvalid(field, `${field.name} must have at least ${minLength} characters`)
    return false;
  } else {
    setInvalid(field, `${field.name} must have less than ${maxLength} characters`)
    return false;
  }
}

function containsCharacters(field, code){
  let regEx;
  switch(code){
    case 1:
      // Letters
      regEx = /(?=.*[a-zA-Z])/
    return matchWithRegEx(regEx, field, `Must contain at least one letter`);
  case 2:
    // Letters and Numbers
    regEx = /(?=.*\d)(?=.*[a-zA-Z])/
    return matchWithRegEx(regEx, field, `Must contain at least one letter and one number`);
  case 3:
    // One uppercase, one lowercase, and one number
    regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/
    return matchWithRegEx(regEx, field, 'Must contain at least one uppercase, one lowercase, and one number');
  case 4:
    // One uppercase, one lowercase, one number, and one special character
    regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/
    return matchWithRegEx(regEx, field, 'Must contain at least one uppercase, one lowercase, one number, and one special character');
    default:
      return false;
  case 5:
    // Email pattern
    regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return matchWithRegEx(regEx, field, 'Must be a valid email address');
  }
}

function matchWithRegEx(regEx, field, message){
  if(field.value.match(regEx)){
    setValid(field);
    return true;
  } else {
    setInvalid(field, message);
    return false
  }
}