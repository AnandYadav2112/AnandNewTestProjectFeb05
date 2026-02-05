import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5001/api/tasks';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    priority: 'medium',
    dueDate: '',
    status: 'pending'
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingTask) {
        await fetch(`${API_URL}/${editingTask.id}`, {
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
      
      fetchTasks();
      resetForm();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      assignedTo: task.assignedTo,
      priority: task.priority,
      dueDate: task.dueDate,
      status: task.status
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      assignedTo: '',
      priority: 'medium',
      dueDate: '',
      status: 'pending'
    });
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <div className="section-container">
      <h2 className="section-title">Tasks Management</h2>
      
      {!showForm && (
        <button className="add-button" onClick={() => setShowForm(true)}>
          + Add New Task
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Description:</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          
          <div className="form-group">
            <label>Assigned To:</label>
            <input
              type="text"
              value={formData.assignedTo}
              onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Priority:</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Due Date:</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            />
          </div>
          
          <div className="form-group">
            <label>Status:</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          <div className="button-group">
            <button type="submit" className="submit-button">
              {editingTask ? 'Update Task' : 'Add Task'}
            </button>
            <button type="button" className="cancel-button" onClick={resetForm}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="item-list">
        {tasks.map((task) => (
          <div key={task.id} className="item-card">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p><strong>Assigned To:</strong> {task.assignedTo}</p>
            <p><strong>Due Date:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</p>
            <div>
              <span className={`badge badge-priority-${task.priority}`}>
                {task.priority.toUpperCase()}
              </span>
              <span className={`badge badge-status-${task.status}`}>
                {task.status.toUpperCase()}
              </span>
            </div>
            <div className="button-group" style={{ marginTop: '1rem' }}>
              <button className="edit-button" onClick={() => handleEdit(task)}>
                Edit
              </button>
              <button className="delete-button" onClick={() => handleDelete(task.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;
