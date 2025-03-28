const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'video/avi': 'avi',
    'video/mkv': 'mkv',
    'video/mp4': 'mp4',
};

const mediaStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'medias/'+file.fieldname);
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name.toLowerCase() + Date.now() + '.' + extension);
    }
});

module.exports = multer({storage: mediaStorage}).fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 },]);