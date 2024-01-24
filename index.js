const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const todoRoutes = require("./routes/todo.route.js");

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(todoRoutes);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {});

    console.log("MongoDB connected");

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

start();
