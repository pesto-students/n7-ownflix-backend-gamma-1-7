var express = require('express');
var router = express.Router();

const userController = require('../controllers/user.controller');
// resources api
router.get('/', userController.index);
router.post('/', userController.store);
router.get('/:id', userController.show);
router.put('/:id', userController.update);
router.delete('/:id', userController.destroy);
router.patch('/:id', userController.updateStatus);
router.delete('/:id/delete', userController.hardDestroy);

router.get('/all', userController.getAll);

module.exports = router;

// GET     /            ->  index (paginate)
// GET     /all         ->  getAll (without paginate return all)
// GET     /create      ->  create //for view or if need data to create-that frontend
// POST    /            ->  store
// GET     /:user       ->  show //
// GET     /:user/edit  ->  edit // for view edit form like laravel front end
// PUT     /:user       ->  update //update by id
// DELETE  /:user       ->  destroy // delete by id soft delete
// DELETE  /:user/delete->  destroy // delete by id hard delete

//
