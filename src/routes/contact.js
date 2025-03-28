const express = require('express');
const router = express.Router();
const contactCtrl = require('../controllers/contact');
const auth = require('../middleware/auth');

router.post('/', contactCtrl.createContact);
router.get('/', auth, contactCtrl.getAllContact);

module.exports = router;