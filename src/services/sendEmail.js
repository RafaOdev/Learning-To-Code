const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'oliveiradesouza5005@gmail.com',
        pass: 'lmqlsybqtuajsokt'
    }
})
const code = Math.floor(Math.random() * 1000000);

if(code.length < 5){
    code = code * 10
}

async function registerUser(req, res){
    const html = (code) => `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title></title>
        </head>
        <body style="display: flex; justify-content: center;">
            <div class="validationEmail">
                <h1 style="font-weight: 600; text-align: center;">Hello</h1>
                <div class="text" style="border-top: 1px solid black; width: 510px;">
                    <p style="margin-left: 70px;">thank you for created an account on Learning to Code.</p>
            <p style="margin-left: 70px;">This is your access code: <span class="code">${code}</        span></p>
                </div>
            </div>
        </body>
        </html>`;

    const { email } = req.body;
    if(email){
        try{
            transport.sendMail({
                from: 'Rafael Oliveira <oliveiradesouza5005@gmail.com>',
                to: email,
                html: html(code)
            })

            res.json({user: 404})
        }catch(err){
            res.status(400).json({error: 404})
        }
    }
}


function sendCode(req, res){
    res.json({
        code: code
    })
}

module.exports = { registerUser, sendCode }