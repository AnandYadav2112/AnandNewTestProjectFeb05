import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5001/api/conversations';

function Conversations() {
  const [conversations, setConversations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    participants: ''
  });
  const [messageData, setMessageData] = useState({
    sender: '',
    content: ''
  });

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setConversations(data);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const participantsArray = formData.participants.split(',').map(p => p.trim());
    const dataToSend = {
      ...formData,
      participants: participantsArray
    };
    
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });
      
      fetchConversations();
      resetForm();
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!selectedConversation) return;
    
    try {
      await fetch(`${API_URL}/${selectedConversation.id}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageData)
      });
      
      setMessageData({ sender: '', content: '' });
      fetchConversations();
      
      // Update selected conversation
      const response = await fetch(`${API_URL}/${selectedConversation.id}`);
      const updated = await response.json();
      setSelectedConversation(updated);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this conversation?')) {
      try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchConversations();
        if (selectedConversation && selectedConversation.id === id) {
          setSelectedConversation(null);
        }
      } catch (error) {
        console.error('Error deleting conversation:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      participants: ''
    });
    setShowForm(false);
  };

  return (
    <div className="section-container">
      <h2 className="section-title">Conversations</h2>
      
      {!showForm && (
        <button className="add-button" onClick={() => setShowForm(true)}>
          + Start New Conversation
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Conversation Title:</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Participants (comma-separated):</label>
            <input
              type="text"
              value={formData.participants}
              onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
              placeholder="John, Jane, Manager"
              required
            />
          </div>
          
          <div className="button-group">
            <button type="submit" className="submit-button">
              Create Conversation
            </button>
            <button type="button" className="cancel-button" onClick={resetForm}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', marginTop: '2rem' }}>
        {/* Conversations List */}
        <div>
          <h3 style={{ marginBottom: '1rem' }}>All Conversations</h3>
          <div className="item-list">
            {conversations.map((conv) => (
              <div 
                key={conv.id} 
                className="item-card" 
                style={{ 
                  cursor: 'pointer',
                  backgroundColor: selectedConversation?.id === conv.id ? '#e3f2fd' : '#fafafa'
                }}
                onClick={() => setSelectedConversation(conv)}
              >
                <h4 style={{ margin: '0 0 0.5rem 0' }}>{conv.title}</h4>
                <p style={{ fontSize: '0.85rem', margin: '0.25rem 0' }}>
                  <strong>Participants:</strong> {conv.participants.join(', ')}
                </p>
                <p style={{ fontSize: '0.85rem', margin: '0.25rem 0' }}>
                  <strong>Messages:</strong> {conv.messages.length}
                </p>
                <div style={{ marginTop: '0.75rem' }}>
                  <button 
                    className="delete-button" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(conv.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Conversation */}
        <div>
          {selectedConversation ? (
            <>
              <h3 style={{ marginBottom: '1rem' }}>{selectedConversation.title}</h3>
              <p style={{ marginBottom: '1rem', color: '#666' }}>
                Participants: {selectedConversation.participants.join(', ')}
              </p>
              
              <div className="message-list">
                {selectedConversation.messages.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#999' }}>No messages yet</p>
                ) : (
                  selectedConversation.messages.map((msg) => (
                    <div key={msg.id} className="message">
                      <div className="message-sender">{msg.sender}</div>
                      <div className="message-content">{msg.content}</div>
                      <div className="message-timestamp">
                        {new Date(msg.timestamp).toLocaleString()}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <form onSubmit={handleSendMessage}>
                <div className="form-group">
                  <label>Your Name:</label>
                  <input
                    type="text"
                    value={messageData.sender}
                    onChange={(e) => setMessageData({ ...messageData, sender: e.target.value })}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Message:</label>
                  <textarea
                    value={messageData.content}
                    onChange={(e) => setMessageData({ ...messageData, content: e.target.value })}
                    required
                    style={{ minHeight: '80px' }}
                  />
                </div>
                
                <button type="submit" className="submit-button">
                  Send Message
                </button>
              </form>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#999' }}>
              <p>Select a conversation to view and send messages</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Conversations;
