const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  label: { type: String, required: true },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
});

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo