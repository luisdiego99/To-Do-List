// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: String,
  description: String,
  dueDate: String
});

module.exports = mongoose.model('Task', taskSchema);
