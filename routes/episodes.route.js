var express = require('express');
var router = express.Router();

const episodeController = require('../controllers/episode.controller');

router.get('/all', episodeController.indexAll);
router.post('/', episodeController.store);

router.get('/s/:slug', episodeController.bySlug);
router.get('/:id', episodeController.show);
router.put('/:id', episodeController.update);
router.delete('/:id', episodeController.destroy);
router.delete('/:id/delete', episodeController.hardDestroy);

module.exports = router;
