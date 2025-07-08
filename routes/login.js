const express = require('express');
const route = express.Router();
const Login = require('../models/login');

route.post('/login', async (req, res) => {

    const { username, password } = req.body;
    console.log(req.body)

    try {
        const login = await Login.findOne({ username });

        // const login = new Login({ username, password });
        // login.save();
        // const logins = await Login({username});
        
        if (login) {
            if (login.password === password) {
                return res.json({ success: true, message: "Login Successfull" })
            }
            else {
                return res.json({ success: false, message: "Passoword is Invalid" })
            }
        }
        else {
            return res.json({ success: false, message: "Username is Invalid" })
        }
    }
    catch (error) {
        console.error(err)
    }
})

module.exports = route;