const express = require('express');
const bodyParser = require('body-parser');
const database = require('./src/services/database.js');
const sendEmail = require('./src/services/sendEmail.js');
const router = require('./src/routes/routes.js');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/register', database.verifyUser);
app.use('/sendCode', sendEmail.sendCode);
app.post('/datas', database.registerUser);
app.post('/login', database.loginUsers);
app.use('/codeLogin', sendEmail.loginCode);
app.post('/email', sendEmail.loginUser);

app.use(express.static(path.join(__dirname, './src/public')));
app.use(router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

module.exports = app;