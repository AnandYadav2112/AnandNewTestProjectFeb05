const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Decision = require('../models/Decision');
const { getAgent, agents } = require('../services/aiService');

// Get all agents
router.get('/agents', (req, res) => {
  const agentList = Object.keys(agents).map(key => ({
    id: key,
    name: agents[key].name,
    description: agents[key].description
  }));
  res.json(agentList);
});

// Create a new decision with situation analysis
router.post('/analyze', (req, res) => {
  try {
    const { situation, agentType } = req.body;
    
    if (!situation || !situation.trim()) {
      return res.status(400).json({ error: 'Situation is required' });
    }

    const agent = getAgent(agentType || 'default');
    const options = agent.generateOptions(situation);
    
    const decision = Decision.create({
      id: uuidv4(),
      situation,
      options,
      agent: agentType || 'default'
    });

    res.json({
      decisionId: decision.id,
      situation: decision.situation,
      options: decision.options,
      agent: decision.agent
    });
  } catch (error) {
    console.error('Error analyzing situation:', error);
    res.status(500).json({ error: 'Failed to analyze situation' });
  }
});

// Select an option and generate paths
router.post('/:id/select-option', (req, res) => {
  try {
    const { id } = req.params;
    const { optionId } = req.body;

    const decision = Decision.findById(id);
    if (!decision) {
      return res.status(404).json({ error: 'Decision not found' });
    }

    const selectedOption = decision.options.find(opt => opt.id === optionId);
    if (!selectedOption) {
      return res.status(404).json({ error: 'Option not found' });
    }

    const agent = getAgent(decision.agent);
    const dominoPath = agent.generateDominoPath(decision.situation, selectedOption);
    const butterflyPath = agent.generateButterflyPath(decision.situation, selectedOption);

    Decision.update(id, {
      selectedOption: selectedOption,
      dominoPath,
      butterflyPath
    });

    res.json({
      decisionId: id,
      selectedOption,
      dominoPath,
      butterflyPath
    });
  } catch (error) {
    console.error('Error selecting option:', error);
    res.status(500).json({ error: 'Failed to select option' });
  }
});

// Update a step in domino path
router.put('/:id/domino-path/:stepId', (req, res) => {
  try {
    const { id, stepId } = req.params;
    const updatedStep = req.body;

    const decision = Decision.findById(id);
    if (!decision) {
      return res.status(404).json({ error: 'Decision not found' });
    }

    const stepIndex = decision.dominoPath.steps.findIndex(s => s.id === parseInt(stepId));
    if (stepIndex === -1) {
      return res.status(404).json({ error: 'Step not found' });
    }

    decision.dominoPath.steps[stepIndex] = {
      ...decision.dominoPath.steps[stepIndex],
      ...updatedStep,
      id: parseInt(stepId)
    };

    Decision.update(id, { dominoPath: decision.dominoPath });

    res.json({
      decisionId: id,
      dominoPath: decision.dominoPath
    });
  } catch (error) {
    console.error('Error updating domino step:', error);
    res.status(500).json({ error: 'Failed to update step' });
  }
});

// Update a scenario in butterfly path
router.put('/:id/butterfly-path/:scenarioId', (req, res) => {
  try {
    const { id, scenarioId } = req.params;
    const updatedScenario = req.body;

    const decision = Decision.findById(id);
    if (!decision) {
      return res.status(404).json({ error: 'Decision not found' });
    }

    const scenarioIndex = decision.butterflyPath.scenarios.findIndex(s => s.id === parseInt(scenarioId));
    if (scenarioIndex === -1) {
      return res.status(404).json({ error: 'Scenario not found' });
    }

    decision.butterflyPath.scenarios[scenarioIndex] = {
      ...decision.butterflyPath.scenarios[scenarioIndex],
      ...updatedScenario,
      id: parseInt(scenarioId)
    };

    Decision.update(id, { butterflyPath: decision.butterflyPath });

    res.json({
      decisionId: id,
      butterflyPath: decision.butterflyPath
    });
  } catch (error) {
    console.error('Error updating butterfly scenario:', error);
    res.status(500).json({ error: 'Failed to update scenario' });
  }
});

// Get decision by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const decision = Decision.findById(id);
    
    if (!decision) {
      return res.status(404).json({ error: 'Decision not found' });
    }

    res.json(decision);
  } catch (error) {
    console.error('Error fetching decision:', error);
    res.status(500).json({ error: 'Failed to fetch decision' });
  }
});

// Get all decisions
router.get('/', (req, res) => {
  try {
    const decisions = Decision.findAll();
    res.json(decisions);
  } catch (error) {
    console.error('Error fetching decisions:', error);
    res.status(500).json({ error: 'Failed to fetch decisions' });
  }
});

// Delete a decision
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const deleted = Decision.delete(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Decision not found' });
    }

    res.json({ message: 'Decision deleted successfully' });
  } catch (error) {
    console.error('Error deleting decision:', error);
    res.status(500).json({ error: 'Failed to delete decision' });
  }
});

module.exports = router;
