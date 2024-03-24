let container = document.querySelector('.container');
const input__name = document.getElementById('input__name');
const input__email = document.getElementById('input__email');
const input__password = document.getElementById('input__pass');
const error = document.getElementById('error__message');
const btn__register = document.querySelector('.btn__submit');
const btn__ShowPass = document.getElementById('showPass');


function registerUser(){
    const user__name = input__name.value;
    const user__email = input__email.value;
    const user__password = input__password.value;


    function handleEmptys(){
        const emptyName = user__name === '';
        const emptyEmail = user__email === '';
        const emptyPass = user__password === '';

        input__name.classList.toggle('invalidName', emptyName);
        input__email.classList.toggle('invalidEmail', emptyEmail);
        input__password.classList.toggle('invalidPassword', emptyPass);

        if(emptyName || emptyEmail || emptyPass){
            const messages = [];
            if(emptyName) messages.push('Name');
            if(emptyEmail) messages.push('Email');
            if(emptyPass) messages.push('Password');

            if(messages.length > 2){
                error.innerHTML = 'Fields is empty!! Please fill all fields';
            }else {
                error.innerHTML = `Please fill the ${messages.join(' and ')}`;
            }

            return false;
        }else {
            error.innerHTML = '';
        }

        return true;
    }    


    function validation(){
        const regex__name = /^[a-zA-Z\s]+$/;
        const regex__email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        const invalidName = !regex__name.test(user__name);
        const invalidEmail = !regex__email.test(user__email);


        input__name.classList.toggle('invalidName', invalidName);
        input__email.classList.toggle('invalidEmail', invalidEmail);

        if(invalidName || invalidEmail){
            const messages = [];
            if(invalidName) messages.push('Name');
            if(invalidEmail) messages.push('Email');

            if(messages.length == 2){
                error.innerHTML = 'Name and Email is invalid!!';
            }else {
                error.innerHTML = `The ${messages} is invalid`;
            }

            return false;
        }
        
        return true;
    }

    function passValidation(){
        const minPass = user__password.length < 5;
        const maxPass = user__password.length > 20;

        if(minPass || maxPass){
            if(minPass){
                input__password.classList.add('invalidPassword');
                error.innerHTML = 'Password is too short!!';
            } else if(maxPass){
                input__password.classList.add('invalidPassword');
                error.innerHTML = 'Password is too long!!';
            }else {
                input__password.classList.remove('invalidPassword');
                error.innerHTML = '';
            }

            return false;
        }

        return true;
    }


    function sending(){
        const user = {
            name: user__name,
            email: user__email,
            password: user__password
        }

        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response => response.json()).then(json => {

            if(json.user == '200'){
                input__email.classList.add('invalidEmail');
                error.innerHTML = 'Email already exists!!';
            }else if(json.user == '404'){
                window.location.href = '/signup/validation';
            }

            localStorage.setItem('user', JSON.stringify(user));

            console.log(json);
        })
    }

    if(handleEmptys() && validation() && passValidation()){
        sending();
    }
}


function showPassword(){
    if(input__password.type === 'password' && input__password.value !== ''){
        input__password.type = 'text';
        btn__ShowPass.className = 'fas fa-eye-slash';
    }else {
        input__password.type = 'password';
        btn__ShowPass.className = 'fas fa-eye';
    }

    return;
}

btn__register.addEventListener('click', registerUser);
btn__ShowPass.addEventListener('click', showPassword);
