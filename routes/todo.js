var express = require('express');
var router = express.Router();
var db = require('../models');
var helpers = require('../helpers/todo')

//En lugar de tener router.get y router.post como 
//los dos tienen la misma ruta los puedo unificar asi
router.route('/')
  .get(helpers.getTodos)
  .post(helpers.createTodo)

//En lugar de tener get, put y delete, unifico
router.route('/:todoId')
  .get(helpers.getTodo)
  .put(helpers.updateTodo)
  .delete(helpers.deleteTodo)

module.exports = router;