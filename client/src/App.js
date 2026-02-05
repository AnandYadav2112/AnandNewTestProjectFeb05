import React, { useState } from 'react';
import './App.css';
import Tasks from './components/Tasks';
import Leaves from './components/Leaves';
import Capacity from './components/Capacity';
import Conversations from './components/Conversations';

function App() {
  const [activeTab, setActiveTab] = useState('tasks');

  return (
    <div className="App">
      <header className="App-header">
        <h1>Manager Help</h1>
        <p>Track tasks, leaves, capacity, and conversations</p>
      </header>
      
      <nav className="tab-navigation">
        <button 
          className={activeTab === 'tasks' ? 'active' : ''} 
          onClick={() => setActiveTab('tasks')}
        >
          Tasks
        </button>
        <button 
          className={activeTab === 'leaves' ? 'active' : ''} 
          onClick={() => setActiveTab('leaves')}
        >
          Leaves
        </button>
        <button 
          className={activeTab === 'capacity' ? 'active' : ''} 
          onClick={() => setActiveTab('capacity')}
        >
          Capacity
        </button>
        <button 
          className={activeTab === 'conversations' ? 'active' : ''} 
          onClick={() => setActiveTab('conversations')}
        >
          Conversations
        </button>
      </nav>

      <main className="content">
        {activeTab === 'tasks' && <Tasks />}
        {activeTab === 'leaves' && <Leaves />}
        {activeTab === 'capacity' && <Capacity />}
        {activeTab === 'conversations' && <Conversations />}
      </main>
    </div>
  );
}

export default App;
