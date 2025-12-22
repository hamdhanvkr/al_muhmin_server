const express = require("express");
const router = express.Router();
const Academic = require("../models/academic");

// GET ALL
router.get("/get", async (req, res) => {
    const rows = await Academic.find().sort({ academic_id: -1 });
    res.json(rows);
});

// ADD
router.post("/add", async (req, res) => {
    try {
        // Check duplicate
        const exists = await Academic.findOne({ academic_year: req.body.academic_year });
        if (exists) {
            return res.status(400).json({ success: false, message: "Academic Year already exists!" });
        }

        // If status = active, deactivate others
        if (req.body.status === 1) {
            await Academic.updateMany({ status: 1 }, { status: 0 });
        }

        const row = await Academic.create({
            academic_year: req.body.academic_year,
            status: req.body.status
        });
        res.json({ success: true, message: "Academic Year added successfully", data: row });
    } catch (err) {
        res.status(500).json({ success: false, message: "Insert failed", err });
    }
});

// UPDATE
router.put("/update/:id", async (req, res) => {
    try {
        // Check duplicate excluding current id
        const exists = await Academic.findOne({ 
            academic_year: req.body.academic_year,
            academic_id: { $ne: req.params.id }
        });
        if (exists) {
            return res.status(400).json({ success: false, message: "Academic Year already exists!" });
        }

        // If status = active, deactivate others
        if (req.body.status === 1) {
            await Academic.updateMany({ status: 1, academic_id: { $ne: req.params.id } }, { status: 0 });
        }

        await Academic.findOneAndUpdate(
            { academic_id: req.params.id },
            req.body
        );

        res.json({ success: true, message: "Academic Year updated successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Update failed", err });
    }
});

// DELETE (same, just add success message)
router.delete("/delete/:id", async (req, res) => {
    try {
        await Academic.findOneAndDelete({ academic_id: req.params.id });
        res.json({ success: true, message: "Academic Year deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Delete failed", err });
    }
});
;

module.exports = router;
