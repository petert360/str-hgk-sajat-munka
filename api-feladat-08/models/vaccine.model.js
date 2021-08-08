const mongoose = require('mongoose');
const ObjectId = Schema.Types.ObjectId;

const VaccineSchema = mongoose.Schema(
    {
        id: { type: ObjectId },
        name: { type: String },
        efficiency: { type: Number, min: 0, max: 100 },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Vaccine', VaccineSchema);
/* 
{
    "id": 1,
    "first_name": "Worthy",
    "last_name": "Penzer",
    "vaccine": "Pfizer"
},
*/
