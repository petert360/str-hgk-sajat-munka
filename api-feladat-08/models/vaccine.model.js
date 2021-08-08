const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VaccineSchema = Schema(
    {
        id: { type: Schema.Types.ObjectId },
        name: { type: String },
        efficiency: { type: Number, min: 0, max: 100 },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Vaccine', VaccineSchema);
