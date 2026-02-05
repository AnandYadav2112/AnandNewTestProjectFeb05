import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5001/api/capacity';

function Capacity() {
  const [capacities, setCapacities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCapacity, setEditingCapacity] = useState(null);
  const [formData, setFormData] = useState({
    employeeName: '',
    totalHours: 40,
    allocatedHours: 0,
    availableHours: 40,
    week: '',
    projects: ''
  });

  useEffect(() => {
    fetchCapacities();
  }, []);

  const fetchCapacities = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setCapacities(data);
    } catch (error) {
      console.error('Error fetching capacities:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const projectsArray = formData.projects ? formData.projects.split(',').map(p => p.trim()) : [];
    const dataToSend = {
      ...formData,
      projects: projectsArray,
      availableHours: formData.totalHours - formData.allocatedHours
    };
    
    try {
      if (editingCapacity) {
        await fetch(`${API_URL}/${editingCapacity.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSend)
        });
      } else {
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSend)
        });
      }
      
      fetchCapacities();
      resetForm();
    } catch (error) {
      console.error('Error saving capacity:', error);
    }
  };

  const handleEdit = (capacity) => {
    setEditingCapacity(capacity);
    setFormData({
      employeeName: capacity.employeeName,
      totalHours: capacity.totalHours,
      allocatedHours: capacity.allocatedHours,
      availableHours: capacity.availableHours,
      week: capacity.week,
      projects: capacity.projects.join(', ')
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this capacity entry?')) {
      try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchCapacities();
      } catch (error) {
        console.error('Error deleting capacity:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      employeeName: '',
      totalHours: 40,
      allocatedHours: 0,
      availableHours: 40,
      week: '',
      projects: ''
    });
    setShowForm(false);
    setEditingCapacity(null);
  };

  return (
    <div className="section-container">
      <h2 className="section-title">Capacity Planning</h2>
      
      {!showForm && (
        <button className="add-button" onClick={() => setShowForm(true)}>
          + Add Capacity Entry
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Employee Name:</label>
            <input
              type="text"
              value={formData.employeeName}
              onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Week (e.g., Week 1, Feb 2026):</label>
            <input
              type="text"
              value={formData.week}
              onChange={(e) => setFormData({ ...formData, week: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Total Hours per Week:</label>
            <input
              type="number"
              value={formData.totalHours}
              onChange={(e) => setFormData({ ...formData, totalHours: parseInt(e.target.value) })}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Allocated Hours:</label>
            <input
              type="number"
              value={formData.allocatedHours}
              onChange={(e) => setFormData({ ...formData, allocatedHours: parseInt(e.target.value) })}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Projects (comma-separated):</label>
            <input
              type="text"
              value={formData.projects}
              onChange={(e) => setFormData({ ...formData, projects: e.target.value })}
              placeholder="Project A, Project B, Project C"
            />
          </div>
          
          <div className="button-group">
            <button type="submit" className="submit-button">
              {editingCapacity ? 'Update Capacity' : 'Add Capacity'}
            </button>
            <button type="button" className="cancel-button" onClick={resetForm}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="item-list">
        {capacities.map((capacity) => (
          <div key={capacity.id} className="item-card">
            <h3>{capacity.employeeName}</h3>
            <p><strong>Week:</strong> {capacity.week}</p>
            <p><strong>Total Hours:</strong> {capacity.totalHours}h</p>
            <p><strong>Allocated Hours:</strong> {capacity.allocatedHours}h</p>
            <p><strong>Available Hours:</strong> {capacity.availableHours}h</p>
            {capacity.projects && capacity.projects.length > 0 && (
              <p><strong>Projects:</strong> {capacity.projects.join(', ')}</p>
            )}
            <div style={{ marginTop: '0.5rem' }}>
              <div style={{ 
                width: '100%', 
                height: '20px', 
                backgroundColor: '#e0e0e0', 
                borderRadius: '10px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${(capacity.allocatedHours / capacity.totalHours) * 100}%`,
                  height: '100%',
                  backgroundColor: capacity.allocatedHours > capacity.totalHours ? '#f44336' : '#4CAF50',
                  transition: 'width 0.3s ease'
                }}></div>
              </div>
              <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: '#666' }}>
                {((capacity.allocatedHours / capacity.totalHours) * 100).toFixed(1)}% Utilized
              </p>
            </div>
            <div className="button-group" style={{ marginTop: '1rem' }}>
              <button className="edit-button" onClick={() => handleEdit(capacity)}>
                Edit
              </button>
              <button className="delete-button" onClick={() => handleDelete(capacity.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Capacity;
