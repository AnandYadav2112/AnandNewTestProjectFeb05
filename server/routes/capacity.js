const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// In-memory storage (replace with database in production)
let capacity = [];

// Get all capacity entries
router.get('/', (req, res) => {
  res.json(capacity);
});

// Get capacity by ID
router.get('/:id', (req, res) => {
  const cap = capacity.find(c => c.id === req.params.id);
  if (!cap) {
    return res.status(404).json({ message: 'Capacity entry not found' });
  }
  res.json(cap);
});

// Create new capacity entry
router.post('/', (req, res) => {
  const { employeeName, totalHours, allocatedHours, availableHours, week, projects } = req.body;
  
  const newCapacity = {
    id: uuidv4(),
    employeeName,
    totalHours: totalHours || 40,
    allocatedHours: allocatedHours || 0,
    availableHours: availableHours || totalHours,
    week,
    projects: projects || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  capacity.push(newCapacity);
  res.status(201).json(newCapacity);
});

// Update capacity entry
router.put('/:id', (req, res) => {
  const capIndex = capacity.findIndex(c => c.id === req.params.id);
  
  if (capIndex === -1) {
    return res.status(404).json({ message: 'Capacity entry not found' });
  }
  
  capacity[capIndex] = {
    ...capacity[capIndex],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  
  res.json(capacity[capIndex]);
});

// Delete capacity entry
router.delete('/:id', (req, res) => {
  const capIndex = capacity.findIndex(c => c.id === req.params.id);
  
  if (capIndex === -1) {
    return res.status(404).json({ message: 'Capacity entry not found' });
  }
  
  capacity.splice(capIndex, 1);
  res.json({ message: 'Capacity entry deleted successfully' });
});

module.exports = router;
