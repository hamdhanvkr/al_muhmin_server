const express = require('express');
const route = express.Router();
const Users = require('../models/users');
const bcrypt = require("bcrypt")

route.post('/login', async (req, res) => {

    const { username, password } = req.body;
    // console.log(req.body)

    try {
        const login = await Users.findOne({ username });

        if (!login) {
            return res.json({ success: false, message: "Username is Invalid" })
        }
        const hashPasswordCheck = await bcrypt.compare(password,login.password)
        if(!hashPasswordCheck){
            return res.json({success:false,message:"Password is Invalid"})
        }

        else {
            return res.json({ success: true, message: "Login Success" })
        }
    }
    catch (error) {
        console.error(err)
    }
})

module.exports = route;