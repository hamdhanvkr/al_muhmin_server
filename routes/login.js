const express = require('express');
const route = express.Router();
const Login = require('../models/login');
// const bcrypt = require("bcrypt") // REMOVED: bcrypt is no longer used

route.post('/login', async (req, res) => {

    const { username, password } = req.body;
    // console.log(req.body)

    try {
        const login = await Login.findOne({ username });

        if (!login) {
            return res.json({ success: false, message: "Username is Invalid" });
        }
        
        // --- MODIFICATION: Plain text password comparison ---
        // Assuming login.password now contains the plain text password from the database
        if (password !== login.password) {
            return res.json({ success: false, message: "Password is Invalid" });
        }
        // ---------------------------------------------------

        else {
            return res.json({ success: true, message: "Login Success" });
        }
    }
    catch (error) {
        // Changed 'err' to 'error' to match catch parameter
        console.error(error); 
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

module.exports = route;