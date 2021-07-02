const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let slotSchema = new Schema({
    date: { type: Date },
    from: { type: String },
    to: { type: String },
    slotNo: { type: Number },
    type: { type: String }
});


// Export the model
module.exports = mongoose.model('slots', slotSchema);