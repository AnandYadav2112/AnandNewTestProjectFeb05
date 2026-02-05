// AI Service for generating options and paths
// This is a mock implementation. You can integrate with OpenAI, Claude, or other AI services

class AIAgent {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  // Generate 4 best options for a given situation
  generateOptions(situation) {
    // Mock implementation - replace with actual AI API calls
    const options = [
      {
        id: 1,
        title: `Strategic Approach for: ${situation.substring(0, 30)}...`,
        description: 'Focus on long-term planning and systematic execution',
        impact: 'high',
        difficulty: 'medium'
      },
      {
        id: 2,
        title: `Quick Solution for: ${situation.substring(0, 30)}...`,
        description: 'Implement immediate fixes with minimal disruption',
        impact: 'medium',
        difficulty: 'low'
      },
      {
        id: 3,
        title: `Collaborative Approach for: ${situation.substring(0, 30)}...`,
        description: 'Involve team members and stakeholders for input',
        impact: 'high',
        difficulty: 'medium'
      },
      {
        id: 4,
        title: `Innovative Solution for: ${situation.substring(0, 30)}...`,
        description: 'Explore creative alternatives and new methodologies',
        impact: 'medium',
        difficulty: 'high'
      }
    ];
    
    return options;
  }

  // Generate Domino Effect path (organized, sequential, predictable)
  generateDominoPath(situation, option) {
    // Mock implementation - Domino effect shows organized, sequential steps
    const steps = [
      {
        id: 1,
        step: 'Initial Assessment',
        description: `Analyze the situation: ${option.title}`,
        duration: '1-2 days',
        resources: ['Team Lead', 'Documentation'],
        outcome: 'Clear understanding of requirements',
        editable: true
      },
      {
        id: 2,
        step: 'Planning Phase',
        description: 'Create detailed action plan with milestones',
        duration: '2-3 days',
        resources: ['Project Manager', 'Team'],
        outcome: 'Comprehensive roadmap',
        editable: true
      },
      {
        id: 3,
        step: 'Resource Allocation',
        description: 'Assign tasks and allocate necessary resources',
        duration: '1 day',
        resources: ['Resource Manager', 'Budget'],
        outcome: 'Team ready to execute',
        editable: true
      },
      {
        id: 4,
        step: 'Implementation',
        description: 'Execute the plan systematically',
        duration: '5-7 days',
        resources: ['Development Team', 'Tools'],
        outcome: 'Solution delivered',
        editable: true
      },
      {
        id: 5,
        step: 'Review & Optimize',
        description: 'Evaluate results and make improvements',
        duration: '2-3 days',
        resources: ['QA Team', 'Stakeholders'],
        outcome: 'Optimized solution',
        editable: true
      }
    ];
    
    return {
      type: 'domino',
      name: 'Organized Path (Domino Effect)',
      description: 'Sequential, predictable steps where each action leads to the next in an organized manner',
      steps
    };
  }

  // Generate Butterfly Effect path (unorganized, chaotic, unpredictable)
  generateButterflyPath(situation, option) {
    // Mock implementation - Butterfly effect shows less organized, more chaotic possibilities
    const scenarios = [
      {
        id: 1,
        scenario: 'Immediate Action',
        description: `Start with ${option.title} - quick implementation`,
        duration: '1 day',
        probability: '70%',
        possibleOutcomes: [
          'Quick wins achieved',
          'May need adjustments later',
          'Team morale boost'
        ],
        editable: true
      },
      {
        id: 2,
        scenario: 'Unexpected Challenge',
        description: 'Technical debt or resource constraint emerges',
        duration: '2-4 days',
        probability: '50%',
        possibleOutcomes: [
          'Need to pivot strategy',
          'Additional resources required',
          'Opportunity to innovate'
        ],
        editable: true
      },
      {
        id: 3,
        scenario: 'Stakeholder Feedback',
        description: 'Feedback causes direction change',
        duration: 'Variable',
        probability: '60%',
        possibleOutcomes: [
          'Better alignment with goals',
          'Scope expansion',
          'Timeline adjustment'
        ],
        editable: true
      },
      {
        id: 4,
        scenario: 'Emergent Solution',
        description: 'Unexpected breakthrough or alternative discovered',
        duration: '3-5 days',
        probability: '40%',
        possibleOutcomes: [
          'Superior solution found',
          'Learning opportunities',
          'Process improvement'
        ],
        editable: true
      },
      {
        id: 5,
        scenario: 'Final Convergence',
        description: 'All paths lead to resolution despite chaos',
        duration: '1-2 days',
        probability: '80%',
        possibleOutcomes: [
          'Solution achieved differently than planned',
          'Valuable insights gained',
          'Team adaptability improved'
        ],
        editable: true
      }
    ];
    
    return {
      type: 'butterfly',
      name: 'Unorganized Path (Butterfly Effect)',
      description: 'Less predictable steps where small changes can lead to significant variations in outcome',
      scenarios
    };
  }
}

// Available AI Agents
const agents = {
  strategic: new AIAgent(
    'Strategic Agent',
    'Focuses on long-term planning and systematic approaches'
  ),
  creative: new AIAgent(
    'Creative Agent',
    'Emphasizes innovative and out-of-the-box solutions'
  ),
  practical: new AIAgent(
    'Practical Agent',
    'Prioritizes quick, actionable, and realistic solutions'
  ),
  collaborative: new AIAgent(
    'Collaborative Agent',
    'Focuses on team involvement and stakeholder engagement'
  ),
  default: new AIAgent(
    'Balanced Agent',
    'Provides balanced approach considering all aspects'
  )
};

module.exports = {
  AIAgent,
  agents,
  getAgent: (agentType) => agents[agentType] || agents.default
};
