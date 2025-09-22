# Creative Upaay Dashboard

A powerful React-based project management dashboard featuring a kanban board with drag-and-drop tasks, project filtering, and task management.

---

## Features

- Drag and drop tasks between columns (To Do, In Progress, Done)
- Add, update, delete, reorder tasks with priority and categories
- Manage multiple projects with color indicators
- Reset tasks to initial default with one button click
- Sidebar navigation with projects list and optional “Thoughts Time” widget
- Responsive design powered by Tailwind CSS
- Smooth UX with lucide-react icons and Redux Toolkit state management

---

## Tech Stack

- React (Hooks and functional components)
- Redux Toolkit for state management
- react-beautiful-dnd for drag and drop
- Tailwind CSS for styling
- Lucide icons for UI elements

---

## Project Structure

    src/
    ├─ components/
    │ ├─ Board/
    │ │ ├─ KanbanBoard.jsx
    │ │ ├─ Column.jsx
    │ │ └─ TaskCard.jsx
    │ ├─ Layout/
    │ │ └─ Sidebar.jsx
    │ ├─ UI/
    │ │ ├─ Avatar.jsx
    │ │ ├─ Badge.jsx
    │ │ ├─ ResetTasksButton.jsx
    │ │ └─ ThoughtsTimer.jsx
    ├─ redux/
    │ ├─ slices/
    │ │ ├─ tasksSlice.js
    │ │ ├─ projectsSlice.js
    │ │ └─ filtersSlice.js
    ├─ styles/
    │ └─ globals.css
    ├─ App.js
    └─ index.js
---

## Getting Started

1. Clone the repo

git clone <url>

2. Install dependencies

npm install

3. Run the development server

npm start


4. Open `http://localhost:3000` in your browser.

## Dependencies

This project uses the following major packages:

- React
- Redux Toolkit
- react-beautiful-dnd
- Tailwind CSS
- lucide-react Icons

Ensure you have these installed via `npm install` or check `package.json`.


## Components Overview

- **KanbanBoard.jsx**: orchestrates drag-and-drop UI and column rendering.
- **Column.jsx**: represents a draggable droppable column.
- **TaskCard.jsx**: a draggable task card with status and priority controls.
- **ThoughtsTimer.jsx**: sidebar widget for sharing thoughts.
- **Sidebar.jsx**: navigation and project list sidebar.
