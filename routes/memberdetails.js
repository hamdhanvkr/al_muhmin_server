const express = require('express');
const route = express.Router();
const Member = require('../models/memberdetails');

// Get all members
route.get('/memberdetails', async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: "Error fetching members" });
  }
});

// Add new member
route.post('/memberadd', async (req, res) => {
  try {
    const { sno, name, mobile_no, email } = req.body;
    const newMember = new Member({ sno, name, mobile_no, email });
    await newMember.save();
    res.status(201).json({ message: "Member saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error saving member", error: err });
  }
});

// Update member
route.put('/memberupdate/:id', async (req, res) => {
  try {
    const { sno, name, mobile_no, email } = req.body;
    await Member.findByIdAndUpdate(req.params.id, { sno, name, mobile_no, email });
    res.json({ message: "Member updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating member", error: err });
  }
});

// Delete member
route.delete('/memberdelete/:id', async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.json({ message: "Member deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting member", error: err });
  }
});

module.exports = route;
