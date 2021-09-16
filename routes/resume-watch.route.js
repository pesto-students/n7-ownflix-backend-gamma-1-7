var express = require('express');
var router = express.Router();

const resumeWatchController = require('../controllers/resume-watch.controller');

router.get('/', resumeWatchController.index);
router.post('/', resumeWatchController.store);
router.get('/:id', resumeWatchController.show);
router.put('/:id', resumeWatchController.update);
router.delete('/:id', resumeWatchController.destroy);
router.delete('/:id/delete', resumeWatchController.hardDestroy);

router.get('/all', resumeWatchController.getAll);

module.exports = router;
