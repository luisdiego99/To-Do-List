// models/Goal.js
const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  name: String,
  description: String,
  dueDate: String  // Consider using Date instead if needed
});

module.exports = mongoose.model('Goal', goalSchema);
