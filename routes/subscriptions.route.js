var express = require('express');
var router = express.Router();

const subscriptionController = require('../controllers/subscription.controller');

router.get('/', subscriptionController.index);
router.post('/', subscriptionController.store);
router.get('/:id', subscriptionController.show);
router.put('/:id', subscriptionController.update);
router.delete('/:id', subscriptionController.destroy);
router.delete('/:id/delete', subscriptionController.hardDestroy);

router.get('/all', subscriptionController.getAll);

module.exports = router;
