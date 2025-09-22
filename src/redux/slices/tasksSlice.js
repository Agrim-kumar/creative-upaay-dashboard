import { createSlice } from '@reduxjs/toolkit';

// Initial tasks remain the same as your existing data...
const initialTasks = [
  {
    id: '1',
    title: 'Mobile Design Mockups',
    description: 'Create high-fidelity mobile mockups for the new app interface.',
    status: 'todo',
    priority: 'completed',
    category: 'Design',
    projectId: 'mobile-app',
    assignees: ['user1', 'user2'],
    comments: 1,
    files: 1,
    images: ['https://images.pexels.com/photos/1334131/pexels-photo-1334131.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'],
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Brainstorming',
    description: 'Brainstorming brings team members diverse experience into play.',
    status: 'progress',
    priority: 'low',
    category: 'Planning',
    projectId: 'mobile-app',
    assignees: ['user1', 'user2', 'user3'],
    comments: 2,
    files: 2,
    createdAt: '2024-01-16T09:30:00Z'
  },
  {
    id: '3',
    title: 'Research',
    description: 'User research helps you to create an optimal product for users.',
    status: 'progress',
    priority: 'high',
    category: 'Research',
    projectId: 'mobile-app',
    assignees: ['user1', 'user2'],
    comments: 0,
    files: 0,
    createdAt: '2024-01-17T14:15:00Z'
  },
  {
    id: '4',
    title: 'Wireframes',
    description: 'Low fidelity wireframes include the most basic content and visuals.',
    status: 'todo',
    priority: 'high',
    category: 'Design',
    projectId: 'mobile-app',
    assignees: ['user1', 'user2', 'user3'],
    comments: 0,
    files: 0,
    createdAt: '2024-01-18T11:45:00Z'
  },
  {
    id: '5',
    title: 'Onboarding Illustrations',
    description: 'Create beautiful onboarding illustrations for the mobile app.',
    status: 'progress',
    priority: 'low',
    category: 'Design',
    projectId: 'mobile-app',
    assignees: ['user2', 'user3', 'user4'],
    comments: 1,
    files: 1,
    images: ['https://images.pexels.com/photos/1367243/pexels-photo-1367243.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'],
    createdAt: '2024-01-19T16:20:00Z'
  },
  {
    id: '6',
    title: 'MoodBoard',
    description: 'Visual inspiration and style guide for the project design direction.',
    status: 'progress',
    priority: 'low',
    category: 'Design',
    projectId: 'mobile-app',
    assignees: ['user2', 'user3', 'user4'],
    comments: 1,
    files: 1,
    images: ['https://images.pexels.com/photos/1560653/pexels-photo-1560653.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'],
    createdAt: '2024-01-20T13:10:00Z'
  },
  {
    id: '7',
    title: 'Design System',
    description: 'It just needs to adapt the UI from what you did before.',
    status: 'done',
    priority: 'completed',
    category: 'Design',
    projectId: 'mobile-app',
    assignees: ['user1', 'user2', 'user3'],
    comments: 2,
    files: 2,
    createdAt: '2024-01-12T08:30:00Z'
  }
];

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: initialTasks,
    loading: false,
    error: null,
    draggedTask: null,
  },
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now().toString(),
        ...action.payload,
        createdAt: new Date().toISOString(),
        comments: 0,
        files: 0,
        assignees: action.payload.assignees || ['user1']
      };
      state.items.push(newTask);
    },

    updateTask: (state, action) => {
      const { id, updates } = action.payload;
      const taskIndex = state.items.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        state.items[taskIndex] = { 
          ...state.items[taskIndex], 
          ...updates,
          updatedAt: new Date().toISOString()
        };
      }
    },

    moveTask: (state, action) => {
      const { taskId, newStatus, sourceIndex, destinationIndex } = action.payload;
      const task = state.items.find(task => task.id === taskId);
      
      if (task) {
        // Update task status
        task.status = newStatus;
        task.updatedAt = new Date().toISOString();
        
        // If moving between different columns, we need to reorder
        if (sourceIndex !== undefined && destinationIndex !== undefined) {
          // Remove task from current position
          const taskIndex = state.items.findIndex(t => t.id === taskId);
          const [movedTask] = state.items.splice(taskIndex, 1);
          
          // Find the correct insertion point based on status and destination index
          const tasksWithSameStatus = state.items.filter(t => t.status === newStatus);
          const insertIndex = Math.min(destinationIndex, tasksWithSameStatus.length);
          
          // Calculate the actual index in the full array
          const statusTasksBeforeDestination = state.items
            .slice(0, state.items.length)
            .filter((t, index) => t.status === newStatus && index < insertIndex)
            .length;
          
          const insertionIndex = state.items.findIndex((t, index) => 
            t.status === newStatus && 
            state.items.slice(0, index + 1).filter(task => task.status === newStatus).length > insertIndex
          );
          
          if (insertionIndex === -1) {
            state.items.push(movedTask);
          } else {
            state.items.splice(insertionIndex, 0, movedTask);
          }
        }
      }
    },

    reorderTasks: (state, action) => {
      const { taskId, status, sourceIndex, destinationIndex } = action.payload;
      
      // Get tasks with the same status
      const statusTasks = state.items.filter(task => task.status === status);
      const otherTasks = state.items.filter(task => task.status !== status);
      
      // Reorder within the same status
      const [movedTask] = statusTasks.splice(sourceIndex, 1);
      statusTasks.splice(destinationIndex, 0, movedTask);
      
      // Update the main array
      state.items = [...otherTasks, ...statusTasks].sort((a, b) => {
        // Maintain some ordering logic if needed
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
      
      // Update task timestamp
      const task = state.items.find(t => t.id === taskId);
      if (task) {
        task.updatedAt = new Date().toISOString();
      }
    },

    deleteTask: (state, action) => {
      state.items = state.items.filter(task => task.id !== action.payload);
    },

    setDraggedTask: (state, action) => {
      state.draggedTask = action.payload;
    },

    // Batch update for multiple tasks
    updateMultipleTasks: (state, action) => {
      const updates = action.payload;
      updates.forEach(({ id, updates: taskUpdates }) => {
        const taskIndex = state.items.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
          state.items[taskIndex] = {
            ...state.items[taskIndex],
            ...taskUpdates,
            updatedAt: new Date().toISOString()
          };
        }
      });
    },
  },
  

  
});

export const { 
  addTask, 
  updateTask, 
  moveTask, 
  deleteTask, 
  reorderTasks, 
  setDraggedTask,
  updateMultipleTasks
} = tasksSlice.actions;

export default tasksSlice.reducer;