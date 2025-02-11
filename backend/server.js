const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Todo = require('./models/todoSchema');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
const dbURI = 'your-mongodb-uri-here'
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(3001, () => {
      console.log('Server is running on port 3001 and connected to MongoDB');
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

// Routes

// GET all todos
app.get('/todos', async (req, res) => {
    try {
      const todos = await Todo.find();
      res.json(todos);
    } catch (error) {
      res.status(500).json({ message: 'Unable to retrieve todos', error });
    }
  });
  
  // POST a new todo
  app.post('/todos', async (req, res) => {
    try {
      const { label, status } = req.body;
      const todo = new Todo({ label, status });
      const savedTodo = await todo.save();
      res.status(201).json({ message: 'Task successfully CREATED', todo: savedTodo });
    } catch (error) {
      res.status(500).json({ message: 'Unable to create task', error });
    }
  });
  
  // UPDATE a todo
  app.put('/todos/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { label, status } = req.body;
      const updatedTodo = await Todo.findByIdAndUpdate(
        id,
        { label, status },
        { new: true, runValidators: true }
      );
      if (!updatedTodo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      res.json({ message: 'Todo successfully updated', todo: updatedTodo });
    } catch (error) {
      res.status(500).json({ message: 'Unable to update todo', error });
    }
  });
  
  // DELETE a todo
  app.delete('/todos/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedTodo = await Todo.findByIdAndDelete(id);
      if (!deletedTodo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      res.json({ message: 'Todo successfully deleted', todo: deletedTodo });
    } catch (error) {
      res.status(500).json({ message: 'Unable to delete todo', error });
    }
  });