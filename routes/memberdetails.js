const express = require('express');
const route = express.Router();
const Member = require('../models/memberdetails');

route.get('/memberdetails', async (req, res) => {
    try {
        const fetchMemberdetails =await Member.find();
        res.json(fetchMemberdetails);
    }
    catch (err) {

    }
})

module.exports=route;