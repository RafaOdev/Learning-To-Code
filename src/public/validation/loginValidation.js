const input__code = document.getElementById('input__code');
const btn__submit = document.querySelector('.button');
const error = document.querySelector('.error');
let code = 0;

window.addEventListener('load', () => {
    fetch('/codeLogin').then(response => response.json()).then (json => {
        code = json.code;
        console.log(code);
    })
})

btn__submit.addEventListener('click', () => {
    const UserCode = input__code.value;

    const codeEmpty = UserCode === '';
    const codeInvalid = UserCode != code;

    input__code.classList.toggle('invalidCode', codeEmpty || codeInvalid);
    error.innerHTML = codeEmpty ? 'Code is empty!!' : codeInvalid ? 'Code is invalid!!' : '';

    if(!codeEmpty && !codeInvalid && UserCode == code){
        window.location.href = '/home';
    }
})

