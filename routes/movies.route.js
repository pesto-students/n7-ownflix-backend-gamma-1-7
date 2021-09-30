var express = require('express');
var router = express.Router();

const movieController = require('../controllers/movie.controller');

router.get('/', movieController.index);
router.get('/views/:id', movieController.views);
router.post('/', movieController.store);

router.get('/all', movieController.indexAll);
router.get('/latest', movieController.latest);
router.get('/popular', movieController.popular);
router.get('/recommended', movieController.recommended);
router.get('/genre/:genreSlug', movieController.byGenre);

router.get('/:id', movieController.show);
router.get('/s/:slug', movieController.bySlug);
router.put('/:id', movieController.update);

router.delete('/:id', movieController.destroy);
router.delete('/:id/delete', movieController.hardDestroy);

module.exports = router;
