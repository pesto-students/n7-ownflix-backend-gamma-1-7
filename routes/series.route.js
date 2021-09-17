var express = require('express');
var router = express.Router();

const seriesController = require('../controllers/series.controller');

router.get('/', seriesController.index);
router.post('/', seriesController.store);

router.get('/all', seriesController.indexAll);
router.get('/latest', seriesController.latest);
router.get('/popular', seriesController.popular);
router.get('/recommended', seriesController.recommended);
router.get('/genre/:genreSlug', seriesController.byGenre);

router.get('/:id', seriesController.show);
router.get('/s/:slug', seriesController.bySlug);
router.put('/:id', seriesController.update);
router.delete('/:id', seriesController.destroy);
router.delete('/:id/delete', seriesController.hardDestroy);

module.exports = router;
