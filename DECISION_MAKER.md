# Decision Maker Feature

## Overview
The Decision Maker is an AI-powered decision support system that helps you analyze situations, evaluate options, and visualize decision paths using two different analysis approaches:

1. **Domino Effect (Organized Path)**: Sequential, predictable steps where each action leads to the next
2. **Butterfly Effect (Unorganized Path)**: Less predictable scenarios where small changes can lead to significant variations

## Features

### 1. **AI Agent Selection**
Choose from multiple AI agents, each with different perspectives:
- **Strategic Agent**: Long-term planning and systematic approaches
- **Creative Agent**: Innovative and out-of-the-box solutions
- **Practical Agent**: Quick, actionable, and realistic solutions
- **Collaborative Agent**: Team involvement and stakeholder engagement
- **Balanced Agent**: Balanced approach considering all aspects

### 2. **Situation Analysis**
- Input any decision scenario or problem
- AI generates 4 best options with:
  - Impact assessment (high/medium/low)
  - Difficulty rating
  - Detailed descriptions

### 3. **Path Visualization**

#### Domino Effect Path (Organized)
- Sequential steps timeline
- Clear resource requirements
- Expected outcomes for each step
- Duration estimates
- Editable at any step

#### Butterfly Effect Path (Unorganized)
- Multiple possible scenarios
- Probability assessments
- Multiple potential outcomes per scenario
- Variable duration estimates
- Editable scenarios

### 4. **Step Editing**
- Modify any step in the Domino path
- Adjust scenarios in the Butterfly path
- Update:
  - Descriptions
  - Durations
  - Resources
  - Outcomes/Probabilities

## API Endpoints

### Get All Agents
```
GET /api/decisions/agents
```
Returns list of available AI agents

### Analyze Situation
```
POST /api/decisions/analyze
Body: { situation: string, agentType: string }
```
Returns decision ID and 4 suggested options

### Select Option
```
POST /api/decisions/:id/select-option
Body: { optionId: number }
```
Returns both Domino and Butterfly paths for the selected option

### Update Domino Step
```
PUT /api/decisions/:id/domino-path/:stepId
Body: { step, description, duration, resources, outcome }
```
Updates a specific step in the Domino path

### Update Butterfly Scenario
```
PUT /api/decisions/:id/butterfly-path/:scenarioId
Body: { scenario, description, duration, probability, possibleOutcomes }
```
Updates a specific scenario in the Butterfly path

### Get Decision
```
GET /api/decisions/:id
```
Returns full decision details

### Get All Decisions
```
GET /api/decisions
```
Returns all stored decisions

### Delete Decision
```
DELETE /api/decisions/:id
```
Deletes a specific decision

## Usage Example

1. **Start**: Navigate to the "Decision Maker" tab
2. **Select Agent**: Choose an AI agent based on your needs
3. **Input Situation**: Describe your decision scenario in detail
4. **Review Options**: Examine the 4 suggested options with their impacts
5. **Select Option**: Click on your preferred option
6. **Explore Paths**: 
   - Switch between Domino (organized) and Butterfly (unorganized) paths
   - See how your decision could unfold in different ways
7. **Edit Steps**: Modify any step or scenario to fit your specific context
8. **Make Decision**: Use the insights to make an informed decision

## Technology Stack

### Backend
- Node.js/Express
- In-memory storage (easily replaceable with database)
- RESTful API architecture

### Frontend
- React
- Modern CSS with gradients and animations
- Responsive design

## Future Enhancements

1. **Real AI Integration**: Connect to OpenAI, Claude, or other AI services for real intelligence
2. **Database Integration**: MongoDB/PostgreSQL for persistent storage
3. **User Authentication**: Personal decision history
4. **Export Options**: PDF/JSON export of decision paths
5. **Collaboration**: Share decisions with team members
6. **Analytics**: Track decision outcomes over time
7. **Templates**: Pre-built decision templates for common scenarios
8. **Notifications**: Reminders for step completion
9. **Version History**: Track changes to decision paths
10. **AI Learning**: Improve suggestions based on user feedback

## Customization

### Adding New AI Agents
Edit `/server/services/aiService.js`:
```javascript
agents.newAgent = new AIAgent(
  'New Agent Name',
  'Description of agent focus'
);
```

### Customizing Path Generation
Modify the `generateDominoPath()` and `generateButterflyPath()` methods in the AIAgent class to change how paths are generated.

### Styling
Edit `/client/src/components/DecisionMaker.css` to customize the appearance.

## Development Notes

- The current implementation uses mock AI responses
- To integrate real AI, replace the logic in `/server/services/aiService.js`
- The system stores decisions in memory - restart clears all data
- Add database integration for production use

## Example Situations

1. **Team Management**: "Our team is facing a tight deadline with limited resources..."
2. **Technology Choice**: "We need to decide on a technology stack for our new project..."
3. **Process Improvement**: "Our current workflow has bottlenecks that slow down delivery..."
4. **Resource Allocation**: "We have budget for two new hires but three critical needs..."
5. **Strategic Planning**: "Market conditions are changing, and we need to adapt our strategy..."

## Support

For questions or issues, refer to the main project documentation or contact the development team.
