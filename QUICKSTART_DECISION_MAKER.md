# Quick Start Guide - Decision Maker App

## What's Been Created

A complete AI-powered decision-making application with:

✅ **5 Different AI Agents** to choose from (Strategic, Creative, Practical, Collaborative, Balanced)
✅ **Situation Analysis** - Input any scenario and get 4 smart options
✅ **Domino Effect Path** - Organized, sequential steps with resources and outcomes
✅ **Butterfly Effect Path** - Unorganized, probabilistic scenarios with multiple outcomes
✅ **Editable Steps** - Modify any step or scenario to fit your needs
✅ **Modern UI** - Beautiful, responsive interface with smooth animations

## Files Created

### Backend
- `/server/models/Decision.js` - Decision data model
- `/server/services/aiService.js` - AI agent logic and path generation
- `/server/routes/decisions.js` - API endpoints for decisions
- `/server/index.js` - Updated to include decision routes

### Frontend
- `/client/src/components/DecisionMaker.js` - Main React component
- `/client/src/components/DecisionMaker.css` - Styling
- `/client/src/App.js` - Updated to include Decision Maker tab

### Documentation
- `/DECISION_MAKER.md` - Complete feature documentation

## How to Use

### 1. Start the Application

**Backend (Already Running):**
```bash
cd /home/anand/AnandNewTestProjectFeb05
npm start
```
Server runs on: http://localhost:5000

**Frontend:**
```bash
cd /home/anand/AnandNewTestProjectFeb05/client
npm start
```
App opens at: http://localhost:3000

### 2. Use the Decision Maker

1. **Open the App** - Navigate to "Decision Maker" tab (first tab)

2. **Select an AI Agent**:
   - Strategic Agent - For long-term planning
   - Creative Agent - For innovative solutions
   - Practical Agent - For quick, actionable solutions
   - Collaborative Agent - For team-based decisions
   - Balanced Agent - For well-rounded approach

3. **Input Your Situation**:
   ```
   Example: "Our team is facing a tight deadline with limited resources. 
   We need to deliver a critical feature in 2 weeks but have 3 weeks 
   worth of work..."
   ```

4. **Review Options** - See 4 AI-generated options with:
   - Title and description
   - Impact level (high/medium/low)
   - Difficulty rating

5. **Select an Option** - Click "Select This Option" on your choice

6. **Explore Paths**:
   - **Domino Effect** (Organized): See sequential steps, resources, durations
   - **Butterfly Effect** (Unorganized): See scenarios, probabilities, outcomes

7. **Edit Steps**:
   - Click "Edit Step" or "Edit Scenario" on any item
   - Modify description, duration, resources, outcomes
   - Save changes

8. **Make Your Decision** based on the insights!

## Example Situations to Try

1. **Team Management**:
   "Our team is facing a tight deadline with limited resources"

2. **Technology Choice**:
   "We need to decide on a technology stack for our new project"

3. **Process Improvement**:
   "Our current workflow has bottlenecks that slow down delivery"

4. **Resource Allocation**:
   "We have budget for two new hires but three critical needs"

5. **Strategic Planning**:
   "Market conditions are changing, and we need to adapt our strategy"

## API Endpoints Available

- `GET /api/decisions/agents` - Get all AI agents
- `POST /api/decisions/analyze` - Analyze situation and get options
- `POST /api/decisions/:id/select-option` - Select option and generate paths
- `PUT /api/decisions/:id/domino-path/:stepId` - Update domino step
- `PUT /api/decisions/:id/butterfly-path/:scenarioId` - Update butterfly scenario
- `GET /api/decisions/:id` - Get decision by ID
- `GET /api/decisions` - Get all decisions
- `DELETE /api/decisions/:id` - Delete decision

## Key Features

### Domino Effect (Organized Path)
- Sequential, predictable steps
- Clear resource requirements
- Expected outcomes
- Duration estimates
- Perfect for structured decisions

### Butterfly Effect (Unorganized Path)  
- Multiple possible scenarios
- Probability assessments
- Various potential outcomes
- Reflects real-world unpredictability
- Great for exploring alternatives

### Agent Selection
Different agents provide different perspectives:
- **Strategic**: Long-term, systematic
- **Creative**: Innovative, out-of-the-box
- **Practical**: Quick, realistic
- **Collaborative**: Team-focused
- **Balanced**: All-around approach

## Technical Notes

- Currently uses **mock AI** (predictable responses)
- To add real AI: Integrate OpenAI/Claude API in `/server/services/aiService.js`
- Data is stored **in-memory** (restarts clear data)
- For production: Add database (MongoDB/PostgreSQL)

## Next Steps

1. **Test the Application** - Try different situations and agents
2. **Customize AI Logic** - Edit `aiService.js` for real AI integration
3. **Add Database** - Replace in-memory storage with MongoDB/PostgreSQL
4. **Enhance UI** - Customize colors, layouts in DecisionMaker.css
5. **Add Features**:
   - Export decisions to PDF
   - Save decision history
   - Share decisions with team
   - Track outcomes over time

## Git Branch

All changes are in the **AnandFeb6** branch and pushed to GitHub!

```bash
git checkout AnandFeb6  # Switch to the branch
git pull origin AnandFeb6  # Get latest changes
```

## Need Help?

Refer to `/DECISION_MAKER.md` for detailed documentation including:
- Complete API reference
- Customization guide
- Future enhancement ideas
- Development notes

---

**Enjoy making better decisions with AI assistance! 🎯**
