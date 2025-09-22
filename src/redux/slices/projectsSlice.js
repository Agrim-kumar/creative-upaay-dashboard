import { createSlice } from '@reduxjs/toolkit';

const initialProjects = [
  {
    id: 'mobile-app',
    name: 'Mobile App',
    color: '#6366f1',
    isActive: true
  },
  {
    id: 'website-redesign',
    name: 'Website Redesign',
    color: '#f59e0b',
    isActive: false
  },
  {
    id: 'design-system',
    name: 'Design System',
    color: '#8b5cf6',
    isActive: false
  },
  {
    id: 'wireframes',
    name: 'Wireframes',
    color: '#3b82f6',
    isActive: false
  }
];

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    items: initialProjects,
    activeProject: 'mobile-app',
  },
  reducers: {
    setActiveProject: (state, action) => {
      state.activeProject = action.payload;
      state.items.forEach(project => {
        project.isActive = project.id === action.payload;
      });
    },
    addProject: (state, action) => {
      const newProject = {
        id: Date.now().toString(),
        ...action.payload,
        isActive: false
      };
      state.items.push(newProject);
    },
  },
});

export const { setActiveProject, addProject } = projectsSlice.actions;
export default projectsSlice.reducer;