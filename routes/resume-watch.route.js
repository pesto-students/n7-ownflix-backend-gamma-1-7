var express = require('express');
var router = express.Router();

const resumeWatchController = require('../controllers/resume-watch.controller');

router.get('/all', resumeWatchController.indexAll);
router.get('/get-details', resumeWatchController.getDetails);
router.get('/check-or-update', resumeWatchController.checkOrUpdate);

router.post('/', resumeWatchController.store);
router.get('/:id', resumeWatchController.show);
router.put('/:id', resumeWatchController.update);
router.delete('/:id', resumeWatchController.destroy);
router.delete('/:id/delete', resumeWatchController.hardDestroy);

module.exports = router;
