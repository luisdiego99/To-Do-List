var express = require('express');
var router = express.Router();
const Task = require('../models/Task'); // You'll need to create this model similar to Goal

router.get('/getTasks', async function(req, res, next) {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/removeTask/:id', async function(req, res, next) {
  try {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Missing task ID' });
    }
    
    const result = await Task.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/addTask', async function(req, res, next) {
  try {
    const { name, description, dueDate } = req.body;
    
    if (!name || !description || !dueDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const newTask = new Task({
      name,
      description,
      dueDate
    });
    
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Bad request' });
  }
});

module.exports = router;
