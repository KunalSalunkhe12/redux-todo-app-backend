const Todo = require("../models/todo.model.js");
const mongoose = require("mongoose");

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const addTodo = async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res
      .status(400)
      .json({ message: "Please provide name and description" });
  }

  try {
    const todo = new Todo({
      name,
      description,
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No todo with that id");

  try {
    const todo = await Todo.findByIdAndUpdate(
      { _id: id },
      { completed: status },
      { new: true }
    );
    res.status(200).json(todo);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No todo with that id");

  try {
    await Todo.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "Todo deleted successfully." });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};

module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};
