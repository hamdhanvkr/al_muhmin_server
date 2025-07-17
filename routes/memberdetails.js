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


// Add new route to handle POST request
route.post('/memberadd', async (req, res) => {
  try {
    const { sno,name, mobile_no, email } = req.body;
    const newMember = new Member({ sno,name, mobile_no, email });
    await newMember.save();
    res.status(201).json({ message: "Member saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error saving member", error: err });
  }
});


module.exports=route;