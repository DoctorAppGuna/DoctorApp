const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let appointmentsSchema = new Schema({
    date: { type: Date },
    name: { type: String },
    mobNo: { type: String },
    time: { type: String },
    slotNo :{type: Number}
});


// Export the model
module.exports = mongoose.model('appointments', appointmentsSchema);