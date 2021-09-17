var express = require('express');
var router = express.Router();

const genreController = require('../controllers/genre.controller');

router.get('/', genreController.index);
router.post('/', genreController.store);
router.get('/s/:id', genreController.bySlug);
router.get('/all', genreController.indexAll);

router.get('/:id', genreController.show);
router.put('/:id', genreController.update);
router.delete('/:id', genreController.destroy);
router.delete('/:id/delete', genreController.hardDestroy);

module.exports = router;
