var express = require('express');
var router = express.Router();

const watchlistController = require('../controllers/watchlist.controller');

// router.get('/', watchlistController.index);
router.get('/all', watchlistController.indexAll);
router.get('/user/:userId', watchlistController.userWatchList);
router.post('/', watchlistController.store);
router.get('/:id', watchlistController.show);
router.put('/:id', watchlistController.update);
router.delete('/:id', watchlistController.destroy);
router.delete('/:id/delete', watchlistController.hardDestroy);

module.exports = router;
