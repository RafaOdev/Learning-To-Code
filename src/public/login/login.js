const input__email = document.getElementById('email');
const input__password = document.getElementById('pass');
const showPass = document.getElementById('showPass');
const error = document.getElementById('error__message')
const btn = document.querySelector('.btn__submit');

function loginUser(){
    const email = input__email.value;
    const pass = input__password.value;

    function fieldEmpty(){
        const emptyEmail = email === '';
        const emptyPass = pass === '';


        input__email.classList.toggle('invalidEmail', emptyEmail);
        input__password.classList.toggle('invalidPass', emptyPass);

        if(emptyEmail || emptyPass){
            const messages = [];

            if(emptyEmail) messages.push('Email');
            if(emptyPass) messages.push('Password');
            if(messages.length > 1){
                error.innerHTML = 'Fields is empty!! Please fill all fields';
            } else{
                error.innerHTML = `Please fill the ${messages} !!`;
            }

            return false;
        }

        return true;
    }

    function validation(){
        const regex__email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const invalidEmail = !regex__email.test(email);

        input__email.classList.toggle('invalidEmail', invalidEmail);

        if(invalidEmail){
            error.innerHTML = 'Invalid Email!!';
            return false;
        }

        return true;
    }


    function sendingData(){
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, pass})
        }).then(response => response.json()).then(json => {

            function validatioUser(){
                const emailInvalid = json.email == '400';
                const passInvalid = json.pass == '400';

                input__email.classList.toggle('invalidEmail', emailInvalid);
                input__password.classList.toggle('invalidPass', passInvalid);

                if(emailInvalid || passInvalid){
                    const messages = [];
                    if(emailInvalid) messages.push('Email');
                    if(passInvalid) messages.push('Password');
                
                    error.innerHTML = `The ${messages} is invalid!!`;

                    return false;
                }

                return true;
            }


            if(validatioUser() && json.user == '200'){

                fetch('/email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({email})
                }).then(response => response.json()).then(json => {
                    console.log(json);
                
                })

                window.location.href = '/login/validation/';
            }

            console.log(json);
        })
    }

    if(fieldEmpty() && validation()){
        sendingData();
    }
}



btn.addEventListener('click', loginUser);

showPass.addEventListener('click', () => {
    if(input__password.type === 'password' && input__password.value !== ''){
        input__password.type = 'text';
        showPass.className = 'fas fa-eye-slash';
    }else {
        input__password.type = 'password';
        showPass.className = 'fas fa-eye';
    }
})