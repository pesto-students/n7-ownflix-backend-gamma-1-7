var express = require('express');
var router = express.Router();

const seriesController = require('../controllers/series.controller');

router.get('/', seriesController.index);
router.post('/', seriesController.store);
router.get('/:id', seriesController.show);
router.put('/:id', seriesController.update);
router.delete('/:id', seriesController.destroy);
router.delete('/:id/delete', seriesController.hardDestroy);

router.get('/all', seriesController.getAll);

module.exports = router;
