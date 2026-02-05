# Manager Help

A comprehensive management application to help managers track tasks, leaves, capacity, and team conversations.

## Features

- **Tasks Management**: Create, update, and track tasks with priorities, due dates, and status
- **Leave Management**: Manage employee leave requests with approval workflow
- **Capacity Planning**: Track team capacity, allocated hours, and project assignments
- **Conversations**: Facilitate team communication with threaded conversations

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js with Express
- **Storage**: In-memory (can be replaced with a database)

## Project Structure

```
manager-help/
├── server/                 # Backend API
│   ├── index.js           # Express server
│   └── routes/            # API routes
│       ├── tasks.js
│       ├── leaves.js
│       ├── capacity.js
│       └── conversations.js
├── client/                # React frontend
│   ├── public/
│   └── src/
│       ├── components/    # React components
│       │   ├── Tasks.js
│       │   ├── Leaves.js
│       │   ├── Capacity.js
│       │   └── Conversations.js
│       ├── App.js
│       ├── App.css
│       └── index.js
├── package.json
└── README.md
```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/AnandYadav2112/AnandNewTestProjectFeb05.git
   cd AnandNewTestProjectFeb05
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

   Or install separately:
   ```bash
   # Install backend dependencies
   npm install

   # Install frontend dependencies
   cd client
   npm install
   cd ..
   ```

## Running the Application

### Development Mode

You need to run both the backend and frontend servers:

1. **Start the backend server** (Terminal 1)
   ```bash
   npm run server
   ```
   The API server will run on `http://localhost:5000`

2. **Start the frontend** (Terminal 2)
   ```bash
   npm run client
   ```
   The React app will run on `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

## API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Leaves
- `GET /api/leaves` - Get all leave requests
- `GET /api/leaves/:id` - Get leave by ID
- `POST /api/leaves` - Create new leave request
- `PUT /api/leaves/:id` - Update leave request
- `DELETE /api/leaves/:id` - Delete leave request

### Capacity
- `GET /api/capacity` - Get all capacity entries
- `GET /api/capacity/:id` - Get capacity by ID
- `POST /api/capacity` - Create new capacity entry
- `PUT /api/capacity/:id` - Update capacity entry
- `DELETE /api/capacity/:id` - Delete capacity entry

### Conversations
- `GET /api/conversations` - Get all conversations
- `GET /api/conversations/:id` - Get conversation by ID
- `POST /api/conversations` - Create new conversation
- `POST /api/conversations/:id/messages` - Add message to conversation
- `PUT /api/conversations/:id` - Update conversation
- `DELETE /api/conversations/:id` - Delete conversation

## Features Overview

### Tasks Management
- Create tasks with title, description, assignee, priority, and due date
- Track task status (Pending, In Progress, Completed)
- Set priority levels (Low, Medium, High)
- Edit and delete tasks

### Leave Management
- Submit leave requests with type, dates, and reason
- Multiple leave types: Vacation, Sick Leave, Personal, Maternity/Paternity, Unpaid
- Track leave status (Pending, Approved, Rejected)
- View leave history

### Capacity Planning
- Track employee capacity per week
- Monitor allocated vs available hours
- Visual capacity utilization bar
- Associate capacity with projects
- Prevent over-allocation

### Conversations
- Create conversation threads with multiple participants
- Send and receive messages
- View conversation history
- Real-time message timestamps

## Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- User authentication and authorization
- Email notifications
- Calendar integration
- Export reports to PDF/Excel
- Mobile responsive design improvements
- Real-time updates with WebSockets
- Analytics dashboard

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Author

Anand Yadav

## Support

For issues and questions, please open an issue on GitHub.
