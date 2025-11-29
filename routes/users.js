const express = require('express');
const route = express.Router();
const multer = require('multer');
const Users = require('../models/users');
const bcrypt = require("bcrypt")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

route.post('/register', async (req, res) => {

    const { name, address, email, phoneNo, username, password } = req.body;
    const image = req.file ? req.file.filename : null;

    // console.log(req.body)

    try {
        const checkUser = await Users.findOne({ username })
        if (checkUser) {
            return res.json({ success: false, message: "Username Already Exists" })
        }
        const hashPassword = await bcrypt.hash(password,10)

        const registers = await Users.create({ name, address, email, phoneNo, username, password:hashPassword });
        // console.log(registers);
        return res.json({ success: true, message: "Registration Success" })
    }
    catch (error) {
        console.error(error)
    }
})

module.exports = route