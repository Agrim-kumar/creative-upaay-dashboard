import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasksSlice';
import projectsReducer from './slices/projectsSlice';
import filtersReducer from './slices/filtersSlice';

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('dashboardState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('dashboardState', serializedState);
  } catch (err) {
    console.error('Could not save state:', err);
  }
};

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    projects: projectsReducer,
    filters: filtersReducer,
  },
  preloadedState: persistedState,
});

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  saveState(store.getState());
});

export default store;