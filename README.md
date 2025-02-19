# Task Manager

A simple and efficient task management application built with React and TypeScript.

## Features

- **Dashboard View**: Organized sections for upcoming, overdue, and completed tasks
- **Task Management**: Add, edit, and delete tasks with ease
- **Priority Levels**: Assign Low, Medium, or High priority to tasks
- **Search & Filter**: Quick search functionality and filtering by priority and status
- **Local Storage**: Tasks persist between sessions using browser local storage
- **Responsive Design**: Clean and modern UI that works on all devices

## Tech Stack

- React 18
- TypeScript
- Material-UI (MUI)
- date-fns for date manipulation
- Vite for build tooling
- Docker for containerization

## Getting Started

### Prerequisites

- Node.js (v14 or higher) and npm (v6 or higher)
  OR
- Docker and Docker Compose

### Installation

#### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd task-manager
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

#### Using Docker

1. For development:
```bash
# Build and start the development container
docker-compose up dev

# Access the application at http://localhost:5173
```

2. For production:
```bash
# Build and start the production container
docker-compose up prod

# Access the application at http://localhost
```

3. To rebuild the containers:
```bash
# Development
docker-compose up dev --build

# Production
docker-compose up prod --build
```

4. To stop the containers:
```bash
docker-compose down
```

## Usage

1. **Adding a Task**:
   - Click the "Add Task" button
   - Fill in the task details (title, description, due date, priority)
   - Click "Add" to save the task

2. **Managing Tasks**:
   - Edit: Click the edit icon on any task to modify its details
   - Delete: Click the delete icon to remove a task
   - Complete: Toggle the checkbox to mark a task as complete

3. **Finding Tasks**:
   - Use the search bar to find tasks by title or description
   - Filter tasks by priority (Low, Medium, High)
   - Filter tasks by status (All, Active, Completed)

## Project Structure

```
src/
├── components/         # React components
│   ├── Dashboard.tsx  # Main dashboard component
│   ├── TaskForm.tsx   # Task creation/editing form
│   └── TaskList.tsx   # Task list display
├── context/           # React context
│   └── TaskContext.tsx # Task state management
├── types/             # TypeScript types
│   └── Task.ts        # Task-related types
└── App.tsx            # Root component
```

## Docker Configuration

The application includes two Docker configurations:

1. **Development**:
   - Hot-reloading enabled
   - Volume mounting for real-time code changes
   - Development server with debugging capabilities
   - Exposed port: 5173

2. **Production**:
   - Multi-stage build for optimized image size
   - Nginx server for static file serving
   - Gzip compression enabled
   - Security headers configured
   - Exposed port: 80

## Assumptions

1. Tasks are stored locally in the browser's localStorage
2. All dates are handled in the user's local timezone
3. Task titles are required, descriptions are optional
4. Tasks cannot be scheduled in the past when creating/editing

## Future Improvements

1. Add user authentication
2. Implement task categories/tags
3. Add task reminders/notifications
4. Enable task sharing/collaboration
5. Add dark mode theme support
6. Implement drag-and-drop for task reordering
7. Add task export/import functionality
8. Implement task recurrence options
9. Add database persistence
10. Implement API caching
11. Add container health checks
12. Implement CI/CD pipeline
