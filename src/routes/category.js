const express = require('express');
const router = express.Router();
const categoryCtrl = require('../controllers/category');
const auth = require('../middleware/auth');

router.post('/', auth, categoryCtrl.createCategory);
router.delete('/:id', auth, categoryCtrl.deleteOneCategory);
router.get('/', categoryCtrl.getAllCategory);
router.get('/:id', categoryCtrl.getOneCategory);

module.exports = router;