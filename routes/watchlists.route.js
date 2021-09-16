var express = require('express');
var router = express.Router();

const watchlistController = require('../controllers/watchlist.controller');

router.get('/', watchlistController.index);
router.post('/', watchlistController.store);
router.get('/:id', watchlistController.show);
router.put('/:id', watchlistController.update);
router.delete('/:id', watchlistController.destroy);
router.delete('/:id/delete', watchlistController.hardDestroy);

router.get('/all', watchlistController.getAll);

module.exports = router;
