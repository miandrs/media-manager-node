const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'ROLE_USER' }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);