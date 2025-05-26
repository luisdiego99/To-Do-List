var express = require('express');
const  route  = require('.');
var router = express.Router();

let tasks = [
    {
        id: 1,
        name: 'Task 1',
        description: 'Description for Task 11111'
    },
    {
        id: 2,
        name: 'Task 2',
        description: 'Description for Task 2'
    },
    {
        id: 3,
        name: 'Task 3',
        description: 'Description for Task 3'
    }
]
router.get('/getTasks', function(req, res, next) {

    res.json(tasks);
})

router.delete('/deleteTask/:id', function(req, res, next) {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(task => task.id === taskId);
    if(!task) {
        return res.status(400).json({message: "Task not found"});
    }else{
        tasks = tasks.filter(task => task.id !== taskId);
        res.json({ message: 'Task deleted successfully' });
    }
});

router.post('/addTask', function(req, res, next) {
    const { name, description } = req.body;

    //Required fields
    if (!name || !description) {
        return res.status(400).json({ 
            message: "Validation failed",
            errors: {
                name: !name ? "Name is required" : undefined,
                description: !description ? "Description is required" : undefined
            }
        });
    }

    //Data types
    if (typeof name !== 'string' || typeof description !== 'string') {
        return res.status(400).json({
            message: "Invalid data types",
            errors: {
                name: typeof name !== 'string' ? "Must be a string" : undefined,
                description: typeof description !== 'string' ? "Must be a string" : undefined
            }
        });
    }

    //Sanitize inputs
    const cleanName = name.trim().replace(/<[^>]*>?/gm, '');
    const cleanDescription = description.trim().replace(/<[^>]*>?/gm, '');

    //Duplicate check
    const isDuplicate = tasks.some(task => task.name === cleanName);
    if (isDuplicate) {
        return res.status(409).json({
            message: "Task already exists",
            error: `Task '${cleanName}' already exists`
        });
    }

    // Create and save the task
    const newTask = {
        id: tasks.length + 1,
        name: cleanName,
        description: cleanDescription
    };
    tasks.push(newTask);
    
    res.status(201).json({ 
        message: 'Task added successfully', 
        task: newTask 
    });
});

module.exports = router;
