const input__code = document.getElementById('input__code');
const btn__submit = document.querySelector('.button');
const error = document.querySelector('.error');
const datasUser = JSON.parse(localStorage.getItem('user'));
let code = 0;


window.addEventListener('load', () => {
    fetch('/sendCode').then(response => response.json()).then(json =>{
        code = json.code;
    })
})

btn__submit.addEventListener('click', () => {

    const UserCode = input__code.value;
    const user = {
        name: datasUser.name,
        email: datasUser.email,
        pass: datasUser.password
    }
    

    if(UserCode === ''){
        input__code.classList.add('invalidCode')
        error.innerHTML = 'Code is empty!!';
        return;
    }else {
        input__code.classList.remove('invalidCode')
        error.innerHTML = '';
    }

    if(UserCode != code){
        input__code.classList.add('invalidCode')
        error.innerHTML = 'Code is invalid!!';
        return;
    } else if(UserCode == code){
        input__code.classList.remove('invalidCode')
        error.innerHTML = '';

        fetch('/datas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response => response.json()).then(json => {
            console.log(json);
        })
    }

    console.log(user);
})
