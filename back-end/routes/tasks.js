const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');

// Get all tasks
router.get('/', auth, taskController.getTasks);

// Create a task
router.post('/', auth, taskController.createTask);

// Update a task
router.put('/:id', auth, taskController.updateTask);

// Delete a task
router.delete('/:id', auth, taskController.deleteTask);

module.exports = router;