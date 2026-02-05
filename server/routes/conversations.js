const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// In-memory storage (replace with database in production)
let conversations = [];

// Get all conversations
router.get('/', (req, res) => {
  res.json(conversations);
});

// Get conversation by ID
router.get('/:id', (req, res) => {
  const conversation = conversations.find(c => c.id === req.params.id);
  if (!conversation) {
    return res.status(404).json({ message: 'Conversation not found' });
  }
  res.json(conversation);
});

// Create new conversation
router.post('/', (req, res) => {
  const { title, participants, messages } = req.body;
  
  const newConversation = {
    id: uuidv4(),
    title,
    participants: participants || [],
    messages: messages || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  conversations.push(newConversation);
  res.status(201).json(newConversation);
});

// Add message to conversation
router.post('/:id/messages', (req, res) => {
  const conversation = conversations.find(c => c.id === req.params.id);
  
  if (!conversation) {
    return res.status(404).json({ message: 'Conversation not found' });
  }
  
  const { sender, content } = req.body;
  
  const newMessage = {
    id: uuidv4(),
    sender,
    content,
    timestamp: new Date().toISOString()
  };
  
  conversation.messages.push(newMessage);
  conversation.updatedAt = new Date().toISOString();
  
  res.status(201).json(newMessage);
});

// Update conversation
router.put('/:id', (req, res) => {
  const convIndex = conversations.findIndex(c => c.id === req.params.id);
  
  if (convIndex === -1) {
    return res.status(404).json({ message: 'Conversation not found' });
  }
  
  conversations[convIndex] = {
    ...conversations[convIndex],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  
  res.json(conversations[convIndex]);
});

// Delete conversation
router.delete('/:id', (req, res) => {
  const convIndex = conversations.findIndex(c => c.id === req.params.id);
  
  if (convIndex === -1) {
    return res.status(404).json({ message: 'Conversation not found' });
  }
  
  conversations.splice(convIndex, 1);
  res.json({ message: 'Conversation deleted successfully' });
});

module.exports = router;
