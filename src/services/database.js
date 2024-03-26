const Mysql = require('mysql');
const bcrypt = require('bcrypt');
const sendEmail = require('./sendEmail.js');


const connection = Mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: '7{9G=C}W6a', 
    database: 'Users' 
})

connection.connect((err) => {
    return err ? console.log(err) : console.log('Database connected');
})

function verifyUser(req, res){
    const { email } = req.body;
    if(email){
        connection.query('SELECT * FROM usersdatas WHERE usersEmails = ?', [email], (err, result) => {
            if(err){
                res.status(400).json({error: 404})
            }else {
                if(result.length > 0){
                    res.json({
                        user: 200,
                        email: result[0].usersEmails
                    })
                }else {
                    sendEmail.registerUser(req, res);
                }
            }
        })
    }
}




function registerUser(req, res) {
    const { name, email, pass } = req.body;

    bcrypt.hash(pass, 10, (err, hash) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            connection.query('INSERT INTO usersdatas (usersNames, usersEmails, usersPass) VALUES (?, ?, ?)', [name, email, hash], (err, results) => {
                if (err) {
                    res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    res.json({
                        user: 200,
                        message: 'User created'
                    });
                }
            });
        }
    });
}




function loginUsers(req, res){
    const { email, pass } = req.body;

    connection.query('SELECT * FROM usersdatas WHERE usersEmails = ?', [email], (err, result) => {
        if(err){
            res.status(400).json({error: 404})
        }else {
            if(result.length > 0){
                bcrypt.compare(pass, result[0].usersPass, (err, result) => {
                    if(err){
                        res.status(400).json({error: 404})
                    }else {
                        if(result){
                            res.json({
                                user: 200,
                                pass: 200,
                                credential: 'approved'
                            })
                        }else {
                            res.json({
                                user: 404,
                                email: 200,
                                pass: 400,
                                credential: 'denied'
                            })
                        }
                    }
                })
            } else {
                res.json({
                    user: 404,
                    email: 400
                })
            }
        }
    })
}

module.exports = { verifyUser, registerUser, loginUsers }