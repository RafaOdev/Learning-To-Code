const input__email = document.getElementById('email');
const input__password = document.getElementById('pass');
const showPass = document.getElementById('showPass');
const error = document.getElementById('error__message')
const btn = document.querySelector('.btn__submit');



showPass.addEventListener('click', () => {
    if(input__password.type === 'password' && input__password.value !== ''){
        input__password.type = 'text';
        showPass.className = 'fas fa-eye-slash';
    }else {
        input__password.type = 'password';
        showPass.className = 'fas fa-eye';
    }
})