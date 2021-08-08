const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema(
    {
        first_name: String,
        last_name: String,
        vaccine: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model('Person', PersonSchema);
/* 
{
    "id": 1,
    "first_name": "Worthy",
    "last_name": "Penzer",
    "vaccine": "Pfizer"
},
*/
