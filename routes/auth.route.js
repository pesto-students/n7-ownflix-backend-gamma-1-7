var express = require('express');
var router = express.Router();
const auth = require('../controllers/auth.controller');

router.post('/login', auth.login);
router.get('/check', auth.check);

module.exports = router;
