const express = require("express");

const router = express.Router();
const {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todo.controller.js");

router.route("/todo").get(getTodos).post(addTodo);

router.route("/todo/:id").patch(updateTodo).delete(deleteTodo);

module.exports = router;
