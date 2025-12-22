const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const AcademicSchema = new mongoose.Schema({
    academic_id: { type: Number },
    academic_year: { type: String, required: true },
    status: { type: Number, default: 1 }
}, { timestamps: true });

AcademicSchema.plugin(AutoIncrement, { inc_field: "academic_id" });

module.exports = mongoose.model("Academic", AcademicSchema);
