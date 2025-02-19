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

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

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
