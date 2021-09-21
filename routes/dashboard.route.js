var express = require('express');
var router = express.Router();

const dashboardController = require('../controllers/dashboard.controller');
// resources api
router.get('/', dashboardController.index);

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
