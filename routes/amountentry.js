const express = require("express");
const router = express.Router();
const AmountEntry = require("../models/amountEntry");
const Members = require("../models/memberdetails");


// ✅ Get dashboard totals for a year
router.get("/dashboard/:year", async (req, res) => {
  try {
    const { year } = req.params;

    const membersCount = await Members.countDocuments();
    const amounts = await AmountEntry.find({ year });

    const totalAmount = amounts.reduce((sum, a) => sum + (a.total || 0), 0);

    res.json({
      membersCount,
      totalAmount,
      year: Number(year),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching dashboard data" });
  }
});


// ✅ Get all members by year
router.get("/:year", async (req, res) => {
  try {
    const { year } = req.params;
    const members = await Members.find();
    const amounts = await AmountEntry.find({ year });

    const result = members.map((m) => {
      const entry = amounts.find((a) => a.memberId.toString() === m._id.toString());
      if (entry) return entry;

      return {
        memberId: m._id,
        name: m.name,
        year,
        jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0,
        jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0,
        total: 0,
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Error fetching members" });
  }
});

// ✅ Save/update ONE member for a year
router.post("/member/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, year, total, ...months } = req.body;

    const recalculatedTotal = Object.values(months).reduce(
      (sum, val) => sum + (Number(val) || 0), 0
    );

    let entry = await AmountEntry.findOne({ memberId: id, year });

    if (entry) {
      Object.assign(entry, months, { total: recalculatedTotal });
      await entry.save();
    } else {
      entry = new AmountEntry({ memberId: id, name, year, ...months, total: recalculatedTotal });
      await entry.save();
    }

    res.json({ message: "Amounts saved successfully", entry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error saving amounts" });
  }
});

// ✅ Save/update ALL members for a year
router.post("/all", async (req, res) => {
  try {
    const { entries } = req.body;
    if (!Array.isArray(entries)) {
      return res.status(400).json({ error: "Request body must contain 'entries' as an array" });
    }

    const results = [];
    for (const entryData of entries) {
      const { memberId, name, year, total, ...months } = entryData;
      const recalculatedTotal = Object.values(months).reduce(
        (sum, val) => sum + (Number(val) || 0), 0
      );

      let entry = await AmountEntry.findOne({ memberId, year });
      if (entry) {
        Object.assign(entry, months, { total: recalculatedTotal });
        await entry.save();
        results.push(entry);
      } else {
        const newEntry = new AmountEntry({ memberId, name, year, ...months, total: recalculatedTotal });
        await newEntry.save();
        results.push(newEntry);
      }
    }

    res.json({ message: "All amounts saved successfully", results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error saving all amounts" });
  }
});

module.exports = router;
