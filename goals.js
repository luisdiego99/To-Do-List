var express = require('express');
var router = express.Router();
const Goal = require('../models/Goal');

router.get('/getGoals', async function(req, res, next) {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (err) {
    console.error('Error fetching goals:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/removeGoal/:id', async function(req, res, next) {
  try {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Missing goal ID' });
    }
    
    const result = await Goal.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: 'Goal not found' });
    }
    res.json(result);
  } catch (err) {
    console.error('Error deleting goal:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/addGoal', async function(req, res, next) {
  try {
    const { name, description, dueDate } = req.body;
    
    if (!name || !description || !dueDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const newGoal = new Goal({
      name,
      description,
      dueDate
    });
    
    const savedGoal = await newGoal.save();
    res.status(201).json(savedGoal);
  } catch (err) {
    console.error('Error adding goal:', err);
    res.status(400).json({ error: 'Bad request' });
  }
});

module.exports = router;
