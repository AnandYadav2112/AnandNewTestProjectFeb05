const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// In-memory storage (replace with database in production)
let tasks = [];

// Get all tasks
router.get('/', (req, res) => {
  res.json(tasks);
});

// Get task by ID
router.get('/:id', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(task);
});

// Create new task
router.post('/', (req, res) => {
  const { title, description, assignedTo, priority, dueDate, status } = req.body;
  
  const newTask = {
    id: uuidv4(),
    title,
    description,
    assignedTo,
    priority: priority || 'medium',
    status: status || 'pending',
    dueDate,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update task
router.put('/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === req.params.id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  
  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  
  res.json(tasks[taskIndex]);
});

// Delete task
router.delete('/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === req.params.id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  
  tasks.splice(taskIndex, 1);
  res.json({ message: 'Task deleted successfully' });
});

module.exports = router;
