const express = require('express');
const route = express.Router();
const Login = require('../models/login');
const jwt = require('jsonwebtoken');

route.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const login = await Login.findOne({ username });

        if (!login) {
            return res.json({
                success: false,
                message: "Username is Invalid"
            });
        }

        if (password !== login.password) {
            return res.json({
                success: false,
                message: "Password is Invalid"
            });
        }

        const token = jwt.sign(
            {
                id: login._id,
                username: login.username,
                role: login.role
            },
            process.env.JWT_SECRET,{
                expiresIn: '1m' // Token valid for 1 day
            }) 

            console.log(token)
        // ✅ Send username & role to frontend
        return res.json({
            success: true,
            message: "Login Success",
            token: token,
            data: {
                username: login.username,
                role: login.role
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});



// -------------------- ADD USER --------------------
route.post("/add", async (req, res) => {
    try {
        const row = await Login.create(req.body);
        res.json({ success: true, data: row });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to Add User" });
    }
});


// -------------------- GET ALL USERS --------------------
route.get("/all", async (req, res) => {
    try {
        const users = await Login.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
});


// -------------------- UPDATE USER --------------------
route.put("/update/:id", async (req, res) => {
    try {
        await Login.findByIdAndUpdate(req.params.id, req.body);
        res.json({ success: true, message: "User Updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
});


// -------------------- DELETE USER --------------------
route.delete("/delete/:id", async (req, res) => {
    try {
        await Login.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "User Deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
});


module.exports = route;