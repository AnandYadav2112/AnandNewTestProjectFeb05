import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5001/api/leaves';

function Leaves() {
  const [leaves, setLeaves] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingLeave, setEditingLeave] = useState(null);
  const [formData, setFormData] = useState({
    employeeName: '',
    leaveType: 'vacation',
    startDate: '',
    endDate: '',
    reason: '',
    status: 'pending'
  });

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setLeaves(data);
    } catch (error) {
      console.error('Error fetching leaves:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingLeave) {
        await fetch(`${API_URL}/${editingLeave.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }
      
      fetchLeaves();
      resetForm();
    } catch (error) {
      console.error('Error saving leave:', error);
    }
  };

  const handleEdit = (leave) => {
    setEditingLeave(leave);
    setFormData({
      employeeName: leave.employeeName,
      leaveType: leave.leaveType,
      startDate: leave.startDate,
      endDate: leave.endDate,
      reason: leave.reason,
      status: leave.status
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this leave request?')) {
      try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchLeaves();
      } catch (error) {
        console.error('Error deleting leave:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      employeeName: '',
      leaveType: 'vacation',
      startDate: '',
      endDate: '',
      reason: '',
      status: 'pending'
    });
    setShowForm(false);
    setEditingLeave(null);
  };

  return (
    <div className="section-container">
      <h2 className="section-title">Leave Management</h2>
      
      {!showForm && (
        <button className="add-button" onClick={() => setShowForm(true)}>
          + Add Leave Request
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
            <label>Leave Type:</label>
            <select
              value={formData.leaveType}
              onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}
            >
              <option value="vacation">Vacation</option>
              <option value="sick">Sick Leave</option>
              <option value="personal">Personal</option>
              <option value="maternity">Maternity/Paternity</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Start Date:</label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label>End Date:</label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Reason:</label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            />
          </div>
          
          <div className="form-group">
            <label>Status:</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          
          <div className="button-group">
            <button type="submit" className="submit-button">
              {editingLeave ? 'Update Leave' : 'Add Leave'}
            </button>
            <button type="button" className="cancel-button" onClick={resetForm}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="item-list">
        {leaves.map((leave) => (
          <div key={leave.id} className="item-card">
            <h3>{leave.employeeName}</h3>
            <p><strong>Type:</strong> {leave.leaveType}</p>
            <p><strong>Duration:</strong> {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}</p>
            <p><strong>Reason:</strong> {leave.reason}</p>
            <div>
              <span className={`badge badge-status-${leave.status}`}>
                {leave.status.toUpperCase()}
              </span>
            </div>
            <div className="button-group" style={{ marginTop: '1rem' }}>
              <button className="edit-button" onClick={() => handleEdit(leave)}>
                Edit
              </button>
              <button className="delete-button" onClick={() => handleDelete(leave.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaves;
