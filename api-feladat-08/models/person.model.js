const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = Schema(
    {
        first_name: String,
        last_name: String,
        vaccine: {
            count: Number,
            vaccine: [{type: Schema.Types.ObjectId, ref: 'Vaccine'}]
        },
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
