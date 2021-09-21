var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth.middleware');

const userController = require('../controllers/user.controller');
// resources api
router.get('/', auth, userController.index);
router.post('/', userController.store);
router.get('/:id', auth, userController.show);
router.put('/:id', auth, userController.update);
router.delete('/:id', auth, userController.destroy);
router.patch('/:id', auth, userController.updateStatus);
router.delete('/:id/delete', auth, userController.hardDestroy);

router.get('/all', auth, userController.getAll);

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
