const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// In-memory storage (replace with database in production)
let leaves = [];

// Get all leaves
router.get('/', (req, res) => {
  res.json(leaves);
});

// Get leave by ID
router.get('/:id', (req, res) => {
  const leave = leaves.find(l => l.id === req.params.id);
  if (!leave) {
    return res.status(404).json({ message: 'Leave not found' });
  }
  res.json(leave);
});

// Create new leave request
router.post('/', (req, res) => {
  const { employeeName, leaveType, startDate, endDate, reason, status } = req.body;
  
  const newLeave = {
    id: uuidv4(),
    employeeName,
    leaveType,
    startDate,
    endDate,
    reason,
    status: status || 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  leaves.push(newLeave);
  res.status(201).json(newLeave);
});

// Update leave request
router.put('/:id', (req, res) => {
  const leaveIndex = leaves.findIndex(l => l.id === req.params.id);
  
  if (leaveIndex === -1) {
    return res.status(404).json({ message: 'Leave not found' });
  }
  
  leaves[leaveIndex] = {
    ...leaves[leaveIndex],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  
  res.json(leaves[leaveIndex]);
});

// Delete leave request
router.delete('/:id', (req, res) => {
  const leaveIndex = leaves.findIndex(l => l.id === req.params.id);
  
  if (leaveIndex === -1) {
    return res.status(404).json({ message: 'Leave not found' });
  }
  
  leaves.splice(leaveIndex, 1);
  res.json({ message: 'Leave request deleted successfully' });
});

module.exports = router;
