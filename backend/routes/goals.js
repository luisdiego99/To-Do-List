const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');

// GET all goals - Improved with sorting and projection
router.get('/getGoals', async (req, res) => {
  try {
    const goals = await Goal.find()
      .sort({ createdAt: -1 }) // Newest first
      .select('name description dueDate createdAt'); // Only return needed fields
    res.json(goals);
  } catch (err) {
    console.error('Error fetching goals:', err);
    res.status(500).json({ 
      error: 'Server error',
      message: err.message // Include error message for debugging
    });
  }
});

// DELETE goal - Enhanced validation
router.delete('/removeGoal/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid goal ID format' });
    }
    
    const deletedGoal = await Goal.findByIdAndDelete(id);
    
    if (!deletedGoal) {
      return res.status(404).json({ error: 'Goal not found' });
    }
    
    res.json({
      message: 'Goal deleted successfully',
      deletedGoal
    });
  } catch (err) {
    console.error('Error deleting goal:', err);
    res.status(500).json({ 
      error: 'Server error',
      details: err.message
    });
  }
});

// POST new goal - Added data validation
router.post('/addGoal', async (req, res) => {
  try {
    const { name, description, dueDate } = req.body;
    
    // Validate required fields
    if (!name || !description || !dueDate) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['name', 'description', 'dueDate']
      });
    }
    
    // Validate date format (optional)
    if (isNaN(new Date(dueDate).getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }
    
    const newGoal = new Goal({
      name: name.trim(),
      description: description.trim(),
      dueDate: new Date(dueDate) // Ensure proper date formatting
    });
    
    const savedGoal = await newGoal.save();
    
    res.status(201).json({
      message: 'Goal created successfully',
      goal: savedGoal
    });
  } catch (err) {
    console.error('Error adding goal:', err);
    res.status(400).json({ 
      error: 'Bad request',
      details: err.message
    });
  }
});

module.exports = router;