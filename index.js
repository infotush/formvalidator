const form = document.getElementById("myForm");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

//function show error and outline error

function showError(input, message) {
  const formControl = input.parentElement;

  formControl.classList.add("error");
  formControl.classList.remove("success");
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;

  formControl.classList.add("success");
  formControl.classList.remove("error");
}

//get field name

function getFieldname(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
//check required

function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldname(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

//check length

function checkLength(input, min, max) {
  let message;
  if (input.value.length === 0) {
    message = `${getFieldname(input)} is required`;
    showError(input, message);
  } else if (input.value.length < min) {
    message = `${getFieldname(
      input
    )} must be atleast ${min} characters in length`;
    showError(input, message);
  } else if (input.value.length > max) {
    message = `${getFieldname(
      input
    )} must not be greater than ${max} characters`;
    showError(input, message);
  } else {
    showSuccess(input);
  }
}

//check valid email

function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (input.value.length === 0) {
    showError(input, `${getFieldname(input)} is required`);
  } else if (re.test(String(input.value).trim().toLowerCase())) {
    showSuccess(input);
  } else {
    showError(input, "email is not valid");
  }
}

//check password match
function checkPasswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "passwords do not match");
  }
}

function checkPassword(input) {
  let re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  if (input.value.length === 0) {
    showError(input, `${getFieldname(input)} is required`);
  } else if (re.test(String(input.value).trim())) {
    showSuccess(input);
  } else {
    showError(input, "password is not valid");
  }
}

//Event Listener

form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkRequired([username, email, password, confirmPassword]);
  checkLength(username, 3, 9);
  checkLength(password, 6, 12);
  checkPassword(password);
  checkEmail(email);
  checkPasswordMatch(password, confirmPassword);
});
