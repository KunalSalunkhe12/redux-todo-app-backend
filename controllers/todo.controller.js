const Todo = require("../models/todo.model.js");

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addTodo = async (req, res) => {
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
    res.status(400).json({ message: err.message });
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No todo with that id");

  try {
    const todo = await Todo.findByIdAndUpdate(id, { completed }, { new: true });
    res.status(200).json(todo);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No todo with that id");

  try {
    await Todo.findByIdAndRemove(id);
    res.status(200).json({ message: "Todo deleted successfully." });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
