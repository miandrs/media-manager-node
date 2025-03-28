const mongoose = require('mongoose');

const categoryShema = mongoose.Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
});

module.exports = mongoose.model('Category', categoryShema);