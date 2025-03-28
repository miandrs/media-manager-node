const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const contactSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    message: { type: String, required: true },
    _type: { type: String, required: true }
});

mongoose.plugin(uniqueValidator);
module.exports = mongoose.model('Contact', contactSchema);