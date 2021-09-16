var express = require('express');
var router = express.Router();

const episodeController = require('../controllers/episode.controller');

router.get('/', episodeController.index);
router.post('/', episodeController.store);
router.get('/:id', episodeController.show);
router.put('/:id', episodeController.update);
router.delete('/:id', episodeController.destroy);
router.delete('/:id/delete', episodeController.hardDestroy);

router.get('/all', episodeController.getAll);

module.exports = router;
