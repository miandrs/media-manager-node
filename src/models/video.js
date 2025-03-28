const mongoose = require('mongoose');

const videoShema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: true},
    videoUrl: { type: String, required: true },
    category: { type: mongoose.Types.ObjectId, ref: 'Category', required: true },
    userId: {type: String, required: true}
});

module.exports = mongoose.model('Video', videoShema);