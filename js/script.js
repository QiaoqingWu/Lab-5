/* 
    Student Name: Qiaoqing Wu
    Due Date: 2023-03-26
    Section: CST8285 Lab section 313
	Description: JavaScript file for index.html, with validation functions 
    for all the required user input boxes.
*/
const errorAlert = [
    {
        text:"x Email address should be non-empty with the format xyz@xyz.xyz"
    },
    {
        text:"x User name should be non-empty, and within 20 characters long."
    },
    {
        text:"x Password should be at least 6 characters: 1 uppercase, 1 lowercase."
    },
    {
        text:"x Please retype password."
    }
] 

let error, inputBox;

window.onload = function() {
    
    putErrorAlert(errorAlert);
    error = document.querySelectorAll(".alert");
    // console.log(error);
    inputBox = document.querySelectorAll(".form-control");
    // console.log(inputBox);
    getAgreeTermError();

    const email = document.getElementById("email");
    const username = document.getElementById("username");
    const pass = document.getElementById("pass");
    const pass2 = document.getElementById("pass2"); 
    const termCheck = document.getElementById("termscon");

    email.addEventListener("keyup", validateEmail);
    username.addEventListener("keyup", validateUserName);
    pass.addEventListener("keyup", validatePassword);
    pass2.addEventListener("keyup", confirmPassword);
    termCheck.addEventListener("click", agreeTermCheck);

    document.getElementById("terms").addEventListener("click", spamAlert);

    // clear all error messages when click reset button
    document.getElementById("resetbtn").addEventListener("click", function () {
        for (let i = 0; i < errorAlert.length; i++) {
            error[i].style.display = "none";
            inputBox[i].style.border = "1px solid #ced4da";
        }
        document.getElementById("agree-term-error").style.display = "none";
    })

    // convert username to lowercase
    document.form.addEventListener("submit", function () {
        username.value = username.value.toLowerCase();
    });
}

// if the form is valid, then submit the form, otherwise alert error message
function validate() {
    let isEmailValid = validateEmail(),
        isUserNameValid = validateUserName(),
        isPasswordValid = validatePassword();
        isPasswordConfirm = confirmPassword();
        isTermChecked = agreeTermCheck();

    let isFormValid = isEmailValid 
    && isUserNameValid 
    && isPasswordValid
    && isPasswordConfirm
    && isTermChecked;

    if (isFormValid == false) {
        console.log("Form valid is: " + isFormValid);
        return false;
    } else {
        alert("Data is valid!");
        return true;
    }
}

// generate error message
function getErrorStatment(alertObj) {
    const error = document.createElement('span');
    error.className = "alert";
    error.style.color = "red";
    error.style.padding = "12px 0 12px 0";
    error.style.display = "none";
    error.innerHTML = alertObj.text;
    return error;
}

// append error message next to the input box
function putErrorAlert(errorAlert) {
    const input = document.querySelectorAll('.form-control');
    for(let i = 0; i < input.length; i++) {
        input[i].insertAdjacentElement("afterend", getErrorStatment(errorAlert[i]));
    }
}

// email validatation
function validateEmail() {
    const emailRegex = /^([a-z]{3})@([a-z]{3})+(\.[a-z]{3})*$/;
    let inputEmail = email.value;

    if (!emailRegex.test(inputEmail) || inputEmail == "") {
        error[0].style.display = "inline";
        inputBox[0].style.border = "2px solid red";
        return false;
    } else {
        error[0].style.display = "none";
        inputBox[0].style.border = "1px solid #ced4da";
        return true;
    }
}

// user name validation
function validateUserName() {
    const max = 19;
    let inputName = username.value;
    let inputValid = inputName.length > max;

    if((inputValid == true) || inputName == "") {
        error[1].style.display = "inline";
        inputBox[1].style.border = "2px solid red";
        return false;
    } else {
        error[1].style.display = "none";
        inputBox[1].style.border = "1px solid #ced4da";
        // inputName = inputName.toLowerCase();
        console.log(inputName);
        return true;
    }
}

// password validation
function validatePassword() {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d#$@!%&*?]{6,}$/;
    let inputPassword = pass.value;

    if(!passwordRegex.test(inputPassword) || inputPassword == "") {
        error[2].style.display = "inline";
        inputBox[2].style.border = "2px solid red";
        return false;
    } else {
        error[2].style.display = "none";
        inputBox[2].style.border = "1px solid #ced4da";
        return true;
    }
}

// retype password and confirm
function confirmPassword() {
    let retypePassword = pass2.value;

    if((retypePassword !== pass.value) || retypePassword == "") {
        error[3].style.display = "inline";
        inputBox[3].style.border = "2px solid red";
        return false;
    } else {
        error[3].style.display = "none";
        inputBox[3].style.border = "1px solid #ced4da";
        return true;
    }
}

// generate error message if user don't check the agree terms checkbox
function getAgreeTermError() {
    const accepted = document.createElement('span');
    accepted.id = "agree-term-error";
    accepted.innerHTML = "x Please accept the terms and conditions."
    accepted.style.color = "red";
    accepted.style.paddingLeft = "20px";
    accepted.style.display = "none";

    const termsLabel = document.getElementById("terms-label");
    termsLabel.insertAdjacentElement("afterend", accepted);
}

/* 
    To check if user has checked the agree terms checkbox, if not, then display
    the error message 
*/
function agreeTermCheck() {
    let check = document.getElementById("termscon").checked;
    if (check == false) {
        // console.log("term is checked: " + check);
        document.getElementById("agree-term-error").style.display = "inline";
        return false;
    } else {
        // console.log("term is checked: " + check);
        document.getElementById("agree-term-error").style.display = "none";
        return true;
    }
}

// spam alert when user agree to receive the kitten newsletters
function spamAlert() {
    const newslettersCheck = document.getElementById("terms");

    if (newslettersCheck.checked == true) {
        alert("Your Weekly Kitten Pictures newsletters may be considered spam, please check it in time.");
        return true;
    } else {
        return false;
    }
}