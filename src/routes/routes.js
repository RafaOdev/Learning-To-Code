const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/Home', (req, res) => {
    res.send('In cosntuction...');
})

router.get('/login/', (req, res) => {
    const LoginPath = path.join(__dirname, '../public/login/login.html');
    res.sendFile(LoginPath);
})


router.get('/login/validation/', (req, res) => {
    const validationPathLogin = path.join(__dirname, '../public/validation/loginValidation.html');
    res.sendFile(validationPathLogin);
})

router.get('/signup/', (req, res) => {
    const signupPath = path.join(__dirname, '../public/register/register.html');
    res.sendFile(signupPath);
})

router.get('/signup/validation/', (req, res) => {
    const validationPath = path.join(__dirname, '../public/validation/validation.html');
    res.sendFile(validationPath);
})

module.exports = router;