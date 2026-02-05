const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const tasksRouter = require('./routes/tasks');
const leavesRouter = require('./routes/leaves');
const capacityRouter = require('./routes/capacity');
const conversationsRouter = require('./routes/conversations');
const decisionsRouter = require('./routes/decisions');

// Use routes
app.use('/api/tasks', tasksRouter);
app.use('/api/leaves', leavesRouter);
app.use('/api/capacity', capacityRouter);
app.use('/api/conversations', conversationsRouter);
app.use('/api/decisions', decisionsRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Manager Help API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
