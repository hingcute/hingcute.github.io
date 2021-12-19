// Hứa Thái Hưng B1909922

//Dựa theo ví dụ nhỏ của thầy

const form1 = document.getElementById('form1');
const cfpw = document.getElementById('confirm');
const pw = document.getElementById('password');
const email = document.getElementById('email');
const register = document.querySelector('.page__main--register');
const anmtBox = document.querySelector('.box-animation');


function checkPassword() {
    if (pw.value === '') {
        errorMessage(pw, "Bạn cần nhập mật khẩu.");
    }
    if (pw.value.length < 8) {
        errorMessage(pw, "Mật khẩu phải từ 8 kí tự trở lên.");
        return false;
    } else {
        successMessage(pw);
    }

}



function checkConfirm() {
    if (cfpw.value === '') {
        errorMessage(cfpw, "Bạn cần nhập lại mật khẩu.");
    }
    if (cfpw.value != pw.value) {
        errorMessage(cfpw, "Nhập lại mật khẩu không trùng khớp.");
        return false;
    }

    if (cfpw.value.length < 8) {
        errorMessage(cfpw, "Mật khẩu phải từ 8 kí tự trở lên.");
        return false;
    } else {
        successMessage(cfpw);
    }

}

function validateEmail(email) {
    /*https://www.w3resource.com/*/
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return mailformat.test(String(email).toLowerCase());
}

function checkEmail() {
    if (email.value === '') {
        errorMessage(email, "Bạn cần nhập Email.");
    } else if (!validateEmail(email.value)) {
        errorMessage(email, "Email không hợp lệ.");
    } else {
        successMessage(email);
    }
}
cfpw.addEventListener('blur', checkConfirm, true);
pw.addEventListener('blur', checkPassword, true);
email.addEventListener('blur', checkEmail, true);


form1.addEventListener('submit', (evt) => {
    //prevent default loading when form is submitted 
    evt.preventDefault();


    const formRows = document.querySelectorAll('.form-row');
    //Array.isArray(formRows)	--> False
    let arrformRows = Array.from(formRows); //Array.isArray(formRows)	-->  true 
    arrformRows.pop();
    let isValid = true;
    arrformRows.forEach(item => {
        console.log(item.classList.contains('success'));
        if (!item.classList.contains('success')) isValid = false;
    });


    //check if all input values are valid 
    if (isValid) {
        register.classList.add('complete');
        alert("Bạn đã đăng ký tài khoản thành công!!!");
        anmtBox.classList.add('show');
    } else {
        register.classList.remove('complete');
        anmtBox.classList.remove('show');
    }
});

function errorMessage(pElement, message) {
    const formRow = pElement.parentElement.parentElement;

    if (formRow.classList.contains('success')) {
        formRow.classList.remove('success');
        formRow.classList.add('error');
    } else {
        formRow.classList.add('error');
    }
    formRow.querySelector('.message').textContent = message;
}

function successMessage(pElement) {
    const formRow = pElement.parentElement.parentElement;

    if (formRow.classList.contains('error')) {
        formRow.classList.remove('error');
        formRow.classList.add('success');
    } else {
        formRow.classList.add('success');
    }
}