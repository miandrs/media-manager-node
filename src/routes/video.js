const express = require('express');

const router = express.Router();

const videoCtrl = require('../controllers/video');

const auth = require('../middleware/auth');

const videoUploadHandler = require('../middleware/multer-config');

router.post('/', auth, videoUploadHandler, videoCtrl.uploadVideo);

router.delete('/:id', auth, videoCtrl.deleteVideo);

router.put('/:id', auth, videoUploadHandler, videoCtrl.updateVideo);

router.get('/', videoCtrl.getAllVideo);

router.get('/:id', videoCtrl.getOneVideo);

module.exports = router;