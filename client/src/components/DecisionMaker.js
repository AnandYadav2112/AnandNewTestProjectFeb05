import React, { useState, useEffect } from 'react';
import './DecisionMaker.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function DecisionMaker() {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState('default');
  const [situation, setSituation] = useState('');
  const [currentStep, setCurrentStep] = useState('input'); // input, options, paths
  const [decisionId, setDecisionId] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [dominoPath, setDominoPath] = useState(null);
  const [butterflyPath, setButterflyPath] = useState(null);
  const [activePath, setActivePath] = useState('domino'); // domino or butterfly
  const [loading, setLoading] = useState(false);
  const [editingStep, setEditingStep] = useState(null);

  // Load agents on component mount
  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await fetch(`${API_URL}/decisions/agents`);
      const data = await response.json();
      setAgents(data);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  };

  const handleAnalyzeSituation = async () => {
    if (!situation.trim()) {
      alert('Please enter a situation');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/decisions/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ situation, agentType: selectedAgent })
      });
      
      const data = await response.json();
      setDecisionId(data.decisionId);
      setOptions(data.options);
      setCurrentStep('options');
    } catch (error) {
      console.error('Error analyzing situation:', error);
      alert('Failed to analyze situation');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = async (option) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/decisions/${decisionId}/select-option`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ optionId: option.id })
      });
      
      const data = await response.json();
      setSelectedOption(data.selectedOption);
      setDominoPath(data.dominoPath);
      setButterflyPath(data.butterflyPath);
      setCurrentStep('paths');
    } catch (error) {
      console.error('Error selecting option:', error);
      alert('Failed to select option');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateDominoStep = async (stepId, updatedData) => {
    try {
      const response = await fetch(`${API_URL}/decisions/${decisionId}/domino-path/${stepId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      
      const data = await response.json();
      setDominoPath(data.dominoPath);
      setEditingStep(null);
    } catch (error) {
      console.error('Error updating step:', error);
      alert('Failed to update step');
    }
  };

  const handleUpdateButterflyScenario = async (scenarioId, updatedData) => {
    try {
      const response = await fetch(`${API_URL}/decisions/${decisionId}/butterfly-path/${scenarioId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      
      const data = await response.json();
      setButterflyPath(data.butterflyPath);
      setEditingStep(null);
    } catch (error) {
      console.error('Error updating scenario:', error);
      alert('Failed to update scenario');
    }
  };

  const handleReset = () => {
    setSituation('');
    setCurrentStep('input');
    setDecisionId(null);
    setOptions([]);
    setSelectedOption(null);
    setDominoPath(null);
    setButterflyPath(null);
    setActivePath('domino');
    setEditingStep(null);
  };

  const renderInput = () => (
    <div className="decision-input">
      <h2>AI-Powered Decision Maker</h2>
      <p>Share your situation and get intelligent suggestions with multiple analysis paths</p>
      
      <div className="agent-selector">
        <label>Select AI Agent:</label>
        <select value={selectedAgent} onChange={(e) => setSelectedAgent(e.target.value)}>
          {agents.map(agent => (
            <option key={agent.id} value={agent.id}>
              {agent.name} - {agent.description}
            </option>
          ))}
        </select>
      </div>

      <div className="situation-input">
        <label>Describe Your Situation:</label>
        <textarea
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
          placeholder="Example: Our team is facing a tight deadline with limited resources. We need to deliver a critical feature in 2 weeks but have 3 weeks worth of work..."
          rows="6"
        />
      </div>

      <button 
        className="btn-primary" 
        onClick={handleAnalyzeSituation}
        disabled={loading}
      >
        {loading ? 'Analyzing...' : 'Analyze & Get Options'}
      </button>
    </div>
  );

  const renderOptions = () => (
    <div className="decision-options">
      <h2>Suggested Options</h2>
      <p className="situation-summary"><strong>Situation:</strong> {situation}</p>
      
      <div className="options-grid">
        {options.map(option => (
          <div key={option.id} className="option-card">
            <h3>{option.title}</h3>
            <p>{option.description}</p>
            <div className="option-meta">
              <span className={`badge impact-${option.impact}`}>Impact: {option.impact}</span>
              <span className={`badge difficulty-${option.difficulty}`}>Difficulty: {option.difficulty}</span>
            </div>
            <button 
              className="btn-select"
              onClick={() => handleSelectOption(option)}
              disabled={loading}
            >
              Select This Option
            </button>
          </div>
        ))}
      </div>

      <button className="btn-secondary" onClick={handleReset}>
        Start Over
      </button>
    </div>
  );

  const renderDominoPath = () => (
    <div className="path-content">
      <h3>{dominoPath.name}</h3>
      <p className="path-description">{dominoPath.description}</p>
      
      <div className="steps-timeline">
        {dominoPath.steps.map((step, index) => (
          <div key={step.id} className="step-card">
            <div className="step-number">{index + 1}</div>
            <div className="step-content">
              {editingStep === step.id ? (
                <EditStepForm
                  step={step}
                  onSave={(data) => handleUpdateDominoStep(step.id, data)}
                  onCancel={() => setEditingStep(null)}
                />
              ) : (
                <>
                  <h4>{step.step}</h4>
                  <p>{step.description}</p>
                  <div className="step-details">
                    <div><strong>Duration:</strong> {step.duration}</div>
                    <div><strong>Resources:</strong> {step.resources.join(', ')}</div>
                    <div><strong>Expected Outcome:</strong> {step.outcome}</div>
                  </div>
                  {step.editable && (
                    <button 
                      className="btn-edit"
                      onClick={() => setEditingStep(step.id)}
                    >
                      Edit Step
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderButterflyPath = () => (
    <div className="path-content">
      <h3>{butterflyPath.name}</h3>
      <p className="path-description">{butterflyPath.description}</p>
      
      <div className="scenarios-container">
        {butterflyPath.scenarios.map((scenario, index) => (
          <div key={scenario.id} className="scenario-card">
            <div className="scenario-number">{index + 1}</div>
            <div className="scenario-content">
              {editingStep === scenario.id ? (
                <EditScenarioForm
                  scenario={scenario}
                  onSave={(data) => handleUpdateButterflyScenario(scenario.id, data)}
                  onCancel={() => setEditingStep(null)}
                />
              ) : (
                <>
                  <h4>{scenario.scenario}</h4>
                  <p>{scenario.description}</p>
                  <div className="scenario-details">
                    <div><strong>Duration:</strong> {scenario.duration}</div>
                    <div><strong>Probability:</strong> {scenario.probability}</div>
                    <div>
                      <strong>Possible Outcomes:</strong>
                      <ul>
                        {scenario.possibleOutcomes.map((outcome, i) => (
                          <li key={i}>{outcome}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {scenario.editable && (
                    <button 
                      className="btn-edit"
                      onClick={() => setEditingStep(scenario.id)}
                    >
                      Edit Scenario
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPaths = () => (
    <div className="decision-paths">
      <div className="path-header">
        <h2>Decision Paths</h2>
        <p className="selected-option-summary">
          <strong>Selected Option:</strong> {selectedOption.title}
        </p>
      </div>

      <div className="path-tabs">
        <button 
          className={`tab ${activePath === 'domino' ? 'active' : ''}`}
          onClick={() => setActivePath('domino')}
        >
          Organized Path (Domino Effect)
        </button>
        <button 
          className={`tab ${activePath === 'butterfly' ? 'active' : ''}`}
          onClick={() => setActivePath('butterfly')}
        >
          Unorganized Path (Butterfly Effect)
        </button>
      </div>

      <div className="path-view">
        {activePath === 'domino' && dominoPath && renderDominoPath()}
        {activePath === 'butterfly' && butterflyPath && renderButterflyPath()}
      </div>

      <div className="action-buttons">
        <button className="btn-secondary" onClick={() => setCurrentStep('options')}>
          Choose Different Option
        </button>
        <button className="btn-secondary" onClick={handleReset}>
          Start New Decision
        </button>
      </div>
    </div>
  );

  return (
    <div className="decision-maker">
      {currentStep === 'input' && renderInput()}
      {currentStep === 'options' && renderOptions()}
      {currentStep === 'paths' && renderPaths()}
    </div>
  );
}

// Helper component for editing domino steps
function EditStepForm({ step, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    step: step.step,
    description: step.description,
    duration: step.duration,
    resources: step.resources.join(', '),
    outcome: step.outcome
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      resources: formData.resources.split(',').map(r => r.trim())
    });
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.step}
        onChange={(e) => setFormData({ ...formData, step: e.target.value })}
        placeholder="Step name"
      />
      <textarea
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        placeholder="Description"
        rows="3"
      />
      <input
        type="text"
        value={formData.duration}
        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
        placeholder="Duration"
      />
      <input
        type="text"
        value={formData.resources}
        onChange={(e) => setFormData({ ...formData, resources: e.target.value })}
        placeholder="Resources (comma separated)"
      />
      <input
        type="text"
        value={formData.outcome}
        onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
        placeholder="Expected outcome"
      />
      <div className="form-buttons">
        <button type="submit" className="btn-primary">Save</button>
        <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

// Helper component for editing butterfly scenarios
function EditScenarioForm({ scenario, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    scenario: scenario.scenario,
    description: scenario.description,
    duration: scenario.duration,
    probability: scenario.probability,
    possibleOutcomes: scenario.possibleOutcomes.join('\n')
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      possibleOutcomes: formData.possibleOutcomes.split('\n').filter(o => o.trim())
    });
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.scenario}
        onChange={(e) => setFormData({ ...formData, scenario: e.target.value })}
        placeholder="Scenario name"
      />
      <textarea
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        placeholder="Description"
        rows="3"
      />
      <input
        type="text"
        value={formData.duration}
        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
        placeholder="Duration"
      />
      <input
        type="text"
        value={formData.probability}
        onChange={(e) => setFormData({ ...formData, probability: e.target.value })}
        placeholder="Probability"
      />
      <textarea
        value={formData.possibleOutcomes}
        onChange={(e) => setFormData({ ...formData, possibleOutcomes: e.target.value })}
        placeholder="Possible outcomes (one per line)"
        rows="4"
      />
      <div className="form-buttons">
        <button type="submit" className="btn-primary">Save</button>
        <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default DecisionMaker;
