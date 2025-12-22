// models/amountEntry.js
const mongoose = require("mongoose");

const amountEntrySchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "member", // must match your Member model
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  jan: { type: Number, default: 0 },
  feb: { type: Number, default: 0 },
  mar: { type: Number, default: 0 },
  apr: { type: Number, default: 0 },
  may: { type: Number, default: 0 },
  jun: { type: Number, default: 0 },
  jul: { type: Number, default: 0 },
  aug: { type: Number, default: 0 },
  sep: { type: Number, default: 0 },
  oct: { type: Number, default: 0 },
  nov: { type: Number, default: 0 },
  dec: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  academic_year: { type: String, required: true },

}, { timestamps: true });

const AmountEntry = mongoose.model("amountentry", amountEntrySchema);

module.exports = AmountEntry;
